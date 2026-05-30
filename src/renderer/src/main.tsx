import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { GeneralUserDataContextProvider } from './Contexts/GeneralUserDataContext'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GeneralUserDataContextProvider>
      <App />
    </GeneralUserDataContextProvider>
  </StrictMode>
)
