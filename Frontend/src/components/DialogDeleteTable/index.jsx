import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function DialogDeleteConfirm({
  open,
  onOpenChange,
  onConfirm,
  title = "Xóa",
  description = "Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.",
  confirmText = "Xóa"
}) {
  const handleConfirm = (e) => {
    e.preventDefault();
    if (onConfirm) onConfirm();
  };

  return (
    <Dialog className=" sm:rounded-xl" open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            {description}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <DialogClose asChild>
            <Button variant="outline">Huỷ</Button>
          </DialogClose>
          <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleConfirm}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}