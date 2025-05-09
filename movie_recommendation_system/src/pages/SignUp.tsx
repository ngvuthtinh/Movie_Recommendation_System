import Footer from "@/components/footer";
import NavBeforeLogin from "@/components/nav_beforeLogin";
import SignupForm from "@/components/SignUpForm";

export default function SignUp() {
    return (
        <div className="bg-black min-h-screen">
            <div className="fixed z-1 w-full top-0">
                <NavBeforeLogin />
            </div>

            <div className="bg-[url(/src/assets/backgrounds/sign-up-bg.jpg)] bg-cover bg-center relative flex items-center justify-center pt-25 pb-10">
                <div className="w-full max-w-[500px] p-9 bg-black/70 rounded-xl shadow-lg">
                    <SignupForm />
                </div>
            </div>
            <Footer/>
        </div>
    )
}