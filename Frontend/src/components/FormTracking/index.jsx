import React from "react";

const FormTracking = () => {
  return (
    <>
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
      <button class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 w-full py-6 text-lg glass-button">
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
          class="lucide lucide-bell w-5 h-5 mr-2"
        >
          <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
          <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
        </svg>
        Gọi nhân viên
      </button>
    </>
  );
};

export default FormTracking;
