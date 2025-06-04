import { LoginFormValues } from "../types/Auth";

export async function login(data: LoginFormValues) {
    const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.detail);  // This will get the exact error message from backend
    }

    return responseData;
}