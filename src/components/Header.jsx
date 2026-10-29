import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Sun, Moon, Heart, Languages, PanelLeft, Triangle } from "lucide-react";
import { toast } from "sonner";

import { ThemeContext } from "../context/Themecontext";
import UserProfile from "./UserProfile";
import Button from "./ui/Button";

const Header = ({ onMenuClick }) => {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const navigate = useNavigate();


    return (
        <header
            className="relative z-30 flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border-main 
                bg-card-bg px-4 transition-colors duration-200 sm:px-6"
        >
            {/* Left Section */}
            <div className="flex min-w-0 items-center gap-3">
                <Button
                    type="button"
                    shine={false}
                    onClick={onMenuClick}
                    className="size-10 shrink-0 rounded-xl border border-border-main bg-bg-main p-0 text-text-secondary hover:text-text-primary md:hidden"
                    aria-label="Open navigation menu"
                    title="Open navigation menu"
                >
                    <PanelLeft size={20} />
                </Button>

                <Button
                    type="button"
                    shine={false}
                    onClick={() => navigate("/")}
                    className="flex items-center gap-3 border-transparent bg-transparent p-0 text-left cursor-pointer group hover:bg-transparent"
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
                </Button>
            </div>

            {/* Right Section */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                {/* Theme Toggle */}
                <Button
                    type="button"
                    shine={false}
                    onClick={toggleTheme}
                    className="size-10 rounded-xl border border-border-main bg-bg-main p-0 text-text-secondary hover:text-brand-active"
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
                </Button>

                {/* Language Switch - UI Only */}
                <Button
                    type="button"
                    shine={false}
                    onClick={() =>
                        toast.info("Language switching will be implemented later.")
                    }
                    className="hidden size-10 items-center justify-center rounded-xl border border-border-main bg-bg-main p-0 text-text-secondary hover:text-brand-active sm:inline-flex"
                    aria-label="Language settings"
                    title="Language settings"
                >
                    <Languages size={19} />
                </Button>
                {/* User Profile */}
                <UserProfile />
            </div>
        </header>
    );
};

export default Header;
