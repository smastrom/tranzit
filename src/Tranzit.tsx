import {
   useRef,
   useState,
   cloneElement,
   Children,
   useEffect,
   useLayoutEffect,
   useCallback,
   type ReactElement
} from 'react'
import { createAnimation, useOnFirstMount, mergeTransform, defaultProps } from './utils'
import type { InternalProps, Props, MRef } from './types'

export function Tranzit(
   tranzitProps: InternalProps & Props = defaultProps
): ReactElement | null {
   const props = { ...defaultProps, ...tranzitProps }

   const internalRef = useRef<HTMLDivElement>(null)
   const animation = useRef(createAnimation())
   const userStyles = useRef({ display: '', visibility: '' })

   const [isDestroyed, setIsDestroyed] = useState(false)

   const initialize = useCallback(() => {
      if (!internalRef.current) return

      userStyles.current.display = getComputedStyle(internalRef.current).display
      userStyles.current.visibility = getComputedStyle(internalRef.current).visibility

      if (props.keep) return internalRef.current.style.setProperty('visibility', 'hidden')
      if (props.hide) return internalRef.current.style.setProperty('display', 'none')

      setIsDestroyed(true)
   }, [props.hide, props.keep])

   const isMounted = useOnFirstMount(() => {
      if (props.when) {
         if (props.initial) {
            animation.current = createAnimation(
               internalRef,
               mergeTransform(props.keyframes, props.startX, props.startY),
               {
                  ...props.keyframeOptions,
                  duration: props.durIn,
                  delay: props.delayIn
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
         if (!internalRef.current) {
            setIsDestroyed(false)
         } else {
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
               internalRef,
               mergeTransform(props.keyframes, props.startX, props.startY),
               { ...props.keyframeOptions, duration: props.durIn, delay: props.delayIn }
            )
            animation.current.play()
         } else {
            if (props.reverse && animation.current.playState === 'running') {
               animation.current.onfinish = initialize
               return animation.current.reverse()
            }

            animation.current = createAnimation(
               internalRef,
               props.reverse
                  ? mergeTransform(props.keyframes, props.startX, props.startY)
                  : { opacity: [1, 0] },
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
      props.startX,
      props.startY
   ])

   if (Children.count(props.children) > 1) {
      console.error('Any Tranzit component must have exactly one child.')
      return null
   }

   return isDestroyed
      ? null
      : Children.map(props.children as ReactElement, (child) => {
           return cloneElement(child, {
              ...(child.props ?? {}),
              ref: (_ref: HTMLElement) => {
                 if ('ref' in child && 'current' in (child.ref as MRef)) {
                    ;(child.ref as MRef).current = _ref
                 }
                 ;(internalRef as MRef).current = _ref
              }
           })
        })[0]
}
