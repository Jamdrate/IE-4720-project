import { Plus } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-xl">
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        {/* Using native img here keeps external image setup simple. */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
        {!product.inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-lg bg-red-600 px-4 py-2 text-white">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="mb-2 min-h-[3rem] line-clamp-2 text-gray-900">
          {product.name}
        </h3>
        <p className="mb-4 line-clamp-2 text-sm text-gray-600">
          {product.description}
        </p>

        <div className="flex items-center justify-between gap-3">
          <span className="text-xl font-bold text-[#C8102E]">
            ${product.price.toFixed(2)}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            disabled={!product.inStock}
            className={`flex items-center gap-2 rounded-lg px-5 py-2.5 font-medium shadow-sm transition-all duration-200 ${
              product.inStock
                ? "bg-[#C8102E] text-white hover:scale-105 hover:bg-[#9a0c24] hover:shadow-md active:scale-95"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
