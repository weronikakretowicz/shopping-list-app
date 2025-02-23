import { useNavigate } from "react-router-dom";
import { registerSchema } from "../schemas/registerSchema";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Header } from "@/components/Header.tsx";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button.tsx";
import { clsx } from "clsx";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useRegister } from "@/api/auth/auth.queries.ts";
import { Spinner } from "@/components/Spinner.tsx";
import { ROUTES } from "./routes";

function RegisterPage() {
  const navigate = useNavigate();
  const registerMutation = useRegister();

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
      password: "",
      passwordConfirm: "",
      termsAndConditions: false,
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (
    data,
  ) => {
    await registerMutation.mutateAsync(data);
    navigate(ROUTES.LOGIN);
  };

  return (
    <div className="flex relative h-screen w-screen">
      <div className="flex flex-row h-screen w-full">
        <div className="relative flex-1 flex items-center justify-start flex-col text-white p-10">
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage: "url('/assets/grocery_background.jpeg')",
            }}
          >
            <Header />
          </div>
          <div className="absolute inset-0 bg-black opacity-40"></div>

          <div className="flex flex-col items-center justify-start mt-32">
            <h1 className="relative z-10 text-5xl font-bold mb-4">
              Welcome to CoList
            </h1>
            <h1 className="relative z-10 text-5xl font-bold">Your Shared</h1>
            <h1 className="relative z-10 text-5xl font-bold">
              Shopping Experience
            </h1>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center flex-col gap-10">
          <div className="flex flex-col justify-center gap-4 text-gray">
            <h2 className="font-bold">Create an account</h2>
            <p className="flex flex-row text-sm mx-auto">
              Already have an account?
              <a href="/login" className="font-bold text-green ml-2">
                Sign in
              </a>
            </p>
          </div>

          <div className="w-[395px] flex flex-col justify-center gap-7">
            <Form {...form}>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  const submit = form.handleSubmit(onSubmit);
                  submit(event);
                }}
                className="flex flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            placeholder="First name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="surname"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            placeholder="Last name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            placeholder="Email"
                            type="email"
                            {...field}
                          />
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
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            type="password"
                            placeholder="Password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="passwordConfirm"
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex flex-col w-full gap-2">
                        <FormControl>
                          <Input
                            className="shadow"
                            type="password"
                            placeholder="Repeat password"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="termsAndConditions"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-center p-2">
                      <div className="flex flex-row items-center space-x-2 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel className="text-sm cursor-pointer">
                          I accept the terms and conditions and privacy policy
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  variant="default"
                  className={clsx("mt-5 rounded-bl shadow", "btn-secondary")}
                  disabled={registerMutation.isPending}
                >
                  {registerMutation.isPending ? (
                    <span className="flex items-center gap-2">
                      <Spinner />
                      Loading...
                    </span>
                  ) : (
                    "Get Started"
                  )}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
