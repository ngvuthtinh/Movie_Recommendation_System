import { UserDetails } from "./user-details";

export interface ChangeAvatarProps {
    userDetails: UserDetails
    onAvatarChange?: (newAvatar: string) => void;
    onAvatarRemove?: () => void;
    onClose: () => void;
}