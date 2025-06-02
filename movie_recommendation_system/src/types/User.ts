export interface UserProfile {
    id: number;
    avatarUrl: string;
    displayName: string;
    createdDate: string; 
    moviesInList: number;
    moviesWatched: number;
}

export interface ProfileUserProps {
    userProfile: UserProfile;
    onSignOut: () => void;
    onDisplayNameChange: (newDisplayName: string) => void; 
    onPasswordChange: (changePasswordData: ChangePassword) => void;
    onAvatarChange: (newAvatar: string) => void;
}

export interface ChangeAvatarProps {
    userProfile: UserProfile;
    onAvatarChange: (newAvatar: string) => void;
    onClose: () => void; 
}

export interface UserUpdate { 
    display_name?: string;
    avatar_url?: string;
}

export interface ChangePassword { 
    old_password: string;
    new_password: string; 
}

export interface UserDetails {
    id: number;
    firstName: string;
    lastName: string;
    displayName: string;
    avatarUrl: string;
    createdDate: string;
    email: string;
    dateOfBirth: string;
    phoneNumber: string;
    moviesInList: number;
    moviesWatched: number;
}