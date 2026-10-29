import RecentOrders from "./RecentOrders";
import TopProducts from "./TopProducts";

const DashboardActivity = ({ data }) => {
  return (
    <section className="space-y-4 grid p-5 min-w-0 grid-cols-1 items-stretch gap-5 xl:grid-cols-2">
      <RecentOrders orders={data?.recentOrders ?? []} />

      <TopProducts products={data?.topProducts ?? []} />
    </section>
  );
};

export default DashboardActivity;
