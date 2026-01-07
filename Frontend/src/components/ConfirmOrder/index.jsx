import React from "react";
import { Button } from "@/components/ui/button";

const ConfirmOrder = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl"></div>
      </div>
      <div className="relative z-10 container max-w-lg mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-4 animate-scale-in">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-circle-check-big w-16 h-16 text-green-500"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
            </div>
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-500/20 animate-ping"></div>
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2 animate-fade-in">
            Đặt món thành công!
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Đơn hàng của bạn đã được gửi đến bếp
          </p>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-panel mb-6 animate-fade-in">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Mã đơn</span>
              <span className="text-sm font-semibold text-foreground">
                #ORDER-17
              </span>
            </div>

            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-muted-foreground">Bàn</span>
              <span className="text-sm font-semibold text-foreground">
                Bàn 1 - Bàn cửa sổ
              </span>
            </div>
            <div className="border-t border-border pt-4 mt-4">
              <h3 className="font-medium mb-3">Chi tiết đơn hàng</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    Gỏi cuốn tôm thịt x1
                  </span>
                  <span>45.000&nbsp;₫</span>
                </div>
              </div>
              <div className="flex justify-between font-medium mt-4 pt-4 border-t border-border">
                <span>Tổng cộng</span>
                <span className="text-[#E9560C] font-semibold">
                  45.000&nbsp;₫
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-panel mb-6 animate-fade-in">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#F15A0A]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6 text-[#F15A0A]"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Thời gian ước tính</h3>
                <p className="text-sm text-muted-foreground">15-20 phút</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-panel mb-8 animate-fade-in">
          <div className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-[#F15A0A]/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  className="w-6 h-6 text-[#F15A0A]"
                >
                  <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z"></path>
                  <path d="M6 17h12"></path>
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Đang chuẩn bị</h3>
                <p className="text-sm text-muted-foreground">
                  Đầu bếp đã nhận đơn và đang chuẩn bị món cho bạn
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <Button
            className="w-full h-14 rounded-2xl
    bg-[#F15A0A] hover:bg-[#E24F00]
    text-white text-lg font-semibold
    transition-colors cursor-pointer"
          >
            Theo dõi đơn hàng
          </Button>
          <Button
            variant="outline"
            className="w-full h-14 rounded-2xl
    bg-[#F9FAFB]
    border border-gray-200
    text-gray-900 text-lg font-semibold
    hover:bg-gray-100
    flex items-center justify-center cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left w-5 h-5 mr-2"
            >
              <path d="m12 19-7-7 7-7"></path>
              <path d="M19 12H5"></path>
            </svg>
            Đặt thêm món
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
