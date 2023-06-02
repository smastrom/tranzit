import {
   useEffect,
   useRef,
   useState,
   cloneElement,
   Children,
   type RefObject,
   useLayoutEffect,
   useCallback
} from 'react'

const defaultProps: Required<InternalProps & Props> = {
   keyframes: [],
   when: true,
   children: null,
   reverse: false,
   skip: true,
   hide: false,
   keep: false,
   delay: { in: 0, out: 0 },
   duration: { in: 400, out: 400 },
   origin: { x: 0, y: 0 }
}

export function Fade(props: Props) {
   return (
      <Tranzit
         duration={{ in: 400, out: 400 }}
         origin={{ x: 0, y: 0 }}
         {...props}
         keyframes={{
            opacity: [0, 1],
            transform: ['translateY(-200px) translateX(0px)', 'translateY(0px) translateX(0px)']
         }}
      />
   )
}

type InternalProps = {
   keyframes: AnimationRef['keyframes']
}

type Props = {
   when: unknown
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   children: any
   reverse?: boolean
   skip?: boolean
   hide?: boolean
   keep?: boolean
   duration?: number | { in: number; out: number }
   delay?: number | { in: number; out: number }
   origin?: { x: number; y: number }
}

type AnimationRef = {
   keyframes: Keyframe[] | PropertyIndexedKeyframes
   keyframeOptions: KeyframeAnimationOptions
}

function getDuration(duration: Props['duration'], prop: 'in' | 'out' = 'in') {
   if (typeof duration === 'number') return duration
   if (typeof duration === 'object') {
      return duration[prop] ?? (defaultProps.duration as { in: number; out: number })[prop]
   }
}

function getOriginTransform(origin: Props['origin']) {
   return `translateY(${origin?.y || 0}px) translateX(${origin?.x || 0}px)`
}

function getOptions(duration: Props['duration'], delay: Props['delay']): KeyframeAnimationOptions {
   return {
      duration: getDuration(duration),
      delay: getDuration(delay),
      fill: 'forwards'
   }
}

function usePrevious(value: unknown) {
   const ref = useRef<unknown>()

   useEffect(() => {
      ref.current = value
   }, [value])

   return ref.current
}

function useOnMount(callback: () => void) {
   const isInitial = useRef(true)
   const _callback = useCallback(callback, [callback])

   useLayoutEffect(() => {
      if (isInitial.current) {
         _callback()
      }
      isInitial.current = false
   }, [_callback])

   return !isInitial.current
}

function createAnimation(
   ref: RefObject<HTMLElement> = { current: null },
   keyframes: Keyframe[] | PropertyIndexedKeyframes = [],
   options: KeyframeAnimationOptions = {}
) {
   return new Animation(new KeyframeEffect(ref.current, keyframes, options), document.timeline)
}

export function Tranzit(_props: InternalProps & Props = defaultProps) {
   const props = { ...defaultProps, ..._props }

   const [destroyed, setDestroyed] = useState(false)
   const prevWhen = usePrevious(props.when)
   const prevDestroyed = usePrevious(destroyed)

   const ref = useRef<HTMLDivElement>(null)
   const animations = useRef({ in: createAnimation(), out: createAnimation() })

   const isMounted = useOnMount(() => {
      if (props.when) {
         if (!props.skip) {
            animations.current.in = createAnimation(
               ref,
               props.keyframes,
               getOptions(props.duration, props.delay)
            )

            animations.current.in.play()
         }
      } else {
         setDestroyed(true)
      }
   })

   useEffect(() => {
      if (
         isMounted &&
         /* Ensure better behavior in StrictMode */
         (prevWhen !== props.when || prevDestroyed !== destroyed)
      ) {
         if (props.when) {
            // If no ref, trigger re-render, code below will execute again
            if (!ref.current) return setDestroyed(false)

            // If transitioning out, cancel the animation and start a new one
            if (animations.current.out.playState !== 'finished') {
               console.log('Canceling animation - out')
               animations.current.out.onfinish = null
               animations.current.out.cancel()
            }

            animations.current.in = createAnimation(
               ref,
               props.keyframes,
               getOptions(props.duration, props.delay)
            )

            animations.current.in.play()
         } else {
            // Do nothing if transitioning in, just replace any common property and wait for unmount
            animations.current.out = createAnimation(
               ref,
               { opacity: [1, 0] },
               { ...getOptions(props.duration, props.delay), fill: 'both', composite: 'replace' }
            )

            animations.current.out.play()
            animations.current.out.onfinish = () => setDestroyed(true)
         }
      }
   }, [
      isMounted,
      prevWhen,
      props.when,
      prevDestroyed,
      destroyed,
      props.delay,
      props.duration,
      props.keyframes
   ])

   console.count('Render count')

   if (Children.count(props.children) > 1) {
      console.error('Tranzit can only have one child')
      return null
   }

   return destroyed
      ? null
      : Children.map(props.children, (child) =>
           cloneElement(child, {
              ...child.props,
              ref
           })
        )
}

export function App() {
   const [show, setShow] = useState(true)

   return (
      <div>
         <button
            onClick={() => setShow((prev) => !prev)}
            style={{
               position: 'fixed',
               top: '1rem',
               right: '1rem'
            }}
         >
            Toggle
         </button>
         <Fade when={show} origin={{ y: -600, x: 0 }} keep reverse>
            <div style={circleStyles}>Buonasera</div>
         </Fade>
      </div>
   )
}

const circleStyles = {
   backgroundColor: 'red',
   padding: '2rem',
   borderRadius: '999px',
   aspectRatio: 1,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginBlockStart: '2rem'
}
