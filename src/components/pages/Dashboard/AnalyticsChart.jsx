
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Activity } from "lucide-react";


const formatNumber = (value) =>
  Number(value ?? 0).toLocaleString("en-US");

const AnalyticsChart = ({ data = [] }) => {
  const chartData = data.map((item, index) => ({
    name: item._id || `Period ${index + 1}`,
    revenue: Number(item.revenue ?? 0),
    orders: Number(item.orders ?? 0),
  }));

  return (
    <div className="min-w-0">
      <div className="mb-6">
        <div className="flex items-center gap-2">
          <span className="grid size-8 place-items-center rounded-xl border border-brand-active/20 bg-active-bg text-brand-active">
            <Activity size={18} />
          </span>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
            Store Analytics
          </p>
        </div>

        <h2 className="mt-2 text-lg font-bold tracking-tight text-text-primary sm:text-xl">
          Revenue & Orders
        </h2>

        <p className="mt-1 text-xs sm:text-[13px] text-text-secondary">
          Revenue and order activity over time.
        </p>
      </div>

      {chartData.length === 0 ? (
        <div className="grid min-h-64 place-items-center text-center">
          <div>
            <Activity
              size={32}
              className="mx-auto mb-3 text-text-secondary"
            />
            <p className="font-medium text-text-primary">
              No revenue data available
            </p>
            <p className="mt-1 text-xs sm:text-[13px] text-text-secondary">
              Chart data will appear when the API returns daily revenue records.
            </p>
          </div>
        </div>
      ) : (
        <div className="h-[300px] w-full sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={chartData}
              margin={{ top: 10, right: 8, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-brand-active)"
                    stopOpacity={0.35}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-brand-active)"
                    stopOpacity={0}
                  />
                </linearGradient>

                <linearGradient
                  id="ordersGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="var(--color-status-success)"
                    stopOpacity={0.3}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-status-success)"
                    stopOpacity={0}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="var(--color-border-main)"
                strokeDasharray="3 3"
                vertical={false}
              />

              <XAxis
                dataKey="name"
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
              />

              <YAxis
                yAxisId="revenue"
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={formatNumber}
              />

              <YAxis
                yAxisId="orders"
                orientation="right"
                stroke="var(--color-text-secondary)"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                hide
              />

              <Tooltip
                formatter={(value, name) => [
                  formatNumber(value),
                  name === "revenue" ? "Revenue" : "Orders",
                ]}
                contentStyle={{
                  backgroundColor: "var(--color-card-bg)",
                  borderColor: "var(--color-border-main)",
                  borderRadius: "12px",
                  color: "var(--color-text-primary)",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                }}
                labelStyle={{
                  color: "var(--color-text-primary)",
                  fontWeight: 600,
                  marginBottom: 6,
                }}
              />

              <Area
                yAxisId="revenue"
                type="monotone"
                dataKey="revenue"
                name="Revenue"
                stroke="var(--color-brand-active)"
                strokeWidth={2.5}
                fill="url(#revenueGradient)"
                fillOpacity={1}
                activeDot={{ r: 5 }}
              />

              <Area
                yAxisId="orders"
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="var(--color-status-success)"
                strokeWidth={2.5}
                fill="url(#ordersGradient)"
                fillOpacity={1}
                activeDot={{ r: 5 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default AnalyticsChart;
