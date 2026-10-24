import { useMemo } from "react";
import DataTable from "../../ui/DataTable";
import { ClipboardList } from "lucide-react";

export default function OrdersTable({ orders, onRowClick }) {
  const columns = useMemo(
    () => [
      {
        key: "orderId",
        header: "ORDER",
        render: (_, row) => (
          <span className="font-bold text-xs sm:text-sm tracking-tight text-text-primary"
            title={row._id}
          >
            # {row._id.slice(-8)}
          </span>
        ),
      },
      {
        key: "customer",
        header: "CUSTOMER",
        render: (_, row) => {
          const customerName = row.shippingAddress?.fullName || "Unknown";
          const initial = customerName.trim().charAt(0).toUpperCase() || "U"
          return (
            <div className="flex items-center gap-3">
              <div className="flex size-8 sm:size-9 shrink-0 items-center justify-center rounded-full border border-brand-active/20 bg-active-bg text-xs font-bold text-brand-active shadow-xs">
                {initial}
              </div>
              <span className="truncate text-xs sm:text-sm font-medium text-text-primary">
                {customerName}
              </span>
            </div>
          );
        },
      },
      {
        key: "createdAt",
        header: "DATE",
        render: (date) => (
          <span className="text-xs sm:text-sm text-text-secondary font-normal">
            {date ? new Date(date).toLocaleDateString("en-GB") : "—"}
          </span>
        ),
      },
      {
        key: "status",
        header: "STATUS",
        render: (status) => {
          const s = String(status || "").toLowerCase();
          let badgeClass = "border-border-main bg-input-bg text-text-secondary";
          let dotClass = "bg-text-secondary";

          if (s === "delivered") {
            badgeClass = "border-status-success/20 bg-status-success/10 text-status-success";
            dotClass = "bg-status-success";
          } else if (s === "confirmed" || s === "shipped") {
            badgeClass = "border-status-info/20 bg-status-info/10 text-status-info";
            dotClass = "bg-status-info";
          } else if (s === "pending") {
            badgeClass = "border-status-warning/20 bg-status-warning/10 text-status-warning";
            dotClass = "bg-status-warning";
          } else if (s === "cancelled") {
            badgeClass = "border-status-danger/20 bg-status-danger/10 text-status-danger";
            dotClass = "bg-status-danger";
          } else if (s === "processing") {
            badgeClass = "border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-400";
            dotClass = "bg-purple-500";
          } else if (s === "returned") {
            badgeClass = "border-border-main bg-input-bg text-text-secondary";
            dotClass = "bg-text-secondary";
          }

          return (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-semibold ${badgeClass}`}
            >
              <span className={`size-1.5 rounded-full ${dotClass}`} />
              <span className="capitalize">{status}</span>
            </span>
          );
        },
      },
      {
        key: "payment",
        header: "PAYMENT",
        render: (_, row) => {
          const payStatus = String(row.paymentStatus || "PENDING").toUpperCase();
          const isPaid = payStatus === "PAID";
          const isFailed = payStatus === "FAILED";
          const badgeClass = isPaid
            ? "border-status-success/20 bg-status-success/10 text-status-success"
            : isFailed
            ? "border-status-danger/20 bg-status-danger/10 text-status-danger"
            : "border-status-warning/20 bg-status-warning/10 text-status-warning";

          return (
            <div className="flex flex-col items-start gap-0.5">
              <span
                className={`inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${badgeClass}`}
              >
                {payStatus}
              </span>
              <span className="text-xs text-text-secondary">
                {row.paymentMethod || "Cash"}
              </span>
            </div>
          );
        },
      },
      {
        key: "totalAmount",
        header: "TOTAL",
        render: (_, row) => {
          const formattedAmount = Number(row.totalPrice || 0).toLocaleString(
            "en-US",
            {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            }
          );
          return (
            <span className="font-bold tabular-nums text-xs sm:text-sm text-text-primary">
              {formattedAmount} EGP
            </span>
          );
        },
      },
    ],
    []
  );

  return (
    <DataTable
      keyField="_id"
      data={orders}
      columns={columns}
      onRowClick={onRowClick}
      emptyState={
        <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
          <ClipboardList className="size-10 text-text-secondary/50" />
          <p className="text-sm font-semibold text-text-primary">
            No orders found
          </p>
          <p className="text-xs text-text-secondary max-w-xs">
            There are no orders matching your current search or filter criteria.
          </p>
        </div>
      }
    />
  );
}
