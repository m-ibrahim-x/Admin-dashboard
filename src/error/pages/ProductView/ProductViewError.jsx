import { AlertCircle, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/ui/Button";

/**
 * ProductViewError Component
 *
 * Dedicated error state component for the Product Details (ProductView) page.
 * Displays an error alert card with a fallback message and back-navigation.
 *
 * @param {Object} props
 * @param {string} [props.message="Failed to load product details. Please try again."] - Error or not-found message.
 */
const ProductViewError = ({
  message = "Failed to load product details. Please try again.",
}) => {
  const navigate = useNavigate();

  return (
    <div
      className="space-y-6 p-4 sm:p-6 min-w-0"
      role="alert"
      aria-live="assertive"
    >
      {/* Top Navigation */}
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

      {/* Error Card */}
      <section className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-main bg-card-bg p-6 sm:p-8 text-center shadow-sm">
        {/* Error Icon */}
        <div className="flex size-12 items-center justify-center rounded-2xl border border-status-danger/20 bg-status-danger/10 text-status-danger mb-3 shadow-xs">
          <AlertCircle className="size-6" strokeWidth={2} />
        </div>

        {/* Error Heading */}
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
          Failed to Load Product
        </h3>

        {/* Error Message */}
        <p className="mt-1.5 max-w-md text-xs sm:text-sm text-text-secondary leading-relaxed">
          {message}
        </p>

        {/* Action Button */}
        <div className="mt-5 flex items-center gap-3">
          <Button
            type="button"
            shine={false}
            onClick={() => navigate("/products")}
            leftIcon={<ArrowLeft size={16} />}
            className="h-9 rounded-xl border border-border-main bg-input-bg px-4 text-xs font-semibold text-text-primary hover:bg-border-main cursor-pointer"
          >
            Back to products
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProductViewError;
