import { Button } from "../ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import OrderSidebar from "../OrderSidebar";

const FoodCard = () => {
  const [cartItems, setCartItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Data for categories
  const menuData = {
    appetizers: [
      {
        id: 1,
        name: "Gỏi cuốn tôm thịt",
        price: 45000,
        image:
          "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=800&fit=crop",
        available: true,
      },
      {
        id: 2,
        name: "Chả giò Sài Gòn",
        price: 55000,
        image:
          "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&h=800&fit=crop",
        available: true,
      },
    ],
    mainCourse: [
      {
        id: 3,
        name: "Phở bò tái",
        price: 75000,
        image:
          "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=800&fit=crop",
        available: true,
      },
      {
        id: 4,
        name: "Bún chả Hà Nội",
        price: 70000,
        image:
          "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=800&fit=crop",
        available: true,
      },
      {
        id: 5,
        name: "Cơm sườn bì chả",
        price: 65000,
        image:
          "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=800&fit=crop",
        available: false,
      },
    ],
    drinks: [
      {
        id: 6,
        name: "Trà đá",
        price: 10000,
        image:
          "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=800&fit=crop",
        available: true,
      },
      {
        id: 7,
        name: "Cà phê sữa đá",
        price: 35000,
        image:
          "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop",
        available: true,
      },
      {
        id: 8,
        name: "Nước dừa tươi",
        price: 30000,
        image:
          "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=800&fit=crop",
        available: true,
      },
    ],
    dessert: [
      {
        id: 9,
        name: "Chè ba màu",
        price: 25000,
        image:
          "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop",
        available: true,
      },
      {
        id: 10,
        name: "Bánh flan",
        price: 20000,
        image:
          "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=800&fit=crop",
        available: true,
      },
    ],
  };

  // Function to add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  // Function to decrease quantity or remove item
  const removeFromCart = (itemId) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === itemId);
    if (!existingItem) return;
    if (existingItem.quantity === 1) {
      setCartItems(cartItems.filter((cartItem) => cartItem.id !== itemId));
    } else {
      setCartItems(
        cartItems.map((cartItem) =>
          cartItem.id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        )
      );
    }
  };

  // Get item quantity in cart
  const getItemQuantity = (itemId) => {
    const item = cartItems.find((cartItem) => cartItem.id === itemId);
    return item ? item.quantity : 0;
  };

  // Calculate total items and total price
  const getTotalItems = () =>
    cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const getTotalPrice = () =>
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // Render food card
  const renderFoodCard = (item) => {
    const quantity = getItemQuantity(item.id);
    const isSelected = quantity > 0;

    return (
      <div
        key={item.id}
        className={`group relative flex flex-col rounded-3xl overflow-hidden cursor-pointer
                   bg-card border-2 transition-all duration-300
                   ${!item.available ? "opacity-60" : ""}
                   ${
                     isSelected
                       ? "border-primary shadow-lg shadow-primary/20"
                       : "border-border hover:border-primary/50 hover:shadow-md"
                   }`}
      >
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover
                       transition-transform duration-500
                       group-hover:scale-110"
          />

          {/* Quantity badge when added */}
          {isSelected && (
            <div className="absolute top-2 right-2 z-20">
              <div
                className="w-6 h-6 rounded-full bg-primary text-primary-foreground 
                              flex items-center justify-center font-bold text-sm 
                              shadow-lg ring-4 ring-background"
              >
                {quantity}
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
                    size="icon"
                    className="h-9 w-9 rounded-full bg-primary text-primary-foreground
                               shadow-lg shadow-primary/30
                               hover:bg-primary/90
                               hover:scale-110 transition-transform"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="w-4 h-4" />
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
