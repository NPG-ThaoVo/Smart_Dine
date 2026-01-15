import { OverviewStats } from "@/components/OverviewStats";
import { TableOverview } from "@/components/TableOverview";
import { RecentOrders } from "@/components/RecentOrders";
import { useState } from "react";
import { useEffect } from "react";
import { getAllTables } from "@/services/api/tables";
import { getAllMenu } from "@/services/api/menu";
export default function DashboardPage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [menuItems, setMenuItems] = useState([]);

  const getAllTable = async () => {
    try {
      setLoading(true);
      const res = await getAllTables();
      setTables(res.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Không thể tải danh sách bàn"
      );
    } finally {
      setLoading(false);
    }
  };
  const fetchMenuStats = async () => {
    try {
      const res = await getAllMenu();

      const items = res.data?.data?.items || [];

      setMenuItems(items);
    } catch (error) {
      toast.error("Không thể tải thống kê menu");
    }
  };

  const tableOverviewData = tables.map((table) => ({
    id: table.number,
    status: table.isAvailable ? "available" : "occupied",
  }));

  useEffect(() => {
    getAllTable();
    fetchMenuStats();
  }, []);

  return (
    <main className="flex-1 p-3 md:p-6 overflow-auto">
      <div className="space-y-6">
        <OverviewStats tables={tables} menuItems={menuItems} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7">
            <TableOverview tables={tableOverviewData} />
          </div>
          <div className="lg:col-span-5">
            <RecentOrders />
          </div>
        </div>
      </div>
    </main>
  );
}
