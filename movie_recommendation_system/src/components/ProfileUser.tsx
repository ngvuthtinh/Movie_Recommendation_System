import { useEffect, useState } from "react";
import { ProfileUserProps, ChangePassword } from "@/types/User";
import { Img } from "react-image";
import { LuPencil } from "react-icons/lu";
import { ChangeAvatar } from "@/components/ChangeAvatar";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { ChangePasswordForm } from "@/components/ChangePasswordForm";

export default function ProfileUser({
    onDisplayNameChange,
    onPasswordChange,
    onAvatarChange,
    onSignOut,
    userProfile,
}: ProfileUserProps) {
    const [showChangeAvatar, setShowChangeAvatar] = useState(false);
    const [showChangePassword, setShowChangePassword] = useState(false);
    const [animatePasswordModal, setAnimatePasswordModal] = useState(false);
    const [isEditingName, setEditingName] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [nameInput, setNameInput] = useState(userProfile.displayName);

    useEffect(() => {
        setNameInput(userProfile.displayName);
    }, [userProfile.displayName]);

    const handleSaveDisplayName = () => {
        setEditingName(false);
        if (nameInput !== userProfile.displayName) {
            onDisplayNameChange(nameInput);
        }
    };

    const handlePasswordSubmit = async (changePasswordData: ChangePassword) => {
        setIsChangingPassword(true);
        try {
            await onPasswordChange(changePasswordData);
            setShowChangePassword(false);
        } finally {
            setIsChangingPassword(false);
        }
    };

    const openChangePassword = () => {
        setShowChangePassword(true);
        setTimeout(() => setAnimatePasswordModal(true), 10); // delay nhỏ để kích hoạt animation
    };

    const closeChangePassword = () => {
        setAnimatePasswordModal(false);
        setTimeout(() => setShowChangePassword(false), 200);
    };

    return (
        <div className="text-white p-6 rounded-2xl w-full max-w-sm space-y-3 shadow-lg bg-[#161616]">
            <div className="relative">
                <Img
                    src={userProfile.avatarUrl}
                    alt="avatar"
                    className="rounded-md object-cover w-full h-48"
                    loader={<div className="text-gray-500 p-4">Loading...</div>}
                    unloader={<div className="text-gray-500 p-4">Error loading image</div>}
                />
                <button
                    className="absolute top-2 right-2 bg-black/40 hover:bg-gray-800 text-white p-1 rounded-full transform transition duration-200 ease-in-out hover:scale-105"
                    onClick={() => setShowChangeAvatar(true)}
                >
                    <LuPencil size={20} />
                </button>
            </div>

            {showChangeAvatar && (
                <ChangeAvatar
                    userProfile={userProfile}
                    onAvatarChange={onAvatarChange}
                    onClose={() => setShowChangeAvatar(false)}
                />
            )}

            <div className="relative text-lg font-bold">
                {isEditingName ? (
                    <Input
                        autoFocus
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                        onBlur={handleSaveDisplayName}
                        onKeyDown={(e) => { if (e.key === "Enter") handleSaveDisplayName() }}
                        className="bg-zinc-800 text-white border-none"
                    />
                ) : (
                    <>
                        {userProfile.displayName}
                        <button
                            className="absolute right-2 bg-black/40 hover:bg-gray-800 text-white p-1 rounded-full transform transition duration-200 ease-in-out hover:scale-105"
                            onClick={() => setEditingName(true)}
                        >
                            <LuPencil size={20} />
                        </button>
                    </>
                )}
            </div>

            <p className="text-md text-gray-400">
                Created since {new Date(userProfile.createdDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>

            <div className="text-md pr-3 text-white">
                <div className="flex justify-between">
                    <p>List</p>
                    <p>{userProfile.moviesInList}</p>
                </div>
            </div>

            <p className="text-md text-gray-400">Viewing Activities</p>

            <div className="text-md pr-3 text-white">
                <div className="flex justify-between">
                    <p>Watched</p>
                    <p>{userProfile.moviesWatched}</p>
                </div>
            </div>

            <div className="flex justify-between">
                <Button
                    className="w-1/3 bg-red-500 rounded-lg text-white hover:bg-red-900"
                    onClick={onSignOut}
                >
                    Sign Out
                </Button>

                <Button
                    className="w-3/5 bg-[#1d1f37] rounded-lg text-white hover:bg-[#292d5a]"
                    onClick={openChangePassword}
                >
                    Change Password
                </Button>
            </div>

            {/* Custom Modal cho Change Password */}
            {showChangePassword && (
                <div className={`h-screen fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-200 ${animatePasswordModal ? "opacity-100" : "opacity-0"}`}>
                    <div className={`pt-4 px-6 pb-6 rounded-md bg-[#161616] shadow-md w-full max-w-sm transition-all duration-200 ${animatePasswordModal ? "scale-100" : "scale-90"}`}>
                        <div className="text-white">
                            <h2 className="text-xl font-bold mb-4">Change Password</h2>
                            <p className="text-sm text-gray-400 mb-4">Enter your old and new password to update your account.</p>
                        </div>

                        <ChangePasswordForm
                            onSubmit={handlePasswordSubmit}
                            onCancel={closeChangePassword}
                            isLoading={isChangingPassword}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
