import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, X, ChevronDown, Loader2 } from "lucide-react";
import CloudinaryUpload from "@/components/upload";

const DialogCreateMenu = ({
  open,
  onOpenChange,
  handleCreateBlog,
  handleUploadFile,
  formData,
  onFormChange,
  categories,
  isEditing,
  onImageRemove,
  isCategoryOpen,
  setIsCategoryOpen,
  onSuggestDescription,
  onSuggestUpsell,
  isGenerating = { description: false, upsell: false },
}) => {

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-[500px] max-h-[85vh] p-0 flex flex-col overflow-hidden gap-0 bg-background text-foreground"
      >
        <DialogHeader className="p-6 pb-2 shrink-0 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold">
            {isEditing ? "Chỉnh sửa món" : "Thêm món mới"}
          </DialogTitle>
          <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground outline-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-2 space-y-6 mr-8">
          <div className="space-y-2">
            <CloudinaryUpload
              onUpload={handleUploadFile}
              defaultImage={formData.image}
              onRemove={onImageRemove}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Tên món *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => onFormChange(e.target.id, e.target.value)}
              placeholder="VD: Phở bò tái"
              className="rounded-xl border-muted-foreground/20 focus-visible:ring-[#E9560C]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Danh mục *</Label>
            <div className="relative">
              <div
                className="flex h-10 w-full items-center justify-between rounded-xl border border-muted-foreground/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#E9560C] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              >
                <span>{formData.category || "Chọn danh mục"}</span>
                <ChevronDown className="h-4 w-4 opacity-50" />
              </div>
              {isCategoryOpen && (
                <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden z-10">
                  {categories && categories.map(
                    (cat) => (
                      <div
                        key={cat}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-[#FFF7ED] hover:text-[#E9560C] flex items-center transition-colors ${formData.category === cat
                          ? "bg-[#FFF7ED] text-[#E9560C]"
                          : "text-foreground"
                          }`}
                        onClick={() => {
                          onFormChange("category", cat);
                          setIsCategoryOpen(false);
                        }}
                      >
                        {cat}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Giá (VND) *</Label>
            <Input
              id="price"
              type="number"
              value={formData.price}
              onChange={(e) => onFormChange(e.target.id, e.target.value)}
              placeholder="VD: 75000"
              className="rounded-xl border-muted-foreground/20 focus-visible:ring-[#E9560C]"
            />
          </div>

          <div className="space-y-2 relative">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Mô tả ngắn</Label>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs font-medium gap-1.5 ${!formData.name
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed hover:bg-gray-100"
                  : "text-[#f5ab87] bg-[#f5ab87]/10 hover:bg-[#f5ab87]/20"
                  }`}
                onClick={onSuggestDescription}
                disabled={isGenerating.description || !formData.name}
                type="button"
              >
                {isGenerating.description ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                {isGenerating.description ? "Đang tạo..." : "Gemini gợi ý"}
              </Button>
            </div>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => onFormChange(e.target.id, e.target.value)}
              className="flex min-h-[80px] w-full rounded-xl border border-muted-foreground/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9560C] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              placeholder="Mô tả sơ lược về món ăn..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="upsell">Gợi ý thức uống (Upsell)</Label>
              <Button
                variant="ghost"
                size="sm"
                className={`h-6 px-2 text-xs font-medium gap-1.5 ${!formData.name
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed hover:bg-gray-100"
                  : "text-purple-600 bg-purple-600/10 hover:bg-purple-600/20"
                  }`}
                onClick={onSuggestUpsell}
                disabled={isGenerating.upsell || !formData.name}
                type="button"
              >
                {isGenerating.upsell ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5" />
                )}
                {isGenerating.upsell ? "Đang tạo..." : "Gemini gợi ý"}
              </Button>
            </div>
            <Input
              id="upsell"
              value={formData.upsell}
              onChange={(e) => onFormChange(e.target.id, e.target.value)}
              placeholder="Gợi ý thức uống đi kèm..."
              className="rounded-xl border-muted-foreground/20 focus-visible:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="available" className="text-base font-medium">
              Còn hàng
            </Label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={formData.available}
                onChange={(e) => onFormChange("available", e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E9560C]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E9560C]"></div>
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 p-6 pt-2 shrink-0">
          <DialogClose asChild>
            <Button
              variant="outline"
              className="rounded-xl border-muted-foreground/20 sm:mr-2"
            >
              Hủy
            </Button>
          </DialogClose>
          <Button
            disabled={!formData.name || !formData.category || !formData.price}
            onClick={() => handleCreateBlog()}
            className={`rounded-xl text-white transition-all duration-300 ${(!formData.name || !formData.category || !formData.price)
              ? "bg-[#F4A47E] opacity-70 cursor-not-allowed"
              : "bg-[#E9560C] hover:bg-[#d84e0b] shadow-lg shadow-orange-500/30"
              }`}
          >
            {isEditing ? "Lưu" : "Thêm món"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateMenu;
