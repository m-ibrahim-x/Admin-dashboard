import { useState, useContext } from "react";
import { ThemeContext } from "../../../context/Themecontext";
import { toast } from "sonner";
import Button from "../../ui/Button";

function ToggleSwitch({ checked, onChange, ariaLabel }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      onClick={() => onChange(!checked)}
      className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors duration-200 ease-in-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main ${
        checked
          ? "border border-brand-active bg-brand-active"
          : "border border-border-main bg-disabled"
      }`}
    >
      <span
        className={`inline-block size-5 rounded-full bg-card-bg shadow-xs transition-transform duration-200 ease-in-out ${
          checked ? "translate-x-5.5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default function SettingsSecurity() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleToggle2FA = () => {
    setTwoFactorEnabled((prev) => {
      const nextState = !prev;
      if (nextState) {
        toast.success("Two-Factor Authentication has been enabled.");
      } else {
        toast.info("Two-Factor Authentication has been disabled.");
      }
      return nextState;
    });
  };

  return (
    <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 lg:p-6 shadow-sm">
      <h2 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mb-5 sm:mb-6">
        Other Settings
      </h2>

      <div className="space-y-6">
        {/* Dark Mode */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-text-primary">
              Dark Mode
            </h3>
            <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5">
              Switch between light and dark theme.
            </p>
          </div>
          <ToggleSwitch
            checked={isDark}
            onChange={toggleTheme}
            ariaLabel="Toggle Dark Mode"
          />
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold tracking-tight text-text-primary">
              Two-Factor Authentication
            </h3>
            <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5">
              Add an extra layer of security to your account.
            </p>
          </div>
          <Button
            onClick={handleToggle2FA}
            className="rounded-xl border border-border-main bg-active-bg px-5 py-2 text-xs sm:text-sm font-semibold text-brand-active hover:bg-brand-active hover:text-bg-main shadow-xs self-start sm:self-center"
          >
            {twoFactorEnabled ? "Disable" : "Enable"}
          </Button>
        </div>
      </div>
    </div>
  );
}
