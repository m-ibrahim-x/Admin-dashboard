
import { twMerge } from "tailwind-merge";

const Button = ({
    children,
    leftIcon,
    rightIcon,
    className = "",
    type = "button",
    onClick,
    disabled = false,
    isLoading = false,
    loadingText,
    loadingIcon,
    shine = true,
    ...props
}) => {
    const isDisabled = disabled || isLoading;

    const baseClasses = [
        "ui-button",
        "relative isolate inline-flex items-center justify-center gap-2",
        "border border-transparent",
        "font-medium leading-none",
        "transition-colors duration-200",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-brand-active focus-visible:ring-offset-2",
        "focus-visible:ring-offset-bg-main",
        "disabled:cursor-not-allowed disabled:opacity-60",
    ].join(" ");

    return (
        <button
            {...props}
            type={type}
            onClick={onClick}
            disabled={isDisabled}
            aria-busy={isLoading || undefined}
            className={twMerge(baseClasses, className)}
        >
            {shine && !isDisabled && (
                <span
                    aria-hidden="true"
                    className="ui-button__shine pointer-events-none absolute inset-0 z-0"
                />
            )}

            <span className="relative z-10 inline-flex items-center justify-center gap-2">
                {isLoading ? (
                    <>
                        {loadingText && <span>{loadingText}</span>}

                        {loadingIcon !== null &&
                            (loadingIcon !== undefined ? (
                                loadingIcon
                            ) : (
                                <svg
                                    aria-hidden="true"
                                    className="size-4 shrink-0 animate-spin"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                >
                                    <circle
                                        className="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        strokeWidth="4"
                                    />

                                    <path
                                        className="opacity-90"
                                        fill="currentColor"
                                        d="M12 2a10 10 0 0 1 10 10h-4a6 6 0 0 0-6-6V2Z"
                                    />
                                </svg>
                            ))}
                    </>
                ) : (
                    <>
                        {leftIcon}
                        {children}
                        {rightIcon}
                    </>
                )}
            </span>
        </button>
    );
};

export default Button;
