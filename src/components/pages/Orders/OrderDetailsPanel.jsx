
import { useEffect } from "react";

import {
  X,
  Package,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
  RotateCcw,
  XCircle,
} from "lucide-react";

import Button from "../../ui/Button";

export default function OrderDetailsPanel({ order, isOpen, onClose }) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  // Format API values safely.
  const formatCurrency = (value) =>
    Number(value ?? 0).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const formatDate = (value) => {
    if (!value) return "—";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return "—";

    return date.toLocaleString(undefined, {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLabel = (value) => {
    if (!value) return "—";

    return String(value)
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  // Status badge styling — original design preserved.
  const getStatusBadge = (status) => {
    const s = String(status || "").toLowerCase();

    let badgeClass =
      "border-border-main bg-input-bg text-text-secondary";
    let Icon = Clock;

    if (s === "delivered") {
      badgeClass =
        "border-status-success/20 bg-status-success/10 text-status-success";
      Icon = CheckCircle2;
    } else if (s === "confirmed") {
      badgeClass =
        "border-status-info/20 bg-status-info/10 text-status-info";
      Icon = CheckCircle2;
    } else if (s === "pending") {
      badgeClass =
        "border-status-warning/20 bg-status-warning/10 text-status-warning";
      Icon = Clock;
    } else if (s === "shipped") {
      badgeClass =
        "border-status-info/20 bg-status-info/10 text-status-info";
      Icon = Truck;
    } else if (s === "cancelled") {
      badgeClass =
        "border-status-danger/20 bg-status-danger/10 text-status-danger";
      Icon = XCircle;
    } else if (s === "returned") {
      badgeClass =
        "border-border-main bg-input-bg text-text-secondary";
      Icon = RotateCcw;
    } else if (s === "processing") {
      badgeClass =
        "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400";
      Icon = Clock;
    }

    return (
      <span
        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold capitalize ${badgeClass}`}
      >
        <Icon className="size-3.5" />
        <span>{formatLabel(status)}</span>
      </span>
    );
  };

  const paymentStatus = String(
    order.paymentStatus || "pending"
  ).toLowerCase();

  const paymentBadgeClass =
    paymentStatus === "paid"
      ? "border-status-success/20 bg-status-success/10 text-status-success"
      : paymentStatus === "failed"
        ? "border-status-danger/20 bg-status-danger/10 text-status-danger"
        : paymentStatus === "refunded"
          ? "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400"
          : "border-status-warning/20 bg-status-warning/10 text-status-warning";

  // Actual API fields.
  const orderId = order._id;
  const shippingAddress = order.shippingAddress || {};
  const items = Array.isArray(order.items) ? order.items : [];

  // The schema documents user as a string. Support an object only
  // if the backend actually returns populated user information.
  const customer =
    order.customer ||
    (typeof order.user === "object" && order.user !== null
      ? order.user
      : null);

  const customerName =
    shippingAddress.fullName ||
    customer?.name ||
    [customer?.firstName, customer?.lastName]
      .filter(Boolean)
      .join(" ") ||
    "";

  const customerEmail = customer?.email || "";
  const customerPhone = shippingAddress.phone || "";

  const customerInitial = customerName.trim()
    ? customerName.trim().charAt(0).toUpperCase()
    : "U";

  const fullAddress = [
    shippingAddress.address,
    shippingAddress.city,
    shippingAddress.country,
    shippingAddress.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  const financialRows = [
    { label: "Subtotal", value: order.subtotal },
    { label: "Shipping Fee", value: order.shippingFee },
    { label: "Tax", value: order.tax },
    { label: "Discount", value: order.discount, isDiscount: true },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Side Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="order-details-title"
        className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md sm:max-w-lg flex-col border-e border-border-main bg-card-bg shadow-2xl transition-transform duration-300 ease-in-out"
      >
        {/* Panel Header */}
        <div className="flex items-center justify-between border-b border-border-main bg-active-bg/40 p-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-xs">
              <Package className="size-5" />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                ORDER DETAILS
              </p>

              <h2
                id="order-details-title"
                className="text-base sm:text-lg font-bold tracking-tight text-text-primary break-all"
              >
                {orderId ? `#${String(orderId).slice(-8)}` : "—"}
              </h2>
            </div>
          </div>

          <Button
            type="button"
            shine={false}
            onClick={onClose}
            aria-label="Close order details"
            className="rounded-xl p-2 text-text-secondary hover:bg-input-bg hover:text-text-primary border-transparent"
          >
            <X className="size-5" />
          </Button>
        </div>

        {/* Panel Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
          {/* Status & Payment Overview Card */}
          <div className="rounded-2xl border border-border-main bg-card-bg p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Order Status
              </span>

              {getStatusBadge(order.status)}
            </div>

            <div className="h-px w-full bg-border-main" />

            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Payment Status
              </span>

              <span
                className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider ${paymentBadgeClass}`}
              >
                {formatLabel(paymentStatus)}
              </span>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Payment Method
              </span>

              <span className="text-xs font-semibold text-text-primary flex items-center gap-1.5">
                <CreditCard className="size-3.5 text-text-secondary" />
                {formatLabel(order.paymentMethod)}
              </span>
            </div>

            <div className="flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Order Date
              </span>

              <span className="text-xs font-medium text-text-secondary flex items-center gap-1.5">
                <Calendar className="size-3.5 text-text-secondary" />
                {formatDate(order.createdAt)}
              </span>
            </div>

            {order.transactionId && (
              <div className="flex items-start justify-between flex-wrap gap-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Transaction ID
                </span>

                <span className="max-w-full break-all text-xs font-medium text-text-primary">
                  {order.transactionId}
                </span>
              </div>
            )}
          </div>

          {/* Customer Details Card */}
          <div className="rounded-2xl border border-border-main bg-card-bg p-4 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <User className="size-4 text-brand-active" />

              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Customer Information
              </h3>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-full border border-brand-active/20 bg-active-bg text-sm font-bold text-brand-active">
                {customerInitial}
              </div>

              <div className="min-w-0">
                <p className="font-semibold text-sm text-text-primary tracking-tight truncate">
                  {customerName || "—"}
                </p>

                {customerEmail && (
                  <p className="text-xs text-text-secondary flex items-center gap-1.5 mt-0.5 truncate">
                    <Mail className="size-3 shrink-0" />
                    {customerEmail}
                  </p>
                )}
              </div>
            </div>

            <div className="h-px w-full bg-border-main" />

            <div className="space-y-2 text-xs">
              {customerPhone && (
                <div className="flex items-start gap-2 text-text-secondary">
                  <Phone className="size-3.5 shrink-0 mt-0.5" />
                  <span dir="ltr">{customerPhone}</span>
                </div>
              )}

              {fullAddress && (
                <div className="flex items-start gap-2 text-text-secondary">
                  <MapPin className="size-3.5 shrink-0 mt-0.5 text-brand-active" />
                  <span className="break-words">{fullAddress}</span>
                </div>
              )}

              {!customerPhone && !fullAddress && (
                <p className="text-text-secondary">
                  No additional shipping details available.
                </p>
              )}
            </div>
          </div>

          {/* Order Items Section */}
          <div className="rounded-2xl border border-border-main bg-card-bg p-4 shadow-xs space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
              Ordered Items ({items.length})
            </h3>

            <div className="divide-y divide-border-main">
              {items.length > 0 ? (
                items.map((item, idx) => (
                  <div
                    key={`${item.product || item.name || "item"}-${idx}`}
                    className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-3 text-xs"
                  >
                    <div className="min-w-0 flex-1 flex items-center gap-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name || "Product"}
                          loading="lazy"
                          className="size-12 shrink-0 rounded-lg border border-border-main bg-input-bg object-cover"
                        />
                      ) : (
                        <div className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border-main bg-input-bg text-text-secondary">
                          <Package className="size-5" />
                        </div>
                      )}

                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-text-primary break-words">
                          {item.name || "—"}
                        </p>

                        <p className="text-text-secondary mt-0.5">
                          Qty: {Number(item.quantity ?? 0)} ×{" "}
                          {formatCurrency(item.price)} EGP
                        </p>
                      </div>
                    </div>

                    <span className="font-bold tabular-nums text-text-primary shrink-0">
                      {formatCurrency(
                        Number(item.quantity ?? 0) *
                          Number(item.price ?? 0)
                      )}{" "}
                      EGP
                    </span>
                  </div>
                ))
              ) : (
                <p className="py-3 text-xs text-text-secondary">
                  No order items available.
                </p>
              )}
            </div>
          </div>

          {/* Financials & Total Card */}
          <div className="rounded-2xl border border-border-main bg-card-bg p-4 shadow-xs space-y-2.5 text-xs">
            {financialRows.map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between gap-3 text-text-secondary"
              >
                <span>{row.label}</span>

                <span
                  className={`font-medium tabular-nums ${
                    row.isDiscount
                      ? "text-status-success"
                      : "text-text-primary"
                  }`}
                >
                  {row.isDiscount ? "−" : ""}
                  {formatCurrency(row.value)} EGP
                </span>
              </div>
            ))}

            <div className="h-px w-full bg-border-main" />

            <div className="flex items-center justify-between text-sm font-bold text-text-primary pt-1">
              <span>Total Amount</span>

              <span className="text-base tabular-nums text-brand-active">
                {formatCurrency(order.totalPrice)} EGP
              </span>
            </div>
          </div>

          {/* Order Notes — only shown when provided by the API */}
          {(order.customerNote || order.adminNote) && (
            <div className="rounded-2xl border border-border-main bg-card-bg p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Order Notes
              </h3>

              {order.customerNote && (
                <div>
                  <p className="text-xs font-semibold text-text-secondary mb-1">
                    Customer Note
                  </p>
                  <p className="text-xs text-text-primary whitespace-pre-wrap break-words">
                    {order.customerNote}
                  </p>
                </div>
              )}

              {order.adminNote && (
                <div>
                  <p className="text-xs font-semibold text-text-secondary mb-1">
                    Admin Note
                  </p>
                  <p className="text-xs text-text-primary whitespace-pre-wrap break-words">
                    {order.adminNote}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Additional order dates */}
          {(order.paidAt || order.deliveredAt || order.cancelledAt) && (
            <div className="rounded-2xl border border-border-main bg-card-bg p-4 shadow-xs space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-text-secondary">
                Order Timeline
              </h3>

              {order.paidAt && (
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-text-secondary">Paid At</span>
                  <span className="text-text-primary text-right">
                    {formatDate(order.paidAt)}
                  </span>
                </div>
              )}

              {order.deliveredAt && (
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-text-secondary">Delivered At</span>
                  <span className="text-text-primary text-right">
                    {formatDate(order.deliveredAt)}
                  </span>
                </div>
              )}

              {order.cancelledAt && (
                <div className="flex items-center justify-between gap-3 text-xs">
                  <span className="text-text-secondary">Cancelled At</span>
                  <span className="text-text-primary text-right">
                    {formatDate(order.cancelledAt)}
                  </span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Panel Footer */}
        <div className="border-t border-border-main bg-card-bg p-4 sm:px-6 flex items-center justify-end gap-3">
          <Button
            onClick={onClose}
            className="rounded-xl border border-border-main bg-input-bg px-5 py-2.5 text-xs sm:text-sm font-semibold text-text-primary hover:bg-border-main shadow-xs"
          >
            Close
          </Button>
        </div>
      </aside>
    </div>
  );
}
