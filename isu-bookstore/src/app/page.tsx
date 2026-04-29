import Link from "next/link";

export const Navbar = () => {
  return (
    <nav className="w-full border-b border-zinc-200 bg-white px-6 py-4 dark:border-zinc-800 dark:bg-black">
      <div className="mx-auto flex w-full max-w-4xl items-center gap-6 text-sm font-medium sm:text-base">
        <Link href="/cart" className="hover:underline">
          Cart
        </Link>
        <Link href="/catalog" className="hover:underline">
          Catalog
        </Link>
        <Link href="/Contact" className="hover:underline">
          Contact
        </Link>
      </div>
    </nav>
  );
};

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 text-black dark:bg-black dark:text-white">
      <Navbar />
      <main className="mx-auto flex w-full max-w-4xl flex-1 flex-col justify-center px-6 py-16">
        <h1 className="text-3xl font-semibold">ISU Bookstore</h1>
      </main>
    </div>
  );
}
