import AddProductHeader from "../components/pages/AddProduct/AddProductHeader";
import AddGalleryForm from "../components/pages/AddProduct/AddGalleryForm";
import AddProductForm from "../components/pages/AddProduct/AddDetailsForm";
import { useState } from "react";
import { toast } from "sonner";
import { createProduct } from "../api/productApi";

// Initial form data
const initialFormData = {
  name: "",
  shortDescription: "",
  description: "",
  price: "",
  discountPrice: "",
  stock: "",
  sku: "",
  category: "electronics",
  subcategory: "",
  brand: "",
  tags: [],
  featured: false,
  isActive: true,
}

const AddProduct = () => {
  const [formData, setFormData] = useState({...initialFormData});
  const [images, setImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    // 1. Validate required text fields
    const requiredFields = [
      ["name", "Product name"],
      ["shortDescription", "Short description"],
      ["description", "Description"],
      ["category", "Category"],
    ];

    const missingField = requiredFields.find(
      ([field]) =>
        typeof formData[field] !== "string" ||
        !formData[field].trim()
    );

    if (missingField) {
      toast.error(`Please enter ${missingField[1]}.`);
      return;
    }

    // 2. Validate price
    const price = Number(formData.price);

    if (
      formData.price === "" ||
      !Number.isFinite(price) ||
      price < 0
    ) {
      toast.error("Please enter a valid product price.");
      return;
    }

    // 3. Validate stock
    const stock = Number(formData.stock);

    if (
      formData.stock === "" ||
      !Number.isInteger(stock) ||
      stock < 0
    ) {
      toast.error("Please enter a valid stock quantity.");
      return;
    }

    // 4. Validate discount price if provided
    let discountPrice;

    if (formData.discountPrice !== "") {
      discountPrice = Number(formData.discountPrice);

      if (
        !Number.isFinite(discountPrice) ||
        discountPrice < 0
      ) {
        toast.error("Please enter a valid discount price.");
        return;
      }
    }

    // 5. Validate images
    if (images.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    // 6. Prepare FormData payload
    const payload = new FormData();

    payload.append("name", formData.name.trim());
    payload.append(
      "shortDescription",
      formData.shortDescription.trim()
    );
    payload.append("description", formData.description.trim());
    payload.append("price", String(price));
    payload.append("stock", String(stock));
    payload.append("category", formData.category);

    // Optional fields
    if (discountPrice !== undefined) {
      payload.append("discountPrice", String(discountPrice));
    }

    if (formData.sku?.trim()) {
      payload.append("sku", formData.sku.trim());
    }

    if (formData.subcategory?.trim()) {
      payload.append("subcategory", formData.subcategory.trim());
    }

    if (formData.brand?.trim()) {
      payload.append("brand", formData.brand.trim());
    }

    //  TODO: Re-enable after the backend tags validation issue is fixed.
    // Tags are temporarily excluded from the API payload.
    if (formData.tags.length > 0) {
      payload.append("tags", JSON.stringify(formData.tags));
    }

    payload.append("featured", String(Boolean(formData.featured)));
    payload.append("isActive", String(Boolean(formData.isActive)));

    // Append actual image files
    images.forEach((image) => {
      payload.append("images", image.file);
    });

    // 7. Send request and handle states
    setIsSubmitting(true);

    try {
      await createProduct(payload);

      toast.success("Product created successfully.");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to create product. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Page Hero Header */}
      <AddProductHeader />

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Left Column: Gallery & Uploads */}
        <div className="lg:col-span-5">
          <AddGalleryForm
            images={images} 
            setImages={setImages}  
          />
        </div>

        {/* Right Column: Form Fields & Actions */}
        <div className="lg:col-span-7">
          <AddProductForm
            formData={formData}
            setFormData={setFormData}
            isSubmitting={isSubmitting}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
