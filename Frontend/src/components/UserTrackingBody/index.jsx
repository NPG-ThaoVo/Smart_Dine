import React from "react";

const UserTrackingBody = () => {
  return (
    <div class="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card">
      <div class="flex flex-col space-y-1.5 p-6">
        <h3 class="font-semibold tracking-tight text-lg">Món đã đặt</h3>
      </div>
      <div class="p-6 pt-0">
        <div class="space-y-3">
          <div class="flex items-center justify-between p-3 rounded-lg bg-muted/20 backdrop-blur-sm border border-border/20">
            <div class="flex items-center gap-3">
              <span class="w-6 h-6 rounded-full bg-primary/10 text-primary text-sm flex items-center justify-center">
                1
              </span>
              <span class="font-medium">Gỏi cuốn tôm thịt</span>
            </div>
            <div class="flex items-center gap-2">
              <span class="text-sm text-muted-foreground">45.000&nbsp;₫</span>
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
                class="lucide lucide-circle-check-big w-4 h-4 text-primary"
              >
                <path d="M21.801 10A10 10 0 1 1 17 3.335"></path>
                <path d="m9 11 3 3L22 4"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTrackingBody;
