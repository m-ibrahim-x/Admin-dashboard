import { useState, useContext, useRef } from "react";
import { User, Mail, Phone, ShieldCheck, Save, Upload, Camera } from "lucide-react";
import { AuthContext } from "../context/Authcontext";
import { updateUser } from "../api/usersApi";
import { toast } from "sonner";
import LoginBackground from "../components/ui/LoginBackground";
const FALLBACK_AVATAR = "https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=";

const AdminProfile = () => {
    const { user , setUser } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: user?.name || user?.username || "Admin User",
        email: user?.email || "admin@example.com",
        phone: user?.phone || "+20 123 456 789",
        role: user?.role || "ADMIN",
        avatar: user?.avatar || "",
    });
    const [saving, setSaving ] = useState(false)
    const isSavingRef = useRef(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files?.[0];
        if (file) {
        const previewUrl = URL.createObjectURL(file);
        setFormData((prev) => ({
            ...prev,
            avatar: previewUrl,
        }));
        }
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if(isSavingRef.current) return;

        const userId = user?._id;
        if (!userId) {
            toast.error("Unable to save changes. Please log in again.");
            return;
        }

        isSavingRef.current = true;
        setSaving(true);

        const payload = {
            username: formData.name,
            phone: formData.phone,
        };

        const savePromise = (async () => {
            try {
                const response = await updateUser(userId, payload);
                const updatedUser = response.data.user;

                setUser(updatedUser);

                setFormData({
                    name: updatedUser.username,
                    email: updatedUser.email,
                    phone: updatedUser.phone ?? "",
                    role: updatedUser.role,
                    avatar: updatedUser.avatar ?? "",
                });

                return updatedUser;
            } catch (error) {
                console.error("Profile update failed:", error);
                throw error;
            } finally {
                isSavingRef.current = false;
                setSaving(false);
            }
        }) ();

        toast.promise(savePromise, {
            loading: "Saving profile changes...",
            success: "Profile updated successfully!",
            error: "Failed to update profile. Please try again.",
        });
    };



    const finalAvatar =
        formData.avatar ||
        `${FALLBACK_AVATAR}${encodeURIComponent(formData.name || "Admin")}`;

    return (
       <div className="relative isolate min-h-full p-6 text-text-primary">
        {/* Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <LoginBackground className="h-full w-full" />
        </div>

        {/* Page Content */}
        <div className="relative z-10">
            {/* انقل هنا كل محتوى الصفحة الحالي */}
        </div>

        {/* Page Header */}
        <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-text-primary">
            My Profile
            </h1>
            <p className="text-xs text-text-secondary mt-1">
            Manage your account information
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-6xl">
            {/* Profile Summary Card */}
            <div className="bg-card-bg border border-border-main rounded-2xl p-6 flex flex-col items-center text-center shadow-xs h-fit">
            <div className="relative group mb-4">
                <img
                src={finalAvatar}
                alt={formData.name}
                className="w-28 h-28 rounded-full object-cover border-2 border-brand-active/40 shadow-xs"
                onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `${FALLBACK_AVATAR}${encodeURIComponent(
                    formData.name || "A"
                    )}`;
                }}
                />

                <label
                htmlFor="avatar-upload"
                className="absolute bottom-0 right-0 p-2 bg-brand-active text-bg-main rounded-full cursor-pointer hover:bg-brand-hover 
                hover:scale-105 transition-all shadow-xs"
                title="Upload new photo"
                >
                <Camera size={16} />
                </label>
            </div>

            <h2 className="text-lg font-bold text-text-primary">
                {formData.name || "Admin User"}
            </h2>
            <p className="text-xs text-text-secondary mb-3">{formData.email}</p>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-brand-active/10 
            text-brand-active border border-brand-active/20">
                <ShieldCheck size={14} />
                {formData.role ? formData.role.toUpperCase() : "ADMIN"}
            </span>
            </div>

            {/* Personal Information Form Card */}
            <div className="lg:col-span-2 bg-card-bg border border-border-main rounded-2xl p-6 shadow-xs">
            <h3 className="text-md font-semibold text-text-primary mb-4 border-b border-border-main pb-3">
                Personal Information
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Full Name / Username
                </label>
                <div className="relative">
                    <User
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                    size={16}
                    />
                    <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-input-bg border border-border-main rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary 
                    placeholder:text-text-secondary/50 focus:border-brand-active focus:outline-none transition-colors"
                    placeholder="Enter your name"
                    />
                </div>
                </div>

                {/* Email Address */}
                <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Email Address
                </label>
                <div className="relative">
                    <Mail
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                    size={16}
                    />
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-input-bg border border-border-main rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary 
                    placeholder:text-text-secondary/50 focus:border-brand-active focus:outline-none transition-colors"
                    placeholder="name@example.com"
                    />
                </div>
                </div>

                {/* Phone Number */}
                <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Phone Number
                </label>
                <div className="relative">
                    <Phone
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary"
                    size={16}
                    />
                    <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-input-bg border border-border-main rounded-xl pl-10 pr-4 py-2.5 text-xs text-text-primary 
                    placeholder:text-text-secondary/50 focus:border-brand-active focus:outline-none transition-colors"
                    placeholder="+20 123 456 789"
                    />
                </div>
                </div>

                {/* Profile Picture File Input */}
                <div>
                <label className="block text-xs font-medium text-text-secondary mb-1.5">
                    Profile Picture
                </label>
                <div className="flex items-center gap-3">
                    <label
                    htmlFor="avatar-upload"
                    className="px-4 py-2 bg-input-bg border border-border-main rounded-xl text-xs text-text-secondary 
                    hover:text-text-primary hover:border-brand-active cursor-pointer flex items-center gap-2 transition-colors"
                    >
                    <Upload size={15} />
                    Choose Image File
                    </label>
                    <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    />
                </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                <button
                    type="submit"
                    disabled={saving}
                    className="px-5 py-2.5 bg-brand-active hover:bg-brand-hover text-bg-main font-semibold rounded-xl text-xs flex 
                    items-center gap-2 transition-colors cursor-pointer shadow-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active"
                >
                    <Save size={14} />
                    {saving ? "Saving..." : "Save Changes"}
                </button>
                </div>
            </form>
            </div>
        </div>
        </div>
    );
};

export default AdminProfile;
