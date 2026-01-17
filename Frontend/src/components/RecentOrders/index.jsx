import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock, UtensilsCrossed, ChevronRight } from "lucide-react";

export function RecentOrders({ orders = [] }) {
  return (
    <Card className="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card border-none shadow-2xl">
      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-6">
        <div>
          <h3 className="tracking-tight text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Đơn mới nhất
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Cập nhật theo thời gian thực
          </p>
        </div>
        <div className="p-2 bg-primary/10 rounded-xl">
          <Clock className="w-5 h-5 text-primary" />
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <ScrollArea className="h-[320px] pr-2">
          <div className="space-y-3">
            {orders.map((order, index) => (
              <div
                key={index}
                className={`group flex items-center p-3 rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${order.statusColor === "amber"
                    ? "bg-amber-500/5 border-amber-500/20 hover:bg-amber-500/10"
                    : "bg-white/5 border-white/5 hover:bg-white/10"
                  }`}
              >
                <div
                  className={`h-12 w-12 rounded-xl flex items-center justify-center border mr-4 transition-colors ${order.statusColor === "amber"
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-500"
                      : "bg-primary/10 border-primary/20 text-primary"
                    }`}
                >
                  {order.statusColor === "amber" ? (
                    <Clock className="w-6 h-6" />
                  ) : (
                    <UtensilsCrossed className="w-6 h-6" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-bold text-sm text-foreground truncate">
                      Bàn {order.table}
                    </p>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {order.time}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-md font-medium capitalize ${order.statusColor === "amber"
                          ? "bg-accent text-accent-foreground"
                          : "bg-primary/10 text-primary"
                        }`}
                    >
                      {order.status}
                    </span>
                    <span className="text-[10px] text-muted-foreground px-1.5 py-0.5 bg-white/5 rounded-md">
                      {order.items} món
                    </span>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity -ml-2" />
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
