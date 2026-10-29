import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { getProductById } from "../api/productApi";
import ProductViewHeader from "../components/pages/ProductView/ProductViewHeader";
import ProductGallery from "../components/pages/ProductView/ProductGallery";
import ProductDetails from "../components/pages/ProductView/ProductDetails";
import ProductViewSkeleton from "../skeleton/pages/ProductViewSkeleton";
import ProductViewError from "../error/pages/ProductViewError";

const ProductView = ({ product: initialProduct }) => {
  const { id } = useParams();

  const [product, setProduct] = useState(initialProduct || null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(!initialProduct);
  const [error, setError] = useState(null);

  // Fetch product data reusing the existing getProductById API endpoint
  const fetchProduct = useCallback(async () => {
    if (initialProduct) {
      setProduct(initialProduct);
      setLoading(false);
      return;
    }

    if (!id) {
      setError("No product ID was provided.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await getProductById(id);
      const fetchedProduct = response.data?.product || response.data;

      if (!fetchedProduct) {
        throw new Error("Product data not found in response.");
      }

      setProduct(fetchedProduct);
      setSelectedImageIndex(0);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Failed to load product details. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id, initialProduct]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  // ─── 1. Loading Skeleton State ───
  if (loading) {
    return <ProductViewSkeleton />;
  }

  // ─── 2. Error / Not Found State ───
  if (error || !product) {
    return (
      <ProductViewError
        message={error || "The requested product does not exist or may have been removed."}
      />
    );
  }

  // ─── 3. Loaded Product View ───
  return (
    <div className="space-y-6 p-4 sm:p-6 min-w-0">
      {/* Page Header with Back Navigation and Edit link */}
      <ProductViewHeader product={product} />

      {/* Main Two-Column Layout (Gallery on left, Details on right) */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column: Product Image Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery
            images={product.images || [product.image]}
            name={product.name}
            selectedIndex={selectedImageIndex}
            onSelectIndex={setSelectedImageIndex}
          />
        </div>

        {/* Right Column: Read-only Product Details & Specifications */}
        <div className="lg:col-span-5">
          <ProductDetails product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductView;
