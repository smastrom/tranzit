import {
   useRef,
   useState,
   cloneElement,
   Children,
   useEffect,
   useLayoutEffect,
   useCallback
} from 'react'
import { createAnimation, useOnFirstMount, mergeKeyframes, defaultProps } from './utils'
import type { InternalProps, Props } from './types'

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
               mergeKeyframes(props.keyframes, props.startX, props.startY),
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
               mergeKeyframes(props.keyframes, props.startX, props.startY),
               { ...props.keyframeOptions, duration: props.durIn, delay: props.delayIn }
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
                  ? mergeKeyframes(props.keyframes, props.startX, props.startY)
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
