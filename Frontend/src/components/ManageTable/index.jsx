import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { QrCode, PenLine, Trash2, ArrowRight } from "lucide-react";
const ManageTable = ({
  onEdit,
  onDelete,
  tables,
  onViewQR,
  onOpenBilling,
}) => {

  return (
    <div>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
        {tables.map((table) => (
          <div
            key={table._id}
            className={`group relative flex flex-col justify-between rounded-3xl transition-all duration-300 overflow-hidden border h-[280px] ${table.isAvailable
              ? "bg-emerald-500/5 hover:bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/40"
              : " bg-rose-500/5 hover:bg-rose-500/10 border-rose-500/20 hover:border-rose-500/40"
              }`}
          >
            <div
              className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br ${table.isAvailable
                ? "from-emerald-500/10 via-transparent to-transparent"
                : "from-rose-500/10 via-transparent to-transparent"
                }`}
            ></div>
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start">
                <div
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${table.isAvailable
                    ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                    : "bg-red-500/10 text-red-500 border-red-500/20"
                    }`}
                >
                  {table.isAvailable ? "Trống" : "Có khách"}
                </div>
                <div
                  className={`w-3 h-3 rounded-full ring-4 ring-black/40  ${table.isAvailable
                    ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.6)] animate-pulse"
                    : "bg-red-500 shadow-[0_0_12px_rgba(244,63,94,0.6)]"
                    }`}
                ></div>
              </div>
              <div className="mt-6 text-center">
                <span
                  className={`text-5xl font-black tracking-tighter ${table.isAvailable ? "text-emerald-500" : "text-rose-500"
                    } drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]`}
                >
                  {table.number}
                </span>
                <p className="text-sm text-muted-foreground mt-2 font-medium">
                  {table.name}
                </p>
              </div>
            </div>
            <div className="p-4 bg-background/50 backdrop-blur-md border-t border-white/5 relative z-20">
              <div className="flex items-center justify-between gap-2">
                <div className="flex gap-1">
                  <Button
                    onClick={() => onViewQR(table)}
                    className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-primary "
                    title="QR Code"
                  >
                    <QrCode className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => onEdit(table)}
                    className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-blue-400"
                    title="Chỉnh sửa"
                  >
                    <PenLine className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => onDelete(table)}
                    className="bg-transparent text-gray-400 hover:bg-white/10 hover:text-red-400"
                    title="Xóa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                {table.isAvailable ? (
                  ""
                ) : (
                  <Button
                    onClick={() => onOpenBilling(table)}
                    className="rounded-xl bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-400 hover:to-pink-500 text-white border border-white/10 shadow-lg shadow-rose-500/20">
                    Chi tiết
                    <ArrowRight className="w-3 h-3 ml-1 opacity-70" />
                  </Button>
                )}
              </div>

            </div>
          </div>
        ))}
      </div>
    </div >
  );
};

export default ManageTable;
