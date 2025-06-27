import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import StoreContextProvider from './context/storeContext'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <StoreContextProvider>
      <App />
    </StoreContextProvider>
  </BrowserRouter>,
)

