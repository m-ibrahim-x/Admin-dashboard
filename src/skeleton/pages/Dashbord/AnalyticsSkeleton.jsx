const AnalyticsSkeleton = () => {
    return (
        <section
            className="grid p-5 min-w-0 grid-cols-1 items-stretch gap-5 lg:grid-cols-2 animate-pulse"
            aria-busy="true"
            aria-label="Loading dashboard analytics"
        >
            {/* Left Card: Order Status Skeleton */}
            <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6">
                {/* Header */}
                <div className="mb-5">
                    <div className="mb-1 flex items-center gap-2.5">
                        {/* Icon Placeholder */}
                        <div className="size-8 sm:size-9 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
                        {/* Title Placeholder */}
                        <div className="h-5 sm:h-6 w-32 rounded-md bg-input-bg" />
                    </div>
                    {/* Subtitle Placeholder */}
                    <div className="mt-2 h-3.5 w-64 sm:w-80 max-w-full rounded bg-input-bg" />
                </div>

                {/* 6 Order Status Cards Grid */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex min-w-0 flex-col justify-between rounded-2xl border border-border-main border-t-[3px] border-t-border-main bg-card-bg p-3.5 shadow-sm sm:p-4"
                        >
                            <div>
                                {/* Status Title + Percentage Badge */}
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex items-center gap-1.5">
                                        <div className="size-4 shrink-0 rounded bg-input-bg" />
                                        <div className="h-3.5 w-16 sm:w-20 rounded bg-input-bg" />
                                    </div>
                                    <div className="h-4 w-9 shrink-0 rounded-full bg-input-bg" />
                                </div>

                                {/* Count Placeholder */}
                                <div className="mt-3 h-6 sm:h-7 w-16 rounded-md bg-input-bg" />
                            </div>

                            {/* Progress Bar Placeholder */}
                            <div className="mt-3.5 h-1.5 w-full overflow-hidden rounded-full bg-border-main/50">
                                <div className="h-full w-2/5 rounded-full bg-input-bg" />
                            </div>
                        </div>
                    ))}
                </div>

                {/* Total Orders Footer */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-border-main pt-4">
                    <div className="h-4 w-24 rounded bg-input-bg" />
                    <div className="h-6 sm:h-7 w-14 rounded-md bg-input-bg" />
                </div>
            </div>

            {/* Right Card: Analytics Chart Skeleton */}
            <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6">
                {/* Chart Header */}
                <div className="mb-6">
                    <div className="flex items-center gap-2">
                        {/* Icon placeholder */}
                        <div className="size-8 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />
                        {/* Eyebrow placeholder */}
                        <div className="h-3 w-28 rounded bg-input-bg" />
                    </div>

                    {/* Chart Heading */}
                    <div className="mt-2 h-5 sm:h-6 w-44 rounded-md bg-input-bg" />

                    {/* Chart Subtitle */}
                    <div className="mt-1 h-3.5 w-56 rounded bg-input-bg" />
                </div>

                {/* Chart Area Container Placeholder */}
                <div className="flex h-[300px] w-full sm:h-[340px] flex-col justify-between rounded-xl border border-border-main/60 bg-input-bg/20 p-4">
                    {/* Horizontal Grid Lines */}
                    <div className="flex flex-1 flex-col justify-between py-2">
                        <div className="h-px w-full border-b border-dashed border-border-main/50" />
                        <div className="h-px w-full border-b border-dashed border-border-main/50" />
                        <div className="h-px w-full border-b border-dashed border-border-main/50" />
                        <div className="h-px w-full border-b border-dashed border-border-main/50" />
                    </div>

                    {/* Simulated Data Curve / Bars */}
                    <div className="flex h-36 items-end justify-between gap-2 px-2 pt-2">
                        <div className="h-[35%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                        <div className="h-[55%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                        <div className="h-[40%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                        <div className="h-[75%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                        <div className="h-[60%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                        <div className="h-[90%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                        <div className="h-[80%] w-6 sm:w-8 rounded-t bg-input-bg/70" />
                    </div>

                    {/* X-Axis Labels Placeholder */}
                    <div className="flex items-center justify-between border-t border-border-main pt-2">
                        {Array.from({ length: 7 }).map((_, index) => (
                            <div key={index} className="h-2.5 w-8 sm:w-10 rounded bg-input-bg" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AnalyticsSkeleton;
