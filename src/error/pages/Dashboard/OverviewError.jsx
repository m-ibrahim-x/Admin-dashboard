import { AlertCircle } from 'lucide-react';

const OverviewError = ({ message = "Failed to load dashboard overview. Please try refreshing the page." }) => {
    return (
        <section
            className="p-5"
            role="alert"
            aria-live="assertive"
        >
            <div className="flex min-h-72 flex-col items-center justify-center rounded-2xl border border-border-main bg-card-bg p-6 sm:p-8 text-center shadow-sm">
                <div className="flex size-12 items-center justify-center rounded-2xl border border-status-danger/20 bg-status-danger/10 text-status-danger mb-3">
                    <AlertCircle className="size-6" strokeWidth={2} />
                </div>

                <h3 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
                    Failed to Load Dashboard Overview
                </h3>

                <p className="mt-1.5 max-w-md text-xs sm:text-sm text-text-secondary">
                    {message}
                </p>
            </div>
        </section>
    );
};

export default OverviewError;
