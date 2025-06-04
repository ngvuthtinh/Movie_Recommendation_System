import { RegisterFormValues } from "../types/Auth";

export async function Register(data: RegisterFormValues) {
    const userData = {
        first_name: data.firstName,
        last_name: data.lastName,
        date_of_birth: data.dateOfBirth,
        phone_number: data.phoneNumber,
        email: data.email,
        password: data.password,
    }

    const response = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
    });

    const responseData = await response.json();
    if (!response.ok) {
        throw new Error(responseData.detail || "Registration failed");
    }

    return responseData;
}