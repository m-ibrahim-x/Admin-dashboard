const DashboardSkeleton = () => {
    return (
        <div
            className="space-y-4 p-5 min-w-0 animate-pulse"
            role="status"
            aria-busy="true"
            aria-label="Loading dashboard"
        >
            <span className="sr-only">Loading dashboard...</span>

            {/* ─── 1. Overview Section Skeleton ─── */}
            <div className="space-y-4">
                {/* Admin Overview Header Banner Skeleton */}
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
                    {/* Decorative Swoop Placeholder */}
                    <div
                        aria-hidden="true"
                        className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 sm:w-52 md:w-64 overflow-hidden select-none opacity-20"
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

                    {/* Content Hierarchy */}
                    <div className="relative z-10 flex flex-col gap-2.5">
                        <div className="flex items-center gap-3 sm:gap-4">
                            {/* Icon Box Placeholder */}
                            <div className="size-11 sm:size-12 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />

                            <div className="space-y-2">
                                {/* Eyebrow Label Placeholder */}
                                <div className="h-3 w-28 rounded bg-input-bg" />

                                {/* Section Title Placeholder */}
                                <div className="h-5 sm:h-6 w-48 sm:w-64 rounded-md bg-input-bg" />
                            </div>
                        </div>

                        {/* Subtitle / Description Placeholder */}
                        <div className="h-3.5 w-full max-w-md rounded bg-input-bg" />
                    </div>
                </div>

                {/* Stat Cards Grid Skeleton - Exactly 6 cards */}
                <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="w-full box-border rounded-2xl border border-border-main border-t-[3px] border-t-border-main bg-card-bg p-3.5 sm:p-4 shadow-sm"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0 flex-1 space-y-2">
                                    <div className="h-3.5 w-24 rounded bg-input-bg" />
                                    <div className="h-6 sm:h-7 w-28 sm:w-32 rounded-md bg-input-bg" />
                                </div>
                                <div className="size-9 sm:size-10 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
                            </div>
                            <div className="my-2.5 h-px w-full bg-border-main" />
                            <div className="h-3 w-36 rounded bg-input-bg" />
                        </div>
                    ))}
                </div>
            </div>

            {/* ─── 2. Analytics Section Skeleton ─── */}
            <div className="grid min-w-0 grid-cols-1 items-stretch gap-5 lg:grid-cols-2">
                {/* Left Card: Order Status Skeleton */}
                <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6">
                    <div className="mb-5">
                        <div className="mb-1 flex items-center gap-2.5">
                            <div className="size-8 sm:size-9 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
                            <div className="h-5 sm:h-6 w-32 rounded-md bg-input-bg" />
                        </div>
                        <div className="mt-2 h-3.5 w-64 sm:w-80 max-w-full rounded bg-input-bg" />
                    </div>

                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex min-w-0 flex-col justify-between rounded-2xl border border-border-main border-t-[3px] border-t-border-main bg-card-bg p-3.5 shadow-sm sm:p-4"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2">
                                        <div className="flex items-center gap-1.5">
                                            <div className="size-4 shrink-0 rounded bg-input-bg" />
                                            <div className="h-3.5 w-16 sm:w-20 rounded bg-input-bg" />
                                        </div>
                                        <div className="h-4 w-9 shrink-0 rounded-full bg-input-bg" />
                                    </div>
                                    <div className="mt-3 h-6 sm:h-7 w-16 rounded-md bg-input-bg" />
                                </div>
                                <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-border-main/50">
                                    <div className="h-full w-2/5 rounded-full bg-input-bg" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-5 flex items-center justify-between gap-3 border-t border-border-main pt-4">
                        <div className="h-4 w-24 rounded bg-input-bg" />
                        <div className="h-6 sm:h-7 w-14 rounded-md bg-input-bg" />
                    </div>
                </div>

                {/* Right Card: Analytics Chart Skeleton */}
                <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6">
                    <div className="mb-6">
                        <div className="flex items-center gap-2">
                            <div className="size-8 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
                            <div className="h-3 w-28 rounded bg-input-bg" />
                        </div>
                        <div className="mt-2 h-5 sm:h-6 w-44 rounded-md bg-input-bg" />
                        <div className="mt-1 h-3.5 w-56 rounded bg-input-bg" />
                    </div>

                    <div className="flex h-[300px] w-full sm:h-[340px] flex-col justify-between rounded-xl border border-border-main/60 bg-input-bg/20 p-4">
                        <div className="flex flex-1 flex-col justify-between py-2">
                            <div className="h-px w-full border-b border-dashed border-border-main/50" />
                            <div className="h-px w-full border-b border-dashed border-border-main/50" />
                            <div className="h-px w-full border-b border-dashed border-border-main/50" />
                            <div className="h-px w-full border-b border-dashed border-border-main/50" />
                        </div>

                        <div className="flex h-36 items-end justify-between gap-2 px-2 pt-2">
                            <div className="h-[35%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                            <div className="h-[55%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                            <div className="h-[40%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                            <div className="h-[75%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                            <div className="h-[60%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                            <div className="h-[90%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                            <div className="h-[80%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                        </div>

                        <div className="flex items-center justify-between border-t border-border-main pt-2">
                            {Array.from({ length: 7 }).map((_, index) => (
                                <div key={index} className="h-2.5 w-8 sm:w-10 rounded bg-input-bg" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── 3. Activity Section Skeleton ─── */}
            <div className="space-y-4 grid min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-2">
                {/* Left Column: Recent Orders Skeleton */}
                <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6 space-y-4">
                    <div className="flex items-center justify-between gap-3">
                        <div className="space-y-1.5">
                            <div className="h-3 w-28 rounded bg-input-bg" />
                            <div className="h-5 sm:h-6 w-48 rounded-md bg-input-bg" />
                        </div>
                        <div className="h-5 w-16 shrink-0 rounded-full bg-input-bg" />
                    </div>

                    <div className="space-y-3">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border-main bg-card-bg p-3.5 sm:p-4 shadow-xs"
                            >
                                <div className="flex items-center gap-3 min-w-0 flex-1">
                                    <div className="size-9 sm:size-10 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
                                    <div className="min-w-0 flex-1 space-y-1.5">
                                        <div className="h-4 w-32 sm:w-40 rounded bg-input-bg" />
                                        <div className="h-3 w-48 sm:w-56 max-w-full rounded bg-input-bg" />
                                        <div className="h-2.5 w-24 rounded bg-input-bg" />
                                    </div>
                                </div>
                                <div className="flex shrink-0 items-center justify-between sm:justify-end gap-3 sm:gap-3.5 border-t border-border-main/50 sm:border-t-0 pt-2.5 sm:pt-0">
                                    <div className="h-5 w-18 rounded-full bg-input-bg" />
                                    <div className="h-5 sm:h-6 w-20 rounded bg-input-bg" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column: Top Products Skeleton */}
                <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6 space-y-4">
                    <div className="space-y-1.5">
                        <div className="h-3 w-28 rounded bg-input-bg" />
                        <div className="h-5 sm:h-6 w-36 rounded-md bg-input-bg" />
                    </div>

                    <div className="space-y-2.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex min-w-0 items-center gap-3 rounded-xl border border-border-main/70 bg-card-bg p-3"
                            >
                                <div className="size-9 shrink-0 rounded-lg bg-input-bg border border-border-main/50" />
                                <div className="min-w-0 flex-1 space-y-1.5">
                                    <div className="h-4 w-36 sm:w-48 rounded bg-input-bg" />
                                    <div className="h-3 w-28 sm:w-36 rounded bg-input-bg" />
                                </div>
                                <div className="h-4 sm:h-5 w-16 sm:w-20 shrink-0 rounded bg-input-bg" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardSkeleton;
