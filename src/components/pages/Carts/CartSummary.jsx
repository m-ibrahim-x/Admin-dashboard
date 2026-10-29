
import { Trash2 } from "lucide-react";
import Button from "../../ui/Button";

export default function CartSummary({
  summary,
  onClearCarts
}) {
  const subtotal = Number(summary?.subtotal ?? 0);
  const discount = Number(summary?.discount ?? 0);
  const couponCode = summary?.couponCode || "NONE";
  const totalAmount = Number(summary?.totalAmount ?? 0);

  return (
    <aside className="rounded-2xl border border-border-main border-t-[3px] border-t-brand-active bg-card-bg p-5 sm:p-6 shadow-sm flex flex-col">
      {/* Header */}
      <div className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
          CHECKOUT TOTAL
        </p>

        <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mt-0.5">
          Order Summary
        </h3>
      </div>

      {/* Summary Rows */}
      <div className="space-y-3.5 text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-text-secondary">
            Subtotal
          </span>

          <span className="font-semibold tabular-nums text-text-primary">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-text-secondary">
            Discount
          </span>

          <span className="font-semibold tabular-nums text-status-warning">
            -${discount.toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-text-secondary">
            Coupon Code
          </span>

          <span className="font-bold text-brand-active uppercase tracking-wide">
            {couponCode}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="my-4 h-px w-full bg-border-main" />

      {/* Grand Total */}
      <div className="flex items-baseline justify-between mb-6">
        <span className="text-sm sm:text-base font-bold text-text-primary">
          Total Amount
        </span>

        <span className="text-2xl sm:text-3xl font-extrabold text-brand-active tabular-nums tracking-tight">
          ${totalAmount.toFixed(2)}
        </span>
      </div>

      {/* Actions */}
      <div className="space-y-2.5">
        <Button
          onClick={onClearCarts}
          shine={false}
          className="w-full rounded-xl border border-border-main bg-input-bg py-2.5 text-xs sm:text-sm font-semibold text-text-primary hover:bg-border-main transition-colors shadow-none cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2">
            <Trash2 className="size-4 text-text-secondary" />
            <span>Clear Cart Session</span>
          </div>
        </Button>
      </div>
    </aside>
  );
}
