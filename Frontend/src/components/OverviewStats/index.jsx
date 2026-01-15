import { Card, CardContent } from "@/components/ui/card";
import {
  TableProperties,
  UtensilsCrossed,
  ClipboardList,
  DollarSign,
} from "lucide-react";

export function OverviewStats({ tables = [], menuItems = [] }) {
  const servingTables = tables.filter((t) => !t.isAvailable).length;
  const totalTables = tables.length;

  const totalItems = menuItems.length;
  const availableItems = menuItems.filter((item) => item.isAvailable).length;

  const stats = [
    {
      label: "Bàn đang phục vụ",
      value: `${servingTables}/${totalTables}`,
      icon: TableProperties,
      bgColor: "bg-accent/50",
      textColor: "text-accent-foreground",
    },
    {
      label: "Món còn hàng",
      value: `${availableItems}/${totalItems}`,
      icon: UtensilsCrossed,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
    {
      label: "Đơn chờ xử lý",
      value: "1",
      icon: ClipboardList,
      bgColor: "bg-primary/15",
      textColor: "text-primary",
    },
    {
      label: "Doanh thu hôm nay",
      value: "0 ₫",
      icon: DollarSign,
      bgColor: "bg-primary/10",
      textColor: "text-primary",
    },
  ];

  return (
    <>
      <h1 className="text-xl md:text-2xl font-bold text-foreground">
        Tổng quan
      </h1>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <Card
              key={item.label}
              className="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card"
            >
              <CardContent className="p-3 md:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                  <div className={`p-2 md:p-3 rounded-lg ${item.bgColor}`}>
                    <Icon
                      className={`w-5 h-5 md:w-6 md:h-6 ${item.textColor}`}
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs md:text-sm text-muted-foreground truncate">
                      {item.label}
                    </p>
                    <p className="text-lg md:text-2xl font-bold truncate">
                      {item.value}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
}
