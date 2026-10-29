import { Package } from "lucide-react";

/**
 * ProductsSkeleton Component
 *
 * Full page or grid skeleton loader matching the Products page architecture:
 * 1. Products Header Banner + 4 Status Cards (Total, Featured, In Stock, Out of Stock)
 * 2. Products Filters Section (Search row + Category row)
 * 3. Products Grid (8 cards matching ProductCard layout)
 *
 * Supports `cardsOnly={true}` for loading/filtering products while keeping the header visible.
 *
 * @param {Object} props
 * @param {number} [props.count=8] - Number of product card skeletons to render.
 * @param {boolean} [props.cardsOnly=false] - If true, renders only the product cards grid skeleton.
 * @param {string} [props.className=""] - Additional custom class names.
 */
const ProductsSkeleton = ({
  count = 8,
  cardsOnly = false,
  className = "",
}) => {
  // ─── Cards Grid Skeleton ───
  const cardsGrid = (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      aria-label="Loading products catalog"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full box-border rounded-3xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm flex flex-col justify-between"
        >
          <div>
            {/* Product Image Area Skeleton */}
            <div className="relative w-full h-48 sm:h-56 rounded-2xl bg-input-bg border border-border-main/50 overflow-hidden mb-4 flex items-center justify-center">
              <div className="size-10 rounded-xl bg-border-main/40 flex items-center justify-center text-text-secondary/40">
                <Package className="size-5" />
              </div>
            </div>

            {/* Category / Subcategory Metadata */}
            <div className="h-3 w-28 rounded bg-input-bg mb-2.5" />

            {/* Product Title */}
            <div className="h-5 w-4/5 rounded-md bg-input-bg mb-2" />

            {/* Description (2 lines) */}
            <div className="space-y-1.5 mb-4">
              <div className="h-3.5 w-full rounded bg-input-bg" />
              <div className="h-3.5 w-2/3 rounded bg-input-bg" />
            </div>

            {/* Price & Stock Badge */}
            <div className="flex items-center justify-between mb-4">
              <div className="h-6 w-24 rounded bg-input-bg" />
              <div className="h-4 w-16 rounded-full bg-input-bg" />
            </div>
          </div>

          {/* Action Buttons Skeleton (2x2 grid matching ProductCard.jsx) */}
          <div className="grid grid-cols-2 gap-2 pt-3 border-t border-border-main/50">
            <div className="h-9 rounded-xl bg-input-bg" />
            <div className="h-9 rounded-xl bg-input-bg" />
            <div className="h-9 rounded-xl bg-input-bg" />
            <div className="h-9 rounded-xl bg-input-bg" />
          </div>
        </div>
      ))}
    </div>
  );

  // If cardsOnly is requested, return only the grid
  if (cardsOnly) {
    return (
      <div
        className={`w-full animate-pulse ${className}`.trim()}
        role="status"
        aria-busy="true"
        aria-label="Loading products"
      >
        <span className="sr-only">Loading products...</span>
        {cardsGrid}
      </div>
    );
  }

  // Full Page Skeleton
  return (
    <div
      className={`space-y-4 p-5 animate-pulse ${className}`.trim()}
      role="status"
      aria-busy="true"
      aria-label="Loading products management"
    >
      <span className="sr-only">Loading products dashboard...</span>

      {/* ─── 1. Header Banner & Status Cards Skeleton ─── */}
      <div className="space-y-4">
        {/* Banner Skeleton */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
          {/* Decorative Golden Swoop Graphic Placeholder */}
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

          <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Icon, Eyebrow, Title & Subtitle */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
              <div className="size-11 sm:size-12 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
              <div className="space-y-2 min-w-0">
                <div className="h-3 w-32 rounded bg-input-bg" />
                <div className="h-6 sm:h-7 w-28 sm:w-36 rounded-md bg-input-bg" />
                <div className="h-3.5 w-60 sm:w-80 rounded bg-input-bg" />
              </div>
            </div>

            {/* Right: Add Product Button Placeholder */}
            <div className="flex items-center shrink-0">
              <div className="h-10 w-full sm:w-32 rounded-xl bg-input-bg" />
            </div>
          </div>
        </div>

        {/* 4 Status Cards Skeleton */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="w-full box-border rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm flex flex-col items-start gap-3"
            >
              <div className="size-10 rounded-xl bg-input-bg border border-border-main/50" />
              <div className="space-y-1.5 w-full">
                <div className="h-7 sm:h-8 w-14 rounded-md bg-input-bg" />
                <div className="h-3.5 w-20 rounded bg-input-bg" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─── 2. Filters Section Skeleton ─── */}
      <div className="rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm space-y-4">
        {/* Row 1: Search input + Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="h-10 flex-1 rounded-xl bg-input-bg" />
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="h-10 w-24 rounded-xl bg-input-bg" />
            <div className="h-10 w-24 rounded-xl bg-input-bg" />
          </div>
        </div>

        {/* Row 2: Category & Subcategory */}
        <div className="space-y-4 pt-1">
          <div className="h-px w-full bg-border-main/60" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-1.5">
              <div className="h-4 w-16 rounded bg-input-bg" />
              <div className="h-10 w-full rounded-xl bg-input-bg" />
            </div>
            <div className="space-y-1.5">
              <div className="h-4 w-24 rounded bg-input-bg" />
              <div className="h-10 w-full rounded-xl bg-input-bg" />
            </div>
          </div>
        </div>
      </div>

      {/* ─── 3. Products Cards Grid Skeleton ─── */}
      {cardsGrid}
    </div>
  );
};

export default ProductsSkeleton;
