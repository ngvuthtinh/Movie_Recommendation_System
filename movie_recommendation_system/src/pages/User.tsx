import AccountDetails from "@/components/AccountDetails"
import Footer from "@/components/Footer"
import NavAfterLogin from "@/components/NavAfterLogin"
import ProfileUser from "@/components/ProfileUser"
import { UserService } from "@/services/User"
import { UserProfile, UserDetails, ChangePassword } from "@/types/User"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function User() {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch user data
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const profile = await UserService.getUserProfile();
                const details = await UserService.getUserDetails();
                setUserProfile(profile);
                setUserDetails(details);
            } catch (err: any) {
                setError(err.message || 'Failed to fetch user data.');
                console.error(err);
                toast.error(err.message || 'Failed to fetch user data.');
            } finally {
                setLoading(false);
            }
        }
        fetchUserData();
    }, []);

    const handleDisplayNameChange = (newDisplayName: string) => {
        if (!userProfile) return;

        try {
            const updatedProfile = { ...userProfile, displayName: newDisplayName };
            UserService.updateUserProfile({ display_name: newDisplayName })
            setUserProfile(updatedProfile);
            setUserDetails(prev => prev ? { ...prev, displayName: updatedProfile.displayName } : null);
            toast.success("Display name updated successfully!");
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Failed to update display name.');
        }
    }

    const handlePasswordChange = async (changePasswordData: ChangePassword) => {
        try {
            await UserService.changePassword(changePasswordData);
            toast.success("Password changed successfully!");
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Failed to change password.');
        }
    }

    const handleAvatarChange = (newAvatar: string) => {
        if (!userProfile) return;

        try {
            const updatedProfile = { ...userProfile, avatarUrl: newAvatar };
            UserService.updateUserProfile({ avatar_url: newAvatar })
            setUserProfile(updatedProfile);
            setUserDetails(prev => prev ? { ...prev, avatarUrl: updatedProfile.avatarUrl } : null);
            toast.success("Avatar updated successfully!");
        } catch (err: any) {
            console.error(err);
            toast.error(err.message || 'Failed to update avatar.');
        }
    }

    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/login'; // Redirect to login page
        toast.success("You have been signed out successfully!");
    }

        if (loading) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center text-white">
                Loading user data...
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center text-red-500">
                {error}
            </div>
        );
    }

    // Render nothing or a message if data is not available after loading
    if (!userProfile || !userDetails) {
        return (
            <div className="bg-black min-h-screen flex items-center justify-center text-white">
                No user data available.
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen">
            <NavAfterLogin />

            <div className="text-white/70 px-40 pb-10 pt-20 items-center space-y-1">
                <h1 className="font-bold text-4xl">Your Account</h1>
                <h2 className="text-sm">Change your information right now</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 px-10 md:px-40 pb-10">
                <div className="flex justify-center lg:justify-start col-span-1">
                    <ProfileUser
                        userProfile={userProfile} // Pass the fetched profile
                        onDisplayNameChange={handleDisplayNameChange}
                        onPasswordChange={handlePasswordChange}
                        onAvatarChange={handleAvatarChange}
                        onSignOut={handleSignOut}
                    />
                </div>
                <div className="flex justify-center lg:justify-end col-span-2">
                    <AccountDetails {...userDetails} /> {/* Pass the fetched details */}
                </div>
            </div>

            <Footer />
        </div>
    );
}