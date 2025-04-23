import LoginForm from './components/LoginForm'
import SignUpForm from './components/SignUpForm'
import ProfileUser from './components/ProfileUser'
import './styles/App.css'

function App() {
  // For testing ProfileUser component
  const user = {
    avatar_url: 'https://scontent.fsgn5-9.fna.fbcdn.net/v/t39.30808-6/492226301_1195786458881359_720097839082290000_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEnbdjenKPDWB_d7VwiAEJKVZ8Pbpor2YhVnw9umivZiKC1C-jbEgYTycgV542CNVtbekXPOJ0ekcTbYhF4KgQ6&_nc_ohc=3zKPv3ZYUpMQ7kNvwEts-ir&_nc_oc=Adm_vPRVB45zWdHjhF8k28-M85BRvOif31zyvE0EDXyhX6xkve2SeZeTFCifePWKkQc&_nc_zt=23&_nc_ht=scontent.fsgn5-9.fna&_nc_gid=O0d7AL2AxpYgK9cX7nDVrA&oh=00_AfEuKaXNABamozsOTSm_hTCdo4Usqs-ndFiK2vVMV2hmjw&oe=680D9A33',
    display_name: 'Kawaikute Gomen',
    created_date: '2023-01-01',
    movies_in_list: 5,
    movies_watched: 10,
  }

  return (
    <>
      <LoginForm/>
      <SignUpForm/>
      <ProfileUser {...user} />
    </>
  )
}

export default App