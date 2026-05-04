"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CategoryNav } from "../components/CategoryNav";
import { Header } from "../components/Header";
import { Hero } from "../components/Hero";
import { ProductCard, type Product } from "../components/ProductCard";
import { ShoppingCartSidebar } from "../components/ShoppingCartSidebar";
import { usePersistedCart } from "../hooks/usePersistedCart";

const mockProducts: Product[] = [
  {
    id: "1",
    name: "General Chemistry Textbook - 11th Edition",
    price: 89.99,
    category: "textbooks",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQmgBAqdxTiZqlwS1Zb82ZHhUIjHxC8IuTwIT22quBY9WvPLogIheHJWC0LT0QKfo36wb3MBnyP1ZejY9z2fZXGrEDqmjZUKGwp_cGLFpWw&usqp=CAc&fit=crop",
    description: "Required for CHEM 177/177L - Fall 2026",
    inStock: true,
  },
  {
    id: "2",
    name: "ISU Cyclones Cardinal Hoodie",
    price: 54.99,
    category: "apparel",
    image:
      "https://images.footballfanatics.com/iowa-state-cyclones/mens%C2%A0champion-cardinal-iowa-state-cyclones-arched-logo-fleece-pullover-hoodie_ss5_p-202889785+pv-2+u-cdbpbu4gwqkbwyqdrqps+v-efnkff0na8qnb0ythggu.jpg?_hv=2&w=1018&fit=crop",
    description: "Premium cotton blend with embroidered logo",
    inStock: true,
  },
  {
    id: "3",
    name: "Iowa State Baseball Cap",
    price: 24.99,
    category: "apparel",
    image:
      "https://fanatics.frgimages.com/iowa-state-cyclones/mens-top-of-the-world-cardinal-iowa-state-cyclones-reflex-logo-flex-hat_pi4313000_altimages_ff_4313906-59cede68d4d1f9aa51d3alt3_full.jpg?_hv=2&w=600&fit=crop",
    description: "Adjustable fit with ISU embroidery",
    inStock: true,
  },
  {
    id: "4",
    name: "Calculus: Early Transcendentals",
    price: 124.99,
    category: "textbooks",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcTitO8Yn6p58Dg96jEyoujf3yzE9F5S1xUoeVCgwbAWeYmXvBPwhGmJMs5Qu4stz61-HReKT1EgMJf13FD9Lmr9UZ2I93-1aNj96Cd19j7gKqQ6XXDb2eHbpA&usqp=CAc&fit=crop",
    description: "Required for MATH 165/166",
    inStock: true,
  },
  {
    id: "5",
    name: "Spiral Notebook Set",
    price: 12.99,
    category: "supplies",
    image:
      "https://media.officedepot.com/images/f_auto,q_auto,e_sharpen,h_450/products/9942929/9942929_p_blu_022318/9942929&fit=crop",
    description: "Pack of 3 college-ruled notebooks",
    inStock: true,
  },
  {
    id: "6",
    name: "ISU Logo Backpack",
    price: 44.99,
    category: "gear",
    image:
      "https://media.kohlsimg.com/is/image/kohls/2800152?wid=400&hei=400&op_sharpen=1&fit=crop",
    description: "Durable backpack with laptop compartment",
    inStock: true,
  },
  {
    id: "7",
    name: "Introduction to Psychology Textbook",
    price: 78.99,
    category: "textbooks",
    image:
      "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
    description: "For PSYCH 101 - Latest Edition",
    inStock: false,
  },
  {
    id: "8",
    name: "Cylcones Cy bird plushie",
    price: 9.99,
    category: "gifts",
    image:
      "https://www.barefootcampusoutfitter.com/cdn/shop/files/840790133393-2.webp?v=1767026194&width=1159&fit=crop",
    description: "Cute and cuddly Cyclones Cy bird plushie",
    inStock: true,
  },
  {
    id: "9",
    name: "Alumni license plate frame",
    price: 25.99,
    category: "gifts",
    image:
      "https://chromeemblems.s3.amazonaws.com/content/IAST-3D-ALUM-LPF-lifestyle-web.jpg?fit=crop",
    description: "Iowa State Alumni license plate frame",
    inStock: true,
  },
  {
    id: "10",
    name: "ISU Cyclones T-Shirt",
    price: 22.99,
    category: "apparel",
    image:
      "https://campuswardrobe.com/cdn/shop/products/57_654a5acd-c49e-4312-8178-6661184196d5.jpg?v=1690913252&fit=crop",
    description: "100% cotton, various sizes available",
    inStock: true,
  },
  {
    id: "11",
    name: "Mechanical Pencils",
    price: 17.85,
    category: "supplies",
    image:
      "https://artbeek.com/pub/media/catalog/product/8/1/81WoGmuzf1L._AC_SL1500_.jpg?fit=crop",
    description: "Mechanical pencils for studying - 6 PCS Set",
    inStock: true,
  },
  {
    id: "12",
    name: "ISU Cyclones Water Bottle",
    price: 15.99,
    category: "gear",
    image:
      "https://www.isubookstore.com/core/media/media.nl?id=2400764&c=4510055&h=yjU1sY11JHAhMur-xIWP14h9cRaYj8yUYWfNGIQXbFqs685x&resizeid=2&resizeh=600&resizew=600&fit=crop",
    description: "BPA-free, 32oz capacity",
    inStock: true,
  },
];

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { cartItems, setCartItems } = usePersistedCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    return mockProducts.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      return (
        product.name.toLowerCase().includes(normalizedQuery) ||
        product.description.toLowerCase().includes(normalizedQuery) ||
        product.category.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [selectedCategory, searchQuery]);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.product.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQuantity = item.quantity + delta;
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
        .filter((item) => item.quantity > 0),
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <CategoryNav
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <Hero />

      <main className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-8">
          <h2 className="mb-2 text-gray-900">
            {selectedCategory === "all"
              ? "All Products"
              : selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)}
          </h2>
          <p className="text-gray-600">{filteredProducts.length} items available</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
            />
          ))}
        </div>
      </main>

      <footer className="mt-16 bg-[#C8102E] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="mb-4 text-white">About Us</h3>
              <p className="text-sm text-white/80">
                Official Iowa State University Bookstore serving Cyclones since
                1868.
              </p>
            </div>
            <div>
              <h3 className="mb-4 text-white">Quick Links</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Textbook Rentals</li>
                <li>Course Materials</li>
                <li>Gift Cards</li>
                <li>Store Hours</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-white">Customer Service</h3>
              <ul className="space-y-2 text-sm text-white/80">
                <li>Contact Us</li>
                <li>Returns & Exchanges</li>
                <li>Shipping Info</li>
                <li>FAQ</li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-white">Visit Us</h3>
              <p className="text-sm text-white/80">
                Iowa State University Campus
                <br />
                Ames, IA 50011
                <br />
                (515) 294-5684
              </p>
            </div>
          </div>
          <div className="mt-8 border-t border-white/20 pt-8 text-center text-sm text-white/80">
            <p>
              &copy; 2026 Iowa State University Bookstore. All rights reserved.
              Go Cyclones!
            </p>
          </div>
        </div>
      </footer>

      <ShoppingCartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={() => {
          setIsCartOpen(false);
          router.push("/checkout");
        }}
      />
    </div>
  );
}
