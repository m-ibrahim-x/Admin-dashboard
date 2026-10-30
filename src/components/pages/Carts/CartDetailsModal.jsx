import { X } from "lucide-react";
import Button from "../../ui/Button";

export default function CartDetailsModal({
  ref,
  id = "product-details-modal",
  item = null,
  onClose,
}) {
  // Close helper for action buttons (triggers dialog's native 'close' event)
  const handleClose = (e) => {
    e?.stopPropagation();
    const dialog = ref?.current || e?.currentTarget?.closest("dialog");
    if (dialog && dialog.open) {
      dialog.close();
    }
  };

  // Safe data resolution with fallbacks for product name and numeric fields
  const productName =
    item?.name ||
    item?.title ||
    item?.product?.name ||
    item?.product?.title ||
    "Product Details";

  const price = Number(item?.price ?? item?.product?.price ?? 0);
  const quantity = Number(item?.quantity ?? 1);
  const total = Number(
    item?.total ?? (price * quantity)
  );

  return (
    <dialog
      ref={ref}
      id={id}
      onClose={onClose}
      className="m-auto w-[92%] max-w-[440px] rounded-2xl border border-border-main bg-card-bg p-6 text-text-primary shadow-2xl backdrop:bg-black/55 backdrop:backdrop-blur-xs outline-none focus:outline-none"
    >
      {/* ─── Header ─── */}
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight text-text-primary">
            Product Details
          </h2>
          <p
            className="mt-1 text-xs sm:text-sm text-text-secondary truncate"
            title={productName}
          >
            {productName}
          </p>
        </div>

        <Button
          type="button"
          shine={false}
          onClick={handleClose}
          aria-label="Close modal"
          className="rounded-lg p-1 text-text-secondary hover:text-text-primary hover:bg-input-bg border-transparent"
        >
          <X size={18} />
        </Button>
      </div>

      {/* ─── Breakdown: Price, Quantity, Total ─── */}
      <div className="my-6 space-y-3.5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-text-secondary">Price</span>
          <span className="font-bold tabular-nums text-text-primary">
            ${price.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-text-secondary">Quantity</span>
          <span className="font-bold tabular-nums text-text-primary">
            {quantity}
          </span>
        </div>

        <div className="flex items-center justify-between text-base">
          <span className="font-bold text-text-primary">Total</span>
          <span className="font-bold tabular-nums text-text-primary">
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* ─── Action Button (Close) ─── */}
      <Button
        type="button"
        shine={true}
        onClick={handleClose}
        className="w-full rounded-xl bg-brand-active hover:bg-brand-hover text-bg-main font-semibold py-3 px-4 text-center"
      >
        Close
      </Button>
    </dialog>
  );
}
