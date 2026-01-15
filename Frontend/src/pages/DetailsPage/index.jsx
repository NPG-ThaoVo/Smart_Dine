import FoodDetails from "../../components/FoodDetails";
import { useState, useEffect } from "react";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getMenuById } from "../../services/api/menu";

const DetailsPage = () => {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

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
    if (item) {
      console.log("Add to cart:", item, quantity);
      navigate(-1);
    }
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
        <button onClick={handleBack} className="text-primary hover:underline">Quay lại</button>
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
      />
    </div>
  );
};

export default DetailsPage;
