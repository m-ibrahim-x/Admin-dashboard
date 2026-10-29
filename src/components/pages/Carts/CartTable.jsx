import { useMemo } from "react";
import { Package, Eye } from "lucide-react";
import DataTable from "../../ui/DataTable";
import Button from "../../ui/Button";

export default function CartTable({ items = [], onViewItem }) {
  const columns = useMemo(
    () => [
      {
        key: "product",
        header: "PRODUCT",
        render: (_, row) => (
          <div className="flex items-center gap-3.5 min-w-[220px]">
            <div className="size-12 shrink-0 rounded-xl overflow-hidden bg-input-bg border border-border-main/50 flex items-center justify-center shadow-xs">
              <img
                src={row.image}
                alt={row.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p
                className="font-semibold text-xs sm:text-sm text-text-primary tracking-tight truncate"
                title={row.name}
              >
                {row.name}
              </p>
              <span className="inline-block text-[11px] font-mono text-text-secondary mt-0.5">
                ID: {row.id}
              </span>
            </div>
          </div>
        ),
      },
      {
        key: "price",
        header: "PRICE",
        render: (price) => (
          <span className="font-medium tabular-nums text-xs sm:text-sm text-text-primary">
            ${Number(price).toFixed(2)}
          </span>
        ),
      },
      {
        key: "quantity",
        header: "QUANTITY",
        render: (qty) => (
          <span className="inline-flex size-7 items-center justify-center rounded-lg bg-input-bg border border-border-main text-xs font-bold tabular-nums text-text-primary">
            {qty}
          </span>
        ),
      },
      {
        key: "total",
        header: "TOTAL",
        render: (total) => (
          <span className="font-bold tabular-nums text-xs sm:text-sm text-text-primary">
            ${Number(total).toFixed(2)}
          </span>
        ),
      },
      {
        key: "action",
        header: "ACTION",
        align: "right",
        render: (_, row) => (
          <div className="flex items-center justify-end">
            <Button
              type="button"
              shine={false}
              onClick={() => onViewItem?.(row)}
              title="View Details"
              aria-label={`View details for ${row.name}`}
              className="size-8 rounded-lg border border-border-main bg-input-bg text-text-secondary hover:text-text-primary hover:border-brand-active/40 p-0"
            >
              <Eye size={15} />
            </Button>
          </div>
        ),
      },
    ],
    [onViewItem]
  );

  return (
    <div className="rounded-2xl border border-border-main bg-card-bg shadow-sm overflow-hidden">
      {/* ─── Section Header (Pattern 2 from DESIGN_SYSTEM.md) ─── */}
      <div className="flex items-center justify-between border-b border-border-main p-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl border border-brand-active/20 bg-active-bg text-brand-active shadow-xs">
            <Package className="size-4 sm:size-5" />
          </div>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
              CART INVENTORY
            </p>
            <h2 className="text-base sm:text-lg font-bold tracking-tight text-text-primary mt-0.5">
              Cart Items
            </h2>
          </div>
        </div>

        <span className="inline-flex items-center rounded-full border border-brand-active/20 bg-active-bg px-3 py-0.5 text-xs font-bold text-brand-active tabular-nums">
          {items.length} Products
        </span>
      </div>

      {/* ─── Reusable DataTable from src/components/ui ─── */}
      <DataTable
        columns={columns}
        data={items}
        keyField="id"
        containerClassName="border-0 rounded-none shadow-none"
        emptyState={
          <div className="flex flex-col items-center justify-center gap-2 py-12 text-center">
            <Package className="size-10 text-text-secondary/50" />
            <p className="text-sm font-semibold text-text-primary">
              Your cart is empty
            </p>
            <p className="text-xs text-text-secondary max-w-xs">
              No products found in this cart session.
            </p>
          </div>
        }
      />
    </div>
  );
}
