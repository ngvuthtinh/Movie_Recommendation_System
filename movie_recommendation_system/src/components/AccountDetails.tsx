import { UserDetails } from "@/types/user-details";


export default function AccountDetails(userDetails: UserDetails) {
    return (
        <div className="text-white text-lg p-10 px-15 rounded-2xl w-full max-w-180  space-y-10 shadow-lg bg-[#161616]">
            <div className="flex justify-between">
                <p className="font-bold">Name</p>
                <p className="">{userDetails.firstName} {userDetails.lastName}</p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">Display Name</p>
                <p className="">{userDetails.displayName}</p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">Email</p>
                <p className="">{userDetails.email}</p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">Date of Birth</p>
                <p className="">{userDetails.dateOfBirth}</p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">Phone Number</p>
                <p className="">{userDetails.phoneNumber}</p>
            </div>

            <div className="flex justify-between">
                <p className="font-bold">Password</p>
                <p className="">{userDetails.password}</p>
            </div>
        </div>
    )
}