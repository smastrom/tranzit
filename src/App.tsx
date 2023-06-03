import {
   useEffect,
   useRef,
   useState,
   cloneElement,
   Children,
   useLayoutEffect,
   useCallback,
   type RefObject
} from 'react'

const defaultProps: Required<InternalProps & Props> = {
   keyframes: [],
   keyframeOptions: {},
   when: true,
   children: null,
   reverse: false,
   initial: false,
   hide: false,
   keep: false,
   durIn: 600,
   durOut: 400,
   delayIn: 0,
   delayOut: 0,
   yOrigin: 0,
   xOrigin: 0
}

function mergeTransform(x: number, y: number, transform: string) {
   const translateX = `translateX(${x}px)`
   const translateY = `translateY(${y}px)`

   transform.includes('translateX')
      ? transform.replace(/translateX\(\d+px\)/, translateX)
      : (transform = `${transform} ${translateX}`)

   transform.includes('translateY')
      ? transform.replace(/translateY\(\d+px\)/, translateY)
      : (transform = `${transform} ${translateY}`)

   return transform
}

function mergeKeyframes(keyframes: AnimationRef['keyframes'], x: number, y: number) {
   if (Array.isArray(keyframes)) {
      const _keyframes = [...keyframes]
      keyframes[0].transform = mergeTransform(x, y, `${keyframes[0].transform ?? ''}`)

      return _keyframes
   }

   if (typeof keyframes === 'object') {
      const _keyframes = { ...keyframes }

      if (Array.isArray(_keyframes.transform)) {
         _keyframes.transform[0] = mergeTransform(x, y, `${_keyframes.transform[0] ?? ''}`)
      } else if (!('transform' in _keyframes)) {
         _keyframes.transform = [mergeTransform(x, y, '')]
      }

      return _keyframes
   }

   return keyframes
}

export function Fade(props: Props) {
   return (
      <Tranzit
         durIn={600}
         durOut={300}
         yOrigin={0}
         xOrigin={0}
         {...props}
         keyframes={{
            opacity: [0, 1],
            transformOrigin: ['50% 50%', '50% 50%'],
            transform: ['scale(2,2)', 'scale(1,1)']
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
      />
   )
}

type InternalProps = {
   keyframes: AnimationRef['keyframes']
   keyframeOptions: AnimationRef['keyframeOptions']
}

type Props = {
   when: unknown
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   children: any
   reverse?: boolean
   initial?: boolean
   hide?: boolean
   keep?: boolean
   durIn?: number
   durOut?: number
   delayIn?: number
   delayOut?: number
   yOrigin?: number
   xOrigin?: number
}

type AnimationRef = {
   keyframes: Keyframe[] | PropertyIndexedKeyframes
   keyframeOptions: KeyframeAnimationOptions
}

function useOnFirstMount(callback: () => void) {
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

   const [isDestroyed, setIsDestroyed] = useState(false)
   const ref = useRef<HTMLDivElement>(null)
   const animation = useRef(createAnimation())
   const userStyles = useRef({ display: '', visibility: '' })

   const initialize = useCallback(() => {
      if (!ref.current) return

      userStyles.current.display = getComputedStyle(ref.current).display
      userStyles.current.visibility = getComputedStyle(ref.current).visibility

      if (props.keep) return ref.current.style.setProperty('visibility', 'hidden')
      if (props.hide) return ref.current.style.setProperty('display', 'none')

      setIsDestroyed(true)
   }, [props.hide, props.keep])

   const isMounted = useOnFirstMount(() => {
      if (props.when) {
         if (props.initial) {
            animation.current = createAnimation(
               ref,
               mergeKeyframes(props.keyframes, props.xOrigin, props.yOrigin),
               {
                  duration: props.durIn,
                  delay: props.delayIn,
                  ...props.keyframeOptions
               }
            )

            animation.current.play()
         }
      } else {
         initialize()
      }
   })

   useLayoutEffect(() => {
      if (isMounted && props.when) {
         if (!ref.current) {
            setIsDestroyed(false)
         } else {
            if (props.keep)
               return ref.current.style.setProperty('visibility', userStyles.current.visibility)
            if (props.hide)
               return ref.current.style.setProperty('display', userStyles.current.display)
         }
      }
   }, [isMounted, props.when, props.hide, props.keep])

   useEffect(() => {
      if (isDestroyed) return
      if (isMounted) {
         if (props.when) {
            if (animation.current.playState === 'running') {
               animation.current.onfinish = null

               if (props.reverse) {
                  return animation.current.reverse()
               }

               animation.current.cancel()
            }

            animation.current = createAnimation(
               ref,
               mergeKeyframes(props.keyframes, props.xOrigin, props.yOrigin),
               {
                  duration: props.durIn,
                  delay: props.delayIn,
                  ...props.keyframeOptions
               }
            )
            animation.current.play()
         } else {
            if (props.reverse && animation.current.playState === 'running') {
               animation.current.onfinish = initialize
               return animation.current.reverse()
            }

            animation.current = createAnimation(
               ref,
               props.reverse
                  ? mergeKeyframes(props.keyframes, props.xOrigin, props.yOrigin)
                  : { opacity: [1, 0] },
               {
                  duration: props.durOut,
                  delay: props.delayOut,
                  composite: 'replace',
                  direction: props.reverse ? 'reverse' : 'normal',
                  ...props.keyframeOptions
               }
            )
            animation.current.play()
            animation.current.onfinish = initialize
         }
      }
   }, [
      isDestroyed,
      isMounted,
      initialize,
      props.when,
      props.durIn,
      props.durOut,
      props.delayIn,
      props.delayOut,
      props.keyframes,
      props.keyframeOptions,
      props.reverse,
      props.xOrigin,
      props.yOrigin
   ])

   // console.count('Render count')

   if (Children.count(props.children) > 1) {
      console.error('Tranzit can only have one child')
      return null
   }

   return isDestroyed
      ? null
      : Children.map(props.children, (child) =>
           cloneElement(child, {
              ...child.props,
              ref
           })
        )
}

export function App() {
   const [show, setShow] = useState(false)

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
         <Fade when={show} yOrigin={-600} reverse initial>
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
