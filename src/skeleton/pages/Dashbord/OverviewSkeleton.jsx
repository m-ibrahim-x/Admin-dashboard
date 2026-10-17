const OverviewSkeleton = () => {
    return (
        <section
            className="space-y-4 p-5 animate-pulse"
            aria-busy="true"
            aria-label="Loading dashboard overview"
        >
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

            {/* Stat Cards Grid Skeleton - Exactly 6 cards matching DashboardOverview */}
            <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="w-full box-border rounded-2xl border border-border-main border-t-[3px] border-t-border-main bg-card-bg p-3.5 sm:p-4 shadow-sm"
                    >
                        {/* Card Top: Title + Value on left, Icon Box on right */}
                        <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1 space-y-2">
                                {/* Title placeholder */}
                                <div className="h-3.5 w-24 rounded bg-input-bg" />

                                {/* Primary value placeholder */}
                                <div className="h-6 sm:h-7 w-28 sm:w-32 rounded-md bg-input-bg" />
                            </div>

                            {/* Icon Container Placeholder */}
                            <div className="size-9 sm:size-10 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
                        </div>

                        {/* Divider */}
                        <div className="my-2.5 h-px w-full bg-border-main" />

                        {/* Subtext Placeholder */}
                        <div className="h-3 w-36 rounded bg-input-bg" />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default OverviewSkeleton;
