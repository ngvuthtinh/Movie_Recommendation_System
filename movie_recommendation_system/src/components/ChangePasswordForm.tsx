import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangePassword } from "@/types/User";

type ChangePasswordFormProps = {
    onSubmit: (data: ChangePassword) => Promise<void>; 
    onCancel: () => void; 
    isLoading: boolean;
};

export function ChangePasswordForm({ onSubmit, onCancel, isLoading }: ChangePasswordFormProps) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async () => {
        setError("");
        if (!oldPassword || !newPassword || !confirmNewPassword) {
            setError("All fields are required.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            setError("New passwords do not match.");
            return;
        }

        try {
            await onSubmit({ old_password: oldPassword, new_password: newPassword });
            setOldPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
        } catch (err) {
            setError("Failed to change password. Please try again.");
        }
    };

    return (
        <div className="w-full space-y-4">
            <div>
                <Label htmlFor="old-password" className="text-white text-sm mb-1 block">Old Password</Label>
                <Input
                    id="old-password"
                    type="password"
                    placeholder="Current password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    className="text-white bg-zinc-800 rounded-md border-none"
                    disabled={isLoading}
                />
            </div>
            <div>
                <Label htmlFor="new-password" className="text-white text-sm mb-1 block">New Password</Label>
                <Input
                    id="new-password"
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="text-white bg-zinc-800 rounded-md border-none"
                    disabled={isLoading}
                />
            </div>
            <div>
                <Label htmlFor="confirm-password" className="text-white text-sm mb-1 block">Confirm New Password</Label>
                <Input
                    id="confirm-password"
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    className="text-white bg-zinc-800 rounded-md border-none"
                    disabled={isLoading}
                />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <div className="pt-2 space-y-2">
                <Button
                    onClick={handleSubmit}
                    className="bg-red-500 hover:bg-red-900 w-full rounded-md"
                    disabled={isLoading}
                >
                    {isLoading ? "Changing..." : "Change Password"}
                </Button>
                <Button
                    onClick={onCancel}
                    variant="outline"
                    className="bg-transparent border border-gray-600 text-white hover:bg-zinc-700 hover:text-white w-full rounded-md"
                    disabled={isLoading}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}
