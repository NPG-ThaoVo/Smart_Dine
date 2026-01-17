import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import HeaderMenu from "@/components/HeaderMenu";
import FoodCard from "@/components/FoodCard";
import OrderSidebar from "@/components/OrderSidebar";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { getAllMenu } from "@/services/api/menu";

function Menu() {
  const tableId = useParams().tableId;
  const navigate = useNavigate();
  const [menuData, setMenuData] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  /* ================= FETCH MENU ================= */
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await getAllMenu();

        // Debug: check response structure
        console.log("API Response:", res.data);

        const items = res.data?.data?.items.map((item) => ({
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
        console.error("Error fetching menu:", err);
        console.error("Response:", err.response?.data);
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
  // Initialize cart from localStorage immediately to prevent overwriting with empty array
  const [cartItems, setCartItems] = useState(() => {
    const currentTableId = tableId || "1";
    try {
      const saved = localStorage.getItem(`/order/${currentTableId}`);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Error parsing cart items:", error);
      return [];
    }
  });

  // Save to localStorage when cartItems changes
  useEffect(() => {
    const currentTableId = tableId || "1";
    localStorage.setItem(`/order/${currentTableId}`, JSON.stringify(cartItems));
  }, [cartItems, tableId]);

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

  /* ================= CHECK IF ORDER EXISTS ================= */
  const [hasOrder, setHasOrder] = useState(false);

  useEffect(() => {
    const checkOrder = () => {
      const lastOrder = localStorage.getItem("lastOrder");
      setHasOrder(lastOrder !== null);
    };
    checkOrder();
  }, [sidebarOpen]);

  /* ================= RENDER ================= */
  return (
    <div className="min-h-screen gradient-bg pb-24">
      <HeaderMenu hasOrder={hasOrder} />

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
                  tableId={tableId}
                    key={item.id}
                    item={item}
                    quantity={getItemQuantity(item.id)}
                    onAdd={() => addToCart(item)}
                    onRemove={() => removeFromCart(item.id)}
                    onViewDetails={() => navigate(`/order/${tableId}/item/${item.id}`)}
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
