import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white">Loading...</div>
    </div>}>
      <App />
    </Suspense>
  </StrictMode>,
)
