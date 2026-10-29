import {
  CheckCircle2,
  Clock3,
  RefreshCw,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import AnalyticsChart from "./AnalyticsChart";

const orderStatuses = [
  { id: "pending", title: "Pending", icon: Clock3, color: "warning" },
  { id: "processing", title: "Processing", icon: RefreshCw, color: "info" },
  { id: "confirmed", title: "Confirmed", icon: CheckCircle2, color: "info" },
  { id: "shipped", title: "Shipped", icon: Truck, color: "info" },
  { id: "delivered", title: "Delivered", icon: ShoppingBag, color: "success" },
  { id: "cancelled", title: "Cancelled", icon: XCircle, color: "danger" },
];

const statusStyles = {
  warning: {
    text: "text-status-warning",
    bg: "bg-status-warning/10",
    borderTop: "border-t-status-warning",
    progress: "bg-status-warning",
  },
  info: {
    text: "text-status-info",
    bg: "bg-status-info/10",
    borderTop: "border-t-status-info",
    progress: "bg-status-info",
  },
  success: {
    text: "text-status-success",
    bg: "bg-status-success/10",
    borderTop: "border-t-status-success",
    progress: "bg-status-success",
  },
  danger: {
    text: "text-status-danger",
    bg: "bg-status-danger/10",
    borderTop: "border-t-status-danger",
    progress: "bg-status-danger",
  },
};

const formatNumber = (value) => Number(value ?? 0).toLocaleString("en-US");

const DashboardAnalytics = ({ data }) => {
  const orders = data?.orders ?? {};
  const totalOrders = Number(orders.total ?? 0);

  // mock data to try out the chart
  const mockDailyRevenue = [
    { _id: "2026-10-11", revenue: 8500, orders: 12 },
    { _id: "2026-10-12", revenue: 12000, orders: 18 },
    { _id: "2026-10-13", revenue: 9800, orders: 15 },
    { _id: "2026-10-14", revenue: 16500, orders: 24 },
    { _id: "2026-10-15", revenue: 14200, orders: 21 },
    { _id: "2026-10-16", revenue: 21000, orders: 30 },
    { _id: "2026-10-17", revenue: 18500, orders: 26 },
  ];

  return (
    <section className="grid p-5 min-w-0 grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
      {/* Order Status */}
      <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6">
        <div className="mb-5">
          <div className="mb-1 flex items-center gap-2.5">
            <span className="grid size-8 place-items-center rounded-xl bg-brand-active/10 text-brand-active sm:size-9">
              <ShoppingBag size={18} />
            </span>
            <h2 className="text-lg font-bold tracking-tight text-brand-active sm:text-xl">
              Order Status
            </h2>
          </div>
          <p className="text-xs sm:text-[13px] text-text-secondary">
            Live fulfillment breakdown and real-time status of all store orders.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4">
          {orderStatuses.map((status) => {
            const count = Number(orders[status.id] ?? 0);
            const percentage =
              totalOrders > 0 ? Math.round((count / totalOrders) * 100) : 0;

            const styles = statusStyles[status.color];
            const Icon = status.icon;

            return (
              <div
                key={status.id}
                className={`group relative flex min-w-0 flex-col justify-between rounded-2xl border border-border-main border-t-[3px] bg-card-bg p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-4 ${styles.borderTop}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="flex min-w-0 items-center gap-1.5 text-sm font-medium text-text-secondary">
                      <Icon size={15} className={`shrink-0 ${styles.text}`} />
                      <span className="truncate">{status.title}</span>
                    </span>

                    <span
                      className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-bold ${styles.text} ${styles.bg}`}
                    >
                      {percentage}%
                    </span>
                  </div>

                  <p className="mt-3 truncate text-xl font-bold tracking-tight tabular-nums text-text-primary sm:text-2xl">
                    {formatNumber(count)}
                  </p>
                </div>

                <div
                  className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-border-main/50"
                  role="progressbar"
                  aria-label={`${status.title} percentage`}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={percentage}
                >
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${styles.progress}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-5 flex items-center justify-between gap-3 border-t border-border-main pt-4">
          <p className="text-sm font-medium text-brand-active">Total Orders</p>
          <span className="text-xl font-bold tabular-nums text-text-primary sm:text-2xl">
            {formatNumber(totalOrders)}
          </span>
        </div>
      </div>

      {/* Analytics Chart */}
      <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6">
        <AnalyticsChart data={mockDailyRevenue} />
      </div>
    </section>
  );
};

export default DashboardAnalytics;
