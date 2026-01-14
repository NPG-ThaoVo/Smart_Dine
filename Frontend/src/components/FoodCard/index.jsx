import { Button } from "../ui/button";
import { Plus, Minus } from "lucide-react";
import { Badge } from "../ui/badge";

const FoodCard = ({ item, quantity, onAdd, onRemove, onViewDetails }) => {
  const isSelected = quantity > 0;

  return (
    <div
      className={`group relative flex flex-col rounded-3xl overflow-hidden
      bg-card border-2 transition-all duration-300
      ${!item.available ? "opacity-60" : ""}
      ${isSelected
          ? "border-primary shadow-lg shadow-primary/20"
          : "border-border hover:border-primary/50 hover:shadow-md"
        } cursor-pointer`}
      onClick={onViewDetails}
    >
      <div className="relative aspect-square bg-muted overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {isSelected && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold ring-4 ring-background">
            {quantity}
          </div>
        )}

        {!item.available && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
            <Badge variant="destructive">Hết hàng</Badge>
          </div>
        )}
      </div>

      <div className="p-3 flex flex-col flex-1">
        <h3 className="font-bold line-clamp-2">{item.name}</h3>

        <div className="flex items-center justify-between mt-auto pt-2">
          <span className="font-black text-xl text-primary">
            {item.price.toLocaleString()} ₫
          </span>

          {item.available && (
            <div className="flex gap-1.5">
              {isSelected ? (
                <>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove();
                    }}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <Button
                    size="icon"
                    className="h-8 w-8 rounded-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAdd();
                    }}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </>
              ) : (
                <Button
                  size="icon"
                  className="h-9 w-9 rounded-full"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAdd();
                  }}
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

export default FoodCard;