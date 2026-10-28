import { useState, useMemo } from "react";
import { ShoppingCart, DollarSign, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import StatCard from "../components/ui/StatCard";
import CartHeader from "../components/pages/Carts/CartHeader";
import CartTable from "../components/pages/Carts/CartTable";
import CartSummary from "../components/pages/Carts/CartSummary";

// ─── Default Mock Data matching the reference design ───
const DEFAULT_CART_ITEMS = [
  {
    id: "64fa821c9a3e4b001",
    name: "Aura Wireless Noise-Cancelling Headphones",
    price: 129.99,
    quantity: 2,
    total: 259.98,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "64fa821c9a3e4b002",
    name: "Minimalist Chrono Leather Watch",
    price: 64.99,
    quantity: 1,
    total: 64.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: "64fa821c9a3e4b003",
    name: "Auren Pulse Smart Fitness Band",
    price: 25.0,
    quantity: 1,
    total: 25.0,
    image:
      "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=150&auto=format&fit=crop&q=80",
  },
];

const DEFAULT_SUMMARY = {
  subtotal: 349.97,
  discount: 50.0,
  couponCode: "SUMMER2026",
  estimatedTax: 0.0,
  totalAmount: 299.97,
};

export default function Carts() {
  const [items, setItems] = useState(DEFAULT_CART_ITEMS);
  const [summary, setSummary] = useState(DEFAULT_SUMMARY);

  // Calculate dynamic totals if items change
  const totalItemCount = useMemo(() => {
    return items.reduce((acc, curr) => acc + (curr.quantity || 1), 0);
  }, [items]);

  // 4 Stat Cards configured according to the project's design system & Users.jsx pattern
  const stats = [
    {
      id: "total-items",
      title: "Total Items",
      value: String(totalItemCount),
      subText: `Across ${items.length} distinct product lines`,
      icon: <ShoppingCart className="size-4 sm:size-5" strokeWidth={2} />,
      borderAccent: "border-t-brand-active",
      iconContainerClass:
        "!bg-active-bg !text-brand-active border-brand-active/20",
    },
    {
      id: "subtotal",
      title: "Subtotal",
      value: `$${Number(summary.subtotal).toFixed(2)}`,
      subText: "Gross item value",
      icon: <DollarSign className="size-4 sm:size-5" strokeWidth={2} />,
      borderAccent: "border-t-status-info",
      iconContainerClass:
        "!bg-status-info/10 !text-status-info border-status-info/20",
    },
    {
      id: "discount",
      title: "Discount",
      value: `$${Number(summary.discount).toFixed(2)}`,
      subText: `Coupon ${summary.couponCode} savings`,
      icon: <ShoppingBag className="size-4 sm:size-5" strokeWidth={2} />,
      borderAccent: "border-t-status-warning",
      iconContainerClass:
        "!bg-status-warning/10 !text-status-warning border-status-warning/20",
    },
    {
      id: "net-total",
      title: "Net Total",
      value: `$${Number(summary.totalAmount).toFixed(2)}`,
      subText: "Payable amount with tax",
      icon: <DollarSign className="size-4 sm:size-5" strokeWidth={2} />,
      borderAccent: "border-t-status-success",
      iconContainerClass:
        "!bg-status-success/10 !text-status-success border-status-success/20",
    },
  ];

  // Actions
  const handleViewItem = (item) => {
    toast.info(`Viewing item details: ${item.name}`);
  };

  const handleCheckout = () => {
    toast.success("Proceeding to checkout with current cart session.");
  };

  const handleClearCart = () => {
    setItems([]);
    setSummary({
      subtotal: 0,
      discount: 0,
      couponCode: "NONE",
      estimatedTax: 0,
      totalAmount: 0,
    });
    toast.info("Cart session has been cleared.");
  };

  return (
    <div className="space-y-4 p-5 min-w-0">
      {/* ─── 1. Header & Active Promotion Banner (Component 1) ─── */}
      <CartHeader
        couponCode={summary.couponCode}
        discountText={`$${Number(summary.discount).toFixed(2)} off qualifying items`}
      />

      {/* ─── 2. Status / Statistics Cards Grid (Directly mapped in Carts.jsx) ─── */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.id}
            variant="horizontal-divider"
            title={stat.title}
            value={stat.value}
            subText={stat.subText}
            icon={stat.icon}
            className={`!items-start !p-3.5 sm:!p-4 border-t-[3px] ${stat.borderAccent} shadow-sm hover:shadow-md transition-shadow duration-200 [&_.my-4]:!my-2.5 [&_p.text-2xl]:!text-xl sm:[&_p.text-2xl]:!text-2xl`}
            iconClassName={`!h-9 !w-9 sm:!h-10 sm:!w-10 !rounded-xl ${stat.iconContainerClass} border`}
          />
        ))}
      </div>

      {/* ─── 3. Main Content: Cart Table (Component 2) + Order Summary (Component 3) ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left: Cart Items Table */}
        <div className="lg:col-span-8 min-w-0">
          <CartTable items={items} onViewItem={handleViewItem} />
        </div>

        {/* Right: Order Summary Card */}
        <div className="lg:col-span-4 min-w-0">
          <CartSummary
            summary={summary}
            onCheckout={handleCheckout}
            onClearCart={handleClearCart}
          />
        </div>
      </div>
    </div>
  );
}
