import AccountDetails from "@/components/AccountDetails"
import Footer from "@/components/Footer"
import NavAfterLogin from "@/components/NavAfterLogin"
import ProfileUser from "@/components/ProfileUser"
import { useState } from "react"

export default function User() {
    const [userDetails, setUserDetails] = useState({
        firstName: "Anh Tuan",
        lastName: "Ha", 
        displayName: "Ha Anh Tuan",
        email: "hatuan@gmail.com",
        dateOfBirth: "2000-01-01",
        phoneNumber: "123456789",
        password: "123456",
    });

    const userProfile = {
        avatarUrl: "https://cdn2.tuoitre.vn/471584752817336320/2025/3/10/3-1741601671995302840220.jpg",
        displayName: userDetails.displayName,
        createdDate: "2023-10-01", 
        moviesInList: 2,
        moviesWatched: 23,
    }

    const handleDisplayNameChange = (newDisplayName: string) => {
        setUserDetails(prev => ({
            ...prev,
            displayName: newDisplayName
        }));
    }

    return (
        <div className="bg-black min-h-screen">
            <NavAfterLogin/>
            
            <div className="text-white/70 px-40 pb-10 pt-20 items-center space-y-1">
                <h1 className="font-bold text-4xl">
                    Your Account
                </h1>
                <h2 className="text-sm">Change your information right now</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-10 md:px-40 pb-10">
                <div className="flex justify-center lg:justify-start col-span-1">
                    <ProfileUser {...userProfile} onDisplayNameChange={handleDisplayNameChange} />
                </div>
                <div className="flex justify-center lg:justify-end col-span-2">
                    <AccountDetails {...userDetails}/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}