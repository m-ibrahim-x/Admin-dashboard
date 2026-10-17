const ActivitySkeleton = () => {
    return (
        <section
            className="space-y-4 grid p-5 min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-2 animate-pulse"
            aria-busy="true"
            aria-label="Loading dashboard activity"
        >
            {/* Left Column: Recent Orders Skeleton */}
            <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between gap-3">
                    <div className="space-y-1.5">
                        {/* Eyebrow Placeholder */}
                        <div className="h-3 w-28 rounded bg-input-bg" />
                        {/* Heading Placeholder */}
                        <div className="h-5 sm:h-6 w-48 rounded-md bg-input-bg" />
                    </div>

                    {/* Order Count Badge Placeholder */}
                    <div className="h-5 w-16 shrink-0 rounded-full bg-input-bg" />
                </div>

                {/* Orders List Skeleton */}
                <div className="space-y-3">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-border-main bg-card-bg p-3.5 sm:p-4 shadow-xs"
                        >
                            {/* Left Side: Customer Avatar & Details */}
                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                {/* Customer Avatar Placeholder */}
                                <div className="size-9 sm:size-10 shrink-0 rounded-xl bg-input-bg border border-border-main/50" />

                                {/* Details Placeholders */}
                                <div className="min-w-0 flex-1 space-y-1.5">
                                    {/* Customer Name Placeholder */}
                                    <div className="h-4 w-32 sm:w-40 rounded bg-input-bg" />
                                    {/* Items Summary Placeholder */}
                                    <div className="h-3 w-48 sm:w-56 max-w-full rounded bg-input-bg" />
                                    {/* Order Date Placeholder */}
                                    <div className="h-2.5 w-24 rounded bg-input-bg" />
                                </div>
                            </div>

                            {/* Right Side: Status Badge + Total Price */}
                            <div className="flex shrink-0 items-center justify-between sm:justify-end gap-3 sm:gap-3.5 border-t border-border-main/50 sm:border-t-0 pt-2.5 sm:pt-0">
                                {/* Status Badge Placeholder */}
                                <div className="h-5 w-18 rounded-full bg-input-bg" />
                                {/* Total Price Placeholder */}
                                <div className="h-5 sm:h-6 w-20 rounded bg-input-bg" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right Column: Top Products Skeleton */}
            <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6 space-y-4">
                {/* Header */}
                <div className="space-y-1.5">
                    {/* Eyebrow Placeholder */}
                    <div className="h-3 w-28 rounded bg-input-bg" />
                    {/* Heading Placeholder */}
                    <div className="h-5 sm:h-6 w-36 rounded-md bg-input-bg" />
                </div>

                {/* Products List Skeleton */}
                <div className="space-y-2.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <div
                            key={index}
                            className="flex min-w-0 items-center gap-3 rounded-xl border border-border-main/70 bg-card-bg p-3"
                        >
                            {/* Ranking Number Box Placeholder */}
                            <div className="size-9 shrink-0 rounded-lg bg-input-bg border border-border-main/50" />

                            {/* Product Details Placeholders */}
                            <div className="min-w-0 flex-1 space-y-1.5">
                                {/* Product Name Placeholder */}
                                <div className="h-4 w-36 sm:w-48 rounded bg-input-bg" />
                                {/* Sales & Price Info Placeholder */}
                                <div className="h-3 w-28 sm:w-36 rounded bg-input-bg" />
                            </div>

                            {/* Revenue Placeholder */}
                            <div className="h-4 sm:h-5 w-16 sm:w-20 shrink-0 rounded bg-input-bg" />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ActivitySkeleton;
