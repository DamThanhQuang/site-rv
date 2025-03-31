import { useState } from "react";

interface CategoryFilterProps {
  onFilterChange: (category: string) => void;
}

export default function CategoryFilter({
  onFilterChange,
}: CategoryFilterProps) {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "Tất cả", icon: "🏠" },
    { id: "beach", name: "Bãi biển", icon: "🏖️" },
    { id: "mountain", name: "Núi", icon: "⛰️" },
    { id: "countryside", name: "Nông thôn", icon: "🌄" },
    { id: "city", name: "Thành phố", icon: "🏙️" },
    { id: "tropical", name: "Nhiệt đới", icon: "🌴" },
    { id: "cabin", name: "Cabin", icon: "🏕️" },
    { id: "luxury", name: "Sang trọng", icon: "💎" },
  ];

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    onFilterChange(category);
  };

  return (
    <div className="mb-8">
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={`flex flex-col items-center min-w-[80px] px-4 py-2 rounded-lg transition ${
                activeCategory === category.id
                  ? "bg-gray-100 border-b-2 border-black"
                  : "hover:bg-gray-50"
              }`}
            >
              <span className="text-2xl">{category.icon}</span>
              <span className="mt-1 text-sm font-medium">{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
