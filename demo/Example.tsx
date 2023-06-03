import React, { useState } from 'react'

export function Example({
   title,
   render
}: {
   title: string
   render: (state: boolean) => React.ReactNode
}) {
   const [show, setShow] = useState(true)

   return (
      <article>
         <div style={headerStyles}>
            <h1>{title}</h1>
            <button style={buttonStyles} onClick={() => setShow((prev) => !prev)}>
               {show ? 'Hide' : 'Show'}
            </button>
         </div>
         <div style={boxStyles}>{render(show)}</div>
      </article>
   )
}

const headerStyles = {
   display: 'flex',
   justifyContent: 'space-between',
   alignItems: 'center',
   marginBottom: '1rem'
}

const boxStyles = {
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   height: '250px',
   borderRadius: '1rem',
   border: '1px solid #42255b',
   background: 'rgb(20, 15, 24)'
}

const buttonStyles = {
   cursor: 'pointer',
   width: '80px',
   padding: '0.5rem 1rem',
   borderRadius: '0.5rem',
   fontWeight: '700',
   border: '1px solid #42255b',
   background: 'none',
   color: 'rgba(255, 255, 255, 0.75)',
   transition: 'all 100ms ease-in-out'
}
