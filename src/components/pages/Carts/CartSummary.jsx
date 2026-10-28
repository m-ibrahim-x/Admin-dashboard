import { ArrowRight, Trash2 } from "lucide-react";
import Button from "../../ui/Button";

export default function CartSummary({
  summary = {
    subtotal: 349.97,
    discount: 50.0,
    couponCode: "SUMMER2026",
    estimatedTax: 0.0,
    totalAmount: 299.97,
  },
  onCheckout,
  onClearCart,
}) {
  return (
    <aside className="rounded-2xl border border-border-main border-t-[3px] border-t-brand-active bg-card-bg p-5 sm:p-6 shadow-sm flex flex-col">
      {/* ─── Header ─── */}
      <div className="mb-5">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
          CHECKOUT TOTAL
        </p>
        <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mt-0.5">
          Order Summary
        </h3>
      </div>

      {/* ─── Summary Rows ─── */}
      <div className="space-y-3.5 text-xs sm:text-sm">
        <div className="flex items-center justify-between">
          <span className="font-medium text-text-secondary">Subtotal</span>
          <span className="font-semibold tabular-nums text-text-primary">
            ${Number(summary.subtotal).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-text-secondary">Discount</span>
          <span className="font-semibold tabular-nums text-status-warning">
            -${Number(summary.discount).toFixed(2)}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-text-secondary">Coupon Code</span>
          <span className="font-bold text-brand-active uppercase tracking-wide">
            {summary.couponCode}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="font-medium text-text-secondary">Estimated Tax</span>
          <span className="font-semibold tabular-nums text-text-primary">
            ${Number(summary.estimatedTax).toFixed(2)}
          </span>
        </div>
      </div>

      {/* ─── Divider ─── */}
      <div className="my-4 h-px w-full bg-border-main" />

      {/* ─── Grand Total Row ─── */}
      <div className="flex items-baseline justify-between mb-6">
        <span className="text-sm sm:text-base font-bold text-text-primary">
          Total Amount
        </span>
        <span className="text-2xl sm:text-3xl font-extrabold text-brand-active tabular-nums tracking-tight">
          ${Number(summary.totalAmount).toFixed(2)}
        </span>
      </div>

      {/* ─── Action Buttons using shared Button component ─── */}
      <div className="space-y-2.5">
        <Button
          onClick={onCheckout}
          className="w-full rounded-xl bg-brand-active py-3 text-xs sm:text-sm font-semibold text-bg-main hover:bg-brand-hover shadow-md shadow-brand-active/20 transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center gap-2">
            <ArrowRight className="size-4" />
            <span>Proceed to Checkout</span>
          </div>
        </Button>

        <Button
          onClick={onClearCart}
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
