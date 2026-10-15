
import { useId, useState } from "react";
import { twMerge } from "tailwind-merge";
import {
    Eye,
    EyeOff,
    CircleCheck,
    CircleAlert,
} from "lucide-react";

const Input = ({
    id,
    label,
    type = "text",
    value,
    onChange,
    placeholder = "",
    helperText,
    error,
    success = false,
    successText,
    disabled = false,
    required = false,
    leftIcon,
    rightIcon,
    allowToggleVisibility = false,
    className = "",
    containerClassName = "",
    ...props
}) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    const helperId = `${inputId}-helper`;
    const errorId = `${inputId}-error`;
    const successId = `${inputId}-success`;

    const [isVisible, setIsVisible] = useState(false);

    const hasError = Boolean(error);
    const hasSuccess = !hasError && success;
    const canToggleVisibility =
        allowToggleVisibility && type === "password";

    const inputType =
        canToggleVisibility && isVisible ? "text" : type;

    const describedBy = [
        !hasError && helperText ? helperId : null,
        hasError ? errorId : null,
        hasSuccess && successText ? successId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    const baseInputClasses = [
        "w-full",
        "bg-input-bg text-text-primary",
        "placeholder:text-text-secondary",
        "outline-none",
        "transition-colors duration-200",
        "focus-visible:ring-2 focus-visible:ring-brand-active",
        "disabled:cursor-not-allowed disabled:opacity-60",
    ].join(" ");

    const iconColorClass = hasError
        ? "text-status-danger"
        : hasSuccess
        ? "text-status-success"
        : "text-text-secondary";

    const inputClasses = twMerge(
        baseInputClasses,
        hasError && "ring-1 ring-status-danger",
        hasSuccess && "ring-1 ring-status-success",
        leftIcon && "ps-10",
        (rightIcon || canToggleVisibility) && "pe-10",
        className
    );

    return (
        <div
            className={twMerge(
                "flex w-full flex-col gap-1.5",
                containerClassName
            )}
        >
            {label && (
                <label
                    htmlFor={inputId}
                    className="text-sm font-medium text-text-primary"
                >
                    {label}

                    {required && (
                        <span
                            aria-hidden="true"
                            className="ms-1 text-status-danger"
                        >
                            *
                        </span>
                    )}
                </label>
            )}

            <div className="relative w-full">
                {leftIcon && (
                    <span
                        aria-hidden="true"
                        className={twMerge(
                            "pointer-events-none absolute inset-y-0 start-3 z-10 flex items-center justify-center",
                            iconColorClass
                        )}
                    >
                        {leftIcon}
                    </span>
                )}

                <input
                    {...props}
                    id={inputId}
                    type={inputType}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    required={required}
                    aria-invalid={hasError || undefined}
                    aria-describedby={describedBy}
                    className={inputClasses}
                />

                {canToggleVisibility ? (
                    <button
                        type="button"
                        disabled={disabled}
                        aria-label={
                            isVisible
                                ? "إخفاء المحتوى"
                                : "إظهار المحتوى"
                        }
                        aria-pressed={isVisible}
                        onClick={() =>
                            setIsVisible((previous) => !previous)
                        }
                        className="absolute inset-y-0 end-3 z-10 flex items-center justify-center text-text-secondary transition-colors hover:text-text-primary disabled:cursor-not-allowed"
                    >
                        {isVisible ? (
                            <EyeOff size={18} aria-hidden="true" />
                        ) : (
                            <Eye size={18} aria-hidden="true" />
                        )}
                    </button>
                ) : (
                    rightIcon && (
                        <span
                            aria-hidden="true"
                            className={twMerge(
                                "absolute inset-y-0 end-3 z-10 flex items-center justify-center",
                                iconColorClass
                            )}
                        >
                            {rightIcon}
                        </span>
                    )
                )}
            </div>

            {hasError ? (
                <p
                    id={errorId}
                    role="alert"
                    className="flex items-start gap-1.5 text-sm text-status-danger"
                >
                    <CircleAlert
                        size={16}
                        className="mt-0.5 shrink-0"
                        aria-hidden="true"
                    />
                    <span>{error}</span>
                </p>
            ) : hasSuccess ? (
                successText && (
                    <p
                        id={successId}
                        className="flex items-start gap-1.5 text-sm text-status-success"
                    >
                        <CircleCheck
                            size={16}
                            className="mt-0.5 shrink-0"
                            aria-hidden="true"
                        />
                        <span>{successText}</span>
                    </p>
                )
            ) : (
                helperText && (
                    <p
                        id={helperId}
                        className="text-sm text-text-secondary"
                    >
                        {helperText}
                    </p>
                )
            )}
        </div>
    );
};

export default Input;
