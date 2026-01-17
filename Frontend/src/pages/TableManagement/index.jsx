import { DialogCreateOrEditTable } from "@/components/DialogCreateOrEditTable";
import { DialogDeleteConfirm } from "@/components/DialogDeleteConfirm";
import { DialogQR } from "@/components/DialogQR";
import HeaderContentAdmin from "@/components/HeaderContentAdmin";
import ManageTable from "@/components/ManageTable";
import React from "react";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  getAllTables,
  createTable,
  updateTable,
  deleteTable,
} from "@/services/api/tables";

const TableManagement = () => {
  const [loading, setLoading] = useState(false);

  const [openCreateOrEdit, setOpenCreateOrEdit] = React.useState(false);
  const [openQR, setOpenQR] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [isEditing, setIsEditing] = React.useState(false);
  const [editDataTable, setEditDataTable] = React.useState(null);

  const [tables, setTables] = useState([]);
  const [qrTable, setQrTable] = useState(null);

  const [deleteTableData, setDeleteTableData] = useState(null);
  const [search, setSearch] = useState("");

  const filteredTables = tables.filter((table) => {
    const keyword = search.toLowerCase().trim();

    return (
      table.number?.toString().includes(keyword) ||
      table.name?.toLowerCase().includes(keyword)
    );
  });

  const getAllTable = async () => {
    try {
      setLoading(true);
      const res = await getAllTables();
      setTables(res.data || []);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Không thể tải danh sách bàn"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTable = async () => {
    try {
      setLoading(true);
      const res = await deleteTable(deleteTableData._id);
      toast.success(res.message || "Xoá Bàn Thành Công");
      setOpenDelete(false);
      setDeleteTableData(null);
      getAllTable();
    } catch (error) {
      toast.error(error.response?.data?.message || "Xoá Bàn Thất Bại");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTable = async (tableId, tableData) => {
    const { number, name } = tableData;
    if (!number) {
      toast.error("Số Bàn Không Được Để Trống");
      return;
    }

    if (isNaN(number) || Number(number) <= 0) {
      toast.error("Số Bàn Phải Là Số Dương");
      return;
    }
    try {
      setLoading(true);
      const res = await updateTable(tableId, {
        number: Number(number),
        name,
      });
      toast.success(res.message || "Cập Nhật Bàn Thành Công");
      setOpenCreateOrEdit(false);
      getAllTable();
    } catch (error) {
      toast.error(error.response?.data?.message || "Cập Nhật Bàn Thất Bại");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTable = async (tableData) => {
    const { number, name } = tableData;

    if (!number) {
      toast.error("Số Bàn Không Được Để Trống");
      return;
    }

    if (isNaN(number) || Number(number) <= 0) {
      toast.error("Số Bàn Phải Là Số Dương");
      return;
    }

    const isDuplicate = tables.some((t) => String(t.number) === String(number));
    if (isDuplicate) {
      toast.error("Số Bàn Đã Tồn Tại");
      return;
    }

    try {
      setLoading(true);
      const res = await createTable({
        number: Number(number),
        name,
      });
      toast.success(res.message || "Tạo Bàn Thành Công");
      setOpenCreateOrEdit(false);
      getAllTable();
    } catch (error) {
      toast.error(error.response?.data?.message || "Tạo Bàn Thất Bại");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllTable();
  }, []);
  return (
    <div>
      <div className="space-y-8">
        <HeaderContentAdmin
          onOpenChange={() => {
            setIsEditing(false);
            setEditDataTable(null);
            setOpenCreateOrEdit(true);
          }}
          search={search}
          onSearchChange={setSearch}
          total={tables.length}
          busy={tables.filter((t) => !t.isAvailable).length}
        />
        <ManageTable
          tables={filteredTables}
          loading={loading}
          setOpenQRChange={setOpenQR}
          onViewQR={(table) => {
            setQrTable(table);
            setOpenQR(true);
          }}
          onEdit={(table) => {
            setIsEditing(true);
            setEditDataTable(table);
            setOpenCreateOrEdit(true);
          }}
          onDelete={(table) => {
            setDeleteTableData(table);
            setOpenDelete(true);
          }}
        />
        <DialogCreateOrEditTable
          open={openCreateOrEdit}
          onOpenChange={setOpenCreateOrEdit}
          isEditing={isEditing}
          editDataTable={editDataTable}
          onSubmit={handleCreateTable}
          onSubmitEdit={handleUpdateTable}
        />
        <DialogQR open={openQR} onOpenChange={setOpenQR} table={qrTable} />
        {/* <DialogDeleteTable
          open={openDelete}
          onOpenChange={setOpenDelete}
          handleDeleteTable={handleDeleteTable}
        /> */}
        <DialogDeleteConfirm
          open={openDelete}
          onOpenChange={setOpenDelete}
          title="Xoá Bàn"
          description="Bạn có chắc chắn muốn xóa bàn này? Hành động này không thể hoàn tác."
          confirmText="Xoá"
          onConfirm={handleDeleteTable}
        />
      </div>
    </div>
  );
};

export default TableManagement;
