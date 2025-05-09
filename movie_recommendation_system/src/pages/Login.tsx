import LoginForm from "@/components/LoginForm";
import NavBeforeLogin from "@/components/NavBeforeLogin";


export default function Login() {
    return (
        <div className="bg-black min-h-screen">
        
            <NavBeforeLogin />
            

            <div className="bg-[url(/src/assets/backgrounds/LoginBg.png)] h-screen bg-cover bg-center relative flex items-center justify-center">
                {/* <div className="w-full max-w-[500px] p-8 bg-black/70 rounded-xl shadow-lg">
                    <LoginForm />
                </div> */}
                <LoginForm />
            </div>
        </div>
    )
}