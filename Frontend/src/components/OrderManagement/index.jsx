import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, ChefHat, X, CheckCircle2 } from "lucide-react";

export default function OrderManagement() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
      <Tabs
        defaultValue="pending"
        className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0"
      >
        <TabsList className="inline-flex h-auto items-center justify-start rounded-full bg-gray-200 gap-1 shadow-md transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg ">
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-600 data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 rounded-full  py-2 font-medium"
          >
            Chờ xác nhận (1)
          </TabsTrigger>
          <TabsTrigger
            value="processing"
            className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-600 data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 rounded-full  py-2 font-medium"
          >
            Đang xử lý (0)
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-600 data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 rounded-full py-2 font-medium"
          >
            Hoàn thành (2)
          </TabsTrigger>
        </TabsList>
        {/* TAB: CHỜ XÁC NHẬN */}
        <TabsContent value="pending" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-amber-500/30 bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <p className="font-bold">Bàn 5</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      19:35
                    </div>
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className="bg-amber-500/10 text-amber-500"
                >
                  Chờ xác nhận
                </Badge>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-red-500">
                    1
                  </span>
                  <span className="font-semibold">Chả giò Sài Gòn</span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-amber-500 hover:bg-amber-600 text-white gap-2">
                  <ChefHat className="w-4 h-4" />
                  Xác nhận
                </Button>
                <Button variant="outline" size="icon">
                  <X className="w-4 h-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* TAB: ĐANG XỬ LÝ */}
        <TabsContent value="processing" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-500/30 bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold">
                    5
                  </div>
                  <div>
                    <p className="font-bold">Bàn 5</p>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      18:55
                    </div>
                  </div>
                </div>

                <Badge
                  variant="secondary"
                  className="bg-blue-100 text-blue-600 uppercase text-xs font-bold"
                >
                  Đang nấu
                </Badge>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-orange-500">
                    2
                  </span>
                  <span className="font-semibold">Bún chả Hà Nội</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-orange-500">
                    2
                  </span>
                  <span className="font-semibold">Cà phê sữa đá</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-orange-500">
                    1
                  </span>
                  <span className="font-semibold">Chè ba màu</span>
                </div>
              </CardContent>

              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-orange-600 hover:bg-orange-700 text-white gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Hoàn thành
                </Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
        {/* TAB: HOÀN THÀNH */}
        <TabsContent value="completed" className="mt-4"> 
          <div className="flex flex-col gap-6 ">
            <Card
              className=" bg-white h-36 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl "
            >
              <div className="flex flex-row items-start justify-between px-6">
                <div className="space-y-1">
                  <p className="font-bold text-xl">Bàn 2</p>
                  <p className="text-sm text-muted-foreground">
                    2 món - 165.000 đ
                  </p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-orange-100 text-orange-600 uppercase text-xs font-bold px-3 py-1"
                >
                  Hoàn thành
                </Badge>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
