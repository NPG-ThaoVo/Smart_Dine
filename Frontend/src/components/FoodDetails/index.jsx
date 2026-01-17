import React from "react";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FoodDetails = ({
  item,
  quantity,
  onIncrease,
  onDecrease,
  totalPrice,
  onAddToCart,
}) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-bg pb-32">
      <header
        className="sticky top-0 z-20
    backdrop-blur-md
    bg-white/60
    border-b border-white/30"
      >
        <div className="px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="
    rounded-full
    hover:bg-[#FFF4E5]
    hover:text-[#E9560C]
    focus-visible:ring-[#E9560C]
    cursor-pointer
  "
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <h1 className="text-lg font-bold">Chi tiết món ăn</h1>
        </div>
      </header>
      <div className="relative w-full aspect-square bg-muted">
        <img
          src={item.image || "https://placehold.co/600x400?text=No+Image"}
          alt={item.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
          <div className="flex flex-col gap-2">
            {item.categoryId && (
              <div className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent hover:bg-primary/80 bg-black/60 backdrop-blur-sm text-white border-none w-fit">
                {item.categoryId.name || "Danh mục"}
              </div>
            )}
          </div>
        </div>
        <div className="px-4 py-6 space-y-6">
          <div>
            <h2 className="text-3xl font-black text-foreground mb-2 leading-tight">
              {item.name}
            </h2>
            <div className="flex items-baseline gap-2">
              <span
                className="text-4xl font-black
      bg-gradient-to-r
      from-[#FF6A00]
      via-[#FF4D8D]
      to-[#A855F7]
      bg-clip-text
      text-transparent"
              >
                {item.price?.toLocaleString()} ₫
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">Mô tả</h3>
            <p className="text-muted-foreground leading-relaxed">
              {item.description || "Chưa có mô tả cho món ăn này."}
            </p>
          </div>

          {item.upsellSuggestions && item.upsellSuggestions.length > 0 && (
            <div className="p-4 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border-2 border-amber-500/20">
              <div className="flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 rounded-xl">
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
                    className="lucide lucide-sparkles w-5 h-5 text-amber-500"
                  >
                    <path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"></path>
                    <path d="M20 3v4"></path>
                    <path d="M22 5h-4"></path>
                    <path d="M4 17v2"></path>
                    <path d="M5 18H3"></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-amber-600 dark:text-amber-400 mb-1">
                    Gợi ý từ đầu bếp
                  </h4>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {item.upsellSuggestions[0]}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">Số lượng</h3>
            <div className="flex items-center gap-4">
              <Button
                onClick={() => onDecrease()}
                size="icon"
                className="
    inline-flex items-center justify-center
    h-12 w-12 rounded-full
    bg-white/70 backdrop-blur-md
    border border-[#E9560C]/30
    text-[#E9560C]
    hover:bg-white/90
    hover:border-[#E9560C]/50
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#E9560C]/30
    cursor-pointer
  "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-5 h-5"
                >
                  <path d="M5 12h14" />
                </svg>
              </Button>
              <div
                className="
    flex-1 h-12 rounded-2xl
    flex items-center justify-center
    bg-gradient-to-r
    from-[#FFEDE6]
    via-[#FFF4EE]
    to-[#FDE9F3]
    border border-[rgba(233,86,12,0.35)]
  "
              >
                <span className="text-lg font-extrabold text-[#E9560C]">
                  {quantity}
                </span>
              </div>
              <Button
                onClick={() => onIncrease()}
                size="icon"
                className="
    inline-flex items-center justify-center
    h-12 w-12 rounded-full
    bg-white/70 backdrop-blur-md
    border border-[#E9560C]/30
    text-[#E9560C]
    hover:bg-white/90
    hover:border-[#E9560C]/50
    transition-colors
    focus-visible:outline-none
    focus-visible:ring-2
    focus-visible:ring-[#E9560C]/30
    cursor-pointer
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
                  className="lucide lucide-plus w-5 h-5"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-foreground">
              Ghi chú đặc biệt
            </h3>
            <textarea
              className="flex w-full rounded-md border border-input px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 min-h-[100px] bg-background/50 backdrop-blur-sm !border-gray/10 resize-none"
              placeholder="Ví dụ: Không hành, ít cay..."
            ></textarea>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="p-4 rounded-2xl bg-white/5 border !border-gray/10 text-center">
              <p className="text-2xl font-bold text-[#E9560C]">250</p>
              <p className="text-xs text-muted-foreground mt-1">Calories</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border !border-gray/10 text-center">
              <p className="text-2xl font-bold text-[#E9560C]">15g</p>
              <p className="text-xs text-muted-foreground mt-1">Protein</p>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border !border-gray/10 text-center">
              <p className="text-2xl font-bold text-[#E9560C]">30g</p>
              <p className="text-xs text-muted-foreground mt-1">Carbs</p>
            </div>
          </div>
        </div>
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-lg border-t !border-gray/10">
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1">Tổng cộng</p>
              <p className="text-2xl font-black text-[#E9560C]">
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}
              </p>
            </div>
            <Button
              onClick={() => onAddToCart()}
              className="flex-1 h-14 rounded-2xl px-8
    flex items-center justify-center gap-2
    text-white text-lg font-semibold
    bg-gradient-to-r
    from-orange-500
    via-pink-500
    to-purple-600
    hover:from-orange-600
    hover:via-pink-600
    hover:to-purple-700
    transition-all duration-300
    shadow-lg cursor-pointer
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
                className="lucide lucide-shopping-cart w-5 h-5 mr-2"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
              Thêm vào giỏ
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetails;
