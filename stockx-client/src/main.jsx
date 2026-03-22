import { TradingProvider } from "./context/TradingContext";
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TradingProvider>
    <App />
    <Toaster position="top-right" />
    </TradingProvider>
  </StrictMode>
)

