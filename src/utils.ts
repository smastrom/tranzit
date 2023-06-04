import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react'
import type { InternalProps, Props, AnimationRef } from './types'

export function createAnimation(
   ref: RefObject<HTMLElement> = { current: null },
   keyframes: Keyframe[] | PropertyIndexedKeyframes = [],
   options: KeyframeAnimationOptions = {}
) {
   return new Animation(new KeyframeEffect(ref.current, keyframes, options), document.timeline)
}

export function useOnBeforeFirstPaint(fn: () => void) {
   const isMounted = useRef(false)
   const callback = useCallback(fn, [fn])

   useLayoutEffect(() => {
      if (!isMounted.current) {
         callback()
      }
      isMounted.current = true
   }, [callback])

   return isMounted.current
}

export function mergeTranslate(x: number, y: number, transform: string) {
   if ((x === 0 && y === 0) || !transform) return transform

   const tN = `translate(${x}px, ${y}px)`
   const t3d = `translate3d(${x}px, ${y}px, 0)`
   const tX = `translateX(${x}px)`
   const tY = `translateY(${y}px)`

   if (transform.includes('translate(')) return transform.replace(/translate\([^)]+\)/, tN)
   if (transform.includes('translate3d')) return transform.replace(/translate3d\([^)]+\)/, t3d)

   transform = transform.includes('translateX')
      ? transform.replace(/translateX\([^)]+\)/, tX)
      : `${transform} ${tX}`

   transform = transform.includes('translateY')
      ? transform.replace(/translateX\([^)]+\)/, tY)
      : `${transform} ${tY}`

   return transform
}

export function mergeTransform(keyframes: AnimationRef['keyframes'], x: number, y: number) {
   if (Array.isArray(keyframes)) {
      const kf = [...keyframes]

      if ('transform' in kf[0]) {
         kf[0].transform = mergeTranslate(x, y, `${kf[0].transform}`)
      } else {
         if (x !== 0 || y !== 0) {
            kf[0] = { ...kf[0], transform: `translate(${x}px, ${y}px)` }
            kf[kf.length - 1] = { ...kf[kf.length - 1], transform: 'translate(0, 0)' }
         }
      }
      return kf
   }

   // Indexed-property keyframes
   if (typeof keyframes === 'object') {
      const kf = { ...keyframes }

      if (Array.isArray(kf.transform)) {
         kf.transform[0] = mergeTranslate(x, y, `${kf.transform[0] ?? ''}`)
      } else if (!('transform' in kf)) {
         if (x !== 0 || y !== 0) {
            kf.transform = [`translate(${x}px, ${y}px)`, 'translate(0, 0)']
         }
      }
      return kf
   }

   return keyframes
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
   durOut: 500,
   delayIn: 0,
   delayOut: 0,
   startY: 0,
   startX: 0
}
