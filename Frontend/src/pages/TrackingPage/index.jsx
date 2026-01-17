import React from "react";
import UserTrackingHeader from "@/components/UserTrackingHeader";
import UserTrackingBody from "@/components/UserTrackingBody";
import UserTrackingButton from "@/components/UserTrackingButton";

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
      <UserTrackingHeader estimatedTime={estimatedTime} />

      <UserTrackingBody items={orderedItems} />

      <UserTrackingButton onClick={handleCallStaff} />
    </main>
  );
};

export default TrackingPage;
