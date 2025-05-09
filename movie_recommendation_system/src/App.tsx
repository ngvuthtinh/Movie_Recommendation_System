import User from './pages/User'
import Landing from './pages/Landing'
import './styles/App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={<User />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App