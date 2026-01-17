import React from "react";

const UserTrackingHeader = () => {
  return (
    <div class="rounded-xl border border-border/30 bg-card/80 text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card overflow-hidden !pb-0">
      <div class="bg-gradient-to-r from-primary/10 to-accent/20 p-6  backdrop-blur-sm">
        <div class="flex items-center gap-4">
          <div class="p-4 rounded-full backdrop-blur-sm bg-primary/20">
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
              class="lucide lucide-thumbs-up w-8 h-8 text-primary"
            >
              <path d="M7 10v12"></path>
              <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"></path>
            </svg>
          </div>
          <div>
            <h2 class="text-xl font-bold">Đã hoàn thành!</h2>
            <p class="text-muted-foreground">Chúc bạn ngon miệng!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTrackingHeader;
