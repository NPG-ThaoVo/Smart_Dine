import { useEffect, useState } from "react";
import { getAllTables } from "@/services/api/tables";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TableSelector() {
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(
    localStorage.getItem("tableId") || ""
  );

  useEffect(() => {
    const fetchTables = async () => {
      try {
        const res = await getAllTables();
        const tablesData = res.data?.data?.tables || res.data?.data || [];
        setTables(tablesData);
      } catch (err) {
        console.error("Error fetching tables:", err);
      }
    };
    fetchTables();
  }, []);

  const handleSelectTable = (tableId) => {
    setSelectedTable(tableId);
    localStorage.setItem("tableId", tableId);
    console.log("✅ TableId set:", tableId);
  };

  const currentTableId = localStorage.getItem("tableId");
  const currentTable = tables.find((t) => t._id === currentTableId);

  return (
    <div className="fixed top-4 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <div className="text-sm font-semibold mb-2">🧪 TEST MODE</div>

      {currentTable ? (
        <div className="mb-2">
          <div className="text-xs text-gray-500">Bàn hiện tại:</div>
          <div className="font-bold text-green-600">
            {currentTable.name || `Bàn ${currentTable.number}`}
          </div>
          <div className="text-xs text-gray-400 font-mono">
            ID: {currentTableId.slice(-8)}
          </div>
        </div>
      ) : (
        <div className="mb-2 text-red-500 text-sm">⚠️ Chưa chọn bàn</div>
      )}

      <Select value={selectedTable} onValueChange={handleSelectTable}>
        <SelectTrigger className="w-[200px]">
          <SelectValue placeholder="Chọn bàn test" />
        </SelectTrigger>
        <SelectContent>
          {tables.map((table) => (
            <SelectItem key={table._id} value={table._id}>
              {table.name || `Bàn ${table.number}`}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button
        variant="outline"
        size="sm"
        className="w-full mt-2"
        onClick={() => {
          localStorage.removeItem("tableId");
          setSelectedTable("");
          console.log("🗑️ TableId cleared");
          window.location.reload();
        }}
      >
        Clear TableId
      </Button>
    </div>
  );
}
