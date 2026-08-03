import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const DATA_VERSION = 'rode-v1'
if (localStorage.getItem('_rode_version') !== DATA_VERSION) {
  Object.keys(localStorage)
    .filter(k => k.startsWith('rode_'))
    .forEach(k => localStorage.removeItem(k))
  localStorage.setItem('_rode_version', DATA_VERSION)
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
