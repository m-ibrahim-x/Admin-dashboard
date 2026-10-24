import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

export default function OrdersFilters({
  searchTerm: externalSearch,
  onSearchChange,
  statusFilter: externalStatus,
  onStatusFilterChange,
  paymentStatusFilter: externalPaymentStatus,
  onPaymentStatusFilterChange,
  paymentMethodFilter: externalPaymentMethod,
  onPaymentMethodFilterChange,
}) {
  // Support both controlled props and local fallback state
  const [internalSearch, setInternalSearch] = useState("");
  const [internalStatus, setInternalStatus] = useState("all");
  const [internalPaymentStatus, setInternalPaymentStatus] = useState("all");
  const [internalPaymentMethod, setInternalPaymentMethod] = useState("all");

  const searchTerm =
    externalSearch !== undefined ? externalSearch : internalSearch;
  const statusFilter =
    externalStatus !== undefined ? externalStatus : internalStatus;
  const paymentStatusFilter =
    externalPaymentStatus !== undefined
      ? externalPaymentStatus
      : internalPaymentStatus;
  const paymentMethodFilter =
    externalPaymentMethod !== undefined
      ? externalPaymentMethod
      : internalPaymentMethod;

  const handleSearchChange = (val) => {
    if (externalSearch === undefined) setInternalSearch(val);
    onSearchChange?.(val);
  };

  const handleStatusChange = (val) => {
    if (externalStatus === undefined) setInternalStatus(val);
    onStatusFilterChange?.(val);
  };

  const handlePaymentStatusChange = (val) => {
    if (externalPaymentStatus === undefined) setInternalPaymentStatus(val);
    onPaymentStatusFilterChange?.(val);
  };

  const handlePaymentMethodChange = (val) => {
    if (externalPaymentMethod === undefined) setInternalPaymentMethod(val);
    onPaymentMethodFilterChange?.(val);
  };

  // 1. Order Statuses (matching Image 1)
  const statusOptions = [
    { value: "all", label: "All statuses" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "processing", label: "Processing" },
    { value: "shipped", label: "Shipped" },
    { value: "delivered", label: "Delivered" },
    { value: "cancelled", label: "Cancelled" },
    { value: "returned", label: "Returned" },
  ];

  // 2. Payment Statuses (matching Image 2)
  const paymentStatusOptions = [
    { value: "all", label: "All payments" },
    { value: "pending", label: "Pending" },
    { value: "paid", label: "Paid" },
    { value: "failed", label: "Failed" },
  ];

  // 3. Payment Methods (matching Image 3)
  const paymentMethodOptions = [
    { value: "all", label: "All methods" },
    { value: "cash", label: "Cash" },
    { value: "stripe", label: "Stripe" },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-3 rounded-2xl border border-border-main bg-card-bg p-3 shadow-xs">
      {/* Search Input for Order ID & Customer Name */}
      <div className="relative w-full flex-1 min-w-[200px]">
        <Search className="pointer-events-none absolute start-3 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search ID, customer..."
          aria-label="Search ID, customer"
          className="w-full rounded-xl bg-input-bg py-2 ps-9 pe-4 text-xs sm:text-sm font-medium text-text-primary placeholder:text-text-secondary/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main transition-colors duration-200"
        />
      </div>

      {/* Filter Selects Group */}
      <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
        {/* Order Status Selector */}
        <div className="relative w-full sm:w-auto min-w-[130px]">
          <select
            value={statusFilter}
            onChange={(e) => handleStatusChange(e.target.value)}
            aria-label="Filter by order status"
            className="w-full appearance-none rounded-xl border border-border-main bg-card-bg py-2 ps-3.5 pe-8 text-xs sm:text-sm font-medium text-text-primary shadow-xs transition-colors duration-200 hover:border-brand-active/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main cursor-pointer"
          >
            {statusOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-card-bg text-text-primary"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
        </div>

        {/* Payment Status Selector */}
        <div className="relative w-full sm:w-auto min-w-[130px]">
          <select
            value={paymentStatusFilter}
            onChange={(e) => handlePaymentStatusChange(e.target.value)}
            aria-label="Filter by payment status"
            className="w-full appearance-none rounded-xl border border-border-main bg-card-bg py-2 ps-3.5 pe-8 text-xs sm:text-sm font-medium text-text-primary shadow-xs transition-colors duration-200 hover:border-brand-active/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main cursor-pointer"
          >
            {paymentStatusOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-card-bg text-text-primary"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
        </div>

        {/* Payment Method Selector */}
        <div className="relative w-full sm:w-auto min-w-[130px]">
          <select
            value={paymentMethodFilter}
            onChange={(e) => handlePaymentMethodChange(e.target.value)}
            aria-label="Filter by payment method"
            className="w-full appearance-none rounded-xl border border-border-main bg-card-bg py-2 ps-3.5 pe-8 text-xs sm:text-sm font-medium text-text-primary shadow-xs transition-colors duration-200 hover:border-brand-active/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2 focus-visible:ring-offset-bg-main cursor-pointer"
          >
            {paymentMethodOptions.map((opt) => (
              <option
                key={opt.value}
                value={opt.value}
                className="bg-card-bg text-text-primary"
              >
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute end-2.5 top-1/2 -translate-y-1/2 size-4 text-text-secondary" />
        </div>
      </div>
    </div>
  );
}
