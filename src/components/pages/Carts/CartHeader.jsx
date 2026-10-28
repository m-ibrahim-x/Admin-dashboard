import { ShoppingCart, Tag, CheckCircle2 } from "lucide-react";

export default function CartHeader({
  couponCode = "SUMMER2026",
  discountText = "$50.00 off qualifying items",
}) {
  return (
    <div className="space-y-4">
      {/* ─── Hero Page Header Banner (Pattern 1 from DESIGN_SYSTEM.md) ─── */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
        {/* Decorative Golden Swoop Graphic */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 sm:w-52 md:w-64 overflow-hidden select-none"
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

        {/* Header Content Hierarchy */}
        <div className="relative z-10 flex flex-col gap-2.5">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Brand Squircle Icon Container */}
            <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-md shadow-brand-active/20">
              <ShoppingCart className="size-5 sm:size-6" strokeWidth={2} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                ADMIN · COMMERCE MANAGEMENT
              </p>
              <h1 className="mt-0.5 text-lg font-bold tracking-tight text-text-primary sm:text-xl lg:text-2xl">
                Cart Overview & Checkout
              </h1>
            </div>
          </div>

          <p className="max-w-xl text-xs sm:text-[13px] text-text-secondary">
            Inspect active session carts, track applied promotional coupons, review real-time subtotal breakdowns, and inspect individual item pricing before order finalization.
          </p>
        </div>
      </div>

      {/* ─── Active Promotion Applied Banner ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border-main bg-card-bg px-4 sm:px-5 py-3.5 shadow-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-active-bg text-brand-active border border-brand-active/20 shadow-xs">
            <Tag className="size-4" />
          </div>
          <div className="min-w-0">
            <p className="text-xs sm:text-sm font-semibold text-text-primary truncate">
              Active Promotion Applied
            </p>
            <p className="text-[11px] sm:text-xs text-text-secondary truncate mt-0.5">
              Customer received {discountText}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 self-start sm:self-center rounded-full bg-active-bg border border-brand-active/25 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-active shrink-0 shadow-xs">
          <CheckCircle2 className="size-3.5" />
          <span>{couponCode}</span>
        </div>
      </div>
    </div>
  );
}
