import React from "react";
import FormTracking from "@/components/FormTracking";

const TrackingPage = () => {
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

  const handleCallStaff = () => {
    console.log("Call staff");
    // TODO: call API / socket / notification
  };
  return (
    <main className="container max-w-lg mx-auto px-4 py-6 space-y-6">
      <FormTracking
        estimatedTime={estimatedTime}
        items={orderedItems}
        onClick={handleCallStaff}
      />
    </main>
  );
};

export default TrackingPage;
