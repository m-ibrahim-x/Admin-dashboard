import { ImageOff } from "lucide-react";
import Button from "../../ui/Button";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80";

const extractImageUrl = (img) => {
  if (!img) return null;
  if (typeof img === "string") return img;
  if (typeof img === "object") {
    return img.url || img.secure_url || img.path || img.src || null;
  }
  return null;
};

const ProductGallery = ({
  images = [],
  name = "Product",
  selectedIndex = 0,
  onSelectIndex,
}) => {
  const rawImages = Array.isArray(images)
    ? images
    : images
    ? [images]
    : [];

  const displayImages = rawImages
    .map(extractImageUrl)
    .filter((url) => Boolean(url) && url !== "undefined");

  const validImages = displayImages.length > 0 ? displayImages : [FALLBACK_IMAGE];
  const activeImage = validImages[selectedIndex] || validImages[0];

  return (
    <div className="rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
      {/* Main Image Display */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-border-main bg-input-bg/40 flex items-center justify-center">
        {activeImage ? (
          <img
            src={activeImage}
            alt={name || "Product"}
            className="h-full w-full object-cover object-center transition-all duration-300"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = FALLBACK_IMAGE;
            }}
          />
        ) : (
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-text-secondary">
            <ImageOff size={36} className="opacity-40" />
            <p className="text-xs font-medium">No image available</p>
          </div>
        )}

        {/* Image Counter Badge */}
        {validImages.length > 1 && (
          <div className="absolute bottom-3 right-3 rounded-full bg-card-bg/90 backdrop-blur-xs border border-border-main/80 px-2.5 py-0.5 text-[11px] font-semibold tabular-nums text-text-primary shadow-xs">
            {selectedIndex + 1} / {validImages.length}
          </div>
        )}
      </div>

      {/* Thumbnails Row */}
      {validImages.length > 1 && (
        <div className="mt-4 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
          {validImages.map((src, i) => {
            const isSelected = selectedIndex === i;
            return (
              <Button
                key={i}
                type="button"
                shine={false}
                onClick={() => onSelectIndex?.(i)}
                aria-label={`View product image ${i + 1}`}
                className={`group relative h-16 w-20 sm:h-20 sm:w-24 shrink-0 overflow-hidden rounded-xl border-2 p-0 transition-all bg-input-bg/60 ${
                  isSelected
                    ? "border-brand-active ring-2 ring-brand-active/20"
                    : "border-border-main/60 opacity-60 hover:opacity-100 hover:border-brand-active/40"
                }`}
              >
                <img
                  src={src}
                  alt=""
                  className="h-full w-full object-cover object-center transition-transform duration-200 group-hover:scale-105"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_IMAGE;
                  }}
                />
              </Button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
