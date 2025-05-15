import User from './pages/User'
import Landing from './pages/Landing'
import './styles/App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import SearchPage from './pages/Search'
import MyMovieList from './pages/MyMovieList'
import WatchTogetherPage from './pages/WatchTogetherPage'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/user" element={<User />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/film" element={<MyMovieList />} />
          <Route path="/watch" element={<WatchTogetherPage />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App