import { useMemo, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OrderCard } from "@/components/OrderCard";

export function BillingTabs({ bills = [], loading, handlePay }) {
  const [searchQuery, setSearchQuery] = useState("");
  const mappedBills = useMemo(() => {
    return bills.map((bill) => ({
      id: bill._id,
      table: bill.tableId?.number,
      time: new Date(bill.createdAt).toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: bill.status === "UNPAID" ? "Đang phục vụ" : "Đã thanh toán",
      total: bill.totalAmount.toLocaleString("vi-VN") + " ₫",
      rawStatus: bill.status,
    }));
  }, [bills]);

  const activeOrders = mappedBills.filter((b) => b.rawStatus === "UNPAID");

  const historyOrders = mappedBills.filter((b) => b.rawStatus === "PAID");

  const filterBySearch = (list) =>
    list.filter((b) => String(b.table).includes(searchQuery.trim()));

  return (
    <Tabs defaultValue="active" className="space-y-6">
      <div className="flex justify-between gap-4">
        <TabsList className="glass-card">
          <TabsTrigger value="active">
            Đang phục vụ ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger value="history">
            Lịch sử ({historyOrders.length})
          </TabsTrigger>
        </TabsList>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" />
          <Input
            placeholder="Tìm bàn..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 w-[200px]"
          />
        </div>
      </div>

      <TabsContent value="active">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filterBySearch(activeOrders).map((o) => (
            <OrderCard key={o.id} order={o} handlePay={handlePay} />
          ))}
          {!loading && activeOrders.length === 0 && (
            <p className="text-muted-foreground">Không có bàn đang phục vụ</p>
          )}
        </div>
      </TabsContent>

      <TabsContent value="history">
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filterBySearch(historyOrders).map((o) => (
            <OrderCard key={o.id} order={o} />
          ))}
          {!loading && historyOrders.length === 0 && (
            <p className="text-muted-foreground">Chưa có lịch sử</p>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
