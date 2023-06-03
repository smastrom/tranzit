import {
   useRef,
   useState,
   cloneElement,
   Children,
   useEffect,
   useLayoutEffect,
   useCallback,
   type ReactElement,
   createElement,
   useMemo
} from 'react'
import { createAnimation, useOnFirstMount, mergeTransform, defaultProps } from './utils'
import type { InternalProps, Props } from './types'

export function Tranzit(
   tranzitProps: InternalProps & Props = defaultProps
): ReactElement | null {
   const props = { ...defaultProps, ...tranzitProps }

   const internalRef = useRef<HTMLDivElement>(null)
   const animation = useRef(createAnimation())
   const userStyles = useRef({ display: '', visibility: '' })

   const [isDestroyed, setIsDestroyed] = useState(false)

   const keyframes = useMemo(
      () => mergeTransform(props.keyframes, props.startX, props.startY),
      [props.keyframes, props.startX, props.startY]
   )

   // Called on first mount and on leave animation finish
   const initialize = useCallback(() => {
      if (!internalRef.current) return

      userStyles.current.display = getComputedStyle(internalRef.current).display
      userStyles.current.visibility = getComputedStyle(internalRef.current).visibility

      if (props.keep) return internalRef.current.style.setProperty('visibility', 'hidden')
      if (props.hide) return internalRef.current.style.setProperty('display', 'none')

      setIsDestroyed(true)
   }, [props.hide, props.keep])

   const isInitialized = useOnFirstMount(() => {
      if (props.when) {
         // Play animation on mount
         if (props.initial) {
            animation.current = createAnimation(internalRef, keyframes, {
               ...props.keyframeOptions,
               duration: props.durIn,
               delay: props.delayIn
            })
            animation.current.play()
         }
      } else {
         // Hide/unmount child
         initialize()
      }
   })

   // Handles 'when' change to true, called before paint
   useLayoutEffect(() => {
      if (isInitialized && props.when) {
         if (!internalRef.current) {
            // Not using keep/hide, was unmounted on initialization/onFinish -> mount child
            setIsDestroyed(false)
         } else {
            // Restore visibility/display, keep has priority over hide
            if (props.keep)
               return internalRef.current.style.setProperty(
                  'visibility',
                  userStyles.current.visibility
               )
            if (props.hide)
               return internalRef.current.style.setProperty(
                  'display',
                  userStyles.current.display
               )
         }
      }
   }, [isInitialized, props.when, props.hide, props.keep])

   // Handles animations, runs after paint, only if 'child' is mounted
   useEffect(() => {
      if (isDestroyed) return
      if (isInitialized) {
         if (props.when) {
            if (animation.current.playState === 'running') {
               animation.current.onfinish = null

               if (props.reverse) {
                  return animation.current.reverse()
               }

               animation.current.cancel()
            }

            animation.current = createAnimation(internalRef, keyframes, {
               ...props.keyframeOptions,
               duration: props.durIn,
               delay: props.delayIn
            })

            animation.current.play()
         } else {
            if (props.reverse && animation.current.playState === 'running') {
               animation.current.onfinish = initialize
               return animation.current.reverse()
            }

            animation.current = createAnimation(
               internalRef,
               props.reverse ? keyframes : { opacity: [1, 0] },
               {
                  ...props.keyframeOptions,
                  duration: props.durOut,
                  delay: props.delayOut,
                  composite: 'replace',
                  direction: props.reverse ? 'reverse' : 'normal'
               }
            )
            animation.current.play()
            animation.current.onfinish = initialize
         }
      }
   }, [
      isDestroyed,
      isInitialized,
      initialize,
      keyframes,
      props.keyframeOptions,
      props.when,
      props.durIn,
      props.durOut,
      props.delayIn,
      props.delayOut,
      props.reverse
   ])

   if (Children.count(props.children) > 1) {
      console.error('Any Tranzit component must have exactly one child.')
      return null
   }

   return isDestroyed
      ? null
      : Children.map(props.children as ReactElement, (child) => {
           if (typeof child.type === 'string') {
              return cloneElement(child, {
                 ...child.props,
                 ref: internalRef
              })
           }
           return createElement('div', { ref: internalRef }, child)
        })[0]
}
