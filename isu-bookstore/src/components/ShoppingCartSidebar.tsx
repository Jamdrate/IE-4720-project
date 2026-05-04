import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import type { Product } from "./ProductCard";

export interface CartItem {
  product: Product;
  quantity: number;
}

interface ShoppingCartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemove: (productId: string) => void;
  onCheckout?: () => void;
}

export function ShoppingCartSidebar({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: ShoppingCartSidebarProps) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={onClose} />
      )}

      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full max-w-md transform flex-col bg-white shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-[#C8102E] p-4 text-white">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6" />
            <h2>Shopping Cart</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 transition-colors hover:bg-[#9a0c24]"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-gray-400">
              <ShoppingBag className="mb-4 h-24 w-24" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 rounded-lg bg-gray-50 p-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />

                  <div className="min-w-0 flex-1">
                    <h4 className="mb-1 line-clamp-2 text-gray-900">
                      {item.product.name}
                    </h4>
                    <p className="mb-2 font-bold text-[#C8102E]">
                      ${item.product.price.toFixed(2)}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, -1)}
                        className="rounded-lg bg-[#C8102E] p-1.5 text-black transition-all duration-200 hover:scale-110 hover:bg-[#9a0c24] active:scale-95"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-10 text-center font-medium text-black">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, 1)}
                        className="rounded-lg bg-[#C8102E] p-1.5 text-black transition-all duration-200 hover:scale-110 hover:bg-[#9a0c24] active:scale-95"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => onRemove(item.product.id)}
                        className="ml-auto text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 bg-gray-50 p-6">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-lg font-medium text-gray-700">Subtotal:</span>
              <span className="text-3xl font-bold text-[#C8102E]">
                ${total.toFixed(2)}
              </span>
            </div>
            <button
              type="button"
              onClick={onCheckout}
              className="w-full rounded-lg bg-[#C8102E] py-4 text-lg font-medium text-white shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#9a0c24] hover:shadow-xl active:scale-95"
            >
              Proceed to Checkout
            </button>
            <p className="mt-3 text-center text-xs text-gray-500">
              Tax and shipping calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
