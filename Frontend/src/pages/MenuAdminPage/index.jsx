import React, { useState } from "react";
import MenuFood from "@/components/MenuFood";
import DialogCreateMenu from "@/components/DialogCreateMenu";

const menuItems = [
  {
    id: 1,
    name: "Gỏi cuốn tôm thịt",
    category: "Khai vị",
    price: 45000,
    description:
      "Cuốn gỏi tinh tế với tôm biển tươi ngọt, thịt heo mềm mại cùng rau thơm xanh mát, chấm cùng nước mắm chua ngọt.",
    image:
      "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&h=800&fit=crop",
    available: true,
    suggestion: "Thêm một ly nước dừa tươi để làm mát vị giác!",
  },
  {
    id: 2,
    name: "Chả giò Sài Gòn",
    category: "Khai vị",
    price: 55000,
    description: "Chả giò giòn rụm với nhân thịt heo, tôm và khoai môn.",
    image:
      "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&h=800&fit=crop",
    available: true,
    suggestion: "Thêm một ly nước dừa tươi để làm mát vị giác!",
  },
  {
    id: 3,
    name: "Phở bò tái",
    category: "Món chính",
    price: 75000,
    description:
      "Tô phở đậm đà với thịt bò tái mềm tan, nước dùng ninh xương trong vắt, thơm lừng hương quế hồi...",
    image:
      "https://images.unsplash.com/photo-1555126634-323283e090fa?w=800&h=800&fit=crop",
    available: true,
    suggestion: "Dùng kèm một ly cà phê sữa đá để trọn vẹn bữa sáng!",
  },
  {
    id: 4,
    name: "Bún chả Hà Nội",
    category: "Món chính",
    price: 70000,
    description: "Bún chả với thịt nướng than hoa thơm lừng, nước chấm đậm đà.",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=800&fit=crop",
    available: true,
    suggestion: "Dùng kèm một ly cà phê sữa đá để trọn vẹn bữa ăn!",
  },
  {
    id: 5,
    name: "Cơm sườn bì chả",
    category: "Món chính",
    price: 65000,
    description: "Cơm tấm với sườn nướng, bì và chả trứng truyền thống.",
    image:
      "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&h=800&fit=crop",
    available: false,
    suggestion: "Dùng kèm một ly cà phê sữa đá để trọn vẹn bữa ăn!",
  },
  {
    id: 6,
    name: "Trà đá",
    category: "Đồ uống",
    price: 10000,
    description: "Trà đá mát lạnh giải nhiệt.",
    image:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=800&fit=crop",
    available: true,
  },
  {
    id: 7,
    name: "Cà phê sữa đá",
    category: "Đồ uống",
    price: 35000,
    description: "Cà phê phin pha sữa đặc thơm ngon đặc biệt.",
    image:
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&h=800&fit=crop",
    available: true,
  },
  {
    id: 8,
    name: "Nước dừa tươi",
    category: "Đồ uống",
    price: 30000,
    description: "Nước dừa xiêm tươi mát ngọt lịm.",
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=800&fit=crop",
    available: true,
  },
  {
    id: 9,
    name: "Chè ba màu",
    category: "Tráng miệng",
    price: 25000,
    description: "Chè đậu xanh, đậu đỏ, thạch rau câu cốt dừa.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=800&fit=crop",
    available: true,
  },
  {
    id: 10,
    name: "Bánh flan",
    category: "Tráng miệng",
    price: 20000,
    description: "Bánh flan caramel mềm mịn béo ngậy.",
    image:
      "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=800&fit=crop",
    available: true,
  },
];

const categories = ["Khai vị", "Món chính", "Đồ uống", "Tráng miệng"];

const MenuAdminPage = () => {
  const [activeCategory, setActiveCategory] = useState("Khai vị");
  const [SearchQuery, setSearchQuery] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);

  const itemsMatchingSearch = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(SearchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(SearchQuery.toLowerCase())
  );

  const filteredItems = itemsMatchingSearch.filter(
    (item) => item.category === activeCategory
  );

  const getCount = (cat) =>
    itemsMatchingSearch.filter((item) => item.category === cat).length;
  const totalItems = itemsMatchingSearch.length;
  const availableItems = itemsMatchingSearch.filter((i) => i.available).length;

  const handleAddClick = () => {
    setIsCreateDialogOpen(true);
  };

  return (
    <>
      <MenuFood
        items={filteredItems}
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        totalItems={totalItems}
        availableItems={availableItems}
        getCount={getCount}
        searchQuery={SearchQuery}
        onSearchChange={setSearchQuery}
        onAddClick={handleAddClick}
      />
      <DialogCreateMenu
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </>
  );
};
export default MenuAdminPage;