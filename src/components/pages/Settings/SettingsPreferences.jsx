import { useState } from "react";
import { ChevronDown } from "lucide-react";

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

function SelectDropdown({ value, onChange, options, ariaLabel }) {
  return (
    <div className="relative min-w-[140px] sm:min-w-[170px]">
      <select
        value={value}
        aria-label={ariaLabel}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-xl border border-border-main bg-card-bg py-2 ps-3.5 pe-8 text-xs sm:text-sm font-medium text-text-primary shadow-xs transition-colors duration-200 hover:border-brand-active/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main cursor-pointer"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
            className="bg-card-bg text-text-primary"
          >
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
    </div>
  );
}

export default function SettingsPreferences() {
  // Account Preferences State
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [marketingEmails, setMarketingEmails] = useState(false);
  const [currency, setCurrency] = useState("USD ($)");

  // System Preferences State
  const [language, setLanguage] = useState("Arabic");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");
  const [timeZone, setTimeZone] = useState("(UTC+02:00) Cairo");

  return (
    <div className="space-y-4">
      {/* ─── Account Preferences Card ─── */}
      <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 lg:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mb-5 sm:mb-6">
          Account Preferences
        </h2>

        <div className="space-y-6">
          {/* Email Notifications */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-text-primary">
                Email Notifications
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5">
                Receive email updates about your activity.
              </p>
            </div>
            <ToggleSwitch
              checked={emailNotifications}
              onChange={setEmailNotifications}
              ariaLabel="Toggle Email Notifications"
            />
          </div>

          {/* Marketing Emails */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-text-primary">
                Marketing Emails
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5">
                Receive emails about new products and features.
              </p>
            </div>
            <ToggleSwitch
              checked={marketingEmails}
              onChange={setMarketingEmails}
              ariaLabel="Toggle Marketing Emails"
            />
          </div>

          {/* Default Currency */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-text-primary">
                Default Currency
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5">
                Select your preferred currency.
              </p>
            </div>
            <SelectDropdown
              value={currency}
              onChange={setCurrency}
              options={["USD ($)", "EUR (€)", "GBP (£)", "EGP (LE)", "SAR (SR)"]}
              ariaLabel="Select Default Currency"
            />
          </div>
        </div>
      </div>

      {/* ─── System Preferences Card ─── */}
      <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 lg:p-6 shadow-sm">
        <h2 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mb-5 sm:mb-6">
          System Preferences
        </h2>

        <div className="space-y-6">
          {/* Language */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-text-primary">
                Language
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5">
                Choose your preferred language.
              </p>
            </div>
            <SelectDropdown
              value={language}
              onChange={setLanguage}
              options={["Arabic", "English", "French", "German"]}
              ariaLabel="Choose Language"
            />
          </div>

          {/* Date Format */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-text-primary">
                Date Format
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5">
                Select your preferred date format.
              </p>
            </div>
            <SelectDropdown
              value={dateFormat}
              onChange={setDateFormat}
              options={["MM/DD/YYYY", "DD/MM/YYYY", "YYYY-MM-DD"]}
              ariaLabel="Select Date Format"
            />
          </div>

          {/* Time Zone */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold tracking-tight text-text-primary">
                Time Zone
              </h3>
              <p className="text-xs sm:text-[13px] text-text-secondary mt-0.5">
                Select your time zone.
              </p>
            </div>
            <SelectDropdown
              value={timeZone}
              onChange={setTimeZone}
              options={[
                "(UTC+02:00) Cairo",
                "(UTC+03:00) Riyadh",
                "(UTC+00:00) London",
                "(UTC-05:00) New York",
              ]}
              ariaLabel="Select Time Zone"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
