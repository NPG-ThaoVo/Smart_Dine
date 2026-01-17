import FoodDetails from "../../components/FoodDetails";
import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuById } from "../../services/api/menu";
import toast from "react-hot-toast";

const DetailsPage = () => {
  const { itemId, tableId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const res = await getMenuById(itemId);
        const data = res.data.data;
        if (data) {
          setItem({
            ...data,
            id: data._id,
            available: data.isAvailable,
            categoryName: data.categoryId?.name,
          });
        }
      } catch (error) {
        console.error("Failed to fetch menu item:", error);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItem();
    }
  }, [itemId]);

  useEffect(() => {
    const currentTableId = tableId || "1";
    const savedCart = JSON.parse(localStorage.getItem(`/order/${currentTableId}`)) || [];
    setCartItems(savedCart);
  }, [tableId]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  const itemPrice = item?.price || 0;
  const totalPrice = itemPrice * quantity;

  const handleBack = () => {
    navigate(-1);
  };

  const handleAddToCart = () => {
    const currentTableId = tableId || "1";
    const existingCart = JSON.parse(localStorage.getItem(`/order/${currentTableId}`)) || [];
    const existingItemIndex = existingCart.findIndex(
      (cartItem) => cartItem.id === item.id,
    );
    if (existingItemIndex !== -1) {
      existingCart[existingItemIndex].quantity += quantity;
    } else {
      existingCart.push({ ...item, quantity });
    }
    localStorage.setItem(`/order/${currentTableId}`, JSON.stringify(existingCart));
    navigate(`/order/${currentTableId}`);
    toast.success("Thêm vào giỏ hàng thành công!");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4">
        <p className="text-lg text-muted-foreground">Không tìm thấy món ăn</p>
        <button onClick={handleBack} className="text-primary hover:underline">
          Quay lại
        </button>
      </div>
    );
  }

  return (
    <div>
      <FoodDetails
        item={item}
        quantity={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        totalPrice={totalPrice}
        onBack={handleBack}
        onAddToCart={handleAddToCart}
        cartItems={cartItems}
      />
    </div>
  );
};

export default DetailsPage;
