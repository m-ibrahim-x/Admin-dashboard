
const PageFallback = () => {
    return (
        <div
            role="status"
            aria-live="polite"
            aria-label="Loading page"
            className="flex min-h-[320px] w-full flex-1 items-center justify-center p-6"
        >
            <div className="flex flex-col items-center gap-5">
                {/* Animated Loading Indicator */}
                <div className="relative flex h-14 w-14 items-center justify-center">
                    <div className="absolute inset-0 rounded-2xl border border-border-main bg-surface shadow-sm" />

                    <div className="absolute inset-1.5 rounded-xl border-2 border-transparent border-t-brand-active border-r-brand-active/40 animate-spin" />

                    <div className="h-2.5 w-2.5 rounded-full bg-brand-active shadow-[0_0_12px_var(--color-brand-active)]" />
                </div>

                {/* Loading Message */}
                <div className="flex flex-col items-center gap-2">
                    <p className="text-sm font-semibold text-text-primary">
                        Loading page
                    </p>

                    <div className="flex items-center gap-1" aria-hidden="true">
                        <span className="h-1 w-1 animate-pulse rounded-full bg-brand-active" />
                        <span className="h-1 w-1 animate-pulse rounded-full bg-brand-active [animation-delay:150ms]" />
                        <span className="h-1 w-1 animate-pulse rounded-full bg-brand-active [animation-delay:300ms]" />
                    </div>

                    <span className="sr-only">Please wait while the page loads.</span>
                </div>
            </div>
        </div>
    );
};

export default PageFallback;
