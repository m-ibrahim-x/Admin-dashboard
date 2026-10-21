const StatCard = ({
    title,
    value,
    icon,
    subText,
    meta,
    variant = "default",
    iconClassName = "",
    className = "",
    showDivider = false,
    onClick,
}) => {
    const isInteractive = typeof onClick === "function";
    const isVertical = variant === "vertical";
    const isHorizontal = variant === "horizontal";
    const isHorizontalDivider = variant === "horizontal-divider";

    const variantClasses = {
        default: "flex-row items-center justify-between p-5",
        horizontal: "flex-row items-center gap-3 sm:gap-4 p-4 sm:p-5",
        vertical: "flex-col items-start gap-3 p-4 sm:p-5",
        "horizontal-divider": "flex-col items-stretch gap-0 p-4 sm:p-5",
    };

    const cardClassName = [
        "w-full box-border rounded-2xl border border-border-main bg-card-bg",
        "text-text-primary shadow-sm",
        variantClasses[variant] || variantClasses.default,
        isInteractive
            ? "cursor-pointer select-none transition-all hover:border-brand-active/50 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active focus-visible:ring-offset-2"
            : "",
        className,
    ]
        .filter(Boolean)
        .join(" ");

    const iconContainerClassName = [
        "flex shrink-0 items-center justify-center",
        isVertical && !iconClassName
            ? "h-10 w-10 rounded-xl border border-border-main bg-input-bg text-text-secondary"
            : isVertical
              ? "h-10 w-10 rounded-xl"
              : isHorizontal
                ? "rounded-xl p-2.5 sm:rounded-2xl sm:p-3"
                : !iconClassName
                  ? "h-12 w-12 rounded-xl bg-brand-active text-bg-main"
                  : "",
        !iconClassName && isHorizontal
            ? "bg-brand-active/10 text-brand-active"
            : "",
        iconClassName,
    ]
        .filter(Boolean)
        .join(" ");

    const content = (
        <>
            {isHorizontalDivider ? (
                <>
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-text-secondary">
                                {title}
                            </p>

                            <p className="mt-1 break-words text-2xl font-bold text-text-primary sm:text-3xl">
                                {value}
                            </p>
                        </div>

                        {icon && (
                            <div className={iconContainerClassName}>
                                {icon}
                            </div>
                        )}
                    </div>

                    <div className="my-4 h-px w-full bg-border-main" />

                    <div className="min-w-0">
                        {meta !== undefined &&
                            meta !== null &&
                            meta !== "" && (
                                <p className="mb-1 text-xs font-medium text-text-secondary">
                                    {meta}
                                </p>
                            )}

                        {subText && (
                            <p className="break-words text-xs text-text-secondary">
                                {subText}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <>
                    {icon && isVertical && (
                        <div className={iconContainerClassName}>
                            {icon}
                        </div>
                    )}

                    <div
                        className={`min-w-0 flex-1 ${
                            isVertical ? "w-full" : ""
                        }`}
                    >
                        {(title ||
                            (meta !== undefined &&
                                meta !== null &&
                                meta !== "")) && (
                            <div className="flex items-start justify-between gap-3">
                                {title && (
                                    <p className="min-w-0 truncate text-sm font-medium text-text-secondary">
                                        {title}
                                    </p>
                                )}

                                {meta !== undefined &&
                                    meta !== null &&
                                    meta !== "" && (
                                        <span className="shrink-0 text-xs font-medium text-text-secondary">
                                            {meta}
                                        </span>
                                    )}
                            </div>
                        )}

                        <p
                            className={`mt-1 truncate font-bold text-text-primary ${
                                isHorizontal
                                    ? "text-lg sm:text-xl"
                                    : "text-2xl sm:text-3xl"
                            }`}
                        >
                            {value}
                        </p>

                        {showDivider && (
                            <div className="my-4 h-px w-full bg-border-main" />
                        )}

                        {subText && (
                            <p className="mt-1 truncate text-xs text-text-secondary">
                                {subText}
                            </p>
                        )}
                    </div>

                    {icon && !isVertical && (
                        <div className={iconContainerClassName}>
                            {icon}
                        </div>
                    )}
                </>
            )}
        </>
    );

    if (isInteractive) {
        return (
            <button
                type="button"
                onClick={onClick}
                className={`${cardClassName} text-left`}
            >
                {content}
            </button>
        );
    }

    return <div className={cardClassName}>{content}</div>;
};

export default StatCard;
