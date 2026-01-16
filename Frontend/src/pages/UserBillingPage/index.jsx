import React, { useState, useEffect } from "react";
import UserBillingHeader from "../../components/UserBillingHeader";
import UserBillingBody from "../../components/UserBillingBody";
import UserBillingFooter from "../../components/UserBillingFooter";
import { getBillById } from "@/services/api/bill";

const UserBillingPage = () => {
  const [orderData, setOrderData] = useState(null);
  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get last order from localStorage
    const lastOrder = localStorage.getItem("lastOrder");
    if (lastOrder) {
      setOrderData(JSON.parse(lastOrder));
    }

    // Check if bill already created
    const currentBillId = localStorage.getItem("currentBillId");
    if (currentBillId) {
      fetchBill(currentBillId);
    }
  }, []);

  const fetchBill = async (billId) => {
    try {
      setLoading(true);
      const response = await getBillById(billId);
      if (response.data.success) {
        setBillData(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching bill:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleBillCreated = (newBillData) => {
    setBillData(newBillData);
  };

  return (
    <div className="min-h-screen">
      <UserBillingHeader />
      <UserBillingBody
        orderData={orderData}
        billData={billData}
        loading={loading}
      />
      <UserBillingFooter
        orderData={orderData}
        billData={billData}
        onBillCreated={handleBillCreated}
      />
    </div>
  );
};

export default UserBillingPage;
