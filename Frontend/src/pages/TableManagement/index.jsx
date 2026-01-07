import { DialogCreateOrEditTable } from "@/components/DialogCreateOrEditTable";
import { DialogDeleteTable } from "@/components/DialogDeleteTable";
import { DialogQR } from "@/components/DialogQR";
import HeaderContentAdmin from "@/components/HeaderContentAdmin";
import ManageTable from "@/components/ManageTable";
import React from "react";

const TableManagement = () => {
  const [openCreateOrEdit, setOpenCreateOrEdit] = React.useState(false);
  const [openQR, setOpenQR] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [isEditing, setIsEditing] = React.useState(false);
  const [editDataTable, setEditDataTable] = React.useState(null);
  const onSubmit = () => {
    console.log("Handle create table logic here");
  };
  const onSubmitEdit = () => {
    console.log("Handle edit table logic here");
  };
  const contentBlock = "Nội dung ví dụ để tải xuống dưới dạng tệp văn bản.";
  const inputValue = "example_filename";
  const handleDownload = () => {
    // 1️⃣ Tạo blob từ nội dung
    const blob = new Blob([contentBlock], { type: "text/plain" });

    // 2️⃣ Tạo URL tạm thời cho blob
    const url = URL.createObjectURL(blob);

    // 3️⃣ Tạo thẻ <a> để mô phỏng hành động tải xuống
    const a = document.createElement("a");
    a.href = url;
    const filename = `${inputValue}.txt`;
    a.download = filename;

    // 4️⃣ Thêm vào DOM và click tự động
    document.body.appendChild(a);
    a.click();

    // 5️⃣ Dọn dẹp
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("Tải xuống thành công!");
  };
  return (
    <div>
      <div className="space-y-8">
        <HeaderContentAdmin
          onOpenChange={() => {
            setIsEditing(false);
            setEditDataTable(null);
            setOpenCreateOrEdit(true);
          }}
        />
        <ManageTable
          setOpenQRChange={setOpenQR}
          setOpenDeleteChange={setOpenDelete}
          onEdit={(table) => {
            setIsEditing(true);
            setEditDataTable(table);
            setOpenCreateOrEdit(true);
          }}
        />
        <DialogCreateOrEditTable
          open={openCreateOrEdit}
          onOpenChange={setOpenCreateOrEdit}
          isEditing={isEditing}
          editDataTable={editDataTable}
          onSubmit={onSubmit}
          onSubmitEdit={onSubmitEdit}
        />
        <DialogQR
          open={openQR}
          onOpenChange={setOpenQR}
          handleDownload={handleDownload}
        />
        <DialogDeleteTable open={openDelete} onOpenChange={setOpenDelete} />
      </div>
    </div>
  );
};

export default TableManagement;
