import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import DetailMovie_1 from './components/DetailMovie_1.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DetailMovie_1 />
  </StrictMode>,
)
