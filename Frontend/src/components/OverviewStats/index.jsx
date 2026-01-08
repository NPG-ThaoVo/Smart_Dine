import { Card, CardContent } from "@/components/ui/card";
import {
  TableProperties,
  UtensilsCrossed,
  ClipboardList,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    label: "Bàn đang phục vụ",
    value: "2/8",
    icon: TableProperties,
  },
  {
    label: "Món còn hàng",
    value: "9/10",
    icon: UtensilsCrossed,
  },
  {
    label: "Đơn chờ xử lý",
    value: "1",
    icon: ClipboardList,
  },
  {
    label: "Doanh thu hôm nay",
    value: "0 đ",
    icon: DollarSign,
  },
];

export function OverviewStats() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <Card key={item.label}>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-xl bg-primary/10 p-3 text-primary">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="text-2xl font-bold">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
