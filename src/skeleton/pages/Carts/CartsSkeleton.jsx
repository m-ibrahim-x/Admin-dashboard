/**
 * CartsSkeleton Component
 *
 * Dedicated loading skeleton for the Carts page.
 * Mirrors the exact visual structure and responsive layout of Carts.jsx:
 * 1. Hero Page Header & Active Promotion Banner
 * 2. Four Statistics Cards (Total Items, Subtotal, Discount, Net Total)
 * 3. 12-Column Main Content Grid:
 *    - Left (col-span-8): Cart Table with section header and row placeholders
 *    - Right (col-span-4): Order Summary card with breakdown lines and button
 */
export default function CartsSkeleton() {
  return (
    <div
      className="space-y-4 p-5 min-w-0 animate-pulse"
      role="status"
      aria-busy="true"
      aria-label="Loading cart"
    >
      <span className="sr-only">Loading cart...</span>

      {/* ─── 1. Header and Active Promotion Banner Skeleton ─── */}
      <div className="space-y-4">
        {/* Page Header Banner */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
          {/* Decorative Golden Graphic Placeholder */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 sm:w-52 md:w-64 overflow-hidden select-none opacity-20"
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

          <div className="relative z-10 flex flex-col gap-2.5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="size-11 sm:size-12 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
              <div className="space-y-2">
                <div className="h-3 w-28 rounded bg-input-bg" />
                <div className="h-6 w-48 sm:w-64 rounded-md bg-input-bg" />
              </div>
            </div>
            <div className="h-3.5 w-full max-w-xl rounded bg-input-bg" />
          </div>
        </div>

        {/* Active Promotion Applied Banner Skeleton */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-border-main bg-card-bg px-4 sm:px-5 py-3.5 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <div className="size-9 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
            <div className="space-y-1.5 min-w-0">
              <div className="h-4 w-36 rounded bg-input-bg" />
              <div className="h-3 w-48 rounded bg-input-bg" />
            </div>
          </div>
          <div className="h-6 w-24 rounded-full bg-input-bg shrink-0 self-start sm:self-center" />
        </div>
      </div>

      {/* ─── 2. Four Statistics Cards Skeleton ─── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-full box-border rounded-2xl border border-border-main border-t-[3px] border-t-border-main bg-card-bg p-3.5 sm:p-4 shadow-sm space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-3.5 w-20 rounded bg-input-bg" />
              <div className="size-9 sm:size-10 rounded-xl bg-input-bg border border-border-main/50" />
            </div>
            <div className="h-6 w-24 rounded bg-input-bg" />
            <div className="h-3 w-32 rounded bg-input-bg" />
          </div>
        ))}
      </div>

      {/* ─── 3. Cart Table & Order Summary Skeleton ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Cart Table Skeleton */}
        <div className="lg:col-span-8 min-w-0 rounded-2xl border border-border-main bg-card-bg shadow-sm overflow-hidden">
          {/* Table Section Header */}
          <div className="flex items-center justify-between border-b border-border-main p-4 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="size-9 sm:size-10 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
              <div className="space-y-1.5">
                <div className="h-3 w-24 rounded bg-input-bg" />
                <div className="h-5 w-28 rounded bg-input-bg" />
              </div>
            </div>
            <div className="h-6 w-20 rounded-full bg-input-bg" />
          </div>

          {/* Table Rows Skeleton */}
          <div className="divide-y divide-border-main">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="p-4 sm:px-6 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5 min-w-[200px]">
                  <div className="size-12 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 w-36 rounded bg-input-bg" />
                    <div className="h-3 w-20 rounded bg-input-bg" />
                  </div>
                </div>
                <div className="h-4 w-16 rounded bg-input-bg hidden sm:block" />
                <div className="size-7 rounded-lg bg-input-bg hidden sm:block" />
                <div className="h-4 w-16 rounded bg-input-bg" />
                <div className="size-8 rounded-lg bg-input-bg shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary Skeleton */}
        <div className="lg:col-span-4 min-w-0 rounded-2xl border border-border-main border-t-[3px] border-t-border-main bg-card-bg p-5 sm:p-6 shadow-sm space-y-4">
          {/* Header */}
          <div className="space-y-1.5 mb-5">
            <div className="h-3 w-24 rounded bg-input-bg" />
            <div className="h-5 w-32 rounded bg-input-bg" />
          </div>

          {/* Rows */}
          <div className="space-y-3.5">
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-16 rounded bg-input-bg" />
              <div className="h-3.5 w-16 rounded bg-input-bg" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-16 rounded bg-input-bg" />
              <div className="h-3.5 w-16 rounded bg-input-bg" />
            </div>
            <div className="flex justify-between items-center">
              <div className="h-3.5 w-20 rounded bg-input-bg" />
              <div className="h-3.5 w-24 rounded bg-input-bg" />
            </div>
          </div>

          <div className="my-4 h-px w-full bg-border-main" />

          {/* Total */}
          <div className="flex justify-between items-baseline mb-6">
            <div className="h-4 w-24 rounded bg-input-bg" />
            <div className="h-7 w-28 rounded bg-input-bg" />
          </div>

          {/* Button */}
          <div className="h-10 w-full rounded-xl bg-input-bg" />
        </div>
      </div>
    </div>
  );
}
