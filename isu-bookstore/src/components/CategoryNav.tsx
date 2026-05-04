import { Backpack, Book, Coffee, Gift, Pen, Shirt } from "lucide-react";
import type { ReactNode } from "react";

interface Category {
  id: string;
  name: string;
  icon: ReactNode;
}

interface CategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
}

const categories: Category[] = [
  { id: "all", name: "All Products", icon: <Gift className="h-5 w-5" /> },
  { id: "textbooks", name: "Textbooks", icon: <Book className="h-5 w-5" /> },
  { id: "apparel", name: "Apparel", icon: <Shirt className="h-5 w-5" /> },
  { id: "supplies", name: "Supplies", icon: <Pen className="h-5 w-5" /> },
  { id: "gear", name: "Gear & Bags", icon: <Backpack className="h-5 w-5" /> },
  {
    id: "gifts",
    name: "Gifts & Accessories",
    icon: <Coffee className="h-5 w-5" />,
  },
];

export function CategoryNav({
  selectedCategory,
  onSelectCategory,
}: CategoryNavProps) {
  return (
    <nav className="sticky top-[88px] z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto py-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              className={`flex items-center gap-2.5 rounded-lg px-5 py-2.5 font-medium whitespace-nowrap shadow-sm transition-all duration-200 ${
                selectedCategory === category.id
                  ? "scale-105 bg-[#C8102E] text-white shadow-md"
                  : "bg-gray-100 text-gray-700 hover:scale-105 hover:bg-gray-200 hover:shadow-md"
              }`}
            >
              {category.icon}
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
