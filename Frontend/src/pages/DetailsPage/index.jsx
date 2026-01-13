import FoodDetails from "../../components/FoodDetails";
import { useState, useEffect } from "react";
import React from "react";
import { useParams } from "react-router-dom";
import { getMenuById } from "@/services/api/menu";
import { Loader2 } from "lucide-react";

const DetailsPage = () => {
  const { itemId } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItemDetails = async () => {
      try {
        setLoading(true);
        const response = await getMenuById(itemId);
        if (response.data && response.data.data) {
          setItem(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch menu item details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (itemId) {
      fetchItemDetails();
    }
  }, [itemId]);

  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!item) {
    return <div className="text-center py-10">Item not found</div>;
  }

  const totalPrice = (item.price || 0) * quantity;

  return (
    <div>
      <FoodDetails
        item={item}
        quantity={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default DetailsPage;
