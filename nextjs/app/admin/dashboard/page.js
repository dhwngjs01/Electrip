import DashboardCardList from "@/components/pages/admin/dashboard/DashboardCardList";
import DoughnutChart from "@/components/pages/admin/dashboard/DoughnutChart";
import LineChart from "@/components/pages/admin/dashboard/LineChart";

export default function Dashboard() {
  return (
    <>
      <div className="row gy-3">
        <DashboardCardList />
      </div>
      <div className="row mt-5">
        <div className="col-8">
          <LineChart />
        </div>
        <div className="col-4">
          <DoughnutChart />
        </div>
      </div>
    </>
  );
}
