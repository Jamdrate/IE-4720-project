"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Header } from "../../components/Header";
import { usePersistedCart } from "../../hooks/usePersistedCart";

const IA_SALES_TAX_RATE = 0.06;

export default function CheckoutPage() {
  const router = useRouter();
  const { cartItems, clearCart, storageReady } = usePersistedCart();
  const [searchQuery, setSearchQuery] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      ),
    [cartItems],
  );

  const tax = useMemo(() => subtotal * IA_SALES_TAX_RATE, [subtotal]);
  const total = subtotal + tax;

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePlaceOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    clearCart();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          cartItemCount={0}
          onCartClick={() => router.push("/")}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="mx-auto max-w-lg px-4 py-16 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-600" aria-hidden />
          <h1 className="mt-6 text-2xl font-semibold text-gray-900">Order placed</h1>
          <p className="mt-3 text-gray-600">
            Thank you for your order. This is a demo checkout — no payment was processed.
          </p>
          <Link
            href="/"
            className="mt-8 inline-block rounded-lg bg-[#C8102E] px-6 py-3 font-medium text-white transition-colors hover:bg-[#9a0c24]"
          >
            Continue shopping
          </Link>
        </main>
      </div>
    );
  }

  if (!storageReady) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          cartItemCount={0}
          onCartClick={() => router.push("/")}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="mx-auto max-w-6xl px-4 py-16 text-center text-gray-500">
          Loading checkout…
        </main>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          cartItemCount={0}
          onCartClick={() => router.push("/")}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="mx-auto max-w-lg px-4 py-16 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Your cart is empty</h1>
          <p className="mt-3 text-gray-600">
            Add items from the store before checking out.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-[#C8102E] px-6 py-3 font-medium text-white transition-colors hover:bg-[#9a0c24]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to shop
          </Link>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItemCount}
        onCartClick={() => router.push("/")}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#C8102E] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Continue shopping
        </Link>

        <h1 className="mt-6 text-3xl font-semibold text-gray-900">Checkout</h1>
        <p className="mt-1 text-gray-600">
          Enter your details to complete your purchase (demo only).
        </p>

        <form
          onSubmit={handlePlaceOrder}
          className="mt-10 grid gap-10 lg:grid-cols-3"
        >
          <div className="space-y-10 lg:col-span-2">
            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Shipping</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-gray-700">Full name</span>
                  <input
                    required
                    name="fullName"
                    autoComplete="name"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                    placeholder="Jane Cyclone"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-gray-700">Email</span>
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                    placeholder="you@iastate.edu"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="text-sm font-medium text-gray-700">Street address</span>
                  <input
                    required
                    name="address"
                    autoComplete="street-address"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                    placeholder="123 Union Drive"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">City</span>
                  <input
                    required
                    name="city"
                    autoComplete="address-level2"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                    placeholder="Ames"
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">State</span>
                    <input
                      required
                      name="state"
                      autoComplete="address-level1"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                      placeholder="IA"
                      maxLength={2}
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">ZIP</span>
                    <input
                      required
                      name="zip"
                      autoComplete="postal-code"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                      placeholder="50011"
                    />
                  </label>
                </div>
              </div>
            </section>

            <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Payment</h2>
              <p className="mt-1 text-sm text-gray-500">
                Card details are not processed — for display only.
              </p>
              <div className="mt-6 grid gap-4">
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Name on card</span>
                  <input
                    name="cardName"
                    autoComplete="cc-name"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                    placeholder="Jane Cyclone"
                  />
                </label>
                <label className="block">
                  <span className="text-sm font-medium text-gray-700">Card number</span>
                  <input
                    inputMode="numeric"
                    autoComplete="cc-number"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                    placeholder="4242 4242 4242 4242"
                  />
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Expiry</span>
                    <input
                      autoComplete="cc-exp"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                      placeholder="MM / YY"
                    />
                  </label>
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">CVC</span>
                    <input
                      autoComplete="cc-csc"
                      className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                      placeholder="123"
                    />
                  </label>
                </div>
              </div>
            </section>

            <button
              type="submit"
              className="w-full rounded-lg bg-[#C8102E] py-4 text-lg font-semibold text-white shadow-lg transition-all hover:bg-[#9a0c24] hover:shadow-xl active:scale-[0.99] lg:hidden"
            >
              Place order — ${total.toFixed(2)}
            </button>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900">Order summary</h2>
              <ul className="mt-4 max-h-64 space-y-3 overflow-y-auto">
                {cartItems.map((item) => (
                  <li key={item.product.id} className="flex gap-3 text-sm">
                    <img
                      src={item.product.image}
                      alt=""
                      className="h-14 w-14 shrink-0 rounded-lg object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 font-medium text-gray-900">
                        {item.product.name}
                      </p>
                      <p className="text-gray-500">
                        Qty {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="shrink-0 font-medium text-gray-900">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="mt-6 space-y-2 border-t border-gray-100 pt-4 text-sm">
                <div className="flex justify-between text-gray-600">
                  <dt>Subtotal</dt>
                  <dd>${subtotal.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between text-gray-600">
                  <dt>Estimated tax (IA 6%)</dt>
                  <dd>${tax.toFixed(2)}</dd>
                </div>
                <div className="flex justify-between border-t border-gray-100 pt-2 text-base font-semibold text-gray-900">
                  <dt>Total</dt>
                  <dd className="text-[#C8102E]">${total.toFixed(2)}</dd>
                </div>
              </dl>

              <button
                type="submit"
                className="mt-6 hidden w-full rounded-lg bg-[#C8102E] py-3.5 font-semibold text-white shadow-md transition-colors hover:bg-[#9a0c24] lg:block"
              >
                Place order — ${total.toFixed(2)}
              </button>
            </div>
          </aside>
        </form>
      </main>
    </div>
  );
}
