import {
  Card,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export function TableOverview({ tables = [], loading }) {
  const sortedTables = [...tables].sort((a, b) => a.number - b.number);

  return (
    <Card className="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card border-none shadow-2xl">
      <CardHeader className="space-y-1.5 p-6 flex flex-row items-center justify-between pb-6">
        <div>
          <h3 className="tracking-tight text-xl font-bold bg-gradient-to-r from-primary to-purple-400 bg-clip-text text-transparent">
            Sơ đồ bàn
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            Trạng thái phục vụ trực tiếp
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-[10px] font-medium text-emerald-500">
              Trống
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
            <span className="text-[10px] font-medium text-rose-500">
              Có khách
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 pt-0">
        <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-square flex flex-col items-center justify-center rounded-2xl border border-white/5 bg-white/5 p-4 space-y-2"
              >
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-3 w-12" />
              </div>
            ))
            : sortedTables.map((table) => {
              const status = table.isAvailable ? "available" : "occupied";
              return (
                <div
                  key={table._id}
                  className={cn(
                    "group relative aspect-square flex flex-col items-center justify-center rounded-2xl transition-all duration-300 cursor-pointer overflow-hidden border border-white/5 hover:border-white/20",
                    status === "available"
                      ? "bg-emerald-500/5 hover:bg-emerald-500/10"
                      : "bg-rose-500/5 hover:bg-rose-500/10"
                  )}
                >
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-emerald-500/10 to-transparent"></div>
                  <div
                    className={cn(
                      "absolute top-3 right-3 w-2 h-2 rounded-full ring-4 ring-black/40",
                      status === "available"
                        ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse"
                        : "bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.6)]"
                    )}
                  ></div>
                  <span
                    className={cn(
                      "text-2xl font-black tracking-tight z-10",
                      status === "available"
                        ? "text-emerald-500"
                        : "text-rose-500"
                    )}
                  >
                    {table.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-muted-foreground/60 mt-1 z-10">
                    Bàn
                  </span>
                  {status === "occupied" && (
                    <div className="absolute inset-x-0 bottom-0 p-2 bg-black/60 backdrop-blur-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <p className="text-[10px] text-center text-white/90 font-medium">
                        Đang phục vụ
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>
      </CardContent>
    </Card>
  );
}
