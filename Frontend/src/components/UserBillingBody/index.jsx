import React from "react";

const UserBillingBody = ({ orderData, billData, loading }) => {
  // Calculate totals from orderData
  const items = orderData?.items || [];
  const subtotal = orderData?.totalPrice || 0;
  const vat = subtotal * 0.1;
  const total = subtotal + vat;

  // Determine status based on billData
  const getBillStatus = () => {
    if (loading) return { text: "Đang tải...", color: "bg-gray-500" };
    if (billData?.status === "PAID")
      return { text: "Đã thanh toán", color: "bg-green-500" };
    if (billData?.status === "UNPAID")
      return { text: "Chờ thanh toán", color: "bg-yellow-500" };
    return { text: "Chờ thanh toán", color: "bg-secondary" };
  };

  const status = getBillStatus();

  return (
    <main className="container max-w-lg mx-auto px-4 py-6 space-y-6 pb-32">
      <div className="glass-panel rounded-xl border shadow-md p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Chi tiết hóa đơn</h3>
          <div
            className={`flex items-center gap-1 rounded-full ${status.color} text-white px-2.5 py-0.5 text-xs font-semibold`}
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
              className="w-3 h-3"
            >
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {status.text}
          </div>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            {items.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                Chưa có đơn hàng nào
              </p>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center font-medium">
                      {item.quantity}
                    </span>
                    <span className="text-sm">{item.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {(item.price * item.quantity).toLocaleString()}&nbsp;₫
                  </span>
                </div>
              ))
            )}
          </div>
          {items.length > 0 && (
            <>
              <div className="border-t"></div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Tạm tính</span>
                  <span>{subtotal.toLocaleString()}&nbsp;₫</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">VAT (10%)</span>
                  <span>{vat.toLocaleString()}&nbsp;₫</span>
                </div>
              </div>
              <div className="border-t"></div>
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold">Tổng cộng</span>
                <span className="text-2xl font-bold text-primary">
                  {total.toLocaleString()}&nbsp;₫
                </span>
              </div>
            </>
          )}
        </div>
      </div>
      <div className="glass-panel rounded-xl border shadow-md p-6">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
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
              className="w-5 h-5 text-primary"
            >
              <path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"></path>
              <path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"></path>
              <path d="m2 16 6 6"></path>
              <circle cx="16" cy="9" r="2.9"></circle>
              <circle cx="6" cy="5" r="3"></circle>
            </svg>
          </div>
          <div>
            <p className="font-medium">Thanh toán tại bàn</p>
            <p className="text-sm text-muted-foreground">
              Nhấn nút bên dưới để gọi nhân viên đến thanh toán. Quý khách có
              thể thanh toán bằng tiền mặt, thẻ hoặc chuyển khoản.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default UserBillingBody;
