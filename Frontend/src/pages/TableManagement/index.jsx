import { DialogCreateOrEditTable } from "@/components/DialogCreateOrEditTable";
import { DialogDeleteConfirm } from "@/components/DialogDeleteTable";
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
  const handleDownload = () => {
    console.log("Handle download QR code logic here");
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
        <DialogDeleteConfirm
          open={openDelete}
          onOpenChange={setOpenDelete}
          title="Xoá Bàn"
          description="Bạn có chắc chắn muốn xóa bàn này? Hành động này không thể hoàn tác."
          confirmText="Xoá"
          onConfirm={() => {
            setOpenDelete(false);
          }}
        />
      </div>
    </div>
  );
};

export default TableManagement;
