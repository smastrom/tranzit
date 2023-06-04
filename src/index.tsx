import { Tranzit } from './Tranzit'
import type { Props } from './types'

export { Tranzit } from './Tranzit'

export function Fade(props: Props) {
   return (
      <Tranzit
         keyframes={{
            opacity: [0, 1]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Slide(props: Props) {
   return (
      <Tranzit
         keyframes={{
            opacity: [0, 1],
            transform: ['translate3d(-600px, 0, 0)', 'translate3d(0, 0, 0)']
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Bling(props: Props) {
   return (
      <Tranzit
         durIn={800}
         keyframes={{
            opacity: [0, 1],
            transformOrigin: ['50% 50%', '50% 50%'],
            transform: ['scale(1.7, 1.7)', 'scale(1, 1)']
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
         durIn={1000}
         keyframes={{
            opacity: [0, 1, 1],
            transform: [
               'translate3d(0, -50px, 0)',
               'translate3d(0, 20px, 0)',
               'translate3d(0, -15px, 0)',
               'translate3d(0, 10px, 0)',
               'translate3d(0, 0, 0)'
            ],
            offset: [0, 0.6, 0.75, 0.9, 1]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function BounceHorizontal(props: Props) {
   return (
      <Tranzit
         durIn={1000}
         keyframes={{
            opacity: [0, 1, 1],
            transform: [
               'translate3d(-50px, 0, 0)',
               'translate3d(20px, 0, 0)',
               'translate3d(-15px, 0, 0)',
               'translate3d(10px, 0, 0)',
               'translate3d(0, 0, 0)'
            ],
            offset: [0, 0.6, 0.75, 0.9, 1]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Wobble(props: Props) {
   return (
      <Tranzit
         durIn={2400}
         keyframes={{
            opacity: [0, 1],
            transform: [
               'scale(1,1)',
               'scale(1.25,0.75)',
               'scale(0.75,1.25)',
               'scale(1.15,0.85)',
               'scale(0.95,1.05)',
               'scale(1.05,0.95)',
               'scale(1,1)'
            ]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Swash(props: Props) {
   return (
      <Tranzit
         durIn={800}
         keyframes={{
            opacity: [0, 1, 1],
            transformOrigin: ['50% 50%', '50% 50%', '50% 50%'],
            transform: ['scale(0,0)', 'scale(0.9,0.9)', 'scale(1,1)'],
            offset: [0, 0.9, 1]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Flash(props: Props) {
   return (
      <Tranzit
         durIn={2000}
         keyframes={{
            opacity: [1, 0, 1, 0, 1]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Pulse(props: Props) {
   return (
      <Tranzit
         durIn={2000}
         keyframes={{
            opacity: [0, 1],
            transform: [
               'scale3d(1, 1, 1)',
               'scale3d(1.1, 1.1, 1.1)',
               'scale3d(1, 1, 1)',
               'scale3d(1.1, 1.1, 1.1)',
               'scale3d(1, 1, 1)'
            ]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Shake(props: Props) {
   return (
      <Tranzit
         durIn={1800}
         keyframes={{
            opacity: [0, 1],
            transform: [
               'translate3d(0,0,0)',
               'translate3d(0,-1vw,0)',
               'translate3d(0,1vw,0)',
               'translate3d(0,-1vw,0)',
               'translate3d(0,1vw,0)',
               'translate3d(0,-1vw,0)',
               'translate3d(0,1vw,0)',
               'translate3d(0,-1vw,0)',
               'translate3d(0,1vw,0)',
               'translate3d(0,0,0)'
            ]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function ShakeHorizontal(props: Props) {
   return (
      <Tranzit
         durIn={1800}
         keyframes={{
            opacity: [0, 1],
            transform: [
               'translate3d(0,0,0)',
               'translate3d(-1vw,0,0)',
               'translate3d(1vw,0,0)',
               'translate3d(-1vw,0,0)',
               'translate3d(1vw,0,0)',
               'translate3d(-1vw,0,0)',
               'translate3d(1vw,0,0)',
               'translate3d(-1vw,0,0)',
               'translate3d(1vw,0,0)',
               'translate3d(0,0,0)'
            ]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Vibrate(props: Props) {
   return (
      <Tranzit
         durIn={800}
         keyframes={{
            opacity: [0, 1],
            transform: [
               'translate(0)',
               'translate(-2px, 2px)',
               'translate(-2px, -2px)',
               'translate(2px, 2px)',
               'translate(2px, -2px)',
               'translate(0)'
            ]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Swirl(props: Props) {
   return (
      <Tranzit
         durIn={600}
         keyframes={{
            opacity: [0, 1],
            transform: ['rotate(-540deg) scale(0)', 'rotate(0) scale(1)']
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Focus(props: Props) {
   return (
      <Tranzit
         durIn={600}
         keyframes={{
            opacity: [0, 1],
            blur: ['12px', '0px']
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.55, 0.085, 0.68, 0.53)',
            fill: 'both'
         }}
         {...props}
      />
   )
}

export function Flip(props: Props) {
   return (
      <Tranzit
         durIn={800}
         keyframes={{
            opacity: [0, 1],
            transform: [
               'scale(1) rotateX(0)',
               'scale(1.25) rotateX(-90deg)',
               'scale(1) rotateX(-180deg)'
            ]
         }}
         keyframeOptions={{
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'both'
         }}
         {...props}
      />
   )
}
