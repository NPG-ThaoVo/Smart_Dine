import { OverviewStats } from "@/components/OverviewStats";
import { RecentOrders } from "@/components/RecentOrders";
import TableOverview from "@/components/TableOverview";
export default function AdminDashboard() {
  return (
    <main className="flex-1 p-3 md:p-6 overflow-auto">
      <div className="space-y-6">
        <h1 className="text-xl md:text-2xl font-bold text-foreground">
          Tổng quan
        </h1>
        <OverviewStats />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <TableOverview />
          </div>
          <div className="lg:col-span-5">
            <RecentOrders />
          </div>
        </div>
      </div>
    </main>
  );
}
