import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/Authcontext.jsx'
import { ThemeProvider } from './context/Themecontext.jsx'
import { Toaster } from 'sonner'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <App />
        <Toaster position='top-right' closeButton />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
