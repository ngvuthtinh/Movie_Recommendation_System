import './styles/App.css'
import NavBeforeLogin from "@/components/nav_beforeLogin.tsx";
import NavAfterLogin from "@/components/nav_afterLogin.tsx";
import Footer from "@/components/footer.tsx";

function App() {
  return (
    <>
        <NavBeforeLogin />
        <NavAfterLogin />
        <Footer />
    </>
  )
}

export default App