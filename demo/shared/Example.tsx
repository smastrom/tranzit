import { useState } from 'react'
import { useStore } from '../store'

export function Example({
   title,
   render
}: {
   title: string
   render: (state: boolean) => React.ReactNode
}) {
   const [show, setShow] = useState(true)
   const { setLastPlayed } = useStore()

   return (
      <section>
         <div className="Example_header">
            <h1>{title}</h1>
            <button
               className="Example_button"
               onClick={() => {
                  setShow((prev) => !prev)
                  setLastPlayed(title)
               }}
            >
               {show ? 'Leave' : 'Enter'}
            </button>
         </div>
         <div className="Example_container">{render(show)}</div>
      </section>
   )
}
