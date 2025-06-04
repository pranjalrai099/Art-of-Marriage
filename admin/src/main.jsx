import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdminContextProvider, { AdminContext } from './context/AdminContext.jsx'
import AppContextProvider from './context/AppContext.jsx'
import VendorContextProvider ,{VendorContext} from './context/VendorContext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AdminContextProvider>
    <VendorContextProvider>
      <AppContextProvider>
      <App />
      </AppContextProvider>
    </VendorContextProvider>
  </AdminContextProvider>
    
  </BrowserRouter>,
)
