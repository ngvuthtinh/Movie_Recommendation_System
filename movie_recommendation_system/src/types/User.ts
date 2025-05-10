export interface UserProfile {
    avatarUrl: string;
    displayName?: string;
    createdDate: string;
    moviesInList: number;
    moviesWatched: number;
}

export interface ProfileUserProps extends UserProfile {
    onDisplayNameChange: (newName: string) => void;
}


export interface ChangeAvatarProps {
    userProfile: UserProfile;
    onAvatarChange?: (newAvatar: string) => void;
    onAvatarRemove?: () => void;
    onClose: () => void;
}

export interface UserDetails {
    firstName: string;
    lastName: string;
    displayName?: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    password: string;
}
