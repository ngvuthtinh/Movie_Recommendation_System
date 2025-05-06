import AccountDetails from "@/components/AccountDetails"
import Footer from "@/components/footer"
import NavAfterLogin from "@/components/nav_afterLogin"
import ProfileUser from "@/components/ProfileUser"

export default function User() {
    const user = {
        email: "cutecute.com",
        password: "123456",
        confirmPassword: "123456",
        displayName: "Kawaikute",
        dateOfBirth: "2000-01-01",
        firstName: "Em",
        lastName: "Iu",
        phoneNumber: "123456789",
        avatarUrl: "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcTro2lq3uBs5MMVjrDFJR-nIZJozf-a4R5yuxgxXUSzYcUOZXXa",
        createdDate: "2023-10-01",
        moviesInList: 2,
        moviesWatched: 23,
        moviesWatchedList: ["movie1", "movie2"],
        moviesInListList: ["movie3", "movie4"],
        moviesInListWatched: ["movie5", "movie6"],
    }

    return (
        <div className="bg-black min-h-screen">
            <div className="fixed z-1 w-full top-0">
                <NavAfterLogin/>
            </div>

            <div className="text-white/70 px-40 pb-10 pt-20 items-center space-y-2">
                
                <h1 className="font-bold text-2xl">
                    Your Account
                </h1>

                <h2 className="text-md">Change your information right now</h2>
            </div>

            <div className="flex items-center relative justify-between px-40 pb-10">
                <ProfileUser {...user} />
                <AccountDetails {...user}/>
            </div>

            <Footer/>
        </div>
    )

}