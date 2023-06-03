import { useEffect, useRef, useState } from 'react'
import { Fade } from '../src'

export function App() {
   const [show, setShow] = useState(false)

   const ref = useRef<HTMLDivElement>(null)

   useEffect(() => {
      console.log('App.tsx', ref)
   }, [])

   return (
      <div>
         <button
            onClick={() => setShow((prev) => !prev)}
            style={{
               position: 'fixed',
               top: '1rem',
               right: '1rem'
            }}
         >
            Toggle
         </button>
         <Fade when={show} startY={-600} reverse initial>
            <div ref={ref} style={circleStyles}>
               Buonasera
            </div>
         </Fade>
      </div>
   )
}

const circleStyles = {
   backgroundColor: 'red',
   padding: '2rem',
   borderRadius: '999px',
   aspectRatio: 1,
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   marginBlockStart: '2rem'
}
