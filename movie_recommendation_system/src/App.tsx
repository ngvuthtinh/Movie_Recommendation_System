import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import ProfileUser from './components/ProfileUser'
import './styles/App.css'
import AccountDetails from './components/AccountDetails'

function App() {

  // For testing AccountDetails component
  const userDetails = {
    email: "shelby@gmail.com",
    password: "dua50diroitaonoicho",
    confirmPassword: "cho50diroitaonoicho",
    displayName: "Tommy",
    dateOfBirth: "25/05/1890",
    firstName: "Thomas",
    lastName: "Shelby",
    phoneNumber: "+84 838 198 653",
    avatarUrl: 'https://i.tribune.com.pk/media/images/tommy-shelby-cillian-murphy-peaky-blinders-15692341717571152-0/tommy-shelby-cillian-murphy-peaky-blinders-15692341717571152-0.jpg',
    createdDate: '2023-01-01',
    moviesInList: 5,
    moviesWatched: 10,
    moviesWatchedList: ['movie1', 'movie2', 'movie3'],
    moviesInListList: ['movie4', 'movie5'],
    moviesInListWatched: ['movie6', 'movie7']
  }

  return (
    <>
      <LoginForm/>
      <SignUpForm/>
      <div className='flex justify-between p-40'>
        <ProfileUser {...userDetails} />
        <AccountDetails {...userDetails} />
      </div>
      
    </>
  )
}

export default App