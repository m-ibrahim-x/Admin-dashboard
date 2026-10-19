
import UsersHeader from "../components/pages/Users/UsersHeader";
import UsersTable from "../components/pages/Users/UsersTable";
import EditUserModal from "../components/pages/Users/EditUserModal";
import StatCard from "../components/ui/StatCard";
import { Users as UsersIcon, Shield, UserCheck } from "lucide-react";
import { useEffect, useState } from "react";
import { getAllUsers } from "../api/usersApi";
import { toast } from "sonner";
import UsersError from "../error/pages/Users/UsersError";
import UsersSkeleton from "../skeleton/pages/Users/UsersSkeleton";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await getAllUsers();

                setUsers(response.data.users);
            } catch (error) {
                const message =
                    error.response?.data?.message ||
                    "Failed to fetch users. Please try again.";

                setError(message);
                toast.error(message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (isLoading) {
        return <UsersSkeleton />;
    }

    if (error) {
        return <UsersError message={error} />;
    }
    const stats = [
        {
            id: "total-users",
            title: "Total Users",
            value: users.length,
            subText: "All registered accounts",
            icon: (
                <UsersIcon
                    className="size-4 sm:size-5"
                    strokeWidth={2}
                />
            ),
            borderAccent: "border-t-brand-active",
            iconContainerClass:
                "!bg-active-bg !text-brand-active border-brand-active/20",
        },
        {
            id: "admins",
            title: "Admins",
            value: users.filter((user) => user.role === "admin").length,
            subText: "Administrator accounts",
            icon: (
                <Shield
                    className="size-4 sm:size-5"
                    strokeWidth={2}
                />
            ),
            borderAccent: "border-t-status-warning",
            iconContainerClass:
                "!bg-status-warning/10 !text-status-warning border-status-warning/20",
        },
        {
            id: "customers",
            title: "Customers",
            value: users.filter((user) => user.role === "customer").length,
            subText: "Standard customer accounts",
            icon: (
                <UsersIcon
                    className="size-4 sm:size-5"
                    strokeWidth={2}
                />
            ),
            borderAccent: "border-t-status-info",
            iconContainerClass:
                "!bg-status-info/10 !text-status-info border-status-info/20",
        },
        {
            id: "verified",
            title: "Verified",
            value: users.filter((user) => user.isVerified).length,
            subText: "Verified user accounts",
            icon: (
                <UserCheck
                    className="size-4 sm:size-5"
                    strokeWidth={2}
                />
            ),
            borderAccent: "border-t-status-success",
            iconContainerClass:
                "!bg-status-success/10 !text-status-success border-status-success/20",
        },
    ];

    return (
        <div className="space-y-4 p-5">
            {/* 1. Header Banner & Create User Form */}
            <UsersHeader />

            {/* 2. Users Statistics Cards */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4 p-5">
                {stats.map((stat) => (
                    <StatCard
                        key={stat.id}
                        variant="horizontal-divider"
                        title={stat.title}
                        value={stat.value}
                        subText={stat.subText}
                        icon={stat.icon}
                        className={`!items-start !p-3.5 sm:!p-4 border-t-[3px] ${stat.borderAccent} shadow-sm hover:shadow-md transition-shadow duration-200 [&_.my-4]:!my-2.5 [&_p.text-2xl]:!text-xl sm:[&_p.text-2xl]:!text-2xl`}
                        iconClassName={`!h-9 !w-9 sm:!h-10 sm:!w-10 !rounded-xl ${stat.iconContainerClass} border`}
                    />
                ))}
            </div>

            {/* 3. Users Data Table */}
            <UsersTable users={users} />

            {/* 4. Edit User Modal */}
            <EditUserModal isOpen={false} />
        </div>
    );
};

export default Users;
