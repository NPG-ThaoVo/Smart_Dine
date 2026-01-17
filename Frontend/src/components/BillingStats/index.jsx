import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Banknote, Receipt, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function BillingStats({ stats, loading }) {
  const formatMoney = (value = 0) =>
    value.toLocaleString("vi-VN") + " ₫";
  console.log("stats", stats);
  const cards = [
    {
      label: "Doanh thu hôm nay",
      value: formatMoney(stats?.todayRevenue),
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Tổng doanh thu",
      value: formatMoney(stats?.totalRevenue),
      icon: Banknote,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      label: "Số hóa đơn",
      value: stats?.totalBills ?? 0,
      icon: Receipt,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      label: "Đang phục vụ",
      value: stats?.unpaidBills ?? 0,
      icon: Clock,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card
          key={c.label}
          className={cn(
            "rounded-xl border bg-card/80 backdrop-blur-xl shadow-md",
            c.borderColor
          )}
        >
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className={cn("p-3 rounded-xl", c.bgColor)}>
                <c.icon className={cn("w-6 h-6", c.iconColor)} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{c.label}</p>
                <p className="text-xl font-bold">
                  {loading ? "..." : c.value}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
