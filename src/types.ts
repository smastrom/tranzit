export interface AnimationRef {
   keyframes: Keyframe[] | PropertyIndexedKeyframes
   keyframeOptions: KeyframeAnimationOptions
}

export interface InternalProps {
   keyframes: AnimationRef['keyframes']
   keyframeOptions: AnimationRef['keyframeOptions']
}

export interface Props {
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
   startY?: number
   startX?: number
}
