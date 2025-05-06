import AccountDetails from "@/components/AccountDetails"
import Footer from "@/components/footer"
import NavAfterLogin from "@/components/nav_afterLogin"
import ProfileUser from "@/components/ProfileUser"

export default function User() {
    const user = {
        email: "abcd@gmail.com",
        password: "123456",
        confirmPassword: "123456",
        displayName: "Ha Anh Tuan",
        dateOfBirth: "2000-01-01",
        firstName: "Anh Tuan",
        lastName: "Ha",
        phoneNumber: "123456789",
        avatarUrl: "https://cdn2.tuoitre.vn/471584752817336320/2025/3/10/3-1741601671995302840220.jpg",
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

            <div className="text-white/70 px-40 pb-10 pt-20 items-center space-y-1">
                <h1 className="font-bold text-4xl">
                    Your Account
                </h1>
                <h2 className="text-sm">Change your information right now</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-10 md:px-40 pb-10">
                <div className="flex justify-center lg:justify-start col-span-1">
                    <ProfileUser {...user} />
                </div>
                <div className="flex justify-center lg:justify-end col-span-2">
                    <AccountDetails {...user}/>
                </div>
            </div>

            <Footer/>
        </div>
    )
}