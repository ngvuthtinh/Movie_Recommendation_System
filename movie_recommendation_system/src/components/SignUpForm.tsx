import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { RegisterFormValues } from "../types/Auth"

export default function SignUpForm() {
    const {
        register, // Lien ket voi input, xu ly loi
        handleSubmit, 
        watch, // Dung cho confirm password
        formState: { errors }
    } = useForm<RegisterFormValues>()


    const onSubmit = async (data: RegisterFormValues) => {
        try {
            const response = await fetch("http://localhost:8000/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            })

            if (!response.ok) throw new Error("Registration failed")
            const resData = await response.json()
            console.log(resData)
        } catch (error) {
            console.error("Registration failed:", error)
        }
    }

    const password = watch("password") // Confirm password

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

                            {/* <div className="space-y-2">
                                    <Label htmlFor="display_name">Display Name</Label>
                                    <Input
                                        id="display_name"
                                        type="text"
                                        placeholder="Tommy"
                                        {...register("displayName", { required: true })}
                                    />
                                    {errors.displayName && (
                                        <span className="text-sm text-red-500">Display name cannot be leave empty</span>
                                    )}
                            </div>                   
                            */}
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
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
