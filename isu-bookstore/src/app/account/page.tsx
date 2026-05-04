"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Package, UserRound } from "lucide-react";
import { Header } from "../../components/Header";
import { usePersistedCart } from "../../hooks/usePersistedCart";
import { usePersistedProfile } from "../../hooks/usePersistedProfile";

export default function AccountPage() {
  const router = useRouter();
  const { cartItems } = usePersistedCart();
  const { profile, updateProfile, storageReady } = usePersistedProfile();
  const [searchQuery, setSearchQuery] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleSaveProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSavedFlash(true);
    window.setTimeout(() => setSavedFlash(false), 2500);
  };

  if (!storageReady) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header
          cartItemCount={0}
          onCartClick={() => router.push("/")}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
        <main className="mx-auto max-w-3xl px-4 py-16 text-center text-gray-500">
          Loading account…
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

      <main className="mx-auto max-w-3xl px-4 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#C8102E] hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to shop
        </Link>

        <div className="mt-6 flex items-center gap-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#C8102E]/10">
            <UserRound className="h-8 w-8 text-[#C8102E]" aria-hidden />
          </div>
          <div>
            <h1 className="text-3xl font-semibold text-gray-900">Your account</h1>
            <p className="text-gray-600">
              Manage your profile and view orders (demo — stored in this browser only).
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSaveProfile}
          className="mt-10 rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
        >
          <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
          <p className="mt-1 text-sm text-gray-500">
            Information is saved locally for this demo; there is no server login.
          </p>

          <div className="mt-6 space-y-4">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Display name</span>
              <input
                value={profile.displayName}
                onChange={(e) => updateProfile({ displayName: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                placeholder="Alex Cyclone"
                autoComplete="name"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">University email</span>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => updateProfile({ email: e.target.value })}
                className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 focus:border-[#C8102E] focus:outline-none focus:ring-2 focus:ring-[#C8102E]/30"
                placeholder="you@iastate.edu"
                autoComplete="email"
              />
            </label>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="rounded-lg bg-[#C8102E] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[#9a0c24]"
            >
              Save profile
            </button>
            {savedFlash && (
              <span className="text-sm font-medium text-green-700" role="status">
                Saved.
              </span>
            )}
          </div>
        </form>

        <section className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Package className="h-5 w-5 text-[#C8102E]" aria-hidden />
            <h2 className="text-lg font-semibold text-gray-900">Order history</h2>
          </div>
          <p className="mt-3 text-sm text-gray-600">
            Demo orders are not stored. After you place an order on checkout, it only clears the
            cart — no history is kept here yet.
          </p>
          <div className="mt-6 rounded-lg border border-dashed border-gray-200 bg-gray-50 py-10 text-center">
            <p className="text-gray-500">No past orders to show.</p>
            <Link
              href="/"
              className="mt-4 inline-block text-sm font-medium text-[#C8102E] hover:underline"
            >
              Browse the bookstore
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
