import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, UtensilsCrossed } from "lucide-react";

const orders = [
  {
    table: 2,
    status: "Đang nấu",
    items: 2,
  },
  {
    table: 5,
    status: "Đang nấu",
    items: 3,
  },
  {
    table: 5,
    status: "Chờ xác nhận",
    items: 1,
  },
];

export function RecentOrders() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Đơn mới nhất</CardTitle>
        <CardDescription>Cập nhật theo thời gian thực</CardDescription>
      </CardHeader>

      <CardContent>
        <ScrollArea className="h-[320px]">
          <div className="space-y-3 pr-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex items-center gap-4 rounded-xl border p-3 transition hover:bg-muted/50"
              >
                <div className="rounded-xl bg-primary/10 p-3 text-primary">
                  <UtensilsCrossed className="h-5 w-5" />
                </div>

                <div className="flex-1">
                  <p className="font-semibold">Bàn {order.table}</p>
                  <div className="mt-1 flex gap-2">
                    <Badge variant="secondary">{order.status}</Badge>
                    <span className="text-xs text-muted-foreground">
                      {order.items} món
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  Vừa xong
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
