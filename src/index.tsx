import { Tranzit } from './Tranzit'
import type { Props } from './types'

export { Tranzit } from './Tranzit'

export function Fade(props: Props) {
   return (
      <Tranzit
         keyframes={{
            opacity: [0, 1],
            transformOrigin: ['50% 50%', '50% 50%'],
            transform: ['scale(2,2)', 'scale(1,1)']
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Bounce(props: Props) {
   return (
      <Tranzit
         keyframes={{
            opacity: [0, 1],
            transformOrigin: ['50% 50%', '50% 50%'],
            transform: ['scale(2,2)', 'scale(1,1)']
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}
