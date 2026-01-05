import FoodCard from "./components/FoodCard";
import HeaderMenu from "./components/HeaderMenu";

function Menu() {
  return (
    <>
      <div className="min-h-screen gradient-bg pb-24">
        <HeaderMenu/>
        <FoodCard/>
      </div>
    </>
  );
}

export default Menu;
