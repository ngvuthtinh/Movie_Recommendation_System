import { UserDetails, UserProfile, UserUpdate, ChangePassword } from "@/types/User";

const API_BASE_URL = "http://localhost:8000/users";

const getAuthToken = () => {
    const token = localStorage.getItem("user_token");
    if (!token) {
        throw new Error("No authentication token found");
    }
    return token;
}

const mapUserProfile = (userProfile: any): UserProfile => {
    return {
        id: userProfile.id,
        avatarUrl: userProfile.avatar_url || "",
        displayName: userProfile.display_name || "",
        createdDate: userProfile.created_date || "",
        moviesInList: userProfile.movies_in_list || 0,
        moviesWatched: userProfile.movies_watched || 0,
    };
}

const mapUserDetails = (userDetails: any): UserDetails => {
    return {
        id: userDetails.id,
        firstName: userDetails.first_name || "",
        lastName: userDetails.last_name || "",
        displayName: userDetails.display_name || "",
        avatarUrl: userDetails.avatar_url || "",
        createdDate: userDetails.created_date || "",
        email: userDetails.email || "",
        dateOfBirth: userDetails.date_of_birth || "",
        phoneNumber: userDetails.phone_number || "",
        // password: userDetails.password || "",
        moviesInList: userDetails.movies_in_list || 0,
        moviesWatched: userDetails.movies_watched || 0,
    };
}

export const UserService = {
    getUserProfile: async (): Promise<UserProfile> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user profile");
        }

        const data = await response.json();
        return mapUserProfile(data);
    }
    ,
    updateUserProfile: async (userUpdate: UserUpdate): Promise<UserProfile> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/me`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(userUpdate),
        });

        if (!response.ok) {
            throw new Error("Failed to update user profile");
        }

        const data = await response.json();
        return mapUserProfile(data);
    }
    ,
    changePassword: async (changePassword: ChangePassword): Promise<void> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/me/password`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(changePassword),
        });

        if (!response.ok) {
            throw new Error("Failed to change password");
        }
    }
    ,
    getUserDetails: async (): Promise<UserDetails> => {
        const token = getAuthToken();
        const response = await fetch(`${API_BASE_URL}/me/details`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error("Failed to fetch user details");
        }

        const data = await response.json();
        return mapUserDetails(data);
    }
}