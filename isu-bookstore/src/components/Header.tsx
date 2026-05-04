import { Menu, Search, ShoppingCart, User } from "lucide-react";

interface HeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}



export function Header({
  cartItemCount,
  onCartClick,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-[#C8102E] text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex items-center justify-between">
          <button className="p-2 lg:hidden">
            <Menu className="h-6 w-6" />
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-white">
              <img
                src="https://collegewallart.com/cdn/shop/products/ISU-PM016DC-24x24-IOWA-STATE-LOGO-MAXMETAL-WEB_2000x.jpg?v=1617308758"
                alt="Iowa State logo"
                className="h-10 w-10 object-contain"
              />
            </div>
            <div>
              <h1 className="text-white">Iowa State University</h1>
              <p className="text-sm text-[#F1BE48]">Cyclone Bookstore</p>
            </div>
          </div>

          <div className="mx-8 hidden max-w-xl flex-1 md:flex">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for textbooks, apparel, supplies..."
                value={searchQuery}
                onChange={(event) => onSearchChange(event.target.value)}
                className="w-full rounded-lg px-4 py-2 pr-10 text-gray-900 focus:ring-2 focus:ring-[#F1BE48] focus:outline-none"
              />
              <Search className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="rounded-lg p-2.5 transition-all duration-200 hover:scale-105 hover:bg-[#9a0c24]">
              <User className="h-6 w-6" />
            </button>
            <button
              onClick={onCartClick}
              className="relative rounded-lg p-2.5 transition-all duration-200 hover:scale-105 hover:bg-[#9a0c24]"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#F1BE48] text-xs font-bold text-[#C8102E] shadow-lg">
                  {cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <div className="mt-3 md:hidden">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(event) => onSearchChange(event.target.value)}
              className="w-full rounded-lg px-4 py-2 pr-10 text-gray-900 focus:ring-2 focus:ring-[#F1BE48] focus:outline-none"
            />
            <Search className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
