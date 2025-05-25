import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { LoginFormValues } from "../types/Auth"
import { useNavigate } from "react-router-dom"

import { login } from "../services/LoginService"

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormValues>()
  const navigate = useNavigate()

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const resData = await login(data);
      console.log(resData)
      // Store the token in localStorage
      localStorage.setItem("token", resData.access_token);
      localStorage.setItem("token_type", resData.token_type);

      navigate("/home")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  return (
    <div className="flex items-center justify-center w-full max-w-[500px] p-9 bg-black/70 rounded-xl shadow-lg">
      <Card className="w-full max-w-md p-4 rounded-2xl shadow-md">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <h1 className="text-2xl font-bold text-center text-black">Login</h1>
            <p className="text-center text-gray-500">
              Enter your email below to login to your account
            </p>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-sm text-red-500">This field is required</span>}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a href="#" className="text-sm underline">
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="Password"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <span className="text-sm text-red-500">This field is required</span>
              )}
            </div>

            <Button
                type="submit"
                className="w-full bg-black hover:bg-gray-800"
                onSubmit={handleSubmit(onSubmit)}
            >
              Login
            </Button>

            <Button variant="outline" className="w-full">
              Login with Google
            </Button>

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <a href="#" className="underline">
                Sign up
              </a>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
