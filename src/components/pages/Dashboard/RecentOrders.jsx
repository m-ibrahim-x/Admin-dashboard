import { User } from 'lucide-react';

const statusStyles = {
    pending:
        'border-status-warning/20 bg-status-warning/10 text-status-warning',
    processing:
        'border-status-warning/20 bg-status-warning/10 text-status-warning',
    confirmed:
        'border-status-info/20 bg-status-info/10 text-status-info',
    shipped:
        'border-status-info/20 bg-status-info/10 text-status-info',
    delivered:
        'border-status-success/20 bg-status-success/10 text-status-success',
    cancelled:
        'border-status-danger/20 bg-status-danger/10 text-status-danger',
    };

const formatPrice = (price) => {
    return new Intl.NumberFormat('en-EG', {
        style: 'currency',
        currency: 'EGP',
        maximumFractionDigits: 2,
    }).format(price ?? 0);
};

const formatDate = (date) => {
    if (!date) return '—';

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return '—';

    return new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(parsedDate);
    };

const RecentOrders = ({ orders = [] }) => {
    const hasOrders = orders.length > 0;

    return (
        <div className="min-w-0 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:p-5 lg:p-6 space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
            <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                RECENT ORDERS
            </p>

            <h2 className="mt-1 text-lg font-bold tracking-tight text-text-primary sm:text-xl">
                Latest customer activity
            </h2>
            </div>

            <span className="inline-flex shrink-0 items-center rounded-full border border-brand-active/20 bg-active-bg px-2.5 py-0.5 text-xs font-semibold text-brand-active">
            {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
        </div>

        {/* Orders List */}
        {!hasOrders ? (
            <div className="rounded-xl border border-border-main p-8 text-center">
            <p className="text-sm text-text-secondary">
                No recent orders available.
            </p>
            </div>
        ) : (
            <div className="space-y-3">
            {orders.map((order) => {
                const status = String(order.status ?? 'pending').toLowerCase();

                const statusClass =
                statusStyles[status] ??
                'border-border-main bg-bg-main text-text-secondary';

                const customerName =
                order.shippingAddress?.fullName ?? 'Unknown customer';

                const itemsSummary = (order.items ?? [])
                .map((item) => {
                    const productName = item.name ?? 'Unnamed product';
                    const quantity = item.quantity ?? 1;

                    return `${productName} × ${quantity}`;
                })
                .join(', ');

                return (
                <div
                    key={order._id}
                    className="group flex flex-col sm:flex-row  sm:items-center justify-between gap-4 rounded-2xl border border-border-main bg-card-bg p-3.5 sm:p-4 shadow-xs transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-active/40 hover:shadow-md"
                >
                    {/* Left Side: Customer + Order Details */}
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                    {/* Avatar */}
                    <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl border border-brand-active/20 bg-active-bg/70 text-brand-active transition-colors duration-200 group-hover:bg-brand-active group-hover:text-bg-main">
                        <User className="size-4 sm:size-[18px]" strokeWidth={2} />
                    </div>

                    {/* Details */}
                    <div className="min-w-0 flex-1">
                        <h3 className="truncate text-sm sm:text-base font-bold text-text-primary tracking-tight">
                        {customerName}
                        </h3>

                        <p className="mt-0.5 truncate text-xs sm:text-[13px] text-text-secondary">
                        {itemsSummary || 'No product details available'}
                        </p>

                        <p className="mt-1 text-[11px] sm:text-xs text-text-secondary/75">
                        {formatDate(order.createdAt)}
                        </p>
                    </div>
                    </div>

                    {/* Right Side: Status + Total */}
                    <div className="flex shrink-0 items-center justify-between sm:justify-end gap-3 sm:gap-3.5 border-t border-border-main/50 sm:border-t-0 pt-2.5 sm:pt-0">
                    <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-[10px] sm:text-[11px] font-bold tracking-wider uppercase ${statusClass}`}
                    >
                        {status}
                    </span>

                    <span className="text-base sm:text-lg font-bold tabular-nums text-text-primary tracking-tight">
                        {formatPrice(order.totalPrice)}
                    </span>
                    </div>
                </div>
                );
            })}
            </div>
        )}
        </div>
    );
};

export default RecentOrders;