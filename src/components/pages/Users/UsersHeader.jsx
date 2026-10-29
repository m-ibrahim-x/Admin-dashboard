import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
    Users,
    Search,
    UserPlus,
    ChevronDown,
    ChevronUp,
    X,
} from "lucide-react";

import Button from "../../ui/Button";
import Input from "../../ui/Input";

const UsersHeader = ({ searchItem, setSearchItem, handleAddUser }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    const initialFormData = {
        username: "",
        password: "",
        email: "",
        phone: "",
    };

    const [formData, setFormData] = useState(initialFormData);
    const [Submitting, setSubmitting] = useState(false);

    // Clear form fields
    const handleClear = () => {
        setFormData(initialFormData);
    };

    // Handle form add
    const handleSubmit = async (e) => {
        e.preventDefault();

        setSubmitting(true);

        try {
            const isSuccess = await handleAddUser(formData);

            if (isSuccess) {
                setFormData(initialFormData);
                setIsFormOpen(false);
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="space-y-4 p-5">
            {/* 1. Main Header Banner */}
            <div className="relative overflow-hidden rounded-xl sm:rounded-2xl border border-border-main bg-card-bg p-4 sm:p-5 shadow-sm">
                {/* Decorative Golden Swoop Shapes */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-2 top-0 bottom-0 w-44 sm:w-60 md:w-72 overflow-hidden select-none"
                >
                    <svg
                        viewBox="0 0 320 160"
                        fill="none"
                        className="h-full w-full object-cover"
                        preserveAspectRatio="none"
                    >
                        <path
                            d="M 230 0 C 230 45, 275 80, 320 75 L 320 0 Z"
                            fill="var(--theme-brand-active)"
                            opacity="0.92"
                        />

                        <path
                            d="M 210 160 C 230 115, 275 110, 320 115 L 320 160 Z"
                            fill="var(--theme-brand-active)"
                            opacity="0.88"
                        />
                    </svg>
                </div>

                {/* Content Row */}
                <div className="relative z-10 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    {/* Left: Icon, Category Eyebrow, Title & Subtitle */}
                    <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="flex size-11 sm:size-12 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-md shadow-brand-active/20">
                            <Users
                                className="size-5 sm:size-6"
                                strokeWidth={2}
                            />
                        </div>

                        <div className="min-w-0">
                            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-brand-active">
                                USER MANAGEMENT
                            </p>

                            <h1 className="mt-0.5 text-lg font-bold tracking-tight text-text-primary sm:text-xl lg:text-2xl">
                                Manage Users
                            </h1>
                        </div>
                    </div>

                    {/* Right: Search Input & Add User Button */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
                        {/* Search Input */}
                        <div className="w-full sm:w-60 md:w-64">
                            <Input
                                id="search-users-input"
                                type="search"
                                value={searchItem}
                                onChange={(e) => setSearchItem(e.target.value)}
                                placeholder="Search users..."
                                leftIcon={<Search size={16} />}
                                className="h-10 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/70 border border-transparent focus:border-border-main"
                                containerClassName="gap-0"
                            />
                        </div>

                        {/* Add User Button */}
                        <Button
                            type="button"
                            onClick={() =>
                                setIsFormOpen((prev) => !prev)
                            }
                            leftIcon={<UserPlus size={16} />}
                            rightIcon={
                                isFormOpen ? (
                                    <ChevronUp
                                        size={16}
                                        className="transition-transform duration-200"
                                    />
                                ) : (
                                    <ChevronDown
                                        size={16}
                                        className="transition-transform duration-200"
                                    />
                                )
                            }
                            aria-expanded={isFormOpen}
                            aria-controls="create-user-panel"
                            className="h-10 rounded-xl bg-brand-active px-4 text-sm font-semibold text-bg-main hover:bg-brand-hover shadow-sm shrink-0"
                        >
                            Add User
                        </Button>
                    </div>
                </div>
            </div>

            {/* 2. Create New User Expandable Form Panel */}
            <AnimatePresence>
                {isFormOpen && (
                    <motion.div
                        id="create-user-panel"
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="overflow-hidden"
                    >
                        <div className="rounded-2xl border border-border-main bg-card-bg shadow-sm overflow-hidden">
                            {/* Form Header */}
                            <div className="flex items-center justify-between border-b border-border-main/50 bg-active-bg/60 p-4 sm:px-6 sm:py-4">
                                <div className="flex items-center gap-3">
                                    <div className="flex size-9 sm:size-10 shrink-0 items-center justify-center rounded-xl bg-brand-active text-bg-main shadow-xs">
                                        <UserPlus
                                            className="size-4 sm:size-5"
                                            strokeWidth={2}
                                        />
                                    </div>

                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold tracking-tight text-text-primary">
                                            Create New User
                                        </h2>

                                        <p className="text-xs sm:text-[13px] text-text-secondary">
                                            Fill in the details below to add a new user
                                        </p>
                                    </div>
                                </div>

                                <Button
                                    type="button"
                                    shine={false}
                                    onClick={() => setIsFormOpen(false)}
                                    aria-label="Close user creation form"
                                    className="rounded-lg p-1.5 text-text-secondary hover:bg-card-bg hover:text-text-primary border-transparent"
                                >
                                    <X size={18} />
                                </Button>
                            </div>

                            {/* Form Content */}
                            <form
                                onSubmit={handleSubmit}
                                className="p-4 sm:p-6 bg-card-bg"
                            >
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                                    {/* Username */}
                                    <Input
                                        id="new-user-username"
                                        type="text"
                                        value={formData.username}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                username: e.target.value,
                                            })
                                        }
                                        label="USERNAME"
                                        required
                                        placeholder="e.g. john_doe"
                                        className="h-11 px-5 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/60"
                                    />

                                    {/* Email */}
                                    <Input
                                        id="new-user-email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                email: e.target.value,
                                            })
                                        }
                                        label="EMAIL"
                                        required
                                        placeholder="e.g. john@email.com"
                                        className="h-11 px-5 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/60"
                                    />

                                    {/* Password */}
                                    <Input
                                        id="new-user-password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                password: e.target.value,
                                            })
                                        }
                                        label="PASSWORD"
                                        required
                                        allowToggleVisibility
                                        placeholder="Min. 6 characters"
                                        className="h-11 px-5 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/60"
                                    />

                                    {/* Phone */}
                                    <Input
                                        id="new-user-phone"
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                phone: e.target.value,
                                            })
                                        }
                                        label="PHONE"
                                        placeholder="e.g. +1 234 567 890"
                                        className="h-11 px-5 rounded-xl bg-input-bg text-sm placeholder:text-text-secondary/60"
                                    />
                                </div>

                                {/* Divider */}
                                <div className="my-5 h-px w-full bg-border-main/60" />

                                {/* Form Footer */}
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                    <p className="text-xs text-text-secondary">
                                        * Indicates required fields
                                    </p>

                                    <div className="flex items-center justify-end gap-3">
                                        {/* Clear Button */}
                                        <Button
                                            type="button"
                                            onClick={handleClear}
                                            shine={false}
                                            className="h-10 rounded-xl bg-active-bg px-5 text-sm font-semibold text-brand-active hover:bg-brand-active/15 border border-brand-active/20"
                                        >
                                            Clear
                                        </Button>

                                        {/* Create User Button */}
                                        <Button
                                            type="submit"
                                            leftIcon={<UserPlus size={16} />}
                                            isLoading={Submitting}
                                            loadingText={"Creating..."}
                                            className="h-10 rounded-xl bg-brand-active px-5 text-sm font-bold text-bg-main hover:bg-brand-hover shadow-sm"
                                        >
                                            Create User
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UsersHeader;
