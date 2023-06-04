import type { ReactElement, MutableRefObject, ReactHTMLElement } from 'react'

export interface AnimationRef {
   keyframes: Keyframe[] | PropertyIndexedKeyframes
   keyframeOptions: KeyframeAnimationOptions
}

export interface InternalProps {
   keyframes: AnimationRef['keyframes']
   keyframeOptions: AnimationRef['keyframeOptions']
}

export interface Props {
   when: boolean | string | number | null | undefined
   children: ReactElement | null
   reverse?: boolean
   initial?: boolean
   hide?: boolean
   keep?: boolean
   durIn?: number
   durOut?: number
   delayIn?: number
   delayOut?: number
   startY?: number
   startX?: number
}

export type ReactHTML = ReactHTMLElement<HTMLElement>
export type MutableRef = MutableRefObject<HTMLElement>
