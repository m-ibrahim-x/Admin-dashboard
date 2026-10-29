
import { useState, useMemo, useEffect, useRef } from "react";
import { ShoppingCart, DollarSign, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import StatCard from "../components/ui/StatCard";
import CartHeader from "../components/pages/Carts/CartHeader";
import CartTable from "../components/pages/Carts/CartTable";
import CartSummary from "../components/pages/Carts/CartSummary";
import ProductDetailsModal from "../components/pages/Carts/ProductDetailsModal";
import CartsSkeleton from "../skeleton/pages/Carts/CartsSkeleton";
import CartsError from "../error/pages/Carts/CartsError";

import { clearCarts, getAllCarts } from "../api/cartsApi";

const INITIAL_CART = {
  itemCount: 0,
  subtotal: 0,
  discountAmount: 0,
  total: 0,
  coupon: null,
  items: [],
};

export default function Carts() {
  const [cart, setCart] = useState(INITIAL_CART);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const dialogRef = useRef(null);

  // Fetch cart data from the API.
  useEffect(() => {
    let isMounted = true;

    const fetchCart = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await getAllCarts();
        const cartData = response.data?.data ?? response.data;

        if (!Array.isArray(cartData?.items)) {
          throw new Error("Invalid cart response from the server.");
        }

        // Normalize item fields for the existing CartTable.
        const normalizedItems = cartData.items.map((item) => ({
          ...item,
          id: item._id ?? item.id,
          total:
            Number(item.price ?? 0) *
            Number(item.quantity ?? 0),
        }));

        if (isMounted) {
          setCart({
            itemCount: Number(cartData.itemCount ?? 0),
            subtotal: Number(cartData.subtotal ?? 0),
            discountAmount: Number(cartData.discountAmount ?? 0),
            total: Number(cartData.total ?? 0),
            coupon: cartData.coupon ?? null,
            items: normalizedItems,
          });
        }
      } catch (err) {
        if (isMounted) {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "Failed to load cart. Please try again.";
          setError(errorMessage);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchCart();

    return () => {
      isMounted = false;
    };
  }, []);

  // Derive the order summary from the single cart state.
  const summary = useMemo(
    () => ({
      subtotal: cart.subtotal,
      discount: cart.discountAmount,
      couponCode: cart.coupon || "NONE",
      totalAmount: cart.total,
    }),
    [
      cart.subtotal,
      cart.discountAmount,
      cart.coupon,
      cart.total,
    ]
  );

  // Dashboard statistics derived from the same cart state.
  const stats = [
    {
      id: "total-items",
      title: "Total Items",
      value: String(cart.itemCount),
      subText: `Across ${cart.items.length} distinct product lines`,
      icon: (
        <ShoppingCart
          className="size-4 sm:size-5"
          strokeWidth={2}
        />
      ),
      borderAccent: "border-t-brand-active",
      iconContainerClass:
        "!bg-active-bg !text-brand-active border-brand-active/20",
    },
    {
      id: "subtotal",
      title: "Subtotal",
      value: `$${summary.subtotal.toFixed(2)}`,
      subText: "Gross item value",
      icon: (
        <DollarSign
          className="size-4 sm:size-5"
          strokeWidth={2}
        />
      ),
      borderAccent: "border-t-status-info",
      iconContainerClass:
        "!bg-status-info/10 !text-status-info border-status-info/20",
    },
    {
      id: "discount",
      title: "Discount",
      value: `$${summary.discount.toFixed(2)}`,
      subText: `Coupon ${summary.couponCode} savings`,
      icon: (
        <ShoppingBag
          className="size-4 sm:size-5"
          strokeWidth={2}
        />
      ),
      borderAccent: "border-t-status-warning",
      iconContainerClass:
        "!bg-status-warning/10 !text-status-warning border-status-warning/20",
    },
    {
      id: "net-total",
      title: "Net Total",
      value: `$${summary.totalAmount.toFixed(2)}`,
      subText: "Payable amount",
      icon: (
        <DollarSign
          className="size-4 sm:size-5"
          strokeWidth={2}
        />
      ),
      borderAccent: "border-t-status-success",
      iconContainerClass:
        "!bg-status-success/10 !text-status-success border-status-success/20",
    },
  ];

  const handleViewItem = (item) => {
    setSelectedItem(item);
    if (dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    }
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Clear cart
  const handleClearCarts = async () => {
  if (cart.items.length === 0) {
    toast.info("Your cart is already empty.");
    return;
  }

  try {
    await clearCarts();

    setCart(INITIAL_CART);

    toast.success("Cart cleared successfully.");
  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Failed to clear cart. Please try again."
    );
  }
};

  if (loading) {
    return <CartsSkeleton />;
  }

  if (error) {
    return (
      <CartsError
        message={typeof error === "string" ? error : error?.message || "Failed to load cart."}
      />
    );
  }

  return (
    <div className="space-y-4 p-5 min-w-0">
      {/* Header and active promotion banner */}
      <CartHeader
        couponCode={summary.couponCode}
        discountText={`${summary.discount.toFixed(2)} off qualifying items`}
      />

      {/* Statistics cards */}
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

      {/* Cart table and order summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        <div className="lg:col-span-8 min-w-0">
          <CartTable
            items={cart.items}
            onViewItem={handleViewItem}
          />
        </div>

        <div className="lg:col-span-4 min-w-0">
          <CartSummary
            summary={summary}
            onClearCarts={handleClearCarts}
          />
        </div>
      </div>

      {/* Product Details Modal */}
      <ProductDetailsModal
        ref={dialogRef}
        item={selectedItem}
        onClose={handleCloseModal}
      />
    </div>
  );
}
