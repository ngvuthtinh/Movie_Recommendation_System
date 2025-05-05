import Login from './pages/Login'
import './styles/App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App