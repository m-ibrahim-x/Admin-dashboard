const OrdersSkeleton = ({ tableOnly = false, rowCount = 7 }) => {
  const tableSkeleton = (
    <div
      className="w-full overflow-hidden rounded-2xl border border-border-main bg-card-bg shadow-sm animate-pulse"
      aria-busy="true"
      aria-label="Loading orders table"
    >
      <div className="w-full overflow-x-auto">
        <table className="w-full min-w-[700px] border-collapse text-left">
          <thead className="border-b border-border-main bg-input-bg text-text-secondary">
            <tr>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Order
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Customer
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Date
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Status
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                Payment
              </th>
              <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary text-right">
                Total
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border-main">
            {Array.from({ length: rowCount }).map((_, index) => (
              <tr key={index}>
                {/* Order ID */}
                <td className="px-6 py-4">
                  <div className="h-4 w-24 rounded bg-input-bg" />
                </td>

                {/* Customer: Avatar + Name */}
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="size-8 sm:size-9 rounded-full bg-input-bg border border-border-main/50 shrink-0" />
                    <div className="h-4 w-28 sm:w-36 rounded bg-input-bg" />
                  </div>
                </td>

                {/* Date */}
                <td className="px-6 py-4">
                  <div className="h-4 w-20 sm:w-24 rounded bg-input-bg" />
                </td>

                {/* Status Badge */}
                <td className="px-6 py-4">
                  <div className="h-6 w-20 sm:w-24 rounded-full bg-input-bg" />
                </td>

                {/* Payment Badge + Method */}
                <td className="px-6 py-4">
                  <div className="space-y-1">
                    <div className="h-4 w-16 rounded bg-input-bg" />
                    <div className="h-3 w-10 rounded bg-input-bg" />
                  </div>
                </td>

                {/* Total Amount */}
                <td className="px-6 py-4 text-right">
                  <div className="h-4 w-20 rounded bg-input-bg ms-auto" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (tableOnly) {
    return tableSkeleton;
  }

  return (
    <div
      className="space-y-4 p-5 animate-pulse min-w-0"
      aria-busy="true"
      aria-label="Loading orders page"
    >
      {/* ─── 1. Page Heading & Total Orders Card ─── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-2">
          <div className="h-3 w-32 rounded bg-input-bg" />
          <div className="h-7 w-28 sm:w-36 rounded-md bg-input-bg" />
        </div>

        <div className="h-12 w-32 rounded-2xl border border-border-main bg-card-bg p-3 flex items-center gap-2 shrink-0">
          <div className="h-6 w-8 rounded bg-input-bg" />
          <div className="h-3.5 w-16 rounded bg-input-bg" />
        </div>
      </div>

      {/* ─── 2. Orders Filters Bar Skeleton ─── */}
      <div className="flex flex-col md:flex-row items-center gap-3 rounded-2xl border border-border-main bg-card-bg p-3 shadow-xs">
        <div className="h-10 w-full flex-1 rounded-xl bg-input-bg" />
        <div className="flex flex-wrap sm:flex-nowrap items-center gap-2.5 w-full md:w-auto">
          <div className="h-10 w-full sm:w-32 rounded-xl bg-input-bg" />
          <div className="h-10 w-full sm:w-32 rounded-xl bg-input-bg" />
          <div className="h-10 w-full sm:w-32 rounded-xl bg-input-bg" />
        </div>
      </div>

      {/* ─── 3. Orders Table Skeleton ─── */}
      {tableSkeleton}

      {/* ─── 4. Pagination Skeleton ─── */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm">
        <div className="h-4 w-36 rounded bg-input-bg" />
        <div className="flex items-center gap-1.5">
          <div className="size-8 sm:size-9 rounded-xl bg-input-bg" />
          <div className="size-8 sm:size-9 rounded-xl bg-input-bg" />
          <div className="size-8 sm:size-9 rounded-xl bg-input-bg" />
          <div className="size-8 sm:size-9 rounded-xl bg-input-bg" />
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;
