import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'

import './assets/index.css'
import './assets/prism.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
)
