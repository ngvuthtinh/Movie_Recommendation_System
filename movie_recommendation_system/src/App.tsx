import SignUp from './pages/SignUp'
import './styles/App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App