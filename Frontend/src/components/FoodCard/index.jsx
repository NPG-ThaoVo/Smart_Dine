import React from "react";

const FoodCard = () => {
  return (
    <main className="px-3 md:px-4 py-4 md:py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-2xl font-black text-foreground">Khai vị</h2>
          <span className="text-sm text-muted-foreground">2 món</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="group relative flex flex-col rounded-3xl transition-all duration-300 overflow-hidden cursor-pointer bg-card border-2 border-border hover:border-[#e9560c] hover:shadow-md">
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&amp;h=800&amp;fit=crop"
                alt="Gỏi cuốn tôm thịt"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-bold text-base text-foreground line-clamp-2 mb-1 leading-tight">
                Gỏi cuốn tôm thịt
              </h3>
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex flex-col">
                  <span className="font-black text-xl text-[#e9560c]">
                    45.000&nbsp;₫
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-[#e9560c]-foreground h-9 w-9 rounded-full bg-[#e9560c] hover:bg-[#e9560c]/90 shadow-lg shadow-[#e9560c]/30 hover:scale-110 transition-transform">
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
                      className="lucide lucide-plus w-4 h-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="group relative flex flex-col rounded-3xl transition-all duration-300 overflow-hidden cursor-pointer bg-card border-2 border-border hover:border-[#e9560c] hover:shadow-md">
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&amp;h=800&amp;fit=crop"
                alt="Chả giò Sài Gòn"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-bold text-base text-[] line-clamp-2 mb-1 leading-tight">
                Chả giò Sài Gòn
              </h3>
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex flex-col">
                  <span className="font-black text-xl text-[#e9560c]">
                    55.000&nbsp;₫
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button
                    className="
    inline-flex items-center justify-center
    h-9 w-9 rounded-full
    bg-[#e9560c] hover:bg-[#e9560c]
    text-white
    shadow-lg shadow-[#e9560c]/30
    hover:scale-110 transition-transform
  "
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
                      className="lucide lucide-plus w-4 h-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FoodCard;
