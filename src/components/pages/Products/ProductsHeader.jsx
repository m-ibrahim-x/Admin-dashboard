import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Package, Plus, Box, Star, CheckCircle2, XCircle } from "lucide-react";
import Button from "../../ui/Button";
import StatCard from "../../ui/StatCard";

const defaultStats = [
    {
        id: "total",
        label: "Total",
        value: "10",
        icon: <Box className="size-5" strokeWidth={1.8} />,
        iconClassName: "border border-brand-active/20 bg-active-bg text-brand-active",
    },
    {
        id: "featured",
        label: "Featured",
        value: "3",
        icon: <Star className="size-5" strokeWidth={1.8} />,
        iconClassName: "border border-brand-active/20 bg-active-bg text-brand-active",
    },
    {
        id: "in-stock",
        label: "In Stock",
        value: "3",
        icon: <CheckCircle2 className="size-5" strokeWidth={1.8} />,
        iconClassName: "border border-brand-active/20 bg-active-bg text-brand-active",
    },
    {
        id: "out-of-stock",
        label: "Out of Stock",
        value: "7",
        icon: <XCircle className="size-5" strokeWidth={1.8} />,
        iconClassName: "border border-status-danger/20 bg-status-danger/10 text-status-danger",
    },
];

const ProductsHeader = ({ statsData }) => {
    const navigate = useNavigate();
    const [selectedStat, setSelectedStat] = useState("total");
    const stats = statsData || defaultStats;

    return (
        <div className="space-y-4">
        {/* ─── 1. Main Header Banner ─── */}
        <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
            {/* Decorative Golden Graphic / Swoop (Top-Right) */}
            <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-2 -top-6 bottom-0 w-36 sm:w-52 md:w-64 overflow-hidden select-none"
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

            {/* Header Content Hierarchy */}
            <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Left: Icon, Category Eyebrow, Title & Subtitle */}
            <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                {/* Brand Squircle Icon Container */}
                <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-md shadow-brand-active/20">
                <Package className="size-5 sm:size-6" strokeWidth={2} />
                </div>

                <div className="min-w-0">
                <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                    PRODUCT DASHBOARD
                </p>
                <h1 className="mt-0.5 text-lg font-bold tracking-tight text-text-primary sm:text-xl lg:text-2xl">
                    Products
                </h1>
                <p className="mt-0.5 text-xs sm:text-[13px] text-text-secondary">
                    Browse, filter, and manage every product in your catalog.
                </p>
                </div>
            </div>

            {/* Right: Add Product Button */}
            <div className="flex items-center shrink-0">
                <Button
                type="button"
                onClick={() => navigate("/add-product")}
                leftIcon={<Plus size={16} />}
                className="w-full sm:w-auto h-10 rounded-xl bg-brand-active px-4 text-sm font-semibold text-bg-main hover:bg-brand-hover shadow-sm"
                >
                Add Product
                </Button>
            </div>
            </div>
        </div>

        {/* ─── 2. Product Status Cards Grid ─── */}
        <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => {
            const isSelected = selectedStat === stat.id;

            return (
                <StatCard
                key={stat.id}
                variant="vertical"
                value={stat.value}
                subText={stat.label}
                icon={stat.icon}
                iconClassName={stat.iconClassName}
                onClick={() => setSelectedStat(stat.id)}
                className={`transition-all duration-200 cursor-pointer ${
                    isSelected
                    ? "border-brand-active ring-1 ring-brand-active/30 shadow-xs"
                    : "border-border-main hover:border-brand-active/40 hover:shadow-xs"
                }`}
                />
            );
            })}
        </div>
        </div>
    );
};

export default ProductsHeader;
