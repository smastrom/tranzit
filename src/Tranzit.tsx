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
   useLayoutEffect,
   type ReactElement
} from 'react'
import { createAnimation, useOnBeforeFirstPaint, mergeTransform, defaultProps } from './utils'
import type { InternalProps, Props, MutableRef, ReactHTML } from './types'

export function Tranzit(tranzitProps: InternalProps & Props): ReactElement | null {
   const props = { ...defaultProps, ...tranzitProps }

   const prevWhen = useDeferredValue(props.when)

   const internalRef = useRef<HTMLDivElement>(null)
   const animation = useRef(createAnimation())
   const userStyles = useRef({ display: '', visibility: '' })

   const [isDestroyed, setIsDestroyed] = useState(false)

   const keyframes = useMemo(
      () => mergeTransform(props.keyframes, props.startX, props.startY),
      [props.keyframes, props.startX, props.startY]
   )

   const reset = useCallback(() => {
      if (!internalRef.current) return

      if (!props.keep && !props.hide) setIsDestroyed(true)

      if (props.keep) internalRef.current.style.visibility = 'hidden'
      if (props.hide) internalRef.current.style.display = 'none'
   }, [props.hide, props.keep])

   const isInitialized = useOnBeforeFirstPaint(() => {
      if (!internalRef.current) return

      userStyles.current = {
         display: getComputedStyle(internalRef.current).getPropertyValue('display'),
         visibility: getComputedStyle(internalRef.current).getPropertyValue('visibility')
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

   useLayoutEffect(() => {
      if (isInitialized && props.when && !internalRef.current) {
         setIsDestroyed(false)
      }
   }, [isInitialized, props.when])

   useEffect(() => {
      if (isDestroyed) return
      if (prevWhen === props.when) return
      if (isInitialized) {
         if (props.when) {
            if (!internalRef.current) return

            animation.current.onfinish = null

            if (props.keep) {
               internalRef.current.style.visibility = userStyles.current.visibility
            }

            if (props.hide) {
               internalRef.current.style.display = userStyles.current.display
            }

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
               ...props.keyframeOptions
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
                  ...props.keyframeOptions,
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
      props.keyframeOptions,
      props.when,
      props.durIn,
      props.durOut,
      props.delayIn,
      props.delayOut,
      props.reverse,
      props.hide,
      props.keep
   ])

   console.count('Render count')

   if (Children.count(props.children) > 1) {
      console.error('Any Tranzit component must have exactly one child.')
      return null
   }

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
