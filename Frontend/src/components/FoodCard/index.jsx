import { Button } from "../ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import OrderSidebar from "../OrderSidebar";

const FoodCard = () => {
  return (
    // Main Content
    <main className="px-3 md:px-4 py-4 md:py-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4 px-1">
          <h2 className="text-2xl font-black text-foreground">Khai vị</h2>
          <span className="text-sm text-muted-foreground">2 món</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="group relative flex flex-col rounded-3xl transition-all duration-300 overflow-hidden cursor-pointer bg-card border-2 border-border hover:border-[#e9560c] hover:shadow-md">
            <div className="relative aspect-square w-full overflow-hidden bg-muted">
              <img
                src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&amp;h=800&amp;fit=crop"
                alt="Gỏi cuốn tôm thịt"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h3 className="font-bold text-base text-foreground line-clamp-2 mb-1 leading-tight">
                Gỏi cuốn tôm thịt
              </h3>
              <div className="flex items-center justify-between mt-auto pt-2">
                <div className="flex flex-col">
                  <span className="font-black text-xl text-[#e9560c]">
                    45.000&nbsp;₫
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 text-[#e9560c]-foreground h-9 w-9 rounded-full bg-[#e9560c] hover:bg-[#e9560c]/90 shadow-lg shadow-[#e9560c]/30 hover:scale-110 transition-transform">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus w-4 h-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Out of stock overlay */}
          {!item.available && (
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm 
                            flex items-center justify-center"
            >
              <Badge variant="destructive" className="bg-rose-500">
                Hết hàng
              </Badge>
            </div>
          )}
        </div>

        <div className="p-3 flex flex-col flex-1">
          <h3 className="font-bold text-base text-foreground line-clamp-2 mb-1 leading-tight">
            {item.name}
          </h3>

          <div className="flex items-center justify-between mt-auto pt-2">
            <div className="flex flex-col">
              <span className="font-black text-xl text-primary">
                {item.price.toLocaleString()}&nbsp;₫
              </span>
            </div>

            {/* Action buttons */}
            {item.available && (
              <div className="flex items-center gap-1.5">
                {isSelected ? (
                  <>
                    {/* Decrease button */}
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-8 w-8 rounded-full border-primary/30"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </Button>

                    {/* Increase button */}
                    <Button
                      size="icon"
                      className="h-8 w-8 rounded-full bg-primary hover:bg-primary/90 
                                 text-primary-foreground shadow-md"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </Button>
                  </>
                ) : (
                  /* Add button */
                  <Button
                    className="
    inline-flex items-center justify-center
    h-9 w-9 rounded-full
    bg-[#e9560c] hover:bg-[#e9560c]
    text-white
    shadow-lg shadow-[#e9560c]/30
    hover:scale-110 transition-transform
  "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-plus w-4 h-4"
                    >
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

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
