import { AlertCircle } from 'lucide-react';

const ActivityError = () => {
    return (
        <section
            className="space-y-4 grid p-5 min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-2"
            role="alert"
            aria-live="assertive"
        >
            {/* Recent Orders Error Card */}
            <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6 space-y-4">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                        RECENT ORDERS
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-text-primary sm:text-xl">
                        Latest customer activity
                    </h2>
                </div>

                <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-border-main p-8 text-center">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-status-danger/20 bg-status-danger/10 text-status-danger mb-3">
                        <AlertCircle className="size-5" strokeWidth={2} />
                    </div>

                    <p className="text-sm font-medium text-text-primary">
                        Failed to load recent orders
                    </p>

                    <p className="mt-1 text-xs sm:text-[13px] text-text-secondary">
                        Recent customer purchase activity could not be retrieved.
                    </p>
                </div>
            </div>

            {/* Top Products Error Card */}
            <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6 space-y-4">
                <div>
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                        TOP PRODUCTS
                    </p>
                    <h2 className="mt-1 text-lg font-bold tracking-tight text-text-primary sm:text-xl">
                        Best sellers
                    </h2>
                </div>

                <div className="flex min-h-48 flex-col items-center justify-center rounded-xl border border-border-main p-8 text-center">
                    <div className="flex size-10 items-center justify-center rounded-xl border border-status-danger/20 bg-status-danger/10 text-status-danger mb-3">
                        <AlertCircle className="size-5" strokeWidth={2} />
                    </div>

                    <p className="text-sm font-medium text-text-primary">
                        Failed to load top products
                    </p>

                    <p className="mt-1 text-xs sm:text-[13px] text-text-secondary">
                        Top-selling product rankings could not be retrieved.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ActivityError;
