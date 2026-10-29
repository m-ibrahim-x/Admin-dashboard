const UsersSkeleton = () => {
  return (
    <div
      className="space-y-4 p-5 animate-pulse"
      aria-busy="true"
      aria-label="Loading users management"
    >
      {/* ─── 1. Header Banner Skeleton ─── */}
      <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
        {/* Decorative Golden Graphic Placeholder */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 top-0 bottom-0 w-44 sm:w-60 md:w-72 overflow-hidden select-none opacity-20"
        >
          <svg
            viewBox="0 0 320 160"
            fill="none"
            className="h-full w-full object-cover"
            preserveAspectRatio="none"
          >
            <path
              d="M 230 0 C 230 45, 275 80, 320 75 L 320 0 Z"
              fill="var(--theme-brand-active)"
              opacity="0.92"
            />
            <path
              d="M 210 160 C 230 115, 275 110, 320 115 L 320 160 Z"
              fill="var(--theme-brand-active)"
              opacity="0.88"
            />
          </svg>
        </div>

        {/* Banner Content Hierarchy */}
        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Left: Icon, Category Eyebrow, Title */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            {/* Icon Squircle Box Placeholder */}
            <div className="size-11 sm:size-12 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
            <div className="space-y-2 min-w-0">
              <div className="h-3 w-28 rounded bg-input-bg" />
              <div className="h-5 sm:h-6 w-36 sm:w-44 rounded-md bg-input-bg" />
            </div>
          </div>

          {/* Right: Search Input & Add User Button Placeholders */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
            <div className="h-10 w-full sm:w-60 md:w-64 rounded-xl bg-input-bg" />
            <div className="h-10 w-28 shrink-0 rounded-xl bg-input-bg" />
          </div>
        </div>
      </div>

      {/* ─── 2. Statistics Cards Skeleton (Exactly 4 cards matching Users) ─── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="w-full box-border rounded-2xl border border-border-main border-t-[3px] border-t-border-main bg-card-bg p-3.5 sm:p-4 shadow-sm"
          >
            {/* Card Top: Title + Value on left, Icon Box on right */}
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1 space-y-2">
                <div className="h-3.5 w-24 rounded bg-input-bg" />
                <div className="h-6 sm:h-7 w-12 sm:w-16 rounded-md bg-input-bg" />
              </div>
              <div className="size-9 sm:size-10 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
            </div>

            {/* Divider */}
            <div className="my-2.5 h-px w-full bg-border-main" />

            {/* Subtext Placeholder */}
            <div className="h-3 w-32 rounded bg-input-bg" />
          </div>
        ))}
      </div>

      {/* ─── 3. Users Table Skeleton (4 columns matching UsersTable) ─── */}
      <div className="w-full overflow-hidden rounded-2xl border border-border-main bg-card-bg shadow-sm">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-[700px] border-collapse text-left">
            <thead className="border-b border-border-main bg-input-bg text-text-secondary">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Role
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  Verified
                </th>
                <th className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-text-secondary text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main">
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="transition-colors">
                  {/* User Column: Avatar + Username + Email */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-9 sm:size-10 shrink-0 rounded-full bg-input-bg border border-border-main/50" />
                      <div className="space-y-1.5 min-w-0">
                        <div className="h-4 w-28 sm:w-32 rounded bg-input-bg" />
                        <div className="h-3 w-36 sm:w-44 rounded bg-input-bg" />
                      </div>
                    </div>
                  </td>

                  {/* Role Column: Badge Pill */}
                  <td className="px-6 py-4">
                    <div className="h-5 w-20 rounded-full bg-input-bg" />
                  </td>

                  {/* Verified Column: Status icon + label */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <div className="size-4 rounded-full bg-input-bg shrink-0" />
                      <div className="h-3.5 w-14 rounded bg-input-bg" />
                    </div>
                  </td>

                  {/* Actions Column: 3 compact icon buttons */}
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="size-8 rounded-lg bg-input-bg" />
                      <div className="size-8 rounded-lg bg-input-bg" />
                      <div className="size-8 rounded-lg bg-input-bg" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UsersSkeleton;
