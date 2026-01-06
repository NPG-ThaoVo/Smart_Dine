import FoodDetails from "../../components/FoodDetails";
import { useState } from "react";
import React from "react";

const DetailsPage = () => {
  const [quantity, setQuantity] = useState(1);
  const handleIncrease = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };
  const handleDecrease = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const totalPrice = 45000 * quantity;
  return (
    <div>
      <FoodDetails
        quantity={quantity}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        totalPrice={totalPrice}
      />
    </div>
  );
};

export default DetailsPage;
