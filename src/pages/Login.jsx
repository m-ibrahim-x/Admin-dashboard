import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/loginSchema";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthContext} from "../context/Authcontext"

import {
    ArrowRight,
    LockKeyhole,
    Mail,
    Moon,
    ShieldCheck,
    Sun,
    UserRound,
} from "lucide-react";

import { ThemeContext } from "../context/Themecontext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import LoginBackground from "../components/ui/LoginBackground";

const Login = () => {
    const { theme, toggleTheme } = useContext(ThemeContext);
    const {login} = useContext (AuthContext)

    const navigate = useNavigate()

    const isDark = theme === "dark";

    const {
      control,
      handleSubmit,
      formState: { isSubmitting },
    } = useForm({
      resolver: zodResolver(loginSchema),
      mode: "onTouched",
      reValidateMode: "onChange",
      defaultValues: {
        email: "",
        password: "",
      },
    });



const onValidSubmit = async ({ email, password }) => {
  try {
    await login(email, password);

    toast.success("Login successful!");
    navigate("/", { replace: true });
  } catch (error) {
    if (error?.code === "NOT_ADMIN") {
      navigate("/unauthorized", { replace: true });
      return;
    }

    const message =
      error.response?.data?.message ||
      "Login failed. Please check your credentials.";

    toast.error(message);
    console.log("Login error:", error);
  }
};


    return (
        <main 
          className="relative isolate flex min-h-dvh flex-col items-center justify-center overflow-x-hidden bg-bg-main p-4 text-text-primary 
          transition-colors duration-300 sm:p-6"
        >

            {/* Geometric background decorations */}
            <LoginBackground />


            {/* Theme toggle */}
            <button
                type="button"
                onClick={toggleTheme}
                aria-label={
                    isDark
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                }
                title={
                    isDark
                        ? "Switch to light mode"
                        : "Switch to dark mode"
                }
                className="absolute end-4 top-4 inline-flex size-10 items-center justify-center border-2 border-border-main bg-card-bg 
                text-text-primary shadow-[3px_3px_0px_var(--theme-text-primary)] transition-transform duration-200 hover:-translate-y-0.5 
                hover:shadow-[4px_4px_0px_var(--theme-text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-active 
                sm:end-6 sm:top-6 sm:size-11"
            >
                {isDark ? (
                    <Sun size={18} aria-hidden="true" />
                ) : (
                    <Moon size={18} aria-hidden="true" />
                )}
            </button>

            {/* Login card and offset shadow */}
            <section className="relative w-full max-w-md">
                <div
                    aria-hidden="true"
                    className="corner-cut-tl-br absolute inset-0 translate-x-2.5 translate-y-2.5 border-2 border-text-primary bg-text-primary"
                />

                <div className="corner-cut-tl-br relative border-2 border-text-primary bg-card-bg p-5 shadow-none sm:px-8 sm:py-6">

                    {/* corners cut */}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute left-0 top-0 size-7 border-b-2 border-r-2 border-text-primary bg-active-bg sm:size-8"
                    >
                      <span className="absolute left-1 top-1 size-2 border border-text-primary bg-brand-active" />
                    </div>

                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute bottom-0 right-0 size-7 border-l-2 border-t-2 border-text-primary bg-active-bg sm:size-8"
                    >
                      <span className="absolute bottom-1 right-1 size-2 border border-text-primary bg-brand-active" />
                    </div>

                    {/* Brand accent */}
                    <div
                        aria-hidden="true"
                        className="absolute end-0 top-0 h-2 w-16 bg-brand-active sm:w-24"
                    />

                    {/* Brand / avatar */}
                    <div className="mb-4 flex flex-col items-center text-center sm:mb-5">
                        <div className="relative mb-3">
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-text-primary"
                            />

                            <div className="relative flex size-14 items-center justify-center border-2 border-text-primary bg-active-bg 
                            text-brand-active sm:size-16">
                                <UserRound
                                    size={28}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <span
                                    aria-hidden="true"
                                    className="absolute -bottom-1 -end-1 size-3.5 border-2 border-text-primary bg-brand-active"
                                />
                            </div>
                        </div>

                        <p className="mb-1 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-brand-active sm:mb-1.5">
                            <span className="h-px w-4 bg-brand-active sm:w-5" />
                            Admin Portal
                            <span className="h-px w-4 bg-brand-active sm:w-5" />
                        </p>

                        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                            Welcome Back
                        </h1>

                        <p className="mt-1 max-w-xs text-xs leading-5 text-text-secondary sm:mt-1.5 sm:text-sm sm:leading-6">
                            Sign in to access your dashboard and
                            manage your store.
                        </p>
                    </div>

                    {/* Login form */}
                    <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-3.5 sm:space-y-4">
                        <Controller
                          name="email"
                          control={control}
                          render={({field, fieldState}) =>(
                            <Input
                              {...field}
                                id="login-email"
                                type="email"
                                label="Email"
                                placeholder="Enter your email"
                                leftIcon={<Mail size={17} />}
                                error={fieldState.error?.message}
                                autoComplete="username"
                                className="h-10 sm:h-11 rounded-none border-2 border-text-primary px-10 shadow-[3px_3px_0px_var(--theme-text-primary)]
                                placeholder:text-text-secondary/70 focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 
                                focus-visible:ring-offset-card-bg"
                            />
                          )}
                        />
                        <Controller
                          name="password"
                          control={control}
                          render={({field, fieldState}) =>(
                            <Input
                              {...field}
                                id="login-password"
                                type="password"
                                label="Password"
                                placeholder="Enter your password"
                                leftIcon={<LockKeyhole size={17} />}
                                allowToggleVisibility
                                error={fieldState.error?.message}
                                autoComplete="current-password"
                                className="h-10 sm:h-11 rounded-none border-2 border-text-primary px-10 shadow-[3px_3px_0px_var(--theme-text-primary)]
                                placeholder:text-text-secondary/70 focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 
                                focus-visible:ring-offset-card-bg"
                            />
                          )}
                        />

                        <div className="flex items-center justify-between gap-3 pt-0.5 text-xs sm:text-sm">
                            <span className="flex items-center gap-1.5 text-text-secondary">
                                <ShieldCheck
                                    size={15}
                                    className="text-brand-active"
                                    aria-hidden="true"
                                />
                                Secure admin access
                            </span>

                            <button
                                type="button"
                                className="font-semibold text-brand-active underline-offset-4 transition-colors hover:text-brand-hover 
                                hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-active"
                            >
                                Forgot password?
                            </button>
                        </div>

                        <Button
                            type="submit"
                            shine
                            rightIcon={
                                <ArrowRight
                                    size={18}
                                    aria-hidden="true"
                                />
                            }
                            isLoading={isSubmitting}
                            loadingText="Signing In..."
                            className="mt-1 h-11 w-full border-2 border-text-primary rounded-none bg-brand-active px-5 text-sm sm:text-base font-bold 
                            text-text-primary shadow-[5px_5px_0px_var(--theme-text-primary)] hover:-translate-y-0.5 hover:bg-brand-hover 
                            hover:shadow-[6px_6px_0px_var(--theme-text-primary)] active:translate-x-0.5 active:translate-y-0.5 
                            active:shadow-[2px_2px_0px_var(--theme-text-primary)] sm:h-12"
                        >
                            Sign In
                        </Button>
                    </form>

                    <div className="mt-4 flex items-center gap-3 sm:mt-5">
                        <span className="h-px flex-1 bg-border-main" />
                        <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                            Admin Dashboard
                        </span>
                        <span className="h-px flex-1 bg-border-main" />
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
