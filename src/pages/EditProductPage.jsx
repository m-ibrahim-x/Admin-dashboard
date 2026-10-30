import EditDetailsForm from "../components/pages/EditProducts/EditDetailsForm";
import EditGalleryForm from "../components/pages/EditProducts/EditGalleryForm";
import EditProductHeader from "../components/pages/EditProducts/EditProductHeader";
import EditProductSkeleton from "../skeleton/pages/EditProductSkeleton";
import EditProductError from "../error/pages/EditProductError";
import { useParams } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import { getProductById, updateProduct } from "../api/productApi";
import { toast } from "sonner";

const EditProductPage = () => {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState(null);

    const { id } = useParams();

    const [galleryState, setGalleryState] = useState({
        existingImages: [],
        newImages: [],
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleImagesChange = useCallback((images) => {
            setGalleryState(images);
    },[]);

    // Handle Form Submit
    const handleSubmit = async (event) => {
    event.preventDefault();

    if (!product || !formData || isSubmitting) return;

    try {
        setIsSubmitting(true);

        const payload = new FormData();

        // Product details
        const fields = [
        "shortDescription",
        "description",
        "price",
        "stock",
        "sku",
        "category",
        "subcategory",
        "brand",
        "featured",
        "isActive",
        ];

        fields.forEach((field) => {
        const value = formData[field];

        if (value !== undefined && value !== null) {
            payload.append(field, String(value));
        }
        });

        // Optional discount price
        if (
        formData.discountPrice !== "" &&
        formData.discountPrice !== null &&
        formData.discountPrice !== undefined
        ) {
        payload.append(
            "discountPrice",
            String(formData.discountPrice)
        );
        }

        // Tags
        payload.append(
        "tags",
        JSON.stringify(formData.tags ?? [])
        );

        // New images
        galleryState.newImages.forEach((file) => {
        payload.append("images", file);
        });

        // Deleted existing images
        const remainingImageIds = new Set(
        galleryState.existingImages
            .map((image) => image.public_id)
            .filter(Boolean)
        );

        const deletedImages = (product.images ?? [])
        .filter(
            (image) =>
            image.public_id &&
            !remainingImageIds.has(image.public_id)
        )
        .map((image) => image.public_id);

        payload.append(
        "deletedImages",
        JSON.stringify(deletedImages)
        );

        console.log("Tags before submit:", formData.tags);
        console.log("Tags JSON:", JSON.stringify(formData.tags ?? []));
        console.log("FormData tags:", payload.get("tags"));

        const response = await updateProduct(product._id, payload);
        const updatedProduct = response.data.product;

        setProduct(updatedProduct);

        setGalleryState({
            existingImages: Array.isArray(updatedProduct.images)
            ? updatedProduct.images
            : [],
            newImages: [],
        });

        setFormData({
        name: updatedProduct.name ?? "",
        shortDescription: updatedProduct.shortDescription ?? "",
        description: updatedProduct.description ?? "",
        price: updatedProduct.price ?? "",
        discountPrice: updatedProduct.discountPrice ?? "",
        stock: updatedProduct.stock ?? "",
        sku: updatedProduct.sku ?? "",
        category: updatedProduct.category ?? "",
        subcategory: updatedProduct.subcategory ?? "",
        brand: updatedProduct.brand ?? "",
        tags: updatedProduct.tags ?? [],
        featured: updatedProduct.featured ?? false,
        isActive: updatedProduct.isActive ?? true,
        });

        toast.success(
        response.data.message || "Product updated successfully."
        );
        } catch (err) {
            console.error("Update product error:", err);
            console.log(
                "Validation details:",
                JSON.stringify(err.response?.data?.errors, null, 2)
            );

            toast.error(
                err.response?.data?.message ||
                "Failed to update product. Please try again."
            );
        }
        finally {
            setIsSubmitting(false);
        }
    };

    // Fetch Product
    const fetchProduct = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            
            const response = await getProductById(id);
            const fetchedProduct = response.data?.product || response.data;

            if (!fetchedProduct) {
                throw new Error("Product data not found in response.");
            }

            console.log(response);

            // Original product data
            setProduct(fetchedProduct);

            // Editable form data
            setFormData({
                name: fetchedProduct.name ?? "",
                shortDescription: fetchedProduct.shortDescription ?? "",
                description: fetchedProduct.description ?? "",
                price: fetchedProduct.price ?? "",
                discountPrice: fetchedProduct.discountPrice ?? "",
                stock: fetchedProduct.stock ?? "",
                sku: fetchedProduct.sku ?? "",
                category: fetchedProduct.category ?? "",
                subcategory: fetchedProduct.subcategory ?? "",
                brand: fetchedProduct.brand ?? "",
                tags: fetchedProduct.tags ?? [],
                featured: fetchedProduct.featured ?? false,
                isActive: fetchedProduct.isActive ?? true,
            });

            toast.success(
                response.data.message ||
                "Product fetched successfully."
            );
        } catch (err) {
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Failed to fetch product. Please try again.";

            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        fetchProduct();
    }, [fetchProduct]);

    // Loading Skeleton State
    if (loading) {
        return <EditProductSkeleton />;
    }

    // Error State
    if (error || !product) {
        return (
            <EditProductError
                message={error || "Product not found or unavailable."}
                onRetry={fetchProduct}
            />
        );
    }

    return (
        <div className="space-y-6 p-4 sm:p-6">
            {/* Page Hero Header */}
            <EditProductHeader />

            {/* Main Two-Column Layout */}
            <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
                {/* Left Column: Gallery & Uploads */}
                <div className="lg:col-span-5">
                    {product && (
                        <EditGalleryForm 
                            product={product}
                            onImagesChange={handleImagesChange}
                        />
                    )}
                </div>

                {/* Right Column: Form Fields & Actions */}
                <div className="lg:col-span-7">
                    {product && (
                        <EditDetailsForm 
                            product={product}
                            formData={formData}
                            setFormData={setFormData}
                            onSubmit={handleSubmit}
                            isSubmitting={isSubmitting}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditProductPage;
