import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Clock, ChefHat, ArrowLeft } from "lucide-react";

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Lấy dữ liệu order từ localStorage
    const lastOrder = localStorage.getItem("lastOrder");

    if (lastOrder) {
      try {
        setLoading(true);
        const parsedOrder = JSON.parse(lastOrder);
        setOrderData(parsedOrder);
      } catch (error) {
        console.error("Error parsing order data:", error);
      }
    }

    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Đang tải...</p>
      </div>
    );
  }

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="mb-4">Không tìm thấy thông tin đơn hàng</p>
          <Button onClick={() => navigate("/")}>Quay lại menu</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/10 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container max-w-lg mx-auto px-4 py-8">
        <div className="flex flex-col items-center text-center mb-8">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-4 animate-scale-in">
              <CheckCircle2 className="w-16 h-16 text-green-500" />
            </div>
            <div className="absolute inset-0 w-24 h-24 rounded-full bg-green-500/20 animate-ping" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2 animate-fade-in">
            Đặt món thành công!
          </h1>
          <p className="text-muted-foreground animate-fade-in">
            Đơn hàng của bạn đã được gửi đến bếp
          </p>
        </div>

        <div className="rounded-xl border border-border/30 bg-card/80 backdrop-blur-xl shadow-md mb-6">
          <div className="p-6">
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-muted-foreground">Mã đơn</span>
              <span className="font-semibold">
                #{orderData.orderId?.slice(-8)?.toUpperCase() || "N/A"}
              </span>
            </div>

            <div className="flex justify-between mb-4 text-sm">
              <span className="text-muted-foreground">Bàn</span>
              <span className="font-semibold">
                Bàn {orderData.tableId || "N/A"}
              </span>
            </div>

            <div className="border-t border-border pt-4 mt-4">
              <h3 className="font-medium mb-3">Chi tiết đơn hàng</h3>

              {orderData.items &&
                orderData.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm mb-2"
                  >
                    <span className="text-muted-foreground">
                      {item.name} x{item.quantity}
                    </span>
                    <span>
                      {(item.price * item.quantity).toLocaleString()} ₫
                    </span>
                  </div>
                ))}

              <div className="flex justify-between font-medium mt-4 pt-4 border-t border-border">
                <span>Tổng cộng</span>
                <span className="text-[#E9560C] font-semibold">
                  {orderData.totalPrice?.toLocaleString() || 0} ₫
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/30 bg-card/80 backdrop-blur-xl shadow-md mb-6">
          <div className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#F15A0A]/10">
              <Clock className="w-6 h-6 text-[#F15A0A]" />
            </div>
            <div>
              <h3 className="font-medium">Thời gian ước tính</h3>
              <p className="text-sm text-muted-foreground">15–20 phút</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border/30 bg-card/80 backdrop-blur-xl shadow-md mb-8">
          <div className="p-6 flex items-center gap-4">
            <div className="p-3 rounded-full bg-[#F15A0A]/10">
              <ChefHat className="w-6 h-6 text-[#F15A0A]" />
            </div>
            <div>
              <h3 className="font-medium">Đang chuẩn bị</h3>
              <p className="text-sm text-muted-foreground">
                Đầu bếp đã nhận đơn và đang chuẩn bị món cho bạn
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full h-14 rounded-2xl bg-[#F15A0A] hover:bg-[#E24F00] text-white text-lg font-semibold cursor-pointer">
            Theo dõi đơn hàng
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="w-full h-14 rounded-2xl bg-[#F9FAFB] border border-gray-200 text-gray-900 text-lg font-semibold hover:bg-gray-100 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Đặt thêm món
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
