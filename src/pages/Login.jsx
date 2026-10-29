import { useContext } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../validations/loginSchema";

import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";

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
    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

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
            <Button
                type="button"
                shine={false}
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
                className="absolute end-4 top-4 size-10 items-center justify-center rounded-xl border border-border-main bg-card-bg text-text-secondary hover:text-brand-active hover:border-brand-active/40 transition-colors p-0 shadow-sm cursor-pointer sm:end-6 sm:top-6 sm:size-11"
            >
                {isDark ? (
                    <Sun size={18} aria-hidden="true" />
                ) : (
                    <Moon size={18} aria-hidden="true" />
                )}
            </Button>

            {/* Login card */}
            <section className="relative w-full max-w-md">
                <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-border-main bg-card-bg p-6 sm:p-8 shadow-xl shadow-black/[0.04]">
                    {/* Decorative Golden Graphic / Swoop (Top-Right) */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 sm:w-52 overflow-hidden select-none opacity-20"
                    >
                        <svg
                            viewBox="0 0 320 200"
                            fill="none"
                            className="h-full w-full object-cover"
                            preserveAspectRatio="none"
                        >
                            <path
                                d="M 230 0 C 230 45, 275 80, 270 115 C 265 145, 190 155, 145 200 L 320 200 L 320 0 Z"
                                fill="var(--theme-brand-active)"
                                opacity="0.95"
                            />
                        </svg>
                    </div>

                    <div className="relative z-10">
                        {/* Brand / Avatar */}
                        <div className="mb-4 flex flex-col items-center text-center sm:mb-5">
                            <div className="mb-3 flex size-14 sm:size-16 items-center justify-center rounded-2xl bg-brand-active text-bg-main shadow-md shadow-brand-active/20">
                                <UserRound
                                    size={28}
                                    strokeWidth={2}
                                    aria-hidden="true"
                                />
                            </div>

                            <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active sm:mb-1.5">
                                Admin Portal
                            </p>

                            <h1 className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl">
                                Welcome Back
                            </h1>

                            <p className="mt-1 max-w-xs text-xs leading-relaxed text-text-secondary sm:mt-1.5 sm:text-sm">
                                Sign in to access your dashboard and manage your store.
                            </p>
                        </div>

                        {/* Login form */}
                        <form onSubmit={handleSubmit(onValidSubmit)} className="space-y-4">
                            <Controller
                              name="email"
                              control={control}
                              render={({ field, fieldState }) => (
                                <Input
                                  {...field}
                                    id="login-email"
                                    type="email"
                                    label="Email"
                                    placeholder="Enter your email"
                                    leftIcon={<Mail size={17} />}
                                    error={fieldState.error?.message}
                                    autoComplete="username"
                                    className="h-11 sm:h-12 rounded-xl border border-border-main bg-input-bg text-sm text-text-primary placeholder:text-text-secondary/60 transition-colors focus:border-brand-active"
                                />
                              )}
                            />

                            <Controller
                              name="password"
                              control={control}
                              render={({ field, fieldState }) => (
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
                                    className="h-11 sm:h-12 rounded-xl border border-border-main bg-input-bg text-sm text-text-primary placeholder:text-text-secondary/60 transition-colors focus:border-brand-active"
                                />
                              )}
                            />

                            <div className="flex items-center justify-between gap-3 pt-0.5 text-xs sm:text-sm">
                                <span className="flex items-center gap-1.5 text-text-secondary">
                                    <ShieldCheck
                                        size={16}
                                        className="text-brand-active"
                                        aria-hidden="true"
                                    />
                                    Secure admin access
                                </span>

                                <Button
                                    type="button"
                                    shine={false}
                                    className="border-0 bg-transparent p-0 text-xs sm:text-sm font-semibold text-brand-active underline-offset-4 hover:bg-transparent hover:text-brand-hover hover:underline cursor-pointer"
                                >
                                    Forgot password?
                                </Button>
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
                                className="mt-2 h-11 sm:h-12 w-full rounded-xl bg-brand-active px-5 text-sm sm:text-base font-semibold text-bg-main hover:bg-brand-hover shadow-sm transition-all duration-200 cursor-pointer"
                            >
                                Sign In
                            </Button>
                        </form>

                        <div className="mt-5 flex items-center gap-3">
                            <span className="h-px flex-1 bg-border-main/70" />
                            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-text-secondary">
                                Admin Dashboard
                            </span>
                            <span className="h-px flex-1 bg-border-main/70" />
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
};

export default Login;
