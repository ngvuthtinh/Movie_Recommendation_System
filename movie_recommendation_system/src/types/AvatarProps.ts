import { UserDetails } from "./User";

export interface ChangeAvatarProps {
    userDetails: UserDetails
    onAvatarChange?: (newAvatar: string) => void;
    onAvatarRemove?: () => void;
    onClose: () => void;
}