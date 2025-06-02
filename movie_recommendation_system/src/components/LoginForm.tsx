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
    setError,
    formState: { errors }
  } = useForm<LoginFormValues>()

  const navigate = useNavigate()

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const resData = await login(data);
      console.log(resData)
      // Store the token in localStorage
      localStorage.setItem("user_token", resData.access_token);
      localStorage.setItem("token_type", resData.token_type);
      navigate("/home")
    } catch (error: any) {
        // Show error in the email field
      alert(error.message);
      setError('email', {
        type: 'manual',
        message: error.message
      });
      // Optionally, you can also set an error for the password field
      setError('password', {
        type: 'manual',
        message: error.message
      });
    }
  }

  const handleNavigateToSignUp = () => {
    navigate('/register');
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

            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <span
                  className="underline cursor-pointer text-blue-500 hover:text-blue-700"
                  onClick={handleNavigateToSignUp}
              >
                  Sign up
                </span>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
