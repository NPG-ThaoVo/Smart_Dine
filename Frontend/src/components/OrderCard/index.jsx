import { Button } from "@/components/ui/button";
import { Eye, Check } from "lucide-react";

export function OrderCard({ order, handlePay, loading }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-3xl transition-all duration-300 overflow-hidden border h-[280px] bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />

      {/* Main content */}
      <div className="p-6 relative z-10">
        {/* Status badge and indicator */}
        <div className="flex justify-between items-start mb-4">
          <div
            className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border
    ${
      order.status === "Đang phục vụ"
        ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
        : "bg-gray-500/10 text-gray-400 border-gray-500/20"
    }`}
          >
            {order.status}
          </div>
        </div>

        {/* Table number */}
        <div className="text-center mb-4">
          <span className="text-4xl font-black tracking-tighter text-emerald-500 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            {order.table}
          </span>
          <p className="text-xs text-muted-foreground mt-2">
            {order.time} - {order.status}
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-[10px] text-muted-foreground">Đơn</p>
            <p className="font-semibold text-sm">{order.orders}</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-[10px] text-muted-foreground">Món</p>
            <p className="font-semibold text-sm">{order.dishes}</p>
          </div>
          <div className="p-2 rounded-lg bg-white/5">
            <p className="text-[10px] text-muted-foreground">Tạm tính</p>
            <p className="font-semibold text-emerald-500 text-xs">
              {order.total}
            </p>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="p-4 bg-background/50 backdrop-blur-md border-t border-white/5 relative z-20">
        <div className="flex gap-2">
          <Button variant="ghost" className="flex-1 hover:bg-white/10">
            <Eye className="w-4 h-4 mr-1" />
            Xem
          </Button>
          {order.status === "Đang phục vụ" && (
            <Button
              disabled={loading}
              onClick={() => handlePay(order.id)}
              className="flex-1 bg-gradient-to-r from-emerald-500 to-green-600"
            >
              <Check className="w-4 h-4 mr-1" />
              Thanh toán
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
