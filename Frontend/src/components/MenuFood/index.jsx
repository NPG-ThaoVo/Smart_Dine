import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Edit2, Trash2, Sparkles, Loader2, AlertCircle } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

const MenuFood = ({
  items,
  categories,
  activeCategory,
  onCategoryChange,
  totalItems,
  availableItems,
  getCount,
  searchQuery,
  onSearchChange,
  handleAddClick,
  onEdit,
  onDelete,
  onQuickSuggest,
  generatingItemId,
  uncategorizedItems,
  loading = false,
}) => {
  const renderItemCard = (item) => (
    <div
      key={item._id}
      className={`group relative rounded-[32px] overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full border ${item.isAvailable
        ? "bg-[#EFFAF4] hover:bg-[#E0F2E9] border-[#A7F3D0]"
        : "bg-[#FFF5F5] hover:bg-[#FFE5E5] border-red-200"
        }`}
    >
      <div className="flex items-center justify-between px-6 pt-4 pb-2">
        <Badge
          className={`${item.isAvailable
            ? "bg-[#A7F3D0] text-[#065F46] hover:bg-[#ECA97C] border-transparent"
            : "bg-red-100 text-red-700 hover:bg-[#F87171] border-transparent"
            } shadow-none font-semibold px-3 py-1 text-xs uppercase tracking-wide rounded-full transition-colors duration-300 cursor-pointer`}
        >
          {item.isAvailable ? "CÒN HÀNG" : "HẾT HÀNG"}
        </Badge>

        <span
          className={`block w-4 h-4 rounded-full ring-4 ring-white/50 ${item.isAvailable ? "bg-[#10B981]" : "bg-red-500"
            }`}
        />
      </div>

      <div className="px-6 pb-2">
        <div className="aspect-square w-full rounded-[24px] overflow-hidden bg-white shadow-sm">
          <img
            src={item.image}
            alt={item.name}
            className="object-cover w-full h-full"
          />
        </div>
      </div>

      <div className="px-6 pt-6 pb-2 flex flex-col flex-1 gap-2">
        <h3 className="font-bold text-xl text-gray-900 line-clamp-1">
          {item.name}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem] leading-relaxed mb-1">
          {item.description}
        </p>

        <div className="flex items-baseline gap-1 mb-2">
          <span className={`text-2xl font-bold ${item.isAvailable ? "text-[#10B981]" : "text-red-500"}`}>
            {item.price.toLocaleString()}
          </span>
          <span className={`text-xl font-medium ${item.isAvailable ? "text-[#10B981]/80" : "text-red-400"} underline decoration-2 underline-offset-4`}>đ</span>
        </div>

        {(item.upsellSuggestions && item.upsellSuggestions.length > 0) && (
          <div className="bg-[#FDF4EB] border border-[#FED7AA] rounded-2xl p-4 mb-2">
            <div className="flex gap-2.5 items-start">
              <Sparkles className="w-4 h-4 text-[#EA580C] shrink-0 mt-0.5 fill-[#EA580C]" />
              <p className="text-xs text-[#9A3412] font-medium leading-relaxed">
                {item.upsellSuggestions[0]}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="px-6 py-4 mt-auto flex items-center justify-between border-t border-black/5 group-hover:bg-white/60 transition-colors duration-300">
        <Button
          variant="ghost"
          size="sm"
          className="text-xs font-medium text-gray-500 hover:bg-[#E9D5FF] hover:text-purple-600 gap-2 px-4 ml-12 rounded-full cursor-pointer"
          onClick={() => onQuickSuggest && onQuickSuggest(item)}
          disabled={generatingItemId === item._id}
        >
          {generatingItemId === item._id ? (
            <Loader2 className="w-4 h-4 animate-spin text-purple-600" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          AI
        </Button>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full cursor-pointer"
            onClick={() => onEdit && onEdit(item)}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full cursor-pointer"
            onClick={() => onDelete && onDelete(item)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex-1 pb-3 md:pb-6">
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E9560C] to-purple-600 bg-clip-text text-transparent">
              Quản lý thực đơn
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Tổng số: {totalItems} món • Còn hàng: {availableItems}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute z-10 left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Tìm kiếm món ăn..."
                className="pl-9 w-full md:w-[250px] bg-background"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
            <Button
              className="bg-[#E9560C] hover:bg-[#E9560C]/90 text-white shadow-lg shadow-orange-500/20 cursor-pointer"
              onClick={() => handleAddClick()}
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm món mới
            </Button>
          </div>
        </div>

        <div className="sticky top-0 z-10 py-2">
          <div className="inline-flex items-center bg-secondary/80 p-1.5 rounded-full shadow-sm border border-border/50 backdrop-blur-md">
            {categories && categories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange && onCategoryChange(cat)}
                className={`
                  px-2 sm:px-3 py-1.5 rounded-full text-xs md:text-sm font-semibold transition-all duration-200
                  ${activeCategory === cat
                    ? "bg-[#EACFB4] text-[#E9560C] shadow-sm ring-1 ring-black/5"
                    : "text-muted-foreground hover:text-foreground hover:bg-black/5 cursor-pointer"
                  }
                `}
              >
                {cat} ({getCount ? getCount(cat) : 0})
              </button>
            ))}
          </div>
        </div>

        {uncategorizedItems && uncategorizedItems.length > 0 && (
          <div className="mb-8 p-4 border-2 border-orange-200 rounded-xl bg-orange-50/50">
            <h3 className="text-lg font-bold text-orange-600 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> Món chưa phân loại - Vui lòng cập nhật ({uncategorizedItems.length})
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {uncategorizedItems.map(item => renderItemCard(item))}
            </div>
          </div>
        )}

        {(!items || items.length === 0) ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
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
              className="lucide lucide-utensils-crossed w-24 h-24 mx-auto text-muted-foreground/20 mb-6"
            >
              <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8" />
              <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7" />
              <path d="m2.1 21.8 6.4-6.3" />
              <path d="m19 5-7 7" />
            </svg>
            <p className="text-xl font-medium text-muted-foreground/60">Không tìm thấy món nào</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
            {items.map((item) => renderItemCard(item))}
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default MenuFood;