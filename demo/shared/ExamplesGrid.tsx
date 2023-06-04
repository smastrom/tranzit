import { Example } from './Example'
import {
   Bling,
   Fade,
   Wobble,
   Swash,
   Bounce,
   Flash,
   Pulse,
   Shake,
   Slide,
   Swirl,
   Vibrate,
   Focus,
   BounceHorizontal,
   ShakeHorizontal,
   Flip
} from '../../src'
import { useStore } from '../store'
import { useEffect, useRef } from 'react'

const Circle = () => <div className="Example_circle" />

export function ExamplesGrid() {
   const { reverse, customOrigin, hideType, duration } = useStore()

   const ref = useRef<HTMLDivElement | null>(null)

   const commonProps = (state: boolean) => ({
      when: state,
      reverse,
      keep: hideType === 'keep',
      hide: hideType === 'hide',
      ...(duration === 'Component Default' ? {} : { durIn: duration }),
      ...(customOrigin ?? {})
   })

   useEffect(() => {
      console.log('ref.current', ref.current)
   }, [])

   return (
      <>
         <Example
            title="Fade"
            render={(state) => (
               <Fade {...commonProps(state)}>
                  <Circle />
               </Fade>
            )}
         />
         <Example
            title="Slide"
            render={(state) => (
               <Slide {...commonProps(state)}>
                  <div className="Example_circle" ref={ref} />
               </Slide>
            )}
         />
         <Example
            title="Bling"
            render={(state) => (
               <Bling {...commonProps(state)}>
                  <div className="Example_circle" />
               </Bling>
            )}
         />
         <Example
            title="Bounce"
            render={(state) => (
               <Bounce {...commonProps(state)}>
                  <div className="Example_circle" />
               </Bounce>
            )}
         />
         <Example
            title="BounceHorizontal"
            render={(state) => (
               <BounceHorizontal {...commonProps(state)}>
                  <div className="Example_circle" />
               </BounceHorizontal>
            )}
         />
         <Example
            title="Swash"
            render={(state) => (
               <Swash {...commonProps(state)}>
                  <div className="Example_circle" />
               </Swash>
            )}
         />
         <Example
            title="Pulse"
            render={(state) => (
               <Pulse {...commonProps(state)}>
                  <div className="Example_circle" />
               </Pulse>
            )}
         />
         <Example
            title="Shake"
            render={(state) => (
               <Shake {...commonProps(state)}>
                  <div className="Example_circle" />
               </Shake>
            )}
         />
         <Example
            title="ShakeHorizontal"
            render={(state) => (
               <ShakeHorizontal {...commonProps(state)}>
                  <div className="Example_circle" />
               </ShakeHorizontal>
            )}
         />
         <Example
            title="Wobble"
            render={(state) => (
               <Wobble {...commonProps(state)}>
                  <div className="Example_circle" />
               </Wobble>
            )}
         />
         <Example
            title="Swirl"
            render={(state) => (
               <Swirl {...commonProps(state)}>
                  <div className="Example_circle">Swirl</div>
               </Swirl>
            )}
         />
         <Example
            title="Vibrate"
            render={(state) => (
               <Vibrate {...commonProps(state)}>
                  <div className="Example_circle" />
               </Vibrate>
            )}
         />
         <Example
            title="Focus"
            render={(state) => (
               <Focus {...commonProps(state)}>
                  <div className="Example_circle" />
               </Focus>
            )}
         />
         <Example
            title="Flip"
            render={(state) => (
               <Flip {...commonProps(state)}>
                  <div className="Example_circle" />
               </Flip>
            )}
         />
         <Example
            title="Flash"
            render={(state) => (
               <Flash {...commonProps(state)}>
                  <div className="Example_circle" />
               </Flash>
            )}
         />
      </>
   )
}
