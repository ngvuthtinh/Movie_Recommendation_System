import { ProfileInformation } from "./profile";

export interface ChangeAvatarProps {
    user: ProfileInformation
    onAvatarChange?: (newAvatar: string) => void;
    onAvatarRemove?: () => void;
    onClose: () => void;
}