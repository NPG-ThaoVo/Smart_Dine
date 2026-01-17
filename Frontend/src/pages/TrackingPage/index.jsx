import React, { useState, useEffect } from "react";
import FormTracking from "@/components/FormTracking";
import { createNotification } from "@/services/api/notification";
import { getTableById } from "@/services/api/tables";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const TrackingPage = () => {
  const { tableId } = useParams();
  const [table, setTable] = useState(null);
  
  const estimatedTime = 5;

  const orderedItems = [
    {
      id: 1,
      name: "Gỏi cuốn tôm thịt",
      price: 45000,
      quantity: 1,
      done: true,
    },
  ];

  // Lấy thông tin bàn từ API
  useEffect(() => {
    const fetchTable = async () => {
      if (tableId) {
        try {
          const response = await getTableById(tableId);
          setTable(response.data);
        } catch (error) {
          console.error("Error fetching table:", error);
        }
      }
    };
    fetchTable();
  }, [tableId]);

  const handleCallStaff = async () => {
    try {
      await createNotification({
        type: "SERVICE_REQUEST",
        title: `Yêu cầu hỗ trợ - Bàn ${table?.number || "N/A"}`,
        message: `Bàn ${table?.number || "N/A"} cần hỗ trợ từ nhân viên`,
        tableId: tableId || null,
        status: "UNREAD"
      });
      
      toast.success("Đã gọi nhân viên! Chúng tôi sẽ đến ngay.");
    } catch (error) {
      console.error("Error calling staff:", error);
      toast.error("Không thể gọi nhân viên. Vui lòng thử lại.");
    }
  };
  return (
    <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
      <FormTracking
        estimatedTime={estimatedTime}
        items={orderedItems}
        handleCallStaff={handleCallStaff}
      />
    </main>
  );
};

export default TrackingPage;
