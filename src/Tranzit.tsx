import {
   useRef,
   useState,
   useCallback,
   useMemo,
   useDeferredValue,
   createElement,
   cloneElement,
   Children,
   useEffect,
   type ReactElement
} from 'react'
import {
   useIsomorphicLayoutEffect,
   createAnimation,
   useOnBeforeFirstPaint,
   mergeTransform,
   defaultProps
} from './utils'
import type { InternalProps, Props, MutableRef, ReactHTML } from './types'

export function Tranzit(tranzitProps: InternalProps & Props): ReactElement | null {
   const props = { ...defaultProps, ...tranzitProps }

   const internalRef = useRef<HTMLDivElement>(null)
   const animation = useRef(createAnimation())
   const userStyles = useRef({
      display: '',
      visibility: '',
      hasDisplay: false,
      hasVisibility: false
   })

   const prevWhen = useDeferredValue(props.when)

   const [isDestroyed, setIsDestroyed] = useState(false)

   const keyframes = useMemo(
      () => mergeTransform(props.keyframes, props.startX, props.startY),
      [props.keyframes, props.startX, props.startY]
   )

   const keyframeOptions = useMemo(() => props.keyframeOptions, [props.keyframeOptions])

   const reset = useCallback(() => {
      if (!internalRef.current) return

      if (!props.keep && !props.hide) setIsDestroyed(true)

      if (props.keep) internalRef.current.style.visibility = 'hidden'
      if (props.hide) internalRef.current.style.display = 'none'
   }, [props.hide, props.keep])

   const isInitialized = useOnBeforeFirstPaint(() => {
      if (!internalRef.current) return

      const styles = getComputedStyle(internalRef.current)

      userStyles.current = {
         display: styles.getPropertyValue('display'),
         visibility: styles.getPropertyValue('visibility'),
         hasDisplay: !!internalRef.current.style.display,
         hasVisibility: !!internalRef.current.style.visibility
      }

      if (props.when) {
         // Play animation on mount
         if (props.initial) {
            animation.current = createAnimation(internalRef, keyframes, {
               duration: props.durIn,
               delay: props.delayIn,
               ...props.keyframeOptions
            })
            animation.current.play()
         }
      } else {
         // Hide/unmount child
         reset()
      }
   })

   useIsomorphicLayoutEffect(() => {
      if (isInitialized && props.when && !internalRef.current) {
         setIsDestroyed(false)
      }
   }, [isInitialized, props.when])

   useEffect(() => {
      if (!internalRef.current) return
      if (isDestroyed) return
      if (prevWhen === props.when) return

      if (isInitialized) {
         if (props.when) {
            animation.current.onfinish = null

            internalRef.current.style.visibility = userStyles.current.hasDisplay
               ? userStyles.current.visibility
               : ''

            internalRef.current.style.display = userStyles.current.hasVisibility
               ? userStyles.current.display
               : ''

            if (animation.current.playState === 'running') {
               if (props.reverse) {
                  return animation.current.reverse()
               }
               animation.current.cancel()
            }

            animation.current = createAnimation(internalRef, keyframes, {
               duration: props.durIn,
               delay: props.delayIn,
               composite: 'replace',
               ...keyframeOptions
            })
            animation.current.play()
         } else {
            if (props.reverse && animation.current.playState === 'running') {
               animation.current.onfinish = reset
               return animation.current.reverse()
            }

            animation.current = createAnimation(
               internalRef,
               props.reverse ? keyframes : { opacity: [1, 0] },
               {
                  duration: props.durOut,
                  delay: props.delayOut,
                  composite: 'replace',
                  ...keyframeOptions,
                  direction: props.reverse ? 'reverse' : 'normal'
               }
            )

            animation.current.play()
            animation.current.onfinish = reset
         }
      }
   }, [
      isDestroyed,
      isInitialized,
      reset,
      prevWhen,
      keyframes,
      keyframeOptions,
      props.when,
      props.durIn,
      props.durOut,
      props.delayIn,
      props.delayOut,
      props.reverse,
      props.hide,
      props.keep
   ])

   return isDestroyed
      ? null
      : Children.map(props.children as ReactHTML, (child) => {
           if (typeof child.type === 'string') {
              return cloneElement(child, {
                 ...child.props,
                 ref: (el: HTMLElement) => {
                    ;(internalRef as MutableRef).current = el

                    if (typeof child.ref === 'function') child.ref(el)
                    if (typeof child.ref === 'object' && child.ref !== null) {
                       ;(child.ref as MutableRef).current = el
                    }
                 }
              })
           }

           return createElement('div', { ref: internalRef }, child)
        })[0]
}
