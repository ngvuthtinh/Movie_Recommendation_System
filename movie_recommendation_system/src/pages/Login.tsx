import Footer from "@/components/footer";
import LoginForm from "@/components/LoginForm";
import NavBeforeLogin from "@/components/nav_beforeLogin";


export default function Login() {
    return (
        <div className="bg-black min-h-screen">
            <div className="fixed z-1 w-full top-0">
                <NavBeforeLogin />
            </div>

            <div className="bg-[url(/src/assets/backgrounds/login-bg.png)] bg-cover bg-center relative flex items-center justify-center pt-25 pb-10">
                <div className="w-full max-w-[500px] p-8 bg-black/70 rounded-xl shadow-lg">
                    <LoginForm />
                </div>
            </div>
            <Footer/>
        </div>
    )
}