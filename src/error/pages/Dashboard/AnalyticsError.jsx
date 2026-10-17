import { AlertCircle } from 'lucide-react';

const AnalyticsError = ({ message = "Failed to load store analytics data. Please try refreshing the page." }) => {
    return (
        <section
            className="grid p-5 min-w-0 grid-cols-1 items-stretch gap-5 lg:grid-cols-2"
            role="alert"
            aria-live="assertive"
        >
            {/* Order Status Error Card */}
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-main bg-card-bg p-6 text-center shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-status-danger/20 bg-status-danger/10 text-status-danger mb-3">
                    <AlertCircle className="size-6" strokeWidth={2} />
                </div>

                <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
                    Failed to Load Order Status
                </h3>

                <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-text-secondary">
                    {message}
                </p>
            </div>

            {/* Store Analytics Error Card */}
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-main bg-card-bg p-6 text-center shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-status-danger/20 bg-status-danger/10 text-status-danger mb-3">
                    <AlertCircle className="size-6" strokeWidth={2} />
                </div>

                <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
                    Failed to Load Store Analytics
                </h3>

                <p className="mt-1.5 max-w-sm text-xs sm:text-sm text-text-secondary">
                    Revenue and order timeline charts could not be retrieved.
                </p>
            </div>
        </section>
    );
};

export default AnalyticsError;
