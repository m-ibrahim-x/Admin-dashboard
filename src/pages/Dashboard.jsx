import DashboardActivity from "../components/pages/Dashboard/DashboardActivity"
import DashboardAnalytics from "../components/pages/Dashboard/DashboardAnalytics"
import DashboardOverview from "../components/pages/Dashboard/DashboardOverview"
import useDashboardStats from "../hooks/useDashboardStats";
const Dashboard = () => {

    const { data, loading, error } = useDashboardStats();
    return (
        <div className="space-y-4 p-5">
            <DashboardOverview
                data={data}
                loading={loading}
                error={error}
            />
            <DashboardAnalytics
                data={data}
                loading={loading}
                error={error}
            />
            <DashboardActivity
                data={data}
                loading={loading}
                error={error}
            />
        </div>
    )
}

export default Dashboard