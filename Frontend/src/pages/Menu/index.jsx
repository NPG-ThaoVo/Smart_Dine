import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeaderMenu from "@/components/HeaderMenu";
import FoodCard from "@/components/FoodCard";
import OrderSidebar from "@/components/OrderSidebar";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { getAllMenu } from "@/services/api/menu";

function Menu() {
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH MENU ================= */
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await getAllMenu();
        const items = res.data.data.items.map((item) => ({
          id: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          available: item.isAvailable,
          categoryId: item.categoryId?._id,
          categoryName: item.categoryId?.name,
        }));
        setMenuData(items);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  /* ================= GROUP BY CATEGORY ================= */
  const menuByCategory = menuData.reduce((acc, item) => {
    if (!acc[item.categoryId]) {
      acc[item.categoryId] = {
        name: item.categoryName,
        items: [],
      };
    }
    acc[item.categoryId].items.push(item);
    return acc;
  }, {});

  /* ================= CART LOGIC ================= */
  const addToCart = (item) => {
    const existing = cartItems.find((i) => i.id === item.id);

    if (existing) {
      setCartItems(
        cartItems.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    const existing = cartItems.find((i) => i.id === itemId);
    if (!existing) return;

    if (existing.quantity === 1) {
      setCartItems(cartItems.filter((i) => i.id !== itemId));
    } else {
      setCartItems(
        cartItems.map((i) =>
          i.id === itemId ? { ...i, quantity: i.quantity - 1 } : i
        )
      );
    }
  };

  const getItemQuantity = (id) =>
    cartItems.find((i) => i.id === id)?.quantity || 0;

  const getTotalItems = () => cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const getTotalPrice = () =>
    cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen gradient-bg pb-24">
      <HeaderMenu />

      <main className="px-3 md:px-4 py-4 md:py-6">
        {loading && <div>Đang tải menu...</div>}

        {!loading &&
          Object.entries(menuByCategory).map(([categoryId, category]) => (
            <section key={categoryId} className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black">{category.name}</h2>
                <span className="text-sm text-muted-foreground">
                  {category.items.length} món
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {category.items.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    quantity={getItemQuantity(item.id)}
                    onAdd={() => addToCart(item)}
                    onRemove={() => removeFromCart(item.id)}
                    onClick={() => navigate(`/order/1/item/${item.id}`)}
                  />
                ))}
              </div>
            </section>
          ))}
      </main>

      {getTotalItems() > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t">
          <Button className="w-full" onClick={() => setSidebarOpen(true)}>
            <ShoppingCart className="mr-2" />
            Xem giỏ hàng ({getTotalItems()}) –{" "}
            {getTotalPrice().toLocaleString()} ₫
          </Button>
        </div>
      )}

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
    </div>
  );
}

export default Menu;
