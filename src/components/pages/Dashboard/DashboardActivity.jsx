import RecentOrders from "./RecentOrders";
import TopProducts from "./TopProducts";
import ActivitySkeleton from "../../../skeleton/pages/Dashbord/ActivitySkeleton";
import ActivityError from "../../../error/pages/Dashboard/ActivityError";

const DashboardActivity = ({ data, loading, error }) => {
  if (loading) {
    return <ActivitySkeleton />;
  }

  if (error || !data) {
    return <ActivityError />;
  }

  return (
    <section className="space-y-4 grid p-5 min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-2">
      <RecentOrders orders={data.recentOrders ?? []} />

      <TopProducts products={data.topProducts ?? []} />
    </section>
  );
};

export default DashboardActivity;
