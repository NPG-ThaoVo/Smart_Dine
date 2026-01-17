import { OverviewStats } from "@/components/OverviewStats";
import { TableOverview } from "@/components/TableOverview";
import { RecentOrders } from "@/components/RecentOrders";
import { getAllTables } from "@/services/api/tables";
import { getMenuItems } from "@/services/api/menu";
import { getAllOrders } from "@/services/api/order";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    activeTables: 0,
    totalTables: 0,
    availableItems: 0,
    totalItems: 0,
    pendingOrders: 0,
    revenue: 0,
  });
  const [tables, setTables] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [tablesData, menuData, ordersData] = await Promise.all([
          getAllTables(),
          getMenuItems(),
          getAllOrders(),
        ]);
        const totalTables = tablesData.length;
        const activeTables = tablesData.filter((t) => !t.isAvailable).length;
        setTables(tablesData);
        const menuItems = menuData.data || [];
        const totalItems = menuItems.length;
        const availableItems = menuItems.filter((i) => i.isAvailable).length;

        const orders = ordersData.data || [];
        const pendingOrders = orders.filter((o) => o.status === "PENDING").length;

        const revenue = orders
          .filter((o) => o.status === "COMPLETED")
          .reduce((total, order) => {
            const orderTotal =
              order.orderItems?.reduce(
                (sum, item) => sum + (item.price || 0) * (item.quantity || 0),
                0
              ) || 0;
            return total + orderTotal;
          }, 0);

        const sortedOrders = [...orders]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 10)
          .map((order) => {
            const itemsCount = order.orderItems ? order.orderItems.length : 0;
            let statusText = order.status;
            let statusColor = "primary";

            if (order.status === "PENDING") {
              statusText = "Chờ xác nhận";
              statusColor = "amber";
            } else if (order.status === "CONFIRMED") {
              statusText = "Đang nấu";
              statusColor = "primary";
            } else if (order.status === "COMPLETED") {
              statusText = "Đã ra món";
              statusColor = "success";
            }

            return {
              id: order._id,
              table: order.tableId?.number || "?",
              status: statusText,
              items: itemsCount,
              time: new Date(order.createdAt).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              statusColor: statusColor,
            };
          });
        setRecentOrders(sortedOrders);

        setStats({
          activeTables,
          totalTables,
          availableItems,
          totalItems,
          pendingOrders,
          revenue,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <main className="flex-1 p-3 md:p-6 overflow-auto">
      <div className="space-y-6">
        <OverviewStats stats={stats} loading={loading} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <TableOverview tables={tables} loading={loading} />
          </div>
          <div className="lg:col-span-5">
            <RecentOrders orders={recentOrders} loading={loading} />
          </div>
        </div>
      </div>
    </main>
  );
}
