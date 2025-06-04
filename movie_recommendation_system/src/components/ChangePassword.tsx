import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserService } from "@/services/User";

type ChangePasswordModalProps = {
  onClose: () => void;
};

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [animate, setAnimate] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleSubmit = async () => {
    // ... existing handleSubmit logic
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-full max-w-md rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900 p-8 shadow-xl transform transition-all duration-300 ${
          animate ? "scale-100" : "scale-95"
        }`}
      >
        <div className="space-y-6">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white">Change Password</h2>
            <p className="text-zinc-400 text-sm mt-2">
              Please enter your current password and new password
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Current Password
              </label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="h-11 bg-zinc-800/50 border-zinc-700 focus:border-blue-500 focus:ring-blue-500 placeholder-zinc-500"
                placeholder="Enter current password"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                New Password
              </label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11 bg-zinc-800/50 border-zinc-700 focus:border-blue-500 focus:ring-blue-500 placeholder-zinc-500"
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-300">
                Confirm Password
              </label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11 bg-zinc-800/50 border-zinc-700 focus:border-blue-500 focus:ring-blue-500 placeholder-zinc-500"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="py-2 px-3 bg-red-500/10 border border-red-500/20 rounded">
              <p className="text-red-500 text-sm text-center">{error}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            <Button
              onClick={onClose}
              className="h-11 bg-zinc-800 hover:bg-zinc-700 text-zinc-300"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              className="h-11 bg-blue-600 hover:bg-blue-700 text-white"
            >
              Change Password
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
