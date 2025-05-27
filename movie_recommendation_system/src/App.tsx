import User from './pages/User'
import Landing from './pages/Landing'
import './styles/App.css'
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import HomePage from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import SearchPage from './pages/Search'
import MyMovieList from './pages/MyMovieList'
import WatchTogether from './pages/WatchTogether.tsx'
import ProtectedRoute from './routes/ProtectedRoutes.tsx'
import FilmPage from './pages/FilmPage.tsx'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<SignUp />} />
          <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <User />
                </ProtectedRoute>
              }
          />
          <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
          />
          <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <SearchPage />
                </ProtectedRoute>
              }
          />
          <Route
              path="/my-list"
              element={
                <ProtectedRoute>
                  <MyMovieList />
                </ProtectedRoute>
              }
          />
          <Route
              path="/watch"
              element={
                <ProtectedRoute>
                  <WatchTogether />
                </ProtectedRoute>
              }
          />
          <Route
              path="/film/"
              element={
                <ProtectedRoute>
                  <FilmPage />
                </ProtectedRoute>
              }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App