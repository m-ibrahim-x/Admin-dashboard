/**
 * ProductViewSkeleton Component
 *
 * Dedicated loading skeleton for the Product Details (ProductView) page.
 * Mirrors the exact layout of ProductView.jsx:
 * 1. Top Header with Back button and Product ID/title placeholder
 * 2. Two-Column Layout:
 *    - Left: Gallery card with primary image and thumbnail strip
 *    - Right: Product metadata card, specifications grid, and description box
 */
const ProductViewSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`space-y-6 p-4 sm:p-6 min-w-0 animate-pulse ${className}`.trim()}
      role="status"
      aria-busy="true"
      aria-label="Loading product details"
    >
      <span className="sr-only">Loading product details...</span>

      {/* ─── 1. Header Skeleton ─── */}
      <div className="rounded-xl border border-border-main bg-card-bg p-4 sm:rounded-2xl sm:p-5 shadow-sm">
        <div className="h-8 w-32 rounded-full bg-input-bg mb-4" />
        <div className="flex items-center gap-4">
          <div className="size-12 rounded-xl bg-input-bg shrink-0" />
          <div className="space-y-2 flex-1 min-w-0">
            <div className="h-3 w-24 rounded bg-input-bg" />
            <div className="h-6 w-3/4 max-w-sm rounded bg-input-bg" />
          </div>
        </div>
      </div>

      {/* ─── 2. Main Two-Column Layout Skeleton ─── */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column: Gallery Skeleton */}
        <div className="lg:col-span-7 rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
          <div className="aspect-[4/3] w-full rounded-xl bg-input-bg" />
          <div className="mt-4 flex gap-3">
            <div className="h-16 w-20 sm:h-20 sm:w-24 rounded-xl bg-input-bg shrink-0" />
            <div className="h-16 w-20 sm:h-20 sm:w-24 rounded-xl bg-input-bg shrink-0" />
            <div className="h-16 w-20 sm:h-20 sm:w-24 rounded-xl bg-input-bg shrink-0" />
          </div>
        </div>

        {/* Right Column: Details & Specifications Skeleton */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Details Card */}
          <div className="rounded-2xl border border-border-main bg-card-bg p-5 sm:p-6 shadow-sm space-y-3">
            <div className="h-3 w-20 rounded bg-input-bg" />
            <div className="h-6 w-2/3 rounded bg-input-bg" />
            <div className="space-y-2">
              <div className="h-3.5 w-full rounded bg-input-bg" />
              <div className="h-3.5 w-5/6 rounded bg-input-bg" />
            </div>
          </div>

          {/* Key Specs 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="h-20 rounded-xl border border-border-main bg-card-bg p-4 bg-input-bg/40" />
            <div className="h-20 rounded-xl border border-border-main bg-card-bg p-4 bg-input-bg/40" />
            <div className="h-20 rounded-xl border border-border-main bg-card-bg p-4 bg-input-bg/40" />
            <div className="h-20 rounded-xl border border-border-main bg-card-bg p-4 bg-input-bg/40" />
          </div>

          {/* Extra Information Card */}
          <div className="h-24 rounded-xl border border-border-main bg-card-bg p-4 bg-input-bg/40" />
        </div>
      </div>
    </div>
  );
};

export default ProductViewSkeleton;
