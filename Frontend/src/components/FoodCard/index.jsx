import { Button } from "../ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import OrderSidebar from "../OrderSidebar";

const FoodCard = () => {
  return (
    <>
      <main className="px-3 md:px-4 py-4 md:py-6 pb-24">
        {/* Appetizers */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-2xl font-black text-foreground">Khai vị</h2>
            <span className="text-sm text-muted-foreground">
              {menuData.appetizers.length} món
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {menuData.appetizers.map(renderFoodCard)}
          </div>
        </section>

        {/* Main course */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-2xl font-black text-foreground">Món chính</h2>
            <span className="text-sm text-muted-foreground">
              {menuData.mainCourse.length} món
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {menuData.mainCourse.map(renderFoodCard)}
          </div>
        </section>

        {/* Drinks */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-2xl font-black text-foreground">Đồ uống</h2>
            <span className="text-sm text-muted-foreground">
              {menuData.drinks.length} món
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {menuData.drinks.map(renderFoodCard)}
          </div>
        </section>

        {/* Desserts */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4 px-1">
            <h2 className="text-2xl font-black text-foreground">Tráng miệng</h2>
            <span className="text-sm text-muted-foreground">
              {menuData.dessert.length} món
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {menuData.dessert.map(renderFoodCard)}
          </div>
        </section>
      </main>

      {/* Bottom Cart Button */}
      {getTotalItems() > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 p-3 md:p-4 
                        bg-background border-t z-50"
        >
          <Button
            className="w-full py-5 md:py-6 text-sm md:text-lg"
            size="lg"
            onClick={() => setSidebarOpen(true)}
          >
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            Xem giỏ hàng ({getTotalItems()}) -{" "}
            {getTotalPrice().toLocaleString()}&nbsp;₫
          </Button>
        </div>
      )}

      {/* Order Sidebar */}
      <OrderSidebar
        open={sidebarOpen}
        onOpenChange={setSidebarOpen}
        cartItems={cartItems}
        addToCart={addToCart}
        removeFromCart={removeFromCart}
        setCartItems={setCartItems}
        getTotalItems={getTotalItems}
        getTotalPrice={getTotalPrice}
      />
    </>
  );
};

export default FoodCard;
