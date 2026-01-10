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

export function DialogDeleteTable({ open, onOpenChange, handleDeleteTable }) {
  return (
    <Dialog className=" sm:rounded-xl" open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleDeleteTable}>
          <DialogHeader>
            <DialogTitle>Xoá Bàn</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa bàn này? Hành động này không thể hoàn
              tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-3">
            <DialogClose asChild>
              <Button variant="outline">Huỷ</Button>
            </DialogClose>
            <Button className="bg-red-600" type="submit">
              Xoá
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
