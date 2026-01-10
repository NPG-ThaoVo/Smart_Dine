import React from "react";
import { BillingHeader } from "@/components/BillingHeader";
import { BillingStats } from "@/components/BillingStats";
import { BillingTabs } from "@/components/BillingTabs";

const BillingPage = () => {
  return (
    <main className="flex-1 p-3 md:p-6 overflow-auto">
      <div className="space-y-8">
        <BillingHeader />
        <BillingStats />
        <BillingTabs />
      </div>
    </main>
  );
};

export default BillingPage;
