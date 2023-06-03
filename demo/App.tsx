import { Example } from './Example'
import { Bling, Fade, Wobble, Swash, Bounce, Flash, Pulse, Shake, Slide } from '../src'

const Circle = () => <div style={circleStyles} />

export function App() {
   return (
      <>
         <Example
            title="Fade"
            render={(state) => (
               <Fade when={state}>
                  <Circle />
               </Fade>
            )}
         />
         <Example
            title="Slide"
            render={(state) => (
               <Slide when={state}>
                  <div style={circleStyles} />
               </Slide>
            )}
         />
         <Example
            title="Bling"
            render={(state) => (
               <Bling when={state}>
                  <div style={circleStyles} />
               </Bling>
            )}
         />
         <Example
            title="Bounce"
            render={(state) => (
               <Bounce when={state}>
                  <div style={circleStyles} />
               </Bounce>
            )}
         />
         <Example
            title="Swash"
            render={(state) => (
               <Swash when={state}>
                  <div style={circleStyles} />
               </Swash>
            )}
         />

         <Example
            title="Flash"
            render={(state) => (
               <Flash when={state}>
                  <div style={circleStyles} />
               </Flash>
            )}
         />
         <Example
            title="Pulse"
            render={(state) => (
               <Pulse when={state}>
                  <div style={circleStyles} />
               </Pulse>
            )}
         />
         <Example
            title="Shake"
            render={(state) => (
               <Shake when={state}>
                  <div style={circleStyles} />
               </Shake>
            )}
         />
         <Example
            title="Wobble"
            render={(state) => (
               <Wobble when={state}>
                  <div style={circleStyles} />
               </Wobble>
            )}
         />
      </>
   )
}

const circleStyles = {
   backgroundColor: 'red',
   padding: '2rem',
   borderRadius: '999px',
   aspectRatio: 1,
   width: '120px',
   height: '120px',
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   border: '2px solid #b34fff',
   background: 'linear-gradient(to right, #E100FF, #7F00FF)'
}
