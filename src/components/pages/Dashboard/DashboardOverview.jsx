import {
  LayoutGrid,
  ShoppingCart,
  Clock,
  CircleDollarSign,
  BarChart3,
  Package,
  Users,
} from "lucide-react";
import StatCard from "../../ui/StatCard";

// dashboard stats data
const DashboardOverview = ({ data }) => {
  const stats = data
    ? [
        {
          id: "orders",
          title: "Total Orders",
          value: data.orders.total,
          subText: `${data.orders.delivered} delivered`,
          icon: (
            <ShoppingCart className="size-4 sm:size-[18px]" strokeWidth={2} />
          ),
        },
        {
          id: "pending",
          title: "Pending Orders",
          value: data.orders.pending,
          subText: `${data.orders.processing} processing`,
          icon: <Clock className="size-4 sm:size-[18px]" strokeWidth={2} />,
        },
        {
          id: "revenue",
          title: "Total Revenue",
          value: `$${Number(data.revenue.total).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          subText: `${data.revenue.growthPercent}% from last month`,
          icon: (
            <CircleDollarSign
              className="size-4 sm:size-[18px]"
              strokeWidth={2}
            />
          ),
        },
        {
          id: "thisMonth",
          title: "This Month",
          value: `$${Number(data.revenue.thisMonth).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
          subText: "Revenue this month",
          icon: <BarChart3 className="size-4 sm:size-[18px]" strokeWidth={2} />,
        },
        {
          id: "topProduct",
          title: "Top Product",
          value: data.topProducts?.[0]?.name ?? "N/A",
          subText: `${data.topProducts?.[0]?.totalSold ?? 0} sold`,
          icon: <Package className="size-4 sm:size-[18px]" strokeWidth={2} />,
        },
        {
          id: "users",
          title: "Total Customers",
          value: data.totalCustomers,
          subText: "Registered customers",
          icon: <Users className="size-4 sm:size-[18px]" strokeWidth={2} />,
        },
      ]
    : [];

  return (
    <section className="space-y-4 p-5">
      {/* Admin Overview Header Banner */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
        {/* Decorative Golden Graphic / Swoop on the right */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 sm:w-52 md:w-64 overflow-hidden select-none"
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

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-2.5">
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Golden Squircle Icon Box */}
            <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-md shadow-brand-active/20">
              <LayoutGrid className="size-5 sm:size-6" strokeWidth={2} />
            </div>

            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                ADMIN OVERVIEW
              </p>
              <h1 className="mt-0.5 text-lg font-bold tracking-tight text-text-primary sm:text-xl lg:text-2xl">
                Real–time commerce health
              </h1>
            </div>
          </div>

          <p className="max-w-xl text-xs sm:text-[13px] text-text-secondary">
            Monitor your storefront with AI–style clarity and live API metrics.
          </p>
        </div>
      </div>

      {/* Stat Cards Grid - 2 columns matching the design */}
      <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            variant="horizontal-divider"
            showDivider
            title={stat.title}
            value={stat.value}
            subText={stat.subText}
            icon={stat.icon}
            className="!items-start !p-3.5 sm:!p-4 border-t-[3px] border-t-brand-active shadow-sm hover:shadow-md transition-shadow duration-200 [&_.my-4]:!my-2.5 [&_p.text-2xl]:!text-xl sm:[&_p.text-2xl]:!text-2xl"
            iconClassName="!h-9 !w-9 sm:!h-10 sm:!w-10 !rounded-xl !bg-active-bg !text-brand-active border border-brand-active/20"
          />
        ))}
      </div>
    </section>
  );
};

export default DashboardOverview;
