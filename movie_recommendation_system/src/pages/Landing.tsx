import Footer from "@/components/footer"
import NavBeforeLogin from "@/components/nav_beforeLogin"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

export default function Landing() {
    const navigate = useNavigate()
    const [bgImage, setBgImage] = useState(1)

    const handleGetStarted = () => {
        navigate("/register")
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setBgImage((prev) => (prev === 4) ? 1 : prev + 1)
        }, 5000)

        return () => clearInterval(interval)
    },[])

    return (
        <>
        <div className="fixed z-1 w-full">
            <NavBeforeLogin />
        </div>

        <div
            className="w-full h-screen bg-cover bg-center flex items-center justify-center transition-all duration-2000"
            style={{
                backgroundImage: `url(/src/assets/backgrounds/land-page-bg${bgImage}.jpg)`
            }}
        >
            <div className="relative flex items-center justify-center">
                <div className="w-full max-w-xl rounded-lg p-6 space-y-4 shadow-lg bg-black/70 backdrop-invert backdrop-opacity-20 text-center text-white flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-bold">Never Lose Your Favorite Contents Again</h1>
                    <p className="text-sm">Ready to Watch? Create Your Account Now</p>
                    <Button 
                        className="bg-red-600 rounded-full px-6 hover:bg-red-500 hover:scale-110 transition-all duration-300 text-lg"
                        onClick={handleGetStarted}   
                    >
                        Get Started</Button>
                    <p className="text-sm">By clicking Sign Up, you are confirming that you are agree with our Privacy Policy</p>
                </div>
            </div>

        </div>

        <div className="w-full bottom-0">
            <Footer />
        </div>
        </>
    )
}