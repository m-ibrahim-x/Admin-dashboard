import { Tag, Folder, Layers, DollarSign, Percent, PackageCheck, Barcode } from "lucide-react";

const ProductDetails = ({ product = {} }) => {
  const {
    name = "Product Name",
    description = "No description provided.",
    price = 0,
    discountPrice,
    discount,
    stock = 0,
    sku = "-",
    tags = [],
    category,
    subcategory,
    brand,
  } = product;

  // Resolve category display string
  const categoryDisplay =
    typeof category === "object" && category !== null
      ? category.name
      : category;

  const subcategoryDisplay =
    typeof subcategory === "object" && subcategory !== null
      ? subcategory.name
      : subcategory;

  const effectiveDiscount = discountPrice ?? discount;

  // Stock status helper
  const numStock = Number(stock) || 0;
  const isOutOfStock = numStock <= 0;
  const isLowStock = numStock > 0 && numStock <= 5;

  return (
    <div className="space-y-4">
      {/* 1. Overview Card */}
      <div className="rounded-2xl border border-border-main bg-card-bg p-5 sm:p-6 shadow-sm">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active mb-1.5">
          Overview
        </p>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-text-primary mb-3">
          {name}
        </h2>
        <p className="text-sm leading-relaxed text-text-secondary whitespace-pre-line">
          {description}
        </p>

        {brand && (
          <div className="mt-4 pt-3 border-t border-border-main/60 flex items-center gap-2 text-xs text-text-secondary">
            <span className="font-semibold text-text-primary">Brand:</span>
            <span>{brand}</span>
          </div>
        )}
      </div>

      {/* 2. Key Metrics Grid (Price, Discount, Stock, SKU) */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Price */}
        <div className="rounded-xl border border-border-main bg-card-bg p-4 shadow-sm transition-colors hover:border-brand-active/30">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
              Price
            </p>
            <DollarSign className="size-3.5 text-text-secondary/70" />
          </div>
          <p className="text-lg sm:text-xl font-bold tabular-nums text-text-primary">
            ${Number(price).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Discount */}
        <div className="rounded-xl border border-border-main bg-card-bg p-4 shadow-sm transition-colors hover:border-brand-active/30">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
              Discount
            </p>
            <Percent className="size-3.5 text-brand-active/70" />
          </div>
          <p className="text-lg sm:text-xl font-bold tabular-nums text-brand-active">
            {effectiveDiscount !== null && effectiveDiscount !== undefined && effectiveDiscount !== ""
              ? `$${Number(effectiveDiscount).toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`
              : "-"}
          </p>
        </div>

        {/* Stock */}
        <div className="rounded-xl border border-border-main bg-card-bg p-4 shadow-sm transition-colors hover:border-brand-active/30">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
              Stock
            </p>
            <PackageCheck className="size-3.5 text-text-secondary/70" />
          </div>
          <div className="flex items-baseline gap-2">
            <p className="text-lg sm:text-xl font-bold tabular-nums text-text-primary">
              {numStock}
            </p>
            <span
              className={`text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                isOutOfStock
                  ? "bg-status-danger/10 text-status-danger"
                  : isLowStock
                  ? "bg-status-warning/10 text-status-warning"
                  : "bg-status-success/10 text-status-success"
              }`}
            >
              {isOutOfStock ? "Out" : isLowStock ? "Low" : "In Stock"}
            </span>
          </div>
        </div>

        {/* SKU */}
        <div className="rounded-xl border border-border-main bg-card-bg p-4 shadow-sm transition-colors hover:border-brand-active/30">
          <div className="flex items-center justify-between mb-1">
            <p className="text-[11px] font-bold uppercase tracking-wider text-text-secondary">
              SKU
            </p>
            <Barcode className="size-3.5 text-text-secondary/70" />
          </div>
          <p className="truncate text-base sm:text-lg font-bold tabular-nums text-text-primary" title={sku}>
            {sku || "-"}
          </p>
        </div>
      </div>

      {/* 3. Tags Card */}
      {Array.isArray(tags) && tags.length > 0 && (
        <div className="rounded-xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-3">
            <span className="grid size-7 place-items-center rounded-lg border border-brand-active/20 bg-active-bg text-brand-active">
              <Tag size={13} />
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
              Tags
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, idx) => {
              const label = typeof tag === "object" && tag !== null ? tag.name : tag;
              return (
                <span
                  key={typeof tag === "string" ? tag : idx}
                  className="inline-flex items-center rounded-full border border-brand-active/20 bg-brand-active/10 px-3 py-1 text-xs font-semibold text-brand-active"
                >
                  #{label}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. Category Info Card */}
      {(categoryDisplay || subcategoryDisplay) && (
        <div className="rounded-xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2.5">
            <span className="grid size-7 place-items-center rounded-lg border border-brand-active/20 bg-active-bg text-brand-active">
              <Folder size={13} />
            </span>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
              Category Info
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {categoryDisplay && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border border-border-main bg-input-bg/70 px-2.5 py-1 text-xs font-medium text-text-primary">
                <Layers size={13} className="text-brand-active" />
                {categoryDisplay}
              </span>
            )}
            {subcategoryDisplay && (
              <span className="text-xs text-text-secondary">
                / {subcategoryDisplay}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
