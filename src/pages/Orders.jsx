import { ChevronLeft, ChevronRight } from "lucide-react";
import OrdersFilters from "../components/pages/Orders/OrdersFilters";
import OrdersTable from "../components/pages/Orders/OrdersTable";
import OrderDetailsPanel from "../components/pages/Orders/OrderDetailsPanel";
import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { getAllOrders } from "../api/OrdersApi";
import OrdersSkeleton from "../skeleton/pages/OrdersSkeleton";
import OrdersError from "../error/pages/OrdersError";
import Button from "../components/ui/Button";

const PAGE_SIZE = 20;

// Safely get a normalized string for searching and filtering.
const normalize = (value) =>
  String(value ?? "").trim().toLowerCase();

const getCustomerName = (order) => {
  const customer =
    order?.customer ??
    order?.user ??
    order?.customerDetails ??
    order?.shippingAddress?.user;

  if (typeof customer === "string") return customer;

  if (customer?.name) return customer.name;

  if (customer?.firstName || customer?.lastName) {
    return `${customer.firstName ?? ""} ${customer.lastName ?? ""}`.trim();
  }

  return "";
};

const getOrderId = (order) =>
  order?._id ??
  order?.id ??
  order?.orderId ??
  order?.orderNumber ??
  "";

const getPaymentMethod = (order) =>
  order?.paymentMethod ??
  order?.payment?.method ??
  order?.paymentDetails?.method ??
  "";

const getPaymentStatus = (order) =>
  order?.paymentStatus ??
  order?.payment?.status ??
  order?.paymentDetails?.status ??
  "";

const matchesPaymentMethod = (order, selectedMethod) => {
  if (selectedMethod === "all") return true;

  const method = normalize(getPaymentMethod(order));

  if (selectedMethod === "cash") {
    return (
      method === "cash" ||
      method.includes("cash on delivery") ||
      method.includes("cash on") ||
      method === "cod"
    );
  }

  if (selectedMethod === "stripe") {
    return method.includes("stripe");
  }

  return method === normalize(selectedMethod);
};

