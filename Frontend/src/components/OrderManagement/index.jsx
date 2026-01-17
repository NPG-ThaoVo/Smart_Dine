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
import { Spinner } from "@/components/ui/spinner";

export default function OrderManagement({
  orders,
  getOrderDetail,
  updateOrderStatus,
  loading = false,
}) {
  // Đảm bảo orders là array
  const orderList = Array.isArray(orders) ? orders : [];

  // Lọc đơn hàng theo trạng thái
  const pendingOrders = orderList.filter((order) => order.status === "PENDING");
  const processingOrders = orderList.filter(
    (order) => order.status === "CONFIRMED"
  );
  const completedOrders = orderList.filter(
    (order) => order.status === "COMPLETED"
  );

  // Hàm format thời gian
  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Hàm xử lý xác nhận đơn
  const handleConfirm = async (orderId) => {
    await updateOrderStatus(orderId, "CONFIRMED");
  };

  // Hàm xử lý hủy đơn
  const handleCancel = async (orderId) => {
    await updateOrderStatus(orderId, "CANCELLED");
  };

  // Hàm xử lý hoàn thành đơn
  const handleComplete = async (orderId) => {
    await updateOrderStatus(orderId, "COMPLETED");
  };

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Quản lý đơn hàng</h1>
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner className="w-8 h-8" />
        </div>
      ) : (
      <Tabs
        defaultValue="pending"
        className="overflow-x-auto -mx-4 px-4 md:mx-0 md:px-0"
      >
        <TabsList className="inline-flex h-auto items-center justify-start rounded-full bg-gray-200 gap-1 shadow-md transition-transform duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg ">
          <TabsTrigger
            value="pending"
            className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-600 data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 rounded-full  py-2 font-medium"
          >
            Chờ xác nhận ({pendingOrders.length})
          </TabsTrigger>
          <TabsTrigger
            value="processing"
            className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-600 data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 rounded-full  py-2 font-medium"
          >
            Đang xử lý ({processingOrders.length})
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            className="data-[state=active]:bg-orange-200 data-[state=active]:text-orange-600 data-[state=inactive]:bg-transparent data-[state=inactive]:text-gray-600 rounded-full py-2 font-medium"
          >
            Hoàn thành ({completedOrders.length})
          </TabsTrigger>
        </TabsList>
        {/* TAB: CHỜ XÁC NHẬN */}
        <TabsContent value="pending" className="mt-4">
          {pendingOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pendingOrders.map((order) => (
                <Card key={order._id} className="border-amber-500/30 bg-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-500 flex items-center justify-center font-bold">
                        {order.tableId?.number || "?"}
                      </div>
                      <div>
                        <p className="font-bold">
                          Bàn {order.tableId?.number || "?"}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTime(order.createdAt)}
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
                    {order.orderItems?.map((item) => (
                      <div key={item._id} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-red-500">
                          {item.quantity}
                        </span>
                        <span className="font-semibold">
                          {item.menuItemId?.name || "Món ăn"}
                        </span>
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter className="flex gap-2">
                    <Button
                      className="flex-1 bg-amber-500 hover:bg-amber-600 text-white gap-2"
                      onClick={() => handleConfirm(order._id)}
                    >
                      <ChefHat className="w-4 h-4" />
                      Xác nhận
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleCancel(order._id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card border-dashed border-white/10 bg-white/5">
              <div className="p-6 py-12 text-center flex flex-col items-center justify-center bg-white shadow-md rounded-xl">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Không có đơn hàng nào
                </h3>
                <p className="text-sm text-muted-foreground">
                  Các đơn hàng mới sẽ xuất hiện tại đây
                </p>
              </div>
            </div>
          )}
        </TabsContent>

        {/* TAB: ĐANG XỬ LÝ */}
        <TabsContent value="processing" className="mt-4">
          {processingOrders.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {processingOrders.map((order) => (
                <Card key={order._id} className="border-blue-500/30 bg-white">
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-500 flex items-center justify-center font-bold">
                        {order.tableId?.number || "?"}
                      </div>
                      <div>
                        <p className="font-bold">
                          Bàn {order.tableId?.number || "?"}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {formatTime(order.createdAt)}
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
                    {order.orderItems?.map((item) => (
                      <div key={item._id} className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-muted flex items-center justify-center text-xs font-bold text-orange-500">
                          {item.quantity}
                        </span>
                        <span className="font-semibold">
                          {item.menuItemId?.name || "Món ăn"}
                        </span>
                      </div>
                    ))}
                  </CardContent>

                  <CardFooter className="flex gap-2">
                    <Button
                      className="flex-1 bg-orange-600 hover:bg-orange-700 text-white gap-2"
                      onClick={() => handleComplete(order._id)}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      Hoàn thành
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card border-dashed border-white/10 bg-white/5">
              <div className="p-6 py-12 text-center flex flex-col items-center justify-center bg-white shadow-md rounded-xl">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Không có đơn hàng nào
                </h3>
                <p className="text-sm text-muted-foreground">
                  Các đơn hàng mới sẽ xuất hiện tại đây
                </p>
              </div>
            </div>
          )}
        </TabsContent>
        {/* TAB: HOÀN THÀNH */}
        <TabsContent value="completed" className="mt-4">
          {completedOrders.length > 0 ? (
            <div className="flex flex-col gap-6">
              {completedOrders.map((order) => {
                const totalItems =
                  order.orderItems?.reduce(
                    (sum, item) => sum + item.quantity,
                    0
                  ) || 0;
                const totalPrice =
                  order.orderItems?.reduce(
                    (sum, item) => sum + item.price * item.quantity,
                    0
                  ) || 0;

                return (
                  <Card
                    key={order._id}
                    className="bg-white h-36 shadow-md transition-transform duration-300 ease-out hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex flex-row items-start justify-between px-6">
                      <div className="space-y-1">
                        <p className="font-bold text-xl">
                          Bàn {order.tableId?.number || "?"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {totalItems} món -{" "}
                          {totalPrice.toLocaleString("vi-VN")} đ
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
                );
              })}
            </div>
          ) : (
          <div className="rounded-xl border text-card-foreground backdrop-blur-xl shadow-md transition-all duration-300 hover:shadow-lg hover:border-border/50 glass-card border-dashed border-white/10 bg-white/5">
              <div className="p-6 py-12 text-center flex flex-col items-center justify-center bg-white shadow-md rounded-xl">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                  <Clock className="w-8 h-8 text-muted-foreground/30" />
                </div>
                <h3 className="text-lg font-medium text-foreground mb-1">
                  Không có đơn hàng nào
                </h3>
                <p className="text-sm text-muted-foreground">
                  Các đơn hàng mới sẽ xuất hiện tại đây
                </p>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
      )}
    </main>
  );
}
