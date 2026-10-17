import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Heart, Languages, PanelLeft, Triangle } from "lucide-react";
import { toast } from "sonner";

import { ThemeContext } from "../context/Themecontext";
import { getWishlistStats } from "../api/wishlistApi";
import UserProfile from "./UserProfile";

const Header = ({ onMenuClick }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navigate = useNavigate();
    const [wishlistCount, setWishlistCount] = useState(0);

    useEffect(() => {
        let isMounted = true;

        const fetchWishlistStats = async () => {
        try {
            const response = await getWishlistStats();

            if (isMounted) {
            setWishlistCount(response.data.statistics.totalWishlists || 0);
            }
        } catch {
            if (isMounted) {
            toast.error("Failed to load wishlist count.");
            }
        }
        };

        fetchWishlistStats();

        return () => {
        isMounted = false;
        };
    }, []);

    return (
        <header
        className="relative z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border-main 
            bg-card-bg px-4 transition-colors duration-200 sm:px-6"
        >
        {/* Left Section */}
        <div className="flex min-w-0 items-center gap-3">
            <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-main 
                bg-bg-main text-text-secondary transition-colors hover:text-text-primary focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-brand-active md:hidden"
            aria-label="Open navigation menu"
            title="Open navigation menu"
            >
            <PanelLeft size={20} />
            </button>

            <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-3 text-left select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-active rounded-xl group"
            aria-label="Auren E-Commerce Admin Panel"
            title="Go to Dashboard"
            >
            {/* Triangle Brand Icon Box */}
            <div className="flex size-10 sm:size-11 shrink-0 items-center justify-center rounded-2xl border border-border-main bg-active-bg text-brand-active shadow-xs transition-transform duration-200 group-hover:scale-105">
                <Triangle size={19} className="stroke-[2.2] fill-transparent" />
            </div>

            {/* Brand Title & Subtitle */}
            <div className="min-w-0 flex flex-col justify-center">
                <span className="truncate text-base sm:text-lg font-bold tracking-tight text-text-primary leading-tight">
                Auren<span className="text-brand-active">.</span>
                </span>
                <span className="truncate text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.12em] text-text-secondary leading-tight mt-0.5">
                E-COMMERCE ADMIN PANEL
                </span>
            </div>
            </button>
        </div>

        {/* Right Section */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {/* Theme Toggle */}
            <button
            type="button"
            onClick={toggleTheme}
            className="inline-flex size-10 items-center justify-center rounded-xl border border-border-main 
                bg-bg-main text-text-secondary transition-colors hover:text-brand-active focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-brand-active"
            aria-label={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            title={
                theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
            }
            >
            {theme === "dark" ? (
                <Sun size={19} className="text-brand-hover" />
            ) : (
                <Moon size={19} className="text-brand-hover" />
            )}
            </button>

            {/* Language Switch - UI Only */}
            <button
            type="button"
            onClick={() =>
                toast.info("Language switching will be implemented later.")
            }
            className="hidden size-10 items-center justify-center rounded-xl border border-border-main 
                bg-bg-main text-text-secondary transition-colors hover:text-brand-active focus-visible:outline-none 
                focus-visible:ring-2 
                focus-visible:ring-brand-active sm:inline-flex"
            aria-label="Language settings"
            title="Language settings"
            >
            <Languages size={19} />
            </button>

            {/* Wishlist */}
            <button
            type="button"
            onClick={() => navigate("/wishlist")}
            className="relative inline-flex size-10 items-center justify-center rounded-xl border border-border-main 
                bg-bg-main text-text-secondary transition-colors hover:text-brand-active focus-visible:outline-none 
                focus-visible:ring-2 focus-visible:ring-brand-active"
            aria-label={`View wishlists${wishlistCount > 0 ? `, ${wishlistCount} total` : ""}`}
            title="View wishlists"
            >
            <Heart size={19} />

            {wishlistCount > 0 && (
                <span
                className="absolute -right-1 -top-1 flex h-[18px] min-w-[18px] items-center justify-center 
                    rounded-full border-2 border-card-bg bg-brand-active px-1 text-[10px] font-bold text-bg-main"
                >
                {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
            )}
            </button>

            {/* User Profile */}
            <UserProfile />
        </div>
        </header>
    );
};

export default Header;
