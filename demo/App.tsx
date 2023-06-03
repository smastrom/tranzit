import { useState } from 'react'
import { Fade } from '../src'

export function App() {
   const [show, setShow] = useState(false)

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
            <div style={circleStyles}>Buonasera</div>
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
