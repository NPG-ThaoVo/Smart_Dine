import React, { useEffect, useState } from "react";
import { BillingHeader } from "@/components/BillingHeader";
import { BillingStats } from "@/components/BillingStats";
import { BillingTabs } from "@/components/BillingTabs";
import { getAllBills, getBillStats, payBill } from "@/services/api/bills";
import toast from "react-hot-toast";
import BillingDetails from "@/components/BillingDetails";
const BillingPage = () => {
  const [bills, setBills] = useState([]);
  const [stats, setStats] = useState(null);
  const [pageLoading, setPageLoading] = useState(false);
  const [payingLoading, setPayingLoading] = useState(false);
  const [openBilling, setOpenBilling] = useState(false);
  const [selectedBill, setSelectedBill] = useState(null);

  const handleViewBill = (bill) => {
    setSelectedBill(bill);
    setOpenBilling(true);
  };

  const handlePay = async (billId) => {
    try {
      setPayingLoading(true);
      await payBill(billId);

      const [billRes, statsRes] = await Promise.all([
        getAllBills(),
        getBillStats(),
      ]);
      const bills = billRes?.data?.data?.bills || [];
      console.log("🚀 ~ handlePay ~ bills:", bills)
      const stats = statsRes?.data?.data;
      console.log("🚀 ~ handlePay ~ stats:", stats)
      setBills(bills);
      setStats(stats);

      toast.success("Thanh toan thanh cong");
    } catch (error) {
      console.error("handlePay error:", error);
      toast.error("Thanh toan that bai");
    } finally {
      setPayingLoading(false);
    }
  };

  useEffect(() => {
    console.log("bills:", bills);
    const fetchData = async () => {
      try {
        setPageLoading(true);

        const [billRes, statsRes] = await Promise.all([
          getAllBills(),
          getBillStats(),
        ]);

        setBills(billRes.data.data.bills || []);
        setStats(statsRes.data.data);
      } catch (err) {
        console.error("Lỗi load billing:", err);
      } finally {
        setPageLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <main className="flex-1 p-3 md:p-6 overflow-auto">
      <div className="space-y-8">
        <BillingHeader />
        <BillingStats stats={stats} loading={pageLoading} />
        <BillingTabs handleView={handleViewBill} bills={bills} loading={pageLoading} payingLoading={payingLoading} handlePay={handlePay} />
        <BillingDetails
          open={openBilling}
          onOpenChange={setOpenBilling}
          bill={selectedBill}
          pageLoading={pageLoading}
        />
      </div>
    </main>
  );
};

export default BillingPage;
