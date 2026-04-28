export default function Home() {
    const featuredCategories = [
      {
        title: "Textbooks",
        description: "Find course-required books by department and class number.",
      },
      {
        title: "ISU Apparel",
        description: "Browse hoodies, hats, and game-day gear for every season.",
      },
      {
        title: "School Supplies",
        description: "Grab notebooks, planners, and essentials for a productive term.",
      },
    ];
  
    return (
      <div className="min-h-screen bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50">
        <main className="mx-auto flex w-full max-w-6xl flex-col gap-20 px-6 py-14 md:px-10">
          <section className="rounded-3xl bg-gradient-to-r from-red-700 to-red-900 p-10 text-white shadow-xl md:p-14">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-red-100">
              Iowa State University
            </p>
            <h1 className="max-w-2xl text-4xl font-bold leading-tight md:text-5xl">
              Welcome to the ISU Bookstore
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-red-50">
              Shop textbooks, school essentials, and Cyclone spirit wear in one
              place. Built for students, faculty, and fans.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-full bg-white px-6 py-3 text-sm font-semibold text-red-800 transition hover:bg-red-100">
                Shop Textbooks
              </button>
              <button className="rounded-full border border-red-200 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-800">
                Explore Merchandise
              </button>
            </div>
          </section>
  
          <section className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                Featured Categories
              </h2>
              <p className="mt-2 text-zinc-600 dark:text-zinc-300">
                Everything you need for a successful semester.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {featuredCategories.map((category) => (
                <article
                  key={category.title}
                  className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
                >
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                  <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-300">
                    {category.description}
                  </p>
                </article>
              ))}
            </div>
          </section>
  
          <section className="rounded-2xl border border-zinc-200 bg-white p-8 dark:border-zinc-800 dark:bg-zinc-900">
            <h2 className="text-2xl font-semibold tracking-tight">
              Ready for the semester?
            </h2>
            <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-300">
              Sign in to check order status, build your course list, and get
              notified when required books are in stock.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <button className="rounded-lg bg-zinc-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300">
                Sign In
              </button>
              <button className="rounded-lg border border-zinc-300 px-5 py-3 text-sm font-medium transition hover:bg-zinc-100 dark:border-zinc-700 dark:hover:bg-zinc-800">
                Create Account
              </button>
            </div>
          </section>
        </main>
      </div>
    );
  }
  