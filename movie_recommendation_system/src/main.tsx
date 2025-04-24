import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import DetailMovie_1 from './components/DetailMovie_1.tsx'
import DetailMovie_2 from './components/DetailMovie_2.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <>
      <div className="mb-10">
        <DetailMovie_1 />
      </div>
      <div className="mt-10">
        <DetailMovie_2 />
      </div>
    </>
  </StrictMode>,
)
