import { ArrowLeft, Eye, SquarePen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/Button";

const ProductViewHeader = ({ product }) => {
  const navigate = useNavigate();
  const productId = product?._id || product?.id;

  return (
    <div className="relative overflow-hidden rounded-xl border border-border-main bg-card-bg p-4 shadow-sm sm:rounded-2xl sm:p-5">
      {/* Decorative Golden Swoop Graphic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 select-none overflow-hidden opacity-90 sm:w-52 md:w-64"
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
        {/* Left Content */}
        <div className="flex min-w-0 flex-1 flex-col gap-3">
          {/* Back Button */}
          <div>
            <Button
              type="button"
              shine={false}
              onClick={() => navigate("/products")}
              leftIcon={<ArrowLeft size={15} />}
              className="h-8 cursor-pointer rounded-full border border-border-main bg-input-bg/70 px-3.5 text-xs font-semibold text-text-secondary shadow-none transition-colors hover:border-brand-active/40 hover:text-brand-active"
            >
              Back to products
            </Button>
          </div>

          {/* Title and Icon */}
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-md shadow-brand-active/20 sm:size-12">
              <Eye className="size-5 sm:size-6" strokeWidth={2} />
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                PRODUCT VIEW
              </p>
              <h1 className="truncate text-lg font-bold tracking-tight text-text-primary sm:text-xl lg:text-2xl">
                {product?.name || "Product Details"}
              </h1>
            </div>
          </div>

          <p className="max-w-xl text-xs text-text-secondary sm:text-[13px]">
            Product details overview and inventory specifications
          </p>
        </div>

        {/* Action Button: Edit Product */}
        {productId && (
          <div className="relative z-10 flex shrink-0 items-center gap-2.5">
            <Button
              type="button"
              shine={false}
              onClick={() => navigate(`/products/edit/${productId}`)}
              leftIcon={<SquarePen size={15} />}
              className="h-9 cursor-pointer rounded-xl bg-brand-active px-4 text-xs font-semibold text-bg-main shadow-sm transition-all hover:bg-brand-hover hover:shadow-brand-active/20"
            >
              Edit Product
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductViewHeader;
