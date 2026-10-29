import { AlertCircle } from "lucide-react";

/**
 * CartsError Component
 *
 * Dedicated error state component for the Carts page.
 * Uses existing design tokens and visual hierarchy matching the dashboard style.
 * Does not include a retry button, API requests, or navigation.
 *
 * @param {Object} props
 * @param {string} [props.message="Failed to load cart."] - Error message to display.
 */
export default function CartsError({
  message = "Failed to load cart.",
}) {
  return (
    <section className="p-5" role="alert" aria-live="assertive">
      <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-main bg-card-bg p-6 sm:p-8 text-center shadow-sm">
        {/* Error Icon */}
        <div className="flex size-12 items-center justify-center rounded-2xl border border-status-danger/20 bg-status-danger/10 text-status-danger mb-3 shadow-xs">
          <AlertCircle className="size-6" strokeWidth={2} />
        </div>

        {/* Error Heading */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
          Failed to Load Cart
        </h3>

        {/* Error Message */}
        <p className="mt-1.5 max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed">
          {message}
        </p>
      </div>
    </section>
  );
}
