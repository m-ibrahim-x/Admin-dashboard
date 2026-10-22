import { PackagePlus, ArrowLeft, Sparkles } from "lucide-react";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
const AddProductHeader = () => {
    const navigate = useNavigate();
    return (
        <div className="relative overflow-hidden rounded-xl border border-border-main bg-card-bg p-4 shadow-sm sm:rounded-2xl sm:p-5">
        {/* Decorative Golden Graphic */}
        <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 select-none overflow-hidden opacity-90 sm:w-52 md:w-64"
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

        <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Content */}
            <div className="flex min-w-0 flex-1 flex-col gap-3">
            {/* Back Button - UI Only */}
            <div>
                <Button
                type="button"
                shine={false}
                onClick={() => navigate("/products")}
                leftIcon={<ArrowLeft size={15} />}
                className="h-8 cursor-pointer rounded-full border border-border-main bg-input-bg/70 px-3.5 text-xs font-semibold text-text-secondary shadow-none transition-colors hover:border-brand-active/40 hover:text-brand-active"
                >
                Back to products
                </Button>
            </div>

            {/* Title and Icon */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-md shadow-brand-active/20 sm:size-12">
                <PackagePlus
                    className="size-5 sm:size-6"
                    strokeWidth={2}
                />
                </div>

                <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                    CREATE PRODUCT
                </p>

                <h1 className="mt-0.5 text-lg font-bold tracking-tight text-text-primary sm:text-xl lg:text-2xl">
                    Add a New Product
                </h1>
                </div>
            </div>

            {/* Description */}
            <p className="max-w-2xl text-xs leading-relaxed text-text-secondary sm:text-[13px]">
                Enter product details, upload images, and configure your product information before saving it to your catalog.
            </p>
            </div>

            {/* Ready to Launch Card */}
            <div className="hidden shrink-0 items-center gap-3 rounded-2xl border border-border-main bg-input-bg/50 p-3.5 shadow-xs lg:flex">
            <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-active/10 text-brand-active">
                <Sparkles size={18} />
            </div>

            <div>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-brand-active">
                Ready to add a product?
                </span>

                <p className="text-xs font-semibold text-text-primary">
                Complete the details and save your product.
                </p>
            </div>
            </div>
        </div>
        </div>
    );
};

export default AddProductHeader;