import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { toast } from "sonner";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);

      await login(email, password);

      toast.success("Logged in successfully.");

      const destination = location.state?.from?.pathname || "/";
      navigate(destination, { replace: true });
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to log in.";

      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-bg-main flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md bg-card border border-border-custom rounded-2xl p-6 sm:p-8 shadow-sm transition-colors">
        <div className="text-center mb-6">
          <span className="text-[11px] font-bold tracking-[0.22em] text-active uppercase leading-none mb-1.5 block">
            Auren Panel
          </span>

          <h1 className="text-2xl sm:text-3xl font-bold text-primary">
            Welcome Back
          </h1>

          <p className="text-xs sm:text-sm text-secondary mt-1.5">
            Sign in to access your dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="login-email"
              className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5"
            >
              Email Address
            </label>

            <input
              id="login-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@example.com"
              autoComplete="username"
              required
              className="w-full px-4 py-3 rounded-xl bg-input border border-border-custom text-primary 
              placeholder:text-secondary/50 text-sm focus:outline-none focus-visible:ring-2 f
              ocus-visible:ring-active transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="login-password"
              className="block text-xs font-semibold uppercase tracking-wider text-secondary mb-1.5"
            >
              Password
            </label>

            <input
              id="login-password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              autoComplete="current-password"
              required
              className="w-full px-4 py-3 rounded-xl bg-input border border-border-custom text-primary 
              placeholder:text-secondary/50 text-sm focus:outline-none focus-visible:ring-2 
              focus-visible:ring-active transition-colors"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 rounded-xl bg-active text-bg-main 
            font-semibold text-sm hover:bg-active-hover disabled:opacity-60
            disabled:cursor-not-allowed transition-colors shadow-xs 
            cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-active"
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 pt-4 border-t border-border-custom text-center">
          <p className="text-xs text-secondary/80">
            Sign in with your existing administrator account.
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
