import { DialogCreateOrEditTable } from "@/components/DialogCreateOrEditTable";
import { DialogDeleteTable } from "@/components/DialogDeleteTable";
import { DialogQR } from "@/components/DialogQR";
import HeaderContentAdmin from "@/components/HeaderContentAdmin";
import ManageTable from "@/components/ManageTable";
import React from "react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { getAllTables } from "@/services/api/tables";

const TableManagement = () => {
  const [openCreateOrEdit, setOpenCreateOrEdit] = React.useState(false);
  const [openQR, setOpenQR] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [isEditing, setIsEditing] = React.useState(false);
  const [editDataTable, setEditDataTable] = React.useState(null);

  const [tables, setTables] = useState([]);
  const [qrTable, setQrTable] = useState(null);

  const getAllTable = async () => {
    const res = await getAllTables();
    console.log("🚀 ~ getAllTable ~ res:", res);
    setTables(res.data);
  };
  useEffect(() => {
    getAllTable();
  }, []);
  const onSubmit = () => {
    console.log("Handle create table logic here");
  };
  const onSubmitEdit = () => {
    console.log("Handle edit table logic here");
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
          tables={tables}
          setOpenQRChange={setOpenQR}
          setOpenDeleteChange={setOpenDelete}
          onViewQR={(table) => {
            setQrTable(table);
            setOpenQR(true);
          }}
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
          table={qrTable}
        />
        <DialogDeleteTable open={openDelete} onOpenChange={setOpenDelete} />
      </div>
    </div>
  );
};

export default TableManagement;
