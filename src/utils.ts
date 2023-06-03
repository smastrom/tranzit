import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react'
import type { InternalProps, Props, AnimationRef } from './types'

export function createAnimation(
   ref: RefObject<HTMLElement> = { current: null },
   keyframes: Keyframe[] | PropertyIndexedKeyframes = [],
   options: KeyframeAnimationOptions = {}
) {
   return new Animation(new KeyframeEffect(ref.current, keyframes, options), document.timeline)
}

export function useOnFirstMount(_callback: () => void) {
   const isInitial = useRef(true)
   const callback = useCallback(_callback, [_callback])

   useLayoutEffect(() => {
      if (isInitial.current) {
         callback()
      }
      isInitial.current = false
   }, [callback])

   return !isInitial.current
}

export function mergeTranslate(x: number, y: number, transform: string) {
   const translateX = `translateX(${x}px)`
   const translateY = `translateY(${y}px)`

   transform = transform.includes('translateX')
      ? transform.replace(/translateX\(\d+px\)/, translateX)
      : `${transform} ${translateX}`

   transform = transform.includes('translateY')
      ? transform.replace(/translateY\(\d+px\)/, translateY)
      : `${transform} ${translateY}`

   return transform
}

export function mergeTransform(_keyframes: AnimationRef['keyframes'], x: number, y: number) {
   if (Array.isArray(_keyframes)) {
      const keyframes = [..._keyframes]
      keyframes[0].transform = mergeTranslate(x, y, `${keyframes[0].transform ?? ''}`)

      return keyframes
   }

   if (typeof _keyframes === 'object') {
      const keyframes = { ..._keyframes }

      if (Array.isArray(keyframes.transform)) {
         keyframes.transform[0] = mergeTranslate(x, y, `${keyframes.transform[0] ?? ''}`)
      } else if (!('transform' in _keyframes)) {
         keyframes.transform = [mergeTranslate(x, y, '')]
      }

      return keyframes
   }

   return _keyframes
}

export const defaultProps: Required<InternalProps & Props> = {
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
   startY: 0,
   startX: 0
}
