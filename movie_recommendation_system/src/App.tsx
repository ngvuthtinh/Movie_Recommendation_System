import User from './pages/User'
import Landing from './pages/Landing'
import './styles/App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <User/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App