export default function Orders() {
  // All orders loaded from the API.
  const [orders, setOrders] = useState([]);
  const [isFetchingRemaining, setIsFetchingRemaining] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Selected order.
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Search and filter states.
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("all");

  // Client-side pagination.
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch every API page.
  useEffect(() => {
    let cancelled = false;

    const fetchOrders = async () => {
      try {
        setLoading(true);
        setError(null);
        setIsFetchingRemaining(false);

        //  first 20 orders
        const firstResponse = await getAllOrders({
          page: 1,
          limit: PAGE_SIZE,
        });

        const firstData = firstResponse.data;
        const firstOrders = firstData.orders ?? [];

        const totalPages =
          firstData.totalPages ??
          Math.ceil(
            (firstData.total ?? firstOrders.length) / PAGE_SIZE
          );

        if (cancelled) return;

        setOrders(firstOrders);
        setCurrentPage(1);
        setLoading(false);

        const remainingPages = Array.from(
          { length: Math.max(0, totalPages - 1) },
          (_, index) => index + 2
        );

        if (remainingPages.length === 0) return;

        setIsFetchingRemaining(true);

        const remainingResponses = await Promise.all(
          remainingPages.map((page) =>
            getAllOrders({
              page,
              limit: PAGE_SIZE,
            })
          )
        );

        const allOrders = [
          ...firstOrders,
          ...remainingResponses.flatMap(
            (response) => response.data.orders ?? []
          ),
        ];

        if (!cancelled) {
          setOrders(allOrders);
        }
      } catch (err) {
        if (!cancelled) {
          const errorMessage =
            err.response?.data?.message ||
            err.message ||
            "Failed to fetch orders";

          setError(errorMessage);
          toast.error(errorMessage);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          setIsFetchingRemaining(false);
        }
      }
    };

    fetchOrders();

    return () => {
      cancelled = true;
    };
  }, []);

  // Apply search and all filters to the complete list.
  const filteredOrders = useMemo(() => {
    const search = normalize(searchTerm);

    return orders.filter((order) => {
      const orderId = normalize(getOrderId(order));
      const customerName = normalize(getCustomerName(order));
      const status = normalize(order?.status);
      const paymentStatus = normalize(getPaymentStatus(order));

      const matchesSearch =
        !search ||
        orderId.includes(search) ||
        customerName.includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        status === normalize(statusFilter);

      const matchesPaymentStatus =
        paymentStatusFilter === "all" ||
        paymentStatus === normalize(paymentStatusFilter);

      const matchesMethod = matchesPaymentMethod(
        order,
        paymentMethodFilter
      );

      return (
        matchesSearch &&
        matchesStatus &&
        matchesPaymentStatus &&
        matchesMethod
      );
    });
  }, [
    orders,
    searchTerm,
    statusFilter,
    paymentStatusFilter,
    paymentMethodFilter,
  ]);

  // Calculate local pagination after filtering.
  const totalOrders = orders.length;
  const filteredTotal = filteredOrders.length;
  const totalPages = Math.ceil(filteredTotal / PAGE_SIZE);

  const safeCurrentPage =
    totalPages === 0 ? 1 : Math.min(currentPage, totalPages);

  const startIndex = (safeCurrentPage - 1) * PAGE_SIZE;

  const paginatedOrders = filteredOrders.slice(
    startIndex,
    startIndex + PAGE_SIZE
  );

  // Keep the current page valid if results shrink.
  useEffect(() => {
    if (currentPage !== safeCurrentPage) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCurrentPage(safeCurrentPage);
    }
  }, [currentPage, safeCurrentPage]);

  // Reset pagination whenever search or filters change.
  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePaymentStatusFilterChange = (value) => {
    setPaymentStatusFilter(value);
    setCurrentPage(1);
  };

  const handlePaymentMethodFilterChange = (value) => {
    setPaymentMethodFilter(value);
    setCurrentPage(1);
  };

  const handleClickOrder = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseOrderPanel = () => {
    setSelectedOrder(null);
  };

  // Pagination controls.
  const startPage = Math.max(
    1,
    Math.min(safeCurrentPage - 1, totalPages - 2)
  );

  const pageNumbers = Array.from(
    { length: Math.min(3, totalPages) },
    (_, index) => startPage + index
  );

  const handlePreviousPage = () => {
    setCurrentPage((page) => Math.max(1, page - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((page) => Math.min(totalPages, page + 1));
  };

  return (
    <div className="space-y-4 p-5 min-w-0">
      {/* 1. Page Heading and Total Orders Card */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary">
            ADMIN · MANAGEMENT
          </p>

          <h1 className="mt-1 text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Orders
          </h1>
        </div>

        <div className="flex items-center gap-2 rounded-2xl border border-border-main bg-card-bg px-4 py-3 shadow-xs self-start sm:self-center">
          <span className="text-xl sm:text-2xl font-bold text-text-primary">
            {totalOrders}
          </span>

          <span className="text-xs sm:text-sm font-medium text-text-secondary">
            total orders
          </span>
        </div>
      </div>

      {/* 2. Orders Filters */}
      <OrdersFilters
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilterChange}
        paymentStatusFilter={paymentStatusFilter}
        onPaymentStatusFilterChange={handlePaymentStatusFilterChange}
        paymentMethodFilter={paymentMethodFilter}
        onPaymentMethodFilterChange={handlePaymentMethodFilterChange}
      />

      {/* 3. Orders Table */}
      {loading ? (
        <OrdersSkeleton />
      ) : error && orders.length === 0 ? (
        <OrdersError message={error} />
      ) : (
        <>
          <OrdersTable orders={paginatedOrders} onRowClick={handleClickOrder} />

          {isFetchingRemaining && (
            <p
              role="status"
              className="text-xs text-text-secondary"
            >
              Loading remaining orders...
            </p>
          )}

          {!error && (
            <p className="text-xs sm:text-sm text-text-secondary">
              Showing {filteredTotal === 0 ? 0 : startIndex + 1}–
              {Math.min(startIndex + PAGE_SIZE, filteredTotal)} of{" "}
              {filteredTotal} matching orders
            </p>
          )}
        </>
      )}

      {/* 4. Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm">
        <span className="text-xs sm:text-sm font-medium text-text-secondary">
          Showing page{" "}
          <span className="font-bold text-text-primary">
            {totalPages > 0 ? safeCurrentPage : 0}
          </span>{" "}
          of{" "}
          <span className="font-bold text-text-primary">
            {totalPages}
          </span>
        </span>

        <div className="flex justify-between items-center gap-1.5">
          {/* Previous Arrow */}
          <Button
            type="button"
            shine={false}
            onClick={handlePreviousPage}
            disabled={loading || totalPages === 0 || safeCurrentPage <= 1}
            aria-label="Previous page"
            className="size-8 sm:size-9 rounded-xl border border-border-main bg-bg-main p-0 text-text-secondary hover:text-text-primary hover:border-brand-active/40 disabled:opacity-40"
          >
            <ChevronLeft className="size-4" />
          </Button>

          {/* Page Numbers */}
          {pageNumbers.map((num) => {
            const isActive = num === safeCurrentPage;

            return (
              <Button
                key={num}
                type="button"
                shine={false}
                onClick={() => setCurrentPage(num)}
                disabled={loading}
                aria-label={`Page ${num}`}
                aria-current={isActive ? "page" : undefined}
                className={`size-8 sm:size-9 rounded-xl text-xs sm:text-sm font-bold p-0 border-transparent ${
                  isActive
                    ? "bg-brand-active text-bg-main cursor-default"
                    : "text-text-secondary hover:bg-input-bg hover:text-text-primary"
                }`}
              >
                {num}
              </Button>
            );
          })}

          {/* Next Arrow */}
          <Button
            type="button"
            shine={false}
            onClick={handleNextPage}
            disabled={
              loading ||
              totalPages === 0 ||
              safeCurrentPage >= totalPages
            }
            aria-label="Next page"
            className="size-8 sm:size-9 rounded-xl border border-border-main bg-bg-main p-0 text-text-secondary hover:text-text-primary hover:border-brand-active/40 disabled:opacity-40"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      {/* 5. Order Details Panel */}
      {selectedOrder && (
        <OrderDetailsPanel order={selectedOrder} isOpen={Boolean(selectedOrder)} onClose={handleCloseOrderPanel} />
      )}
    </div>
  );
}
