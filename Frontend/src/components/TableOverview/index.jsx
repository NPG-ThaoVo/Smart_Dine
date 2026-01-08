import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tables = [
  { id: 1, status: "empty" },
  { id: 2, status: "occupied" },
  { id: 3, status: "empty" },
  { id: 4, status: "empty" },
  { id: 5, status: "occupied" },
  { id: 6, status: "empty" },
  { id: 7, status: "empty" },
  { id: 8, status: "empty" },
];

export function TableOverview() {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Sơ đồ bàn</CardTitle>
          <CardDescription>Trạng thái phục vụ trực tiếp</CardDescription>
        </div>

        <div className="flex gap-2">
          <Badge variant="outline" className="text-emerald-600">
            Trống
          </Badge>
          <Badge variant="outline" className="text-rose-600">
            Có khách
          </Badge>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {tables.map((table) => (
            <div
              key={table.id}
              className={cn(
                "relative flex aspect-square flex-col items-center justify-center rounded-2xl border cursor-pointer transition",
                table.status === "empty"
                  ? "bg-emerald-500/5 text-emerald-600"
                  : "bg-rose-500/5 text-rose-600"
              )}
            >
              <span className="text-3xl font-bold">{table.id}</span>
              <span className="text-xs text-muted-foreground">BÀN</span>

              <span
                className={cn(
                  "absolute top-3 right-3 h-2 w-2 rounded-full",
                  table.status === "empty" ? "bg-emerald-500" : "bg-rose-500"
                )}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
export default TableOverview;
