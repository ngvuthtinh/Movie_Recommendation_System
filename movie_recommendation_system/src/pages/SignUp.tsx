import NavBeforeLogin from "@/components/NavBeforeLogin";
import SignupForm from "@/components/SignUpForm";

export default function SignUp() {
    return (
        <div className="bg-black min-h-screen">
                <NavBeforeLogin />
    
            <div className="h-screen bg-[url(/src/assets/backgrounds/SignUpBg.jpg)] bg-cover bg-center relative flex items-center justify-center pt-25 pb-10">
                <div className="w-full max-w-[500px] p-9 bg-black/70 rounded-xl shadow-lg">
                    <SignupForm />
                </div>
            </div>
        </div>
    )
}