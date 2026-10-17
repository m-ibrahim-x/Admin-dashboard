import { Package } from 'lucide-react';

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-EG', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 2,
    }).format(price ?? 0);
    };

    const TopProducts = ({ products = [] }) => {
    const hasProducts = products.length > 0;

    return (
        <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6 space-y-4">
        {/* Header */}
        <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
            TOP PRODUCTS
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-tight text-text-primary sm:text-xl">
            Best sellers
            </h2>
        </div>

        {/* Products List */}
        {!hasProducts ? (
            <div className="rounded-xl border border-border-main p-8 text-center">
            <Package className="mx-auto size-8 text-text-secondary/60" />

            <p className="mt-3 text-sm font-medium text-text-primary">
                No products available
            </p>

            <p className="mt-1 text-xs text-text-secondary">
                Product sales data will appear here when available.
            </p>
            </div>
        ) : (
            <div className="space-y-2.5">
            {products.map((product, index) => (
                <div
                key={product._id ?? `${product.name}-${index}`}
                className="flex min-w-0 items-center gap-3 rounded-xl border border-border-main/70 bg-card-bg p-3 transition-all duration-200 hover:border-brand-active/30 hover:shadow-sm"
                >
                {/* Ranking */}
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-brand-active/20 bg-active-bg text-xs sm:text-sm font-bold text-brand-active">
                    {index + 1}
                </div>

                {/* Product Details */}
                <div className="min-w-0 flex-1">
                    <h3
                    title={product.name ?? 'Unnamed product'}
                    className="truncate text-sm sm:text-base font-bold tracking-tight text-text-primary"
                    >
                    {product.name ?? 'Unnamed product'}
                    </h3>

                    <p className="mt-0.5 truncate text-xs sm:text-[13px] text-text-secondary">
                    {product.totalSold ?? 0} units sold
                    {' · '}
                    {formatPrice(product.revenue)}
                    </p>
                </div>

                {/* Revenue */}
                <span className="shrink-0 text-sm sm:text-base font-bold tabular-nums text-brand-active">
                    {formatPrice(product.revenue)}
                </span>
                </div>
            ))}
            </div>
        )}
        </div>
    );
};

export default TopProducts;