/**
 * EditProductSkeleton Component
 *
 * Dedicated loading skeleton for the Edit Product page.
 * Replicates the actual page architecture and form sections:
 * 1. Top Header Banner (Hero, back button, title, and action placeholder)
 * 2. Two-Column Layout (12-column grid):
 *    - Left (col-span-5): Gallery section, image upload dropzone, tips card
 *    - Right (col-span-7): Full product specifications form (name, description, prices, stock, categories, tags, toggles)
 *
 * @param {Object} props
 * @param {string} [props.className=""] - Additional custom class names.
 */
const EditProductSkeleton = ({ className = "" }) => {
  return (
    <div
      className={`space-y-6 p-4 sm:p-6 min-w-0 animate-pulse ${className}`.trim()}
      role="status"
      aria-busy="true"
      aria-label="Loading product editor"
    >
      <span className="sr-only">Loading product editor...</span>

      {/* ─── 1. Page Header Skeleton ─── */}
      <div className="relative overflow-hidden rounded-xl border border-border-main bg-card-bg p-4 shadow-sm sm:rounded-2xl sm:p-5">
        {/* Decorative Golden Graphic Placeholder */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 select-none overflow-hidden opacity-20 sm:w-52 md:w-64"
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

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 flex-1 flex-col gap-3">
            {/* Back Button Placeholder */}
            <div className="h-8 w-32 rounded-full bg-input-bg" />

            {/* Title & Icon Placeholder */}
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="size-11 sm:size-12 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
              <div className="space-y-2 min-w-0 flex-1">
                <div className="h-3 w-28 rounded bg-input-bg" />
                <div className="h-6 sm:h-7 w-48 sm:w-64 rounded-md bg-input-bg" />
                <div className="h-3.5 w-60 sm:w-80 rounded bg-input-bg" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 2. Main Two-Column Layout ─── */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* ─── Left Column: Gallery & Uploads Skeleton (col-span-5) ─── */}
        <div className="lg:col-span-5 space-y-5">
          <div className="space-y-4 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:rounded-3xl sm:p-6">
            {/* Gallery Section Header */}
            <div className="flex items-center gap-3 border-b border-border-main/60 pb-4">
              <div className="size-11 sm:size-12 rounded-2xl bg-input-bg shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-32 rounded bg-input-bg" />
                <div className="h-3 w-48 rounded bg-input-bg" />
              </div>
            </div>

            {/* Gallery Image Previews (2x2 grid) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="h-36 sm:h-44 rounded-2xl bg-input-bg" />
              <div className="h-36 sm:h-44 rounded-2xl bg-input-bg" />
            </div>

            {/* Dropzone Upload Box */}
            <div className="h-36 rounded-2xl sm:rounded-3xl border-2 border-dashed border-border-main/60 bg-input-bg/40 flex flex-col items-center justify-center gap-2 p-6">
              <div className="size-10 rounded-2xl bg-input-bg" />
              <div className="h-4 w-40 rounded bg-input-bg" />
              <div className="h-3 w-24 rounded bg-input-bg" />
            </div>

            {/* Tips Card Skeleton */}
            <div className="rounded-2xl sm:rounded-3xl border border-border-main/60 bg-input-bg/30 p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-xl bg-input-bg" />
                <div className="h-4 w-28 rounded bg-input-bg" />
              </div>
              <div className="h-10 w-full rounded-xl bg-input-bg/50" />
            </div>
          </div>
        </div>

        {/* ─── Right Column: Form Fields Skeleton (col-span-7) ─── */}
        <div className="lg:col-span-7">
          <div className="space-y-5 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:rounded-3xl sm:p-6">
            {/* Form Section Header */}
            <div className="flex items-center gap-3 border-b border-border-main/60 pb-4">
              <div className="size-11 sm:size-12 rounded-2xl bg-input-bg shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="h-4 w-36 rounded bg-input-bg" />
                <div className="h-3 w-56 rounded bg-input-bg" />
              </div>
            </div>

            {/* Product Name Field */}
            <div className="space-y-2">
              <div className="h-3.5 w-28 rounded bg-input-bg" />
              <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
            </div>

            {/* Short Description */}
            <div className="space-y-2">
              <div className="h-3.5 w-32 rounded bg-input-bg" />
              <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
            </div>

            {/* Description Textarea */}
            <div className="space-y-2">
              <div className="h-3.5 w-24 rounded bg-input-bg" />
              <div className="h-28 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
            </div>

            {/* Price & Discount Price */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-input-bg" />
                <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-28 rounded bg-input-bg" />
                <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
              </div>
            </div>

            {/* Stock & SKU */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3.5 w-24 rounded bg-input-bg" />
                <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-input-bg" />
                <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
              </div>
            </div>

            {/* Category & Subcategory */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="h-3.5 w-20 rounded bg-input-bg" />
                <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
              </div>
              <div className="space-y-2">
                <div className="h-3.5 w-24 rounded bg-input-bg" />
                <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
              </div>
            </div>

            {/* Brand */}
            <div className="space-y-2">
              <div className="h-3.5 w-16 rounded bg-input-bg" />
              <div className="h-11 sm:h-12 w-full rounded-xl sm:rounded-2xl bg-input-bg" />
            </div>

            {/* Tags Box */}
            <div className="space-y-3 rounded-2xl border border-border-main bg-input-bg/40 p-3.5 sm:p-4">
              <div className="h-3.5 w-16 rounded bg-input-bg" />
              <div className="h-10 w-full rounded-xl bg-input-bg" />
              <div className="flex gap-2">
                <div className="h-6 w-16 rounded-xl bg-input-bg" />
                <div className="h-6 w-20 rounded-xl bg-input-bg" />
                <div className="h-6 w-14 rounded-xl bg-input-bg" />
              </div>
            </div>

            {/* Checkbox Toggles */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <div className="h-12 flex-1 rounded-xl sm:rounded-2xl bg-input-bg/60" />
              <div className="h-12 flex-1 rounded-xl sm:rounded-2xl bg-input-bg/60" />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 border-t border-border-main pt-4">
              <div className="h-10 w-24 rounded-xl bg-input-bg" />
              <div className="h-10 w-28 rounded-xl bg-input-bg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProductSkeleton;
