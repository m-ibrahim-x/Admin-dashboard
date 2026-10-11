import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const DashboardLayout = () => {
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    return (
        <div className="flex h-screen h-dvh overflow-hidden bg-bg-main ">
            {/* Stationary Sidebar */}
            <Sidebar
                isMobileOpen={isMobileOpen}
                setIsMobileOpen={setIsMobileOpen}
            />

            {/* Main Content Column */}
            <div className="flex flex-1 flex-col min-w-0 min-h-0 overflow-hidden">
                {/* Fixed Header */}
                <Header onMenuClick={() => setIsMobileOpen(true)} />

                {/* Independently Scrollable Page Content */}
                <main className="flex-1 min-h-0 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;