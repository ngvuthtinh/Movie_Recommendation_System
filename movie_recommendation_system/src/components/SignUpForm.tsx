import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RegisterFormValues } from "../types/Auth"
import { useNavigate } from "react-router-dom"
import { Register } from "../services/RegisterService"

export default function SignUpForm() {
    const {
        register,
        handleSubmit, 
        watch,
        setError,
        formState: { errors }
    } = useForm<RegisterFormValues>()
    const navigate = useNavigate()

    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const resData = await Register(data);
            console.log("Registration successful:", resData);

            // Store the tokens
            localStorage.setItem("token", resData.access_token);
            localStorage.setItem("token_type", resData.token_type);

            // Navigate to login
            navigate("/login");
        } catch (error: any) { // Type assertion for error
            // Show error in the email field
            alert(error.message);
            setError('email', {
                type: 'manual',
                message: error.message
            });
        }
    };

    const password = watch("password") // Confirm password

    const handleNavigateToLogin = () => {
        navigate("/login")
    }

    return (
        <div className="w-full max-w-[500px] p-9 bg-black/70 rounded-xl shadow-lg">
            <div className="flex items-center justify-center">
                <Card className="w-full max-w-md rounded-2xl shadow-md">
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <h1 className="text-2xl font-bold text-black">Sign Up</h1>
                            <p className="text-gray-500">Enter your information to create an account</p>

                            <div className="flex space-x-4">
                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="first_name">First Name</Label>
                                    <Input
                                        id="first_name"
                                        type="text"
                                        placeholder="Thomas"
                                        {...register("firstName", { required: true })}
                                    />
                                    {errors.firstName && (
                                        <span className="text-sm text-red-500">First name cannot be leave empty</span>
                                    )}
                                </div>

                                <div className="flex flex-col space-y-2">
                                    <Label htmlFor="last_name">Last Name</Label>
                                    <Input
                                        id="last_name"
                                        type="text"
                                        placeholder="Shelby"
                                        {...register("lastName", { required: true })}
                                    />
                                    {errors.lastName && (
                                        <span className="text-sm text-red-500">Last name cannot be leave empty</span>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="date_of_birth">Date of Birth</Label>
                                <Input
                                    id="date_of_birth"
                                    type="date"
                                    {...register("dateOfBirth", { required: true })}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="phone_number">Phone Number</Label>
                                <Input
                                    id="phone_number"
                                    type="text"
                                    placeholder="+84 123 456 789"
                                    {...register("phoneNumber", {required: true})}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="tommy1890@gmail.com"
                                    {...register("email", {required: true})}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    {...register("password", { required: true })}
                                />
                                {errors.password && (
                                    <span className="text-sm text-red-500">Password cannot be leave empty</span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirm_password">Confirm Password</Label>
                                <Input
                                    id="confirm_password"
                                    type="password"
                                    {...register("confirmPassword", {
                                        validate: (value) => value === password || "Passwords do not match, please try again"
                                    })}
                                />
                                {errors.confirmPassword && (
                                    <span className="text-sm text-red-500">{errors.confirmPassword.message}</span>
                                )}
                            </div>

                            <Button type="submit" className="w-full bg-red-700 hover:bg-red-900">Sign Up</Button>
                            <p className="text-center text-sm text-gray-500">
                                Already have an Account?{" "}
                                <span
                                    className="underline cursor-pointer text-blue-500 hover:text-blue-700"
                                    onClick={handleNavigateToLogin}
                                >
                                  Login
                                </span>
                            </p>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
