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
import { Image, Sparkles, X } from "lucide-react";

const DialogCreateMenu = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="sm:max-w-[500px] max-h-[85vh] p-0 flex flex-col overflow-hidden gap-0 bg-background text-foreground">

        <DialogHeader className="p-6 pb-2 shrink-0 flex flex-row items-center justify-between space-y-0">
          <DialogTitle className="text-xl font-bold">Thêm món mới</DialogTitle>
          <DialogClose className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground outline-none">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-6 py-2 space-y-6 mr-8">
          <div className="space-y-2">
            <Label>Hình ảnh món</Label>
            <div className="w-32 h-32 border-2 border-dashed border-muted-foreground/25 rounded-2xl flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer gap-2">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Image className="w-5 h-5 text-muted-foreground" />
              </div>
              <span className="text-xs font-semibold text-muted-foreground">Thêm ảnh</span>
            </div>
            <p className="text-xs text-muted-foreground">
              JPG, PNG hoặc WebP. Tối đa 5MB.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Tên món *</Label>
            <Input
              id="name"
              placeholder="VD: Phở bò tái"
              className="rounded-xl border-muted-foreground/20 focus-visible:ring-[#E9560C]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Danh mục *</Label>
            <div className="relative">
              <select
                id="category"
                className="flex h-10 w-full items-center justify-between rounded-xl border border-muted-foreground/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-[#E9560C] focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 appearance-none"
              >
                <option value="" disabled selected>Chọn danh mục</option>
                <option value="khai-vi">Khai vị</option>
                <option value="mon-chinh">Món chính</option>
                <option value="do-uong">Đồ uống</option>
                <option value="trang-mieng">Tráng miệng</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Giá (VND) *</Label>
            <Input
              id="price"
              type="number"
              placeholder="VD: 75000"
              className="rounded-xl border-muted-foreground/20 focus-visible:ring-[#E9560C]"
            />
          </div>

          <div className="space-y-2 relative">
            <div className="flex justify-between items-center">
              <Label htmlFor="description">Mô tả ngắn</Label>
              <Button variant="ghost" size="sm" className="h-6 text-[#E9560C] hover:text-[#E9560C] px-2 hover:bg-[#FFEFE6] text-xs font-medium gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Gemini gợi ý
              </Button>
            </div>
            <textarea
              id="description"
              className="flex min-h-[80px] w-full rounded-xl border border-muted-foreground/20 bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E9560C] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
              placeholder="Mô tả sơ lược về món ăn..."
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="upsell">Gợi ý thức uống (Upsell)</Label>
              <Button variant="ghost" size="sm" className="h-6 text-purple-600 hover:text-purple-700 px-2 hover:bg-purple-50 text-xs font-medium gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                Gemini gợi ý
              </Button>
            </div>
            <Input
              id="upsell"
              placeholder="Gợi ý thức uống đi kèm..."
              className="rounded-xl border-muted-foreground/20 focus-visible:ring-purple-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <Label htmlFor="available" className="text-base font-medium">Còn hàng</Label>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#E9560C]/20 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E9560C]"></div>
            </label>
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0 p-6 pt-2 shrink-0">
          <DialogClose asChild>
            <Button variant="outline" className="rounded-xl border-muted-foreground/20 sm:mr-2">
              Hủy
            </Button>
          </DialogClose>
          <Button className="rounded-xl bg-[#F4A47E] hover:bg-[#E9560C] text-white">
            Thêm món
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogCreateMenu;
