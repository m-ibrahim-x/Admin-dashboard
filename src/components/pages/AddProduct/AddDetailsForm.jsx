
import { useState } from "react";
import {
  Plus,
  X,
  Tag,
  Package,
  DollarSign,
  Layers,
  Check,
  LoaderCircle,
  Trash2
} from "lucide-react";
import Button from "../../ui/Button";

const AddDetailsForm = ({
  formData,
  setFormData,
  onSubmit,
  isSubmitting,
}) => {
  const [newTag, setNewTag] = useState("");

  const tags = Array.isArray(formData.tags) ? formData.tags : [];

  // Handle adding a new tag.
  const handleAddTag = () => {

    const tag = newTag.trim();
    if (!tag) return;

    if(tags.includes(tag)){
      setNewTag("");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      tags: [...(Array.isArray(prev.tags) ? prev.tags : []), tag],
    }));
    setNewTag("");
  }

  // Handle removing a tag.
  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: (Array.isArray(prev.tags) ? prev.tags : []).filter(
        (tag) => tag !== tagToRemove
      ),
    }));
  }

  // Handle all regular form fields through one function.
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number" && value !== ""
            ? Number(value)
            : value,
    }));
  };
  // Clear all product fields and tags.
  const handleClearForm = () => {
    setFormData({
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
    });

    setNewTag("");
  };

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:rounded-3xl sm:p-6"
    >
      {/* 1. Section Header */}
      <div className="flex items-center gap-3 border-b border-border-main/60 pb-4 sm:gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand-active/20 bg-brand-active/10 text-brand-active sm:size-12">
          <Package className="size-5 sm:size-6" strokeWidth={1.8} />
        </div>

        <div>
          <h2 className="text-base font-bold text-text-primary sm:text-lg">
            Product Details
          </h2>

          <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
            Enter product specifications and pricing information.
          </p>
        </div>
      </div>

      {/* 2. Product Name */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="product-name"
          className="text-xs font-bold uppercase tracking-wider text-text-secondary"
        >
          Product Name <span className="text-status-danger">*</span>
        </label>

        <input
          id="product-name"
          type="text"
          name="name"
          placeholder="e.g. Apple iPhone 16 Pro Max 256GB"
          className="w-full rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
          value={formData.name ?? ""}
          onChange={handleChange}
          required
        />
      </div>

      {/* 3. Short Description */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="product-short-desc"
          className="text-xs font-bold uppercase tracking-wider text-text-secondary"
        >
          Short Description
        </label>

        <input
          id="product-short-desc"
          type="text"
          name="shortDescription"
          placeholder="e.g. Titanium design with A18 Pro chip"
          className="w-full rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
          value={formData.shortDescription ?? ""}
          onChange={handleChange}
        />
      </div>

      {/* 4. Full Description */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="product-description"
          className="text-xs font-bold uppercase tracking-wider text-text-secondary"
        >
          Description
        </label>

        <textarea
          id="product-description"
          name="description"
          rows={4}
          placeholder="Enter the full product description, technical specifications, and key selling points..."
          className="w-full resize-none rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm leading-relaxed text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
          value={formData.description ?? ""}
          onChange={handleChange}
        />
      </div>

      {/* 5. Price & Discount Price */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="product-price"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-secondary"
          >
            <DollarSign size={13} className="text-brand-active" />
            Price ($) <span className="text-status-danger">*</span>
          </label>

          <input
            id="product-price"
            type="number"
            name="price"
            min="0"
            step="any"
            placeholder="1199.00"
            className="w-full rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
            value={formData.price ?? ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="product-discount-price"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-secondary"
          >
            <DollarSign size={13} className="text-brand-active" />
            Discount Price ($)
          </label>

          <input
            id="product-discount-price"
            type="number"
            name="discountPrice"
            min="0"
            step="any"
            placeholder="999.00"
            className="w-full rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
            value={formData.discountPrice ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 6. Stock & SKU */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="product-stock"
            className="text-xs font-bold uppercase tracking-wider text-text-secondary"
          >
            Stock Quantity <span className="text-status-danger">*</span>
          </label>

          <input
            id="product-stock"
            type="number"
            name="stock"
            min="0"
            step="1"
            placeholder="45"
            className="w-full rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
            value={formData.stock ?? ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="product-sku"
            className="text-xs font-bold uppercase tracking-wider text-text-secondary"
          >
            SKU Code
          </label>

          <input
            id="product-sku"
            type="text"
            name="sku"
            placeholder="IPH-16PM-256-TI"
            className="w-full rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
            value={formData.sku ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 7. Category & Subcategory */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="product-category"
            className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-secondary"
          >
            <Layers size={13} className="text-brand-active" />
            Category
          </label>

          <select
            id="product-category"
            name="category"
            value={formData.category ?? "electronics"}
            onChange={handleChange}
            className="w-full cursor-pointer rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
          >
            <option value="electronics" className="bg-card-bg text-text-primary">
              Electronics
            </option>
            <option value="phones" className="bg-card-bg text-text-primary">
              Phones &amp; Tablets
            </option>
            <option value="fashion" className="bg-card-bg text-text-primary">
              Fashion &amp; Apparel
            </option>
            <option value="home" className="bg-card-bg text-text-primary">
              Home &amp; Kitchen
            </option>
            <option value="beauty" className="bg-card-bg text-text-primary">
              Beauty &amp; Personal Care
            </option>
            <option value="sports" className="bg-card-bg text-text-primary">
              Sports &amp; Outdoors
            </option>
          </select>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="product-subcategory"
            className="text-xs font-bold uppercase tracking-wider text-text-secondary"
          >
            Subcategory
          </label>

          <input
            id="product-subcategory"
            type="text"
            name="subcategory"
            placeholder="e.g. Flagship Smartphones"
            className="w-full rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
            value={formData.subcategory ?? ""}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* 8. Brand */}
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="product-brand"
          className="text-xs font-bold uppercase tracking-wider text-text-secondary"
        >
          Brand
        </label>

        <input
          id="product-brand"
          type="text"
          name="brand"
          placeholder="e.g. Apple"
          className="w-full rounded-xl border border-border-main bg-input-bg px-4 py-2.5 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-3"
          value={formData.brand ?? ""}
          onChange={handleChange}
        />
      </div>

      {/* 9. Tags */}
      <div className="space-y-3 rounded-2xl border border-border-main bg-input-bg/50 p-3.5 sm:p-4">
        <label
          htmlFor="new-product-tag"
          className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-text-secondary"
        >
          <Tag size={13} className="text-brand-active" />
          Tags
        </label>

        <div className="flex gap-2 sm:gap-3">
          <input
            id="new-product-tag"
            type="text"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTag();
              }
            }}
            placeholder="Enter a tag and press Enter"
            className="min-w-0 flex-1 rounded-xl border border-border-main bg-card-bg px-3.5 py-2 text-sm text-text-primary placeholder:text-text-secondary/50 transition-colors focus:border-brand-active focus:outline-none sm:rounded-2xl sm:py-2.5"
          />

          <button
            type="button"
            onClick={handleAddTag}
            aria-label="Add tag"
            disabled={!newTag.trim()}
            className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-xs transition-colors hover:bg-brand-hover disabled:cursor-not-allowed disabled:opacity-60 sm:size-11 sm:rounded-2xl"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {tags.map((tag, idx) => (
            <span
              key={`${tag}-${idx}`}
              className="flex items-center gap-1.5 rounded-xl border border-brand-active/20 bg-active-bg px-3 py-1 text-xs font-semibold text-brand-active"
            >
              #{tag}

              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                aria-label={`Remove tag ${tag}`}
                className="cursor-pointer text-text-secondary transition-colors hover:text-status-danger"
              >
                <X size={13} />
              </button>
            </span>
          ))}

          {tags.length === 0 && (
            <p className="text-xs text-text-secondary">
              No tags added yet.
            </p>
          )}
        </div>

        <p className="text-[11px] text-text-secondary">
          Product tags help organize products and improve customer search.
        </p>
      </div>

      {/* 10. Product Status */}
      <div className="flex flex-col items-stretch gap-3 pt-2 sm:flex-row sm:items-center">
        <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border border-border-main bg-input-bg/60 px-4 py-2.5 transition-all sm:rounded-2xl sm:px-5 sm:py-3">
          <input
            type="checkbox"
            name="featured"
            checked={Boolean(formData.featured)}
            onChange={handleChange}
            className="size-4 cursor-pointer rounded accent-brand-active"
          />

          <span className="flex items-center gap-1.5 text-xs font-semibold text-text-primary sm:text-sm">
            <span>★</span> Featured
          </span>
        </label>

        <label className="flex flex-1 cursor-pointer items-center gap-2.5 rounded-xl border border-border-main bg-input-bg/60 px-4 py-2.5 transition-all sm:rounded-2xl sm:px-5 sm:py-3">
          <input
            type="checkbox"
            name="isActive"
            checked={Boolean(formData.isActive)}
            onChange={handleChange}
            className="size-4 cursor-pointer rounded accent-brand-active"
          />

          <span className="flex items-center gap-1.5 text-xs font-semibold text-text-primary sm:text-sm">
            <span>🔘</span> Active
          </span>
        </label>
      </div>

      {/* 11. Action Buttons */}
      <div className="flex flex-col-reverse justify-end gap-3 border-t border-border-main pt-4 sm:flex-row sm:items-center">
        <Button
          type="button"
          shine={false}
          onClick={handleClearForm}
          disabled={isSubmitting}
          leftIcon={<Trash2 size={15} />}
          className="w-full cursor-pointer rounded-xl border border-border-main bg-input-bg px-5 py-2.5 text-xs font-semibold text-text-secondary shadow-none transition-colors hover:border-status-danger/40 hover:text-status-danger sm:w-auto sm:text-sm"
        >
          Clear Form
        </Button>

        <Button
          type="submit"
          shine={true}
          leftIcon={
            isSubmitting ? (
              <LoaderCircle className="animate-spin" size={15} />
            ) : (
              <Check size={15} />
            )
          }
          loading={isSubmitting}
          disabled={isSubmitting}
          className="w-full cursor-pointer rounded-xl bg-brand-active px-6 py-2.5 text-xs font-semibold text-bg-main shadow-md shadow-brand-active/20 transition-all hover:bg-brand-hover sm:w-auto sm:text-sm"
        >
          {isSubmitting ? "Creating..." : "Create Product"}
        </Button>
      </div>
    </form>
  );
};

export default AddDetailsForm;
