import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export function DialogCreateOrEditTable({
  open,
  onOpenChange,
  isEditing,
  editDataTable,
  onSubmit,
  onSubmitEdit,
}) {
  const [number, setNumber] = React.useState("");
  const [name, setName] = React.useState("");
  React.useEffect(() => {
    if (isEditing && editDataTable) {
      setNumber(editDataTable.number);
      setName(editDataTable.name || "");
    }
    if (!isEditing && open) {
      setNumber("");
      setName("");
    }
  }, [isEditing, editDataTable, open]);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEditing) {
      onSubmitEdit();
    } else {
      onSubmit();
    }

    onOpenChange(false);
  };
  return (
    <Dialog className=" sm:rounded-xl " open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {isEditing ? "Chỉnh Sửa Bàn" : "Thêm Bàn Mới"}
            </DialogTitle>
          </DialogHeader>
          <div className="grid my-5 gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Số Bàn *</Label>
              <Input
                id="name-1"
                name="name"
                value={number}
                onChange={(e) => setNumber(e.target.value)}
                placeholder="Nhập Số Bàn"
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Tên Bàn (Tuỳ Chọn)</Label>
              <Input
                id="username-1"
                name="username"
                placeholder="VD: Bàn VIP, Bàn Cửa Sổ..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Huỷ</Button>
            </DialogClose>
            <Button className="bg-primary" type="submit">
              {isEditing ? "Cập Nhật Bàn" : "Thêm Bàn"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
