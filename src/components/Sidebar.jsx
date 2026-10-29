import { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/Authcontext";
import { toast } from "sonner";
import {
    Home,
    Users,
    Package,
    Plus,
    ClipboardList,
    ShoppingCart,
    Settings,
    User,
    LogOut,
    PanelLeftClose,
    PanelLeftOpen,
    X,
} from "lucide-react";
import Button from "./ui/Button";

const Sidebar = ({ isMobileOpen = false, setIsMobileOpen }) => {
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();

    // Desktop default expanded, Tablet default collapsed
    const [isCollapsed, setIsCollapsed] = useState(() => {
        if (typeof window !== "undefined") {
            return window.innerWidth >= 768 && window.innerWidth < 1024;
        }
        return false;
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                // Automatically close mobile drawer if screen is enlarged to tablet or desktop
                setIsMobileOpen?.(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [setIsMobileOpen]);

    const navLinks = [
        { name: "Dashboard", path: "/", icon: Home },
        { name: "Users", path: "/users", icon: Users },
        { name: "Products", path: "/products", icon: Package },
        { name: "Add product", path: "/add-product", icon: Plus },
        { name: "Orders", path: "/orders", icon: ClipboardList },
        { name: "Cart", path: "/carts", icon: ShoppingCart },
        { name: "Settings", path: "/settings", icon: Settings },
    ];

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Logged out successfully.");
            navigate("/login", { replace: true });
        } catch (error) {
            const message = error.response?.data?.message || "Failed to log out.";
            toast.error(message);
        }
    };

    return (
        <>
        {/* ─── Mobile Drawer & Backdrop (md:hidden) ─── */}
        <div
            className={`fixed inset-0 z-50 transition-opacity duration-300 md:hidden ${
            isMobileOpen
                ? "opacity-100 pointer-events-auto"
                : "opacity-0 pointer-events-none"
            }`}
            aria-hidden={!isMobileOpen}
        >
            {/* Backdrop (Backdrop click does NOT close the drawer per requirement) */}
            <div className="absolute inset-0 bg-black/50" aria-hidden="true" />

            {/* Drawer Panel */}
            <aside
            className={`relative w-72 max-w-[85vw] h-full bg-card-bg border-r border-border-main flex flex-col p-6 
                transition-transform duration-300 ease-in-out ${
                isMobileOpen ? "translate-x-0" : "-translate-x-full"
            }`}
            >
            {/* Header with Brand and Close Button */}
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-border-main">
                <div className="flex flex-col select-none">
                <span className="text-[10px] font-bold tracking-[0.22em] text-brand-active uppercase leading-none mb-1.5">
                    COMMERCE
                </span>
                <h1 className="text-xl font-extrabold text-text-primary tracking-tight leading-none">
                    Auren Panel
                </h1>
                </div>
                <Button
                    type="button"
                    shine={false}
                    onClick={() => setIsMobileOpen(false)}
                    aria-label="Close sidebar"
                    title="Close sidebar"
                    className="p-1.5 rounded-lg border-transparent text-text-secondary hover:text-text-primary hover:bg-active-bg transition-colors shadow-xs"
                >
                    <X className="w-5 h-5 stroke-[1.8]" />
                </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-1.5 overflow-y-auto">
                {navLinks.map((link) => (
                <NavLink
                    to={link.path}
                    key={link.path}
                    end={link.path === "/"}
                    onClick={() => setIsMobileOpen(false)}
                    className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                        isActive
                        ? "bg-active-bg text-brand-active shadow-xs font-semibold"
                        : "text-text-secondary hover:bg-active-bg hover:text-text-primary"
                    }`
                    }
                >
                    <link.icon className="w-5 h-5 stroke-[1.8] shrink-0" />
                    <span>{link.name}</span>
                </NavLink>
                ))}
            </nav>

            {/* Account & Profile & Logout */}
            <div className="mt-auto pt-4 border-t border-border-main space-y-1.5">
                <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-text-secondary/70 block">
                Account
                </span>

                <NavLink
                to="/adminProfile"
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                    `flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                        ? "bg-active-bg text-brand-active shadow-xs font-semibold"
                        : "text-text-secondary hover:bg-active-bg hover:text-text-primary"
                    }`
                }
                >
                <User className="w-5 h-5 stroke-[1.8] shrink-0" />
                <span>My Profile</span>
                </NavLink>

                <Button
                    type="button"
                    shine={false}
                    onClick={async () => {
                        setIsMobileOpen(false);
                        await handleLogout();
                    }}
                    className="flex w-full items-center justify-start gap-3.5 px-4 py-3 rounded-xl border border-transparent bg-transparent text-text-secondary hover:bg-status-danger/10 hover:text-status-danger transition-colors duration-200 text-sm font-medium focus-visible:ring-status-danger"
                    leftIcon={<LogOut className="w-5 h-5 stroke-[1.8] shrink-0" />}
                >
                    <span>Log out</span>
                </Button>
            </div>
            </aside>
        </div>

        {/* ─── Desktop & Tablet Sidebar (hidden md:flex) ─── */}
        <aside
            className={`hidden md:flex flex-col h-full shrink-0 bg-card-bg border-r border-border-main transition-all 
                duration-300 ease-in-out ${
            isCollapsed ? "w-20 px-3 py-6" : "w-64 p-6"
            }`}
        >
            {/* Header / Brand & Toggle Button */}
            <div
            className={`mb-6 flex items-center ${
                isCollapsed ? "justify-center" : "justify-between px-2"
            }`}
            >
            {!isCollapsed && (
                <div className="flex flex-col select-none cursor-pointer overflow-hidden">
                <span className="text-[10px] font-bold tracking-[0.22em] text-brand-active uppercase leading-none 
                mb-1.5 truncate">
                    COMMERCE
                </span>
                <h1 className="text-xl font-extrabold text-text-primary tracking-tight leading-none truncate">
                    Auren Panel
                </h1>
                </div>
            )}

            <Button
                type="button"
                shine={false}
                onClick={() => setIsCollapsed((prev) => !prev)}
                aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                className="p-2 rounded-xl border-transparent bg-transparent text-text-secondary hover:text-text-primary hover:bg-active-bg transition-colors"
            >
                {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5 stroke-[1.8]" />
                ) : (
                <PanelLeftClose className="w-5 h-5 stroke-[1.8]" />
                )}
            </Button>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 space-y-2 overflow-y-auto overflow-x-hidden">
            {navLinks.map((link) => (
                <NavLink
                to={link.path}
                key={link.path}
                end={link.path === "/"}
                title={isCollapsed ? link.name : undefined}
                aria-label={isCollapsed ? link.name : undefined}
                className={({ isActive }) =>
                    `flex items-center rounded-xl font-medium text-sm transition-all duration-200 ${
                    isCollapsed
                        ? "justify-center p-3"
                        : "justify-between px-4 py-3"
                    } ${
                    isActive
                        ? "bg-active-bg text-brand-active shadow-xs font-semibold"
                        : "text-text-secondary hover:bg-active-bg hover:text-text-primary"
                    }`
                }
                >
                <div
                    className={`flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3.5"
                    }`}
                >
                    <link.icon className="w-5 h-5 stroke-[1.8] shrink-0" />
                    {!isCollapsed && <span className="truncate">{link.name}</span>}
                </div>
                </NavLink>
            ))}
            </nav>

            {/* Account & Profile Section */}
            <div
            className={`mt-auto pt-4 border-t border-border-main space-y-2 ${
                isCollapsed ? "flex flex-col items-center" : ""
            }`}
            >
            {!isCollapsed && (
                <span className="px-4 text-[10px] font-bold uppercase tracking-wider text-text-secondary/70 block">
                Account
                </span>
            )}

            <NavLink
                to="/adminProfile"
                title={isCollapsed ? "My Profile" : undefined}
                aria-label={isCollapsed ? "My Profile" : undefined}
                className={({ isActive }) =>
                `flex items-center rounded-xl font-medium text-sm transition-all duration-200 ${
                    isCollapsed
                    ? "justify-center p-3 w-full"
                    : "justify-between px-4 py-3 w-full"
                } ${
                    isActive
                    ? "bg-active-bg text-brand-active shadow-xs font-semibold"
                    : "text-text-secondary hover:bg-active-bg hover:text-text-primary"
                }`
                }
            >
                <div
                className={`flex items-center ${
                    isCollapsed ? "justify-center" : "gap-3.5"
                }`}
                >
                <User className="w-5 h-5 stroke-[1.8] shrink-0" />
                {!isCollapsed && <span className="truncate">My Profile</span>}
                </div>
            </NavLink>

            {/* Logout Button */}
            <Button
                type="button"
                shine={false}
                onClick={handleLogout}
                title={isCollapsed ? "Log out" : undefined}
                aria-label={isCollapsed ? "Log out" : undefined}
                className={`flex items-center rounded-xl border border-transparent bg-transparent text-text-secondary hover:bg-status-danger/10 hover:text-status-danger transition-colors duration-200 text-sm font-medium focus-visible:ring-status-danger ${
                isCollapsed
                    ? "justify-center p-3 w-full"
                    : "justify-start gap-3.5 px-4 py-3 w-full"
                }`}
                leftIcon={<LogOut className="w-5 h-5 stroke-[1.8] shrink-0" />}
            >
                {!isCollapsed && <span className="truncate">Log out</span>}
            </Button>
            </div>
        </aside>
        </>
    );
};

export default Sidebar;
