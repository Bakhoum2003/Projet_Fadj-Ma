import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/index.css'
import { ToastProvider } from './components/ui/ToastProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode><ToastProvider><App /></ToastProvider></StrictMode>,
)
