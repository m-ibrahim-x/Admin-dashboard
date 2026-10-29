import { useState, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { 
  Star, 
  Eye, 
  SquarePen, 
  Trash2, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

/**
 * Offline SVG placeholder for products without images
 */
const FALLBACK_IMAGE = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400'%3E%3Crect width='100%25' height='100%25' fill='%231a1b1d'/%3E%3Ctext x='50%25' y='50%25' font-family='sans-serif' font-size='18' font-weight='600' fill='%235a5955' text-anchor='middle' dominant-baseline='middle'%3ENo Image Available%3C/text%3E%3C/svg%3E";

/**
 * Currency formatter that preserves custom currency symbols and avoids misleading $0 fallbacks.
 */
const formatPrice = (val, currency = '$') => {
  if (val === null || val === undefined || val === '') return null;
  const strVal = String(val).trim();
  if (/^[^0-9\s]/.test(strVal)) return strVal;
  const num = Number(strVal);
  if (Number.isNaN(num)) return strVal;
  return `${currency}${num.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
};

/**
 * ProductCard UI Component
 * 
 * Reusable product card component built strictly for UI presentation.
 * Follows the approved design reference:
 * - Rounded container with theme tokens (Light & Dark Mode)
 * - Centered product image gallery with Swiper integration (~30% card height)
 * - Single image hides controls; multiple images display arrows & dots continuously
 * - Featured badge at upper-left with solid black star
 * - Stock status badge at lower-right of gallery
 * - Product name (1-line truncated), metadata, description (2-line truncated)
 * - Prominent price & strikethrough discount/previous price
 * - Compact wrapping tags
 * - 3 action buttons reusing Button.jsx (View Details, Edit, Delete)
 */
const ProductCard = ({ product, item, onDelete, isDeleting = false, className = '' }) => {

  const navigate = useNavigate();

  const data = useMemo(() => product || item || {}, [product, item]);
  const productId = data._id || data.id;

  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // ─── Images Normalization ───────────────────────────────────────────────────
  const imagesList = useMemo(() => {
    let rawImages = [];

    if (Array.isArray(data.images) && data.images.length > 0) {
      rawImages = data.images;
    } else if (Array.isArray(data.image) && data.image.length > 0) {
      rawImages = data.image;
    } else if (data.images) {
      rawImages = [data.images];
    } else if (data.image) {
      rawImages = [data.image];
    } else if (data.imageUrl) {
      rawImages = [data.imageUrl];
    } else if (data.coverImage) {
      rawImages = [data.coverImage];
    } else if (data.thumbnail) {
      rawImages = [data.thumbnail];
    } else if (data.img) {
      rawImages = [data.img];
    }

    const cleaned = rawImages
      .map((img) => {
        if (!img) return null;
        if (typeof img === 'string') return img.trim();
        if (typeof img === 'object') {
          return img.url || img.secure_url || img.src || img.path || null;
        }
        return null;
      })
      .filter((url) => Boolean(url && url !== 'undefined' && url !== 'null'));

    return cleaned.length > 0 ? cleaned : [FALLBACK_IMAGE];
  }, [data]);

  const hasMultipleImages = imagesList.length > 1;

  // ─── Product Fields ─────────────────────────────────────────────────────────
  const name = data.name || data.title || 'Untitled Product';
  
  const categoryMeta = [
    data.category?.name || data.category,
    data.subcategory || data.subCategory,
    data.brand
  ]
    .filter(Boolean)
    .map((entry) => String(entry).trim())
    .join(' • ');

  const description = data.description || data.shortDescription || '';

  // Pricing & Currency
  const currencySymbol = data.currency || '$';
  const formattedCurrentPrice = formatPrice(data.price, currencySymbol);

  const formattedOldPrice = useMemo(() => {
    if (data.discountText) return data.discountText;
    if (data.discount || data.discountPrice) {
      const discountVal = data.discount || data.discountPrice;
      const formatted = formatPrice(discountVal, currencySymbol);
      if (formatted) return `-${formatted} off`;
    }
    if (data.oldPrice || data.originalPrice) {
      return formatPrice(data.oldPrice || data.originalPrice, currencySymbol);
    }
    return null;
  }, [data.discountText, data.discount, data.discountPrice, data.oldPrice, data.originalPrice, currencySymbol]);

  // Tags
  const tagsList = useMemo(() => {
    const rawTags = data.tags || [];
    if (Array.isArray(rawTags)) {
      return rawTags
        .map((tag) => {
          if (!tag) return null;
          if (typeof tag === 'string') return tag.trim().replace(/^#/, '');
          if (typeof tag === 'object') return (tag.name || tag.label || tag.title || '').trim().replace(/^#/, '');
          return String(tag).trim().replace(/^#/, '');
        })
        .filter(Boolean);
    }
    if (typeof rawTags === 'string' && rawTags.trim()) {
      return rawTags.split(',').map((t) => t.trim().replace(/^#/, '')).filter(Boolean);
    }
    return [];
  }, [data.tags]);

  // Badges & Stock State
  const isFeatured = Boolean(data.featured ?? data.isFeatured);
  const featuredBadgeText = data.featuredBadgeText || data.featuredText || 'Featured';

  // Active status badge (displayed only when product data explicitly provides/enables it)
  const showActiveBadge = Boolean(data.showActiveBadge || (data.activeBadgeText && data.active));
  const activeBadgeText = data.activeBadgeText || 'Active';

  const hasStockData = data.stock !== undefined && data.stock !== null;
  const stockNumber = hasStockData ? Number(data.stock) : null;
  const isOutOfStock = hasStockData && !Number.isNaN(stockNumber) && stockNumber <= 0;
  const isInStock = hasStockData && !Number.isNaN(stockNumber) && stockNumber > 0;

  const stockStatusText = useMemo(() => {
    if (data.stockStatus) return data.stockStatus;
    if (data.inventoryStatus) return data.inventoryStatus;
    if (data.stockLabel) return data.stockLabel;
    if (isOutOfStock) return 'Out of stock';
    if (isInStock) return `${stockNumber} in stock`;
    return null;
  }, [data.stockStatus, data.inventoryStatus, data.stockLabel, isOutOfStock, isInStock, stockNumber]);

  // Gallery Navigation Handlers (Wrap-around enabled)
  const handlePrev = (e) => {
    e.stopPropagation();
    if (!swiperInstance) return;
    if (swiperInstance.isBeginning) {
      swiperInstance.slideTo(imagesList.length - 1);
    } else {
      swiperInstance.slidePrev();
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (!swiperInstance) return;
    if (swiperInstance.isEnd) {
      swiperInstance.slideTo(0);
    } else {
      swiperInstance.slideNext();
    }
  };

  const imageFitClass = data.imageFit === 'contain' ? 'object-contain' : 'object-cover';

  return (
    <article 
      className={`group bg-card-bg border border-border-main rounded-3xl overflow-hidden flex flex-col w-full shadow-sm hover:shadow-md 
        hover:border-brand-active/40 transition-all duration-300 h-full ${className}`}
      aria-label={name}
    >
      {/* ─── Gallery Section (~30% card visual height) ───────────────────────── */}
      <div className="relative w-full h-[220px] xs:h-[230px] sm:h-[240px] bg-bg-main overflow-hidden rounded-t-3xl select-none">
        <Swiper
          onSwiper={setSwiperInstance}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          grabCursor={hasMultipleImages}
          className="w-full h-full"
        >
          {imagesList.map((src, index) => (
            <SwiperSlide key={index} className="w-full h-full flex items-center justify-center">
              <img
                src={src}
                alt={`${name} - preview ${index + 1}`}
                className={`w-full h-full ${imageFitClass} object-center transition-transform duration-500 group-hover:scale-105`}
                data-visualcompletion="ignore"
                draggable={false}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = FALLBACK_IMAGE;
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Gallery Previous / Next Controls (Multi-image only, continuously visible) */}
        {hasMultipleImages && (
          <>
            <Button
              type="button"
              shine={false}
              onClick={handlePrev}
              aria-label="Previous image"
              className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 size-7 sm:size-8 rounded-full bg-black/60 hover:bg-black/85 text-white p-0 border-transparent backdrop-blur-xs shadow-md"
            >
              <ChevronLeft className="w-4 h-4 text-white" aria-hidden="true" />
            </Button>
            <Button
              type="button"
              shine={false}
              onClick={handleNext}
              aria-label="Next image"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 size-7 sm:size-8 rounded-full bg-black/60 hover:bg-black/85 text-white p-0 border-transparent backdrop-blur-xs shadow-md"
            >
              <ChevronRight className="w-4 h-4 text-white" aria-hidden="true" />
            </Button>

            {/* Pagination Indicators (Bottom center, continuously visible) */}
            <div 
              className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 px-2 py-1 rounded-full bg-black/40 
              backdrop-blur-xs pointer-events-auto"
              role="tablist"
              aria-label="Image gallery pagination"
            >
              {imagesList.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    swiperInstance?.slideTo(idx);
                  }}
                  role="tab"
                  aria-selected={idx === activeIndex}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-brand-active ${
                    idx === activeIndex 
                      ? 'bg-brand-active w-4' 
                      : 'bg-white/60 hover:bg-white w-1.5'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Featured Badge (Upper-left, solid black star) */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-active text-bg-main text-xs font-bold shadow-md">
              <Star className="w-3.5 h-3.5 text-black fill-black shrink-0" aria-hidden="true" />
              <span>{featuredBadgeText}</span>
            </span>
          </div>
        )}

        {/* Optional Active Badge (Displayed only when explicitly configured) */}
        {showActiveBadge && (
          <div className="absolute top-3 right-3 z-10 pointer-events-none">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-card-bg/90 backdrop-blur-md text-status-success border 
            border-status-success/30 text-xs font-semibold shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-status-success shrink-0" aria-hidden="true" />
              <span>{activeBadgeText}</span>
            </span>
          </div>
        )}

        {/* Inventory / Stock Status Badge (Lower-right corner of image) */}
        {stockStatusText && (
          <span
            className={`absolute bottom-3 right-3 z-20 text-xs font-medium px-3 py-1 rounded-full backdrop-blur-md shadow-md pointer-events-none 
              transition-colors border ${
              isOutOfStock
                ? 'bg-black/65 text-status-danger border-status-danger/30'
                : 'bg-black/65 text-brand-active border-brand-active/30'
            }`}
          >
            {stockStatusText}
          </span>
        )}
      </div>

      {/* ─── Product Information Section ───────────────────────────────────── */}
      <div className="p-5 flex flex-col flex-1 justify-between">
        <div className="flex-1 min-w-0">
          {/* 1. Product Name */}
          <h3 
            className="text-lg sm:text-xl font-bold text-text-primary tracking-tight mb-1 line-clamp-1"
            title={name}
          >
            {name}
          </h3>

          {/* 2. Category & Brand Metadata */}
          {categoryMeta && (
            <p 
              className="text-[10px] sm:text-[11px] font-bold text-text-secondary uppercase tracking-wider mb-2.5 line-clamp-1"
              title={categoryMeta}
            >
              {categoryMeta}
            </p>
          )}

          {/* 3. Short Description */}
          {description && (
            <p 
              className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4 line-clamp-2"
              title={description}
            >
              {description}
            </p>
          )}

          {/* 4 & 5. Pricing Section (Current & Strikethrough Previous Price) */}
          {formattedCurrentPrice && (
            <div className="flex items-baseline gap-2.5 mb-4">
              <span className="text-2xl sm:text-3xl font-extrabold text-brand-active">
                {formattedCurrentPrice}
              </span>
              {formattedOldPrice && (
                <span className="text-xs sm:text-sm font-semibold text-text-secondary line-through">
                  {formattedOldPrice}
                </span>
              )}
            </div>
          )}

          {/* 6. Product Tags */}
          {tagsList.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-4">
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="bg-input-bg border border-border-main text-text-secondary text-xs px-2.5 py-1 rounded-lg font-normal"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* ─── Subtle Divider & Exactly 3 Action Buttons (View Details, Edit, Delete) ─────────── */}
        <div className="grid grid-cols-2 gap-2 pt-4 border-t border-border-main mt-auto">
          {/* Action 1: View Details */}
          <Button
            type="button"
            shine={false}
            onClick={() => navigate(`/products/${productId}`)}
            className="w-full rounded-xl bg-input-bg text-text-primary hover:bg-border-main text-xs font-semibold py-2.5 cursor-pointer"
            leftIcon={<Eye className="w-4 h-4 shrink-0 text-text-secondary" aria-hidden="true" />}
            aria-label={`View details for ${name}`}
          >
            View Details
          </Button>

          {/* Action 2: Edit */}
          <Button
            type="button"
            shine={false}
            onClick={() => navigate(`/products/edit/${productId}`)}
            className="w-full rounded-xl bg-input-bg text-text-primary hover:bg-border-main text-xs font-semibold py-2.5 cursor-pointer"
            leftIcon={<SquarePen className="w-4 h-4 shrink-0 text-text-secondary" aria-hidden="true" />}
            aria-label={`Edit ${name}`}
          >
            Edit
          </Button>

          {/* Action 3: Delete */}
          <Button
            type="button"
            variant="danger"
            shine={false}
            disabled={isDeleting}
            isLoading={isDeleting}
            loadingText="Deleting..."
            onClick={() => onDelete?.(productId)}
            className="col-span-2 w-full rounded-xl bg-status-danger/10 text-status-danger hover:bg-status-danger/20 text-xs font-semibold py-2.5 cursor-pointer"
            leftIcon={<Trash2 className="w-4 h-4 shrink-0 text-status-danger" aria-hidden="true" />}
            aria-label={`Delete ${name}`}
          >
            Delete
          </Button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
