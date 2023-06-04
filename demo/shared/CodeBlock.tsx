import { useLayoutEffect, useRef, useState } from 'react'
import { useStore } from '../store'
import { highlightAll } from 'prismjs'
import 'prismjs/components/prism-jsx'

export function CodeBlock() {
   const { reverse, customOrigin, hideType, duration, lastPlayed } = useStore()
   const codeRef = useRef<HTMLPreElement>(null)
   const [isCopied, setIsCopied] = useState(false)

   useLayoutEffect(highlightAll, [reverse, customOrigin, hideType, duration, lastPlayed])

   function copyCode() {
      navigator.clipboard.writeText(
         codeRef.current?.textContent?.replace(/\/\/.*/g, '').trimEnd() || ''
      )
      setIsCopied(true)
      setTimeout(() => {
         setIsCopied(false)
      }, 2000)
   }

   return (
      <>
         <pre className="CodeBlock_container">
            <button className="CodeBlock_copy-button" onClick={copyCode}>
               {isCopied ? 'Copied!' : 'Copy'}
            </button>
            <code className="language-jsx" ref={codeRef}>
               {`import { useState } from 'react'
import { ${lastPlayed} } from 'tranzit'
 
export function MyComponent() {
  const [isVisibile, setIsVisible] = useState(false)
 
  return (
    <>
     <button onClick={() => setShow((prev) => !prev)}>Toggle</button>
     <${lastPlayed} when={show}${reverse ? ' reverse' : ''}${
                  hideType === 'keep' ? ' keep' : hideType === 'hide' ? ' hide' : ''
               }${
                  customOrigin !== null
                     ? ` ${
                          customOrigin.startX !== 0
                             ? `startX={${customOrigin.startX}}`
                             : customOrigin.startY !== 0
                             ? `startY={${customOrigin.startY}}`
                             : ''
                       }`
                     : ''
               }${duration !== 'Component Default' ? ` durIn={${duration}}` : ''}>
         <div style={{ width: 100, height: 100, background: 'purple' }} />
     </${lastPlayed}>
    </>
  )
}

// Made by @smastrom - https://github.com/smastrom
`}
            </code>
         </pre>
      </>
   )
}
