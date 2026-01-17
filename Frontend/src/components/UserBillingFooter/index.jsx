import React, { useState } from "react";
import { createBill } from "@/services/api/bill";
import toast from "react-hot-toast";

const UserBillingFooter = ({ orderData, billData, onBillCreated }) => {
  const [loading, setLoading] = useState(false);

  const handleRequestPayment = async () => {
    if (!orderData) {
      toast.error("Không tìm thấy thông tin đơn hàng");
      return;
    }

    try {
      setLoading(true);

      // Get tableId from orderData
      const tableId = orderData.tableId;

      if (!tableId) {
        toast.error("Không tìm thấy thông tin bàn");
        setLoading(false);
        return;
      }

      // Calculate total with VAT
      const subtotal = orderData.totalPrice;
      const vat = subtotal * 0.1;
      const totalAmount = subtotal + vat;

      const billData = {
        tableId: tableId,
        totalAmount: totalAmount,
        status: "UNPAID",
      };

      const response = await createBill(billData);

      if (response.data.success) {
        toast.success("Đã gửi yêu cầu thanh toán! Nhân viên sẽ đến ngay.");

        // Store bill ID
        localStorage.setItem("currentBillId", response.data.data._id);

        // Callback to parent to update billData
        if (onBillCreated) {
          onBillCreated(response.data.data);
        }
      }
    } catch (error) {
      console.error("Error creating bill:", error);
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi tạo hóa đơn"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 p-4 glass-header border-t">
      <div className="container max-w-lg mx-auto">
        {billData ? (
          <div className="text-center py-4">
            <div className="flex items-center justify-center gap-2 text-green-600 mb-2">
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
                className="w-6 h-6"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                <polyline points="22 4 12 14.01 9 11.01"></polyline>
              </svg>
              <span className="font-semibold">Đã gửi yêu cầu thanh toán</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Nhân viên sẽ đến thanh toán trong giây lát
            </p>
          </div>
        ) : (
          <button
            onClick={handleRequestPayment}
            disabled={loading || !orderData}
            className="w-full flex items-center justify-center gap-2 rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-6 text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
              className="w-5 h-5"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
            </svg>
            {loading ? "Đang gửi yêu cầu..." : "Yêu cầu thanh toán"}
          </button>
        )}
      </div>
    </div>
  );
};

export default UserBillingFooter;
