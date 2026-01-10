import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Banknote, Receipt, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export function BillingStats() {
  const stats = [
    {
      label: "Doanh thu hôm nay",
      value: "0 ₫",
      icon: TrendingUp,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      borderColor: "border-emerald-500/20",
    },
    {
      label: "Tổng doanh thu",
      value: "0 ₫",
      icon: Banknote,
      iconColor: "text-primary",
      bgColor: "bg-primary/10",
      borderColor: "border-primary/20",
    },
    {
      label: "Số hóa đơn",
      value: "0",
      icon: Receipt,
      iconColor: "text-blue-500",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
    },
    {
      label: "Đang phục vụ",
      value: "2",
      icon: Clock,
      iconColor: "text-amber-500",
      bgColor: "bg-amber-500/10",
      borderColor: "border-amber-500/20",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map(
        ({ label, value, icon: Icon, iconColor, bgColor, borderColor }) => (
          <Card
            key={label}
            className={cn(
              "rounded-xl border bg-card/80 text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card",
              borderColor
            )}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className={cn("p-3 rounded-xl", bgColor)}>
                  <Icon className={cn("w-6 h-6", iconColor)} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground truncate">
                    {label}
                  </p>
                  <p className="text-xl font-bold truncate">{value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      )}
    </div>
  );
}
