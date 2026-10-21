import { useEffect, useRef, useState } from "react";
import { ImagePlus, X, Sparkles, UploadCloud } from "lucide-react";

const MAX_IMAGES = 5;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

const getImageKey = (image, index) =>
    image.public_id || image.url || image.id || `existing-${index}`;

const EditGalleryForm = ({
    product,
    onImagesChange,
}) => {
    const fileInputRef = useRef(null);
    const previewUrlsRef = useRef(new Set());
    const [existingImages, setExistingImages] = useState([]);
    const [newImages, setNewImages] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const images = Array.isArray(product?.images) ? product.images : [];
        setExistingImages(images);
        setNewImages([]);
        setError("");
    }, [product]);

    useEffect(() => {
        onImagesChange?.({
            existingImages,
            newImages: newImages.map(({ file }) => file),
        });
    }, [existingImages, newImages, onImagesChange]);

    useEffect(() => {
        return () => {
            previewUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
            previewUrlsRef.current.clear();
        };
    }, []);

    const imagesCount = existingImages.length + newImages.length;

    const tips = [
        "High-quality photos from multiple angles increase buyer trust.",
        "Products with 3+ tags get discovered 45% more often in search.",
        "Clear, specific product names rank higher than generic titles.",
    ];

    const handleFilesSelected = (event) => {
        const selectedFiles = Array.from(event.target.files || []);
        event.target.value = "";

        if (selectedFiles.length === 0) return;

        const availableSlots = MAX_IMAGES - imagesCount;
        const acceptedFiles = [];
        const errors = [];

        selectedFiles.forEach((file) => {
            if (!ALLOWED_TYPES.includes(file.type)) {
                errors.push(`${file.name}: only PNG, JPG, and WEBP images are allowed.`);
                return;
            }

            if (file.size > MAX_FILE_SIZE) {
                errors.push(`${file.name}: image size must not exceed 5MB.`);
                return;
            }

            if (acceptedFiles.length >= availableSlots) {
                errors.push(`You can upload up to ${MAX_IMAGES} images in total.`);
                return;
            }

            acceptedFiles.push(file);
        });

        if (acceptedFiles.length > 0) {
            const addedImages = acceptedFiles.map((file) => {
                const previewUrl = URL.createObjectURL(file);
                previewUrlsRef.current.add(previewUrl);

                return {
                    id: `${file.name}-${file.size}-${file.lastModified}-${crypto.randomUUID()}`,
                    file,
                    previewUrl,
                };
            });

            setNewImages((current) => [...current, ...addedImages]);
        }

        setError(errors.join(" "));
    };

    const handleRemoveExistingImage = (imageToRemove) => {
        setExistingImages((current) =>
            current.filter((image) => image !== imageToRemove)
        );
        setError("");
    };

    const handleRemoveNewImage = (id) => {
        setNewImages((current) => {
            const imageToRemove = current.find((image) => image.id === id);
            if (imageToRemove) {
                URL.revokeObjectURL(imageToRemove.previewUrl);
                previewUrlsRef.current.delete(imageToRemove.previewUrl);
            }
            return current.filter((image) => image.id !== id);
        });
        setError("");
    };

    const galleryImages = [
        ...existingImages.map((image, index) => ({
            key: getImageKey(image, index),
            src: image.url,
            image,
            isNew: false,
        })),
        ...newImages.map((image) => ({
            key: image.id,
            src: image.previewUrl,
            image,
            isNew: true,
        })),
    ];

    return (
        <div className="space-y-6 rounded-2xl border border-border-main bg-card-bg p-4 shadow-sm sm:rounded-3xl sm:p-6">
            {/* Section Header */}
            <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-2xl border border-brand-active/20 bg-brand-active/10 text-brand-active sm:size-12">
                    <ImagePlus className="size-5 sm:size-6" strokeWidth={1.8} />
                </div>

                <div>
                    <h2 className="text-base font-bold text-text-primary sm:text-lg">
                        Gallery
                    </h2>

                    <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
                        Manage the product images.
                    </p>

                    <p className="mt-1 text-xs font-medium text-brand-active">
                        {imagesCount} of {MAX_IMAGES} images
                    </p>
                </div>
            </div>

            {/* Product Images */}
            {galleryImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                    {galleryImages.map((galleryImage, idx) => (
                        <article
                            key={galleryImage.key}
                            className="group relative overflow-hidden rounded-2xl border border-border-main bg-input-bg shadow-xs transition-all duration-200 hover:border-brand-active/40"
                        >
                            {/* Image Box */}
                            <div className="relative h-36 w-full overflow-hidden bg-input-bg sm:h-44">
                                <img
                                    src={galleryImage.src}
                                    alt={`${product?.name || "Product"} - Image ${idx + 1}`}
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    loading="lazy"
                                />

                                {/* Image Badge */}
                                <div className="absolute left-2.5 top-2.5">
                                    <span className="rounded-lg border border-border-main/40 bg-card-bg/90 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-primary backdrop-blur-xs">
                                        {idx === 0 ? "Primary" : "Gallery"}
                                    </span>
                                </div>

                                {/* Remove Image */}
                                <button
                                    type="button"
                                    aria-label={`Remove image ${idx + 1}`}
                                    onClick={() =>
                                        galleryImage.isNew
                                            ? handleRemoveNewImage(galleryImage.image.id)
                                            : handleRemoveExistingImage(galleryImage.image)
                                    }
                                    className="absolute right-2.5 top-2.5 flex size-7 items-center justify-center rounded-full bg-card-bg/90 text-text-primary opacity-100 shadow-sm backdrop-blur-xs transition-all duration-200 hover:bg-status-danger hover:text-white sm:opacity-0 sm:group-hover:opacity-100"
                                >
                                    <X size={14} />
                                </button>
                            </div>

                            {/* Image Caption */}
                            <div className="flex items-center justify-between gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-text-secondary">
                                <span>Image {idx + 1}</span>

                                <span className="text-[10px] font-medium normal-case">
                                    {galleryImage.isNew
                                        ? "New Image"
                                        : idx === 0
                                            ? "Cover Photo"
                                            : "Product Image"}
                                </span>
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="rounded-2xl border border-dashed border-border-main p-8 text-center">
                    <ImagePlus className="mx-auto size-8 text-text-secondary" />

                    <p className="mt-3 text-sm font-semibold text-text-primary">
                        No images available
                    </p>

                    <p className="mt-1 text-xs text-text-secondary">
                        Add images to display them in the product gallery.
                    </p>
                </div>
            )}

            {/* Upload Dropzone */}
            <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={imagesCount >= MAX_IMAGES}
                className="group flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-brand-active/40 bg-active-bg/30 p-6 text-center transition-colors hover:border-brand-active hover:bg-active-bg/50 disabled:cursor-not-allowed disabled:opacity-50 sm:rounded-3xl sm:p-8"
            >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-active/10 text-brand-active">
                    <UploadCloud className="size-6" strokeWidth={1.8} />
                </span>

                <span>
                    <span className="block text-sm font-semibold text-text-primary sm:text-base">
                        Upload product images
                    </span>

                    <span className="mt-0.5 block text-xs text-text-secondary">
                        PNG, JPG, WEBP
                    </span>

                    <span className="mt-1 block text-[11px] font-medium text-brand-active">
                        Up to 5 images • Max 5MB each
                    </span>

                    <span className="mt-2 block text-[11px] text-text-secondary">
                        {imagesCount >= MAX_IMAGES
                            ? "Maximum number of images reached."
                            : "Select one or more images from your device."}
                    </span>
                </span>
            </button>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                multiple
                onChange={handleFilesSelected}
                disabled={imagesCount >= MAX_IMAGES}
                className="hidden"
                tabIndex={-1}
                aria-label="Choose product images"
            />

            {error && (
                <p role="alert" className="text-xs leading-relaxed text-status-danger">
                    {error}
                </p>
            )}

            {/* Product Tips Card */}
            <div className="relative overflow-hidden rounded-2xl border border-brand-active/30 bg-active-bg/40 p-4 text-brand-active sm:rounded-3xl sm:p-5">
                <div className="flex items-center gap-3">
                    <div
                        className="flex size-9 shrink-0 items-center justify-center rounded-2xl bg-brand-active/20 text-brand-active"
                        style={{ animation: "floatTipIcon 3s ease-in-out infinite" }}
                    >
                        <Sparkles size={18} />
                    </div>

                    <h3 className="text-sm font-bold sm:text-base">
                        Product Tips
                    </h3>
                </div>

                {/* Animated Tips */}
                <div className="relative mt-3 h-12 overflow-hidden sm:h-14">
                    <div className="space-y-3 animate-cycle-tips">
                        {tips.map((tip, i) => (
                            <div key={i} className="h-12 sm:h-14">
                                <p className="text-xs leading-relaxed text-text-secondary sm:text-sm">
                                    {tip}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Indicator Dots */}
                <div className="mt-3 flex items-center gap-1.5">
                    <span className="h-1.5 w-5 rounded-full bg-brand-active transition-all" />
                    <span className="h-1.5 w-2 rounded-full bg-brand-active/30" />
                    <span className="h-1.5 w-2 rounded-full bg-brand-active/30" />
                </div>
            </div>
        </div>
    );
};

export default EditGalleryForm;
