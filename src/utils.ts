import { useCallback, useLayoutEffect, useRef, type RefObject } from 'react'
import type { InternalProps, Props, AnimationRef } from './types'

export function createAnimation(
   ref: RefObject<HTMLElement> = { current: null },
   keyframes: Keyframe[] | PropertyIndexedKeyframes = [],
   options: KeyframeAnimationOptions = {}
) {
   return new Animation(new KeyframeEffect(ref.current, keyframes, options), document.timeline)
}

export function useOnBeforeFirstPaint(callback: () => void) {
   const isMounted = useRef(false)
   const _callback = useCallback(callback, [callback])

   useLayoutEffect(() => {
      if (!isMounted.current) {
         _callback()
      }
      isMounted.current = true
   }, [_callback])

   return isMounted.current
}

const replace = (str: string, value = '') => str.replace(/translate\([^)]+\)/, value)
const replace3d = (str: string, value = '') => str.replace(/translate3d\([^)]+\)/, value)
const replaceX = (str: string, value = '') => str.replace(/translateX\([^)]+\)/, value)
const replaceY = (str: string, value = '') => str.replace(/translateY\([^)]+\)/, value)

export function mergeTranslate(x: number, y: number, transform: string) {
   if (x === 0 && y === 0) return transform

   const translate = `translate(${x}px, ${y}px)`
   const translate3d = `translate3d(${x}px, ${y}px, 0)`
   const translateX = `translateX(${x}px)`
   const translateY = `translateY(${y}px)`

   if (transform.includes('translate(')) {
      transform = replace(transform, translate)
      transform = replace3d(transform)
      transform = replaceX(transform)
      transform = replaceY(transform)
      return transform
   }

   if (transform.includes('translate3d')) {
      transform = replace3d(transform, translate3d)
      transform = replace(transform)
      transform = replaceX(transform)
      transform = replaceY(transform)
      return transform
   }

   transform = transform.includes('translateX')
      ? replaceX(transform, translateX)
      : `${transform} ${translateX}`

   transform = transform.includes('translateY')
      ? replaceY(transform, translateY)
      : `${transform} ${translateY}`

   transform = replace(transform)
   transform = replace3d(transform)

   return transform
}

export function mergeTransform(keyframes: AnimationRef['keyframes'], x: number, y: number) {
   if (Array.isArray(keyframes)) {
      const _keyframes = [...keyframes]

      if ('transform' in _keyframes[0]) {
         _keyframes[0].transform = mergeTranslate(x, y, `${_keyframes[0].transform ?? ''}`)
      } else {
         if (x !== 0 || y !== 0) {
            _keyframes.unshift({ transform: mergeTranslate(x, y, '') })
            _keyframes.push({ transform: 'translateX(0) translateY(0)' })
         }
      }
      return _keyframes
   }

   if (typeof keyframes === 'object') {
      const _keyframes = { ...keyframes }

      if (Array.isArray(_keyframes.transform)) {
         _keyframes.transform[0] = mergeTranslate(x, y, `${_keyframes.transform[0] ?? ''}`)
      } else if (!('transform' in _keyframes)) {
         if (x !== 0 || y !== 0) {
            _keyframes.transform = [mergeTranslate(x, y, ''), 'translateX(0) translateY(0)']
         }
      }
      return _keyframes
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
