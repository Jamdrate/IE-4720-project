"use client";

import { useCallback, useEffect, useState } from "react";
import type { CartItem } from "../components/ShoppingCartSidebar";
import { loadCartFromStorage, saveCartToStorage } from "../lib/cart-storage";

export function usePersistedCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [storageReady, setStorageReady] = useState(false);

  useEffect(() => {
    setCartItems(loadCartFromStorage());
    setStorageReady(true);
  }, []);

  useEffect(() => {
    if (!storageReady) {
      return;
    }
    saveCartToStorage(cartItems);
  }, [cartItems, storageReady]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  return { cartItems, setCartItems, clearCart, storageReady };
}
