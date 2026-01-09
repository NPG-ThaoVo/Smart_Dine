import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { OrderCard } from "@/components/OrderCard";

export function BillingTabs() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual data
  const activeOrders = [
    {
      id: 1,
      table: 2,
      time: "19:33",
      status: "Đang phục vụ",
      orders: 1,
      dishes: 3,
      total: "165.000 ₫",
    },
    {
      id: 2,
      table: 5,
      time: "19:13",
      status: "Đang phục vụ",
      orders: 2,
      dishes: 6,
      total: "250.000 ₫",
    },
  ];

  const historyOrders = [];

  return (
    <Tabs defaultValue="active" className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground glass-card">
          <TabsTrigger
            value="active"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Đang phục vụ ({activeOrders.length})
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="data-[state=active]:bg-primary/20 data-[state=active]:text-primary"
          >
            Lịch sử ({historyOrders.length})
          </TabsTrigger>
        </TabsList>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Tìm kiếm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-card pl-9 w-full md:w-[200px]"
            />
          </div>
        </div>
      </div>

      <TabsContent value="active" className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {activeOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </TabsContent>

      <TabsContent value="history" className="space-y-4">
        <div className="text-center text-muted-foreground py-8">
          Chưa có lịch sử hóa đơn
        </div>
      </TabsContent>
    </Tabs>
  );
}
