import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, SlidersHorizontal, ChevronDown } from "lucide-react";
import Button from "../../ui/Button";
import Input from "../../ui/Input";

/**
 * Default product categories from design reference
 */
const DEFAULT_CATEGORIES = [
    { value: "electronics", label: "electronics" },
    { value: "phones", label: "phones" },
    { value: "fashion", label: "fashion" },
    { value: "home", label: "home" },
    { value: "beauty", label: "beauty" },
    { value: "sports", label: "sports" },
];

/**
 * ProductsFilters Component
 *
 * Renders the filter controls for the Products management view:
 * 1. Search row: Product search input, Filters toggle button, Search button.
 * 2. Category row: Category dropdown selector ("All Categories" + categories), Subcategory input.
 *
 * Supports smooth open/close animation and both controlled/uncontrolled usage.
 */
const ProductsFilters = ({
    search: controlledSearch,
    searchValue,
    onSearchChange,
    category: controlledCategory,
    categoryValue,
    onCategoryChange,
    subcategory: controlledSubcategory,
    subcategoryValue,
    onSubcategoryChange,
    categories,
    onSearch,
    onFilter,
    onApplyFilters,
    isFiltersOpen,
    showFilters,
    onToggleFilters,
    className = "",
    }) => {
    // Local state for uncontrolled usage
    const [internalSearch, setInternalSearch] = useState("");
    const [internalCategory, setInternalCategory] = useState("all");
    const [internalSubcategory, setInternalSubcategory] = useState("");
    const [internalFiltersVisible, setInternalFiltersVisible] = useState(true);

    // Controlled vs uncontrolled resolution
    const isSearchControlled =
        controlledSearch !== undefined || searchValue !== undefined;
    const currentSearch = isSearchControlled
        ? (controlledSearch ?? searchValue)
        : internalSearch;

    const isCategoryControlled =
        controlledCategory !== undefined || categoryValue !== undefined;
    const currentCategory = isCategoryControlled
        ? (controlledCategory ?? categoryValue)
        : internalCategory;

    const isSubcategoryControlled =
        controlledSubcategory !== undefined || subcategoryValue !== undefined;
    const currentSubcategory = isSubcategoryControlled
        ? (controlledSubcategory ?? subcategoryValue)
        : internalSubcategory;

    const isFiltersVisibleControlled =
        typeof isFiltersOpen === "boolean" || typeof showFilters === "boolean";
    const isFiltersVisible = isFiltersVisibleControlled
        ? Boolean(isFiltersOpen ?? showFilters)
        : internalFiltersVisible;

    // Normalize categories if provided by parent/props, fallback to DEFAULT_CATEGORIES
    const categoryOptions = useMemo(() => {
        const list =
        Array.isArray(categories) && categories.length > 0
            ? categories
            : DEFAULT_CATEGORIES;

        return list
        .map((cat) => {
            if (typeof cat === "string") {
            return { value: cat, label: cat };
            }
            if (typeof cat === "object" && cat !== null) {
            return {
                value: cat.value ?? cat.id ?? cat._id ?? cat.slug ?? cat.name,
                label:
                cat.label ?? cat.name ?? cat.title ?? String(cat.value || ""),
            };
            }
            return null;
        })
        .filter((cat) => Boolean(cat && cat.value && cat.label));
    }, [categories]);

    const handleSearchChange = (e) => {
        const val = e.target.value;
        if (!isSearchControlled) {
        setInternalSearch(val);
        }
        if (typeof onSearchChange === "function") {
        onSearchChange(e);
        }
    };

    const handleCategoryChange = (e) => {
        const val = e.target.value;
        if (!isCategoryControlled) {
        setInternalCategory(val);
        }
        if (typeof onCategoryChange === "function") {
        onCategoryChange(e);
        }
    };

    const handleSubcategoryChange = (e) => {
        const val = e.target.value;
        if (!isSubcategoryControlled) {
        setInternalSubcategory(val);
        }
        if (typeof onSubcategoryChange === "function") {
        onSubcategoryChange(e);
        }
    };

    const handleToggleFilters = () => {
        const nextState = !isFiltersVisible;
        if (!isFiltersVisibleControlled) {
        setInternalFiltersVisible(nextState);
        }
        if (typeof onToggleFilters === "function") {
        onToggleFilters(nextState);
        }
    };

    const handleSubmit = (e) => {
        if (e && typeof e.preventDefault === "function") {
        e.preventDefault();
        }
        const filterData = {
        search: currentSearch,
        category: currentCategory,
        subcategory: currentSubcategory,
        };
        if (typeof onApplyFilters === "function") {
        onApplyFilters(filterData);
        }
        if (typeof onSearch === "function") {
        onSearch(filterData);
        }
        if (typeof onFilter === "function") {
        onFilter(filterData);
        }
    };

    return (
        <div
        className={`rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm ${className}`.trim()}
        >
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* ─── A. Search Row ─── */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Search Input */}
            <div className="flex-1 min-w-0">
                <Input
                id="products-search-input"
                type="search"
                value={currentSearch}
                onChange={handleSearchChange}
                placeholder="Search products..."
                leftIcon={<Search size={16} />}
                className="h-10 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/70 border border-transparent focus:border-border-main pe-3.5"
                containerClassName="gap-0"
                />
            </div>

            {/* Action Buttons: Filters & Search */}
            <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                <Button
                type="button"
                onClick={handleToggleFilters}
                shine={false}
                leftIcon={<SlidersHorizontal size={16} />}
                aria-expanded={isFiltersVisible}
                aria-controls="products-category-filters-row"
                className={`flex-1 sm:flex-initial h-10 rounded-xl px-4 text-sm font-semibold transition-colors shrink-0 ${
                    isFiltersVisible
                    ? "border border-brand-active/40 bg-active-bg text-brand-active hover:bg-brand-active/10"
                    : "border border-border-main bg-input-bg text-text-primary hover:bg-border-main/50"
                }`}
                >
                Filters
                </Button>

                <Button
                type="submit"
                className="flex-1 sm:flex-initial h-10 rounded-xl bg-brand-active px-5 text-sm font-semibold text-bg-main hover:bg-brand-hover shadow-sm shrink-0"
                >
                Search
                </Button>
            </div>
            </div>

            {/* ─── B. Category Row with Smooth Animation ─── */}
            <AnimatePresence initial={false}>
            {isFiltersVisible && (
                <motion.div
                id="products-category-filters-row"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{
                    duration: 0.32,
                    ease: [0.16, 1, 0.3, 1],
                }}
                className="overflow-hidden"
                >
                <div className="space-y-4 p-5">
                    <div className="h-px w-full bg-border-main/60" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {/* Category Column */}
                    <div className="flex w-full flex-col gap-1.5 min-w-0">
                        <label
                        htmlFor="products-category-select"
                        className="text-sm font-medium text-text-primary"
                        >
                        Category
                        </label>
                        <div className="relative w-full">
                        <select
                            id="products-category-select"
                            value={currentCategory}
                            onChange={handleCategoryChange}
                            className="h-10 w-full appearance-none rounded-xl border border-transparent bg-input-bg px-3.5 pe-10 text-sm text-text-primary transition-colors outline-none focus:border-border-main focus-visible:ring-2 focus-visible:ring-brand-active cursor-pointer"
                        >
                            <option
                            value="all"
                            className="bg-card-bg text-text-primary"
                            >
                            All Categories
                            </option>
                            {categoryOptions.map((cat) => (
                            <option
                                key={cat.value}
                                value={cat.value}
                                className="bg-card-bg text-text-primary"
                            >
                                {cat.label}
                            </option>
                            ))}
                        </select>
                        <span
                            aria-hidden="true"
                            className="pointer-events-none absolute inset-y-0 end-3 z-10 flex items-center justify-center text-text-secondary"
                        >
                            <ChevronDown size={16} />
                        </span>
                        </div>
                    </div>

                    {/* Subcategory Column */}
                    <div className="flex w-full flex-col min-w-0">
                        <Input
                        id="products-subcategory-input"
                        label="Subcategory"
                        type="text"
                        value={currentSubcategory}
                        onChange={handleSubcategoryChange}
                        placeholder="e.g. smartphones"
                        className="h-10 rounded-xl bg-input-bg px-3.5 text-sm placeholder:text-text-secondary/70 border border-transparent focus:border-border-main"
                        containerClassName="gap-1.5"
                        />
                    </div>
                    </div>
                </div>
                </motion.div>
            )}
            </AnimatePresence>
        </form>
        </div>
    );
};

export default ProductsFilters;
