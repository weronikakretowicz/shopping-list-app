import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Header } from "@/components/Header";
import { Spinner } from "@/components/Spinner";
import { useLogin } from "@/api/auth/auth.queries";
import { LoginFormValues, loginSchema } from "@/schemas/loginSchema";
import { clsx } from "clsx";
import { ROUTES } from "./routes";
import { useAccessToken } from "@/atoms/accessToken";
import { toast } from "react-hot-toast";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const loginMutation = useLogin();
  const [accessToken, setAccessToken] = useAccessToken();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginFormValues) => {
    setLoading(true);
    try {
      const result = await loginMutation.mutateAsync(data);

      if (result?.token) {
        setAccessToken(result.token);
        localStorage.setItem("access_token", result.token);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Invalid email or password");
      setLoading(false);
    }
  };

  useLayoutEffect(() => {
    if (accessToken) {
      navigate(ROUTES.MYLISTS);
    }
  }, [accessToken]);

  return (
    <div className="relative h-screen w-screen">
      <div className="flex flex-row h-screen w-full">
        <div className="relative flex flex-1 items-center justify-start flex-col text-white p-10">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/assets/grocery_background.jpeg')",
            }}
          >
            <Header />
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="flex items-center justify-center mt-32 z-10 font-semibold">
            <h1>Welcome Back!</h1>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-start flex-col gap-5 mt-28">
          <div className="flex flex-col justify-center items-center gap-4 text-gray">
            <h2 className="text-4xl font-bold">Login</h2>
            <p className="mb-8">Welcome back! Please login to your account.</p>
          </div>

          <div className="w-[395px] flex flex-col justify-center items-center gap-7">
            <Form {...form}>
              <form
                onSubmit={async (event) => {
                  event.preventDefault();

                  try {
                    await form.handleSubmit(handleLogin)(event);
                  } catch (error) {
                    console.error("Form submission error:", error);
                  }
                }}
                className="w-full max-w-sm flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col gap-2">
                        <FormControl>
                          <Input id="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex flex-col gap-2">
                        <FormControl>
                          <Input id="password" placeholder="Password" type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <Button type="submit" className={clsx("mt-5 rounded-bl shadow", "btn-secondary")} disabled={loading}>
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Spinner />
                      Logging in..
                    </span>
                  ) : (
                    "Login"
                  )}
                </Button>
              </form>
            </Form>
            <p className="text-gray">
              New User?{" "}
              <a href="/register" className="text-green font-bold hover:underline">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
