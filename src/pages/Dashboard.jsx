import DashboardActivity from "../components/pages/Dashboard/DashboardActivity";
import DashboardAnalytics from "../components/pages/Dashboard/DashboardAnalytics";
import DashboardOverview from "../components/pages/Dashboard/DashboardOverview";
import DashboardSkeleton from "../skeleton/pages/DashboardSkeleton";
import DashboardError from "../error/pages/DashboardError";
import useDashboardStats from "../hooks/useDashboardStats";

const Dashboard = () => {
  const { data, loading, error } = useDashboardStats();

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (error || !data) {
    return (
      <DashboardError
        message={typeof error === "string" ? error : undefined}
      />
    );
  }

  return (
    <div className="space-y-4 p-5">
      <DashboardOverview data={data} />
      <DashboardAnalytics data={data} />
      <DashboardActivity data={data} />
    </div>
  );
};

export default Dashboard;
