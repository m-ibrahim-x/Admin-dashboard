import { ImagePlus, X, Sparkles, UploadCloud } from "lucide-react";

/**
 * AddGalleryForm Component (UI Only)
 *
 * Presentation component for product image gallery, preview cards,
 * upload dropzone, and rotating product tips card.
 */
const AddGalleryForm = () => {
  // Static dummy images for presentation and design layout preview
  const previewImages = [
    {
      id: 1,
      title: "Cover Photo",
      url: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
      badge: "Primary",
    },
    {
      id: 2,
      title: "Side Angle",
      url: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=600&auto=format&fit=crop",
      badge: "Gallery",
    },
  ];

  const tips = [
    "High-quality photos from multiple angles increase buyer trust.",
    "Products with 3+ tags get discovered 45% more often in search.",
    "Clear, specific product names rank higher than generic titles.",
  ];

  return (
    <div className="space-y-6 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:rounded-3xl sm:p-6">
      {/* ─── 1. Section Header ─── */}
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand-active/20 bg-brand-active/10 text-brand-active sm:size-12">
          <ImagePlus className="size-5 sm:size-6" strokeWidth={1.8} />
        </div>
        <div>
          <h2 className="text-base font-bold text-text-primary sm:text-lg">
            Gallery
          </h2>
          <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
            Upload multiple images and preview them instantly.
          </p>
        </div>
      </div>

      {/* ─── 2. Image Previews Grid ─── */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {previewImages.map((img, idx) => (
          <article
            key={img.id}
            className="group relative overflow-hidden rounded-2xl border border-border-main bg-input-bg shadow-xs transition-all duration-200 hover:border-brand-active/40"
          >
            {/* Image Box */}
            <div className="relative h-36 w-full overflow-hidden bg-input-bg sm:h-44">
              <img
                src={img.url}
                alt={img.title}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />

              {/* Tag / Badge */}
              <div className="absolute left-2.5 top-2.5">
                <span className="rounded-lg border border-border-main/40 bg-card-bg/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-primary backdrop-blur-xs">
                  {img.badge}
                </span>
              </div>

              {/* Hover Delete Button (UI Only) */}
              <button
                type="button"
                aria-label={`Remove ${img.title}`}
                className="absolute right-2.5 top-2.5 flex size-7 cursor-pointer items-center justify-center rounded-full bg-card-bg/90 text-text-secondary opacity-0 shadow-sm backdrop-blur-xs transition-all duration-200 hover:bg-status-danger hover:text-white group-hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="flex items-center justify-between px-3 py-2 text-[11px] font-semibold tracking-wider text-text-secondary uppercase">
              <span>Image {idx + 1}</span>
              <span className="text-[10px] text-text-secondary/70 lowercase">
                jpg • 1.2mb
              </span>
            </div>
          </article>
        ))}
      </div>

      {/* ─── 3. Upload Dropzone ─── */}
      <label className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-active/40 bg-active-bg/30 p-6 text-center transition-all duration-200 hover:border-brand-active hover:bg-active-bg/60 sm:rounded-3xl sm:p-8">
        <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-active/10 text-brand-active transition-transform duration-200 group-hover:scale-110">
          <UploadCloud className="size-6" strokeWidth={1.8} />
        </div>

        <div>
          <p className="text-sm font-semibold text-text-primary sm:text-base">
            Upload product images
          </p>
          <p className="mt-0.5 text-xs text-text-secondary">
            PNG, JPG, WEBP • Multiple files supported
          </p>
          <p className="mt-1 text-[11px] font-medium text-brand-active">
            Up to 5 images • Max 5MB each
          </p>
        </div>

        {/* Pure visual file input */}
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          tabIndex={-1}
          aria-hidden="true"
          readOnly
        />
      </label>

      {/* ─── 4. Product Tips Card (Pure CSS Animation) ─── */}
      <div className="relative overflow-hidden rounded-2xl border border-brand-active/30 bg-active-bg/40 p-4 text-brand-active sm:rounded-3xl sm:p-5">
        <div className="flex items-center gap-3">
          <div
            className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-brand-active/20 text-brand-active"
            style={{ animation: "floatTipIcon 3s ease-in-out infinite" }}
          >
            <Sparkles size={18} />
          </div>
          <h3 className="text-sm font-bold sm:text-base">
            Product Tips
          </h3>
        </div>

        {/* Animated Carousel Content via CSS Keyframes */}
        <div className="relative mt-3 h-12 overflow-hidden sm:h-14">
          <div
            className="space-y-3"
            style={{ animation: "cycleTips 9s ease-in-out infinite" }}
          >
            {tips.map((tip, i) => (
              <div key={i} className="h-12 sm:h-14">
                <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
                  {tip}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Indicator Dots */}
        <div className="mt-3 flex items-center gap-1.5">
          <span className="h-1.5 w-5 rounded-full bg-brand-active transition-all" />
          <span className="h-1.5 w-2 rounded-full bg-brand-active/30" />
          <span className="h-1.5 w-2 rounded-full bg-brand-active/30" />
        </div>

        {/* CSS Keyframe Definitions */}
        <style>{`
          @keyframes floatTipIcon {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-4px); }
          }
          @keyframes cycleTips {
            0%, 28% { transform: translateY(0); }
            33%, 61% { transform: translateY(-3.75rem); }
            66%, 95% { transform: translateY(-7.5rem); }
            100% { transform: translateY(0); }
          }
        `}</style>
      </div>
    </div>
  );
};

export default AddGalleryForm;
