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
import FilmPage from './pages/FilmPage.tsx'
import ProtectedRoutes from "./routes/ProtectedRoutes.tsx";

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
                <ProtectedRoutes>
                  <User />
                </ProtectedRoutes>
              }
          />
          <Route
              path="/home"
              element={
                <ProtectedRoutes>
                  <HomePage />
                </ProtectedRoutes>
              }
          />
          <Route
              path="/search"
              element={
                <ProtectedRoutes>
                  <SearchPage />
                </ProtectedRoutes>
              }
          />
          <Route
              path="/my-list"
              element={
                <ProtectedRoutes>
                  <MyMovieList />
                </ProtectedRoutes>
              }
          />
          <Route
              path="/film/:id"
              element={
                <ProtectedRoutes>
                  <FilmPage />
                </ProtectedRoutes>
              }
          />
          <Route
              path="/watch/:id"
              element={
                <ProtectedRoutes>
                    <WatchTogether />
                </ProtectedRoutes>
              }
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App