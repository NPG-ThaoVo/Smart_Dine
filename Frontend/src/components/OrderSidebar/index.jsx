import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { ShoppingCart, X, Trash2, Plus, Minus } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { createOrder } from "@/services/api/order";
import { addOrderItems } from "@/services/api/orderItem";
import { useNavigate } from "react-router-dom";

export default function OrderSidebar({
  open,
  onOpenChange,
  cartItems = [],
  addToCart,
  removeFromCart,
  setCartItems,
  getTotalItems,
  getTotalPrice,
}) {
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNoteChange = (itemId, note) => {
    setNotes((prev) => ({ ...prev, [itemId]: note }));
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateVAT = () => {
    if (!getTotalPrice) return 0;
    return getTotalPrice() * 0.1;
  };

  const calculateTotal = () => {
    if (!getTotalPrice) return 0;
    return getTotalPrice() + calculateVAT();
  };

  const totalItems = getTotalItems
    ? getTotalItems()
    : cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = getTotalPrice
    ? getTotalPrice()
    : cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmitOrder = async () => {
    if (cartItems.length === 0) {
      console.log("⚠️ Giỏ hàng trống!");
      return;
    }

    try {
      setLoading(true);

      // Get tableId from localStorage (from QR scan or manual selection)
      const tableId = "695ea817fc00e87d2bc7a7b4";

      console.log("🔍 TableId from localStorage:", tableId);

      if (!tableId || tableId === "YOUR_ACTUAL_TABLE_ID") {
        console.log(
          "⚠️ TableId không hợp lệ! Cần scan QR hoặc chọn bàn trước."
        );
        alert("Vui lòng quét mã QR bàn hoặc chọn bàn trước khi đặt món!");
        setLoading(false);
        return;
      }

      // Step 1: Add order items to table (pending state)
      const orderItemsData = {
        tableId: tableId,
        orderItems: cartItems.map((item) => ({
          menuItemId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      console.log("📤 Sending order items:", orderItemsData);
      const orderItemsResponse = await addOrderItems(orderItemsData);
      console.log("✅ Order items added:", orderItemsResponse);

      // Step 2: Create order (backend will link pending items automatically)
      const orderData = {
        tableId: tableId,
        note: "", // General order note if needed
      };

      const orderResponse = await createOrder(orderData);

      if (orderResponse.data.success) {
        console.log("✅ Đặt món thành công!");

        // Clear old bill data from previous order
        localStorage.removeItem("currentBillId");

        // Save order info for ConfirmPage and BillingPage
        localStorage.setItem(
          "lastOrder",
          JSON.stringify({
            orderId: orderResponse.data.data._id,
            tableId: tableId,
            items: cartItems,
            notes: notes,
            totalPrice: totalPrice,
            totalItems: totalItems,
          })
        );

        // Clear cart and notes
        setCartItems([]);
        setNotes({});
        onOpenChange(false);

        // Navigate to confirm page
        navigate("/order/confirm");
      }
    } catch (error) {
      console.error("❌ Error creating order:", error);
      console.error(
        "Error details:",
        error.response?.data?.message || "Có lỗi xảy ra khi đặt món!"
      );
      alert(error.response?.data?.message || "Có lỗi xảy ra khi đặt món!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="
          w-3/4 sm:max-w-sm
          bg-white
          border-l border-border/30
          shadow-xl
          p-6
          flex flex-col
          gap-4
        "
      >
        {/* Header */}
        <SheetHeader className="text-center sm:text-left">
          <SheetTitle className="flex items-center gap-2 text-lg font-semibold">
            <ShoppingCart className="h-5 w-5" />
            Giỏ hàng ({totalItems} món)
          </SheetTitle>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-auto py-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
              <p className="text-muted-foreground">Giỏ hàng trống</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-gray-100 rounded-lg p-3">
                  {/* Item header */}
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.price.toLocaleString()}&nbsp;₫
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-destructive"
                      onClick={() => handleRemoveItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-md w-8 h-8"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="rounded-md w-8 h-8"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                    <span className="ml-auto font-medium">
                      {(item.price * item.quantity).toLocaleString()}&nbsp;₫
                    </span>
                  </div>

                  {/* Notes input */}
                  <Input
                    className="mt-2 text-sm"
                    placeholder="Ghi chú (VD: ít cay, không hành...)"
                    value={notes[item.id] || ""}
                    onChange={(e) => handleNoteChange(item.id, e.target.value)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Order summary */}
        {cartItems.length > 0 && (
          <div className="flex flex-col gap-4 border-t pt-4">
            <div className="w-full space-y-2">
              <div className="flex justify-between text-sm">
                <span>Tạm tính</span>
                <span>{totalPrice.toLocaleString()}&nbsp;₫</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>VAT (10%)</span>
                <span>{calculateVAT().toLocaleString()}&nbsp;₫</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng</span>
                <span className="text-primary">
                  {calculateTotal().toLocaleString()}&nbsp;₫
                </span>
              </div>
            </div>
            <Button
              className="w-full"
              onClick={handleSubmitOrder}
              disabled={loading}
            >
              {loading ? "Đang gửi..." : "Gửi order"}
            </Button>
          </div>
        )}

        {/* Close button */}
        <SheetClose
          className="
            absolute right-4 top-4
            rounded-sm
            opacity-70
            transition-opacity
            hover:opacity-100
            focus:outline-none
            focus:ring-2
            focus:ring-ring
            focus:ring-offset-2
          "
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
