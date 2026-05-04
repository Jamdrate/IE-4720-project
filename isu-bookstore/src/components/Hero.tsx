export function Hero() {
  return (
    <div className="bg-gradient-to-r from-[#C8102E] to-[#9a0c24] px-4 py-16 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-10 md:flex-row">
          <div className="flex-1">
            <h2 className="mb-5 text-white">Welcome Cyclones!</h2>
            <p className="mb-8 text-xl leading-relaxed text-white opacity-90">
              Your one-stop shop for textbooks, apparel, supplies, and Iowa
              State gear.
            </p>
            <div className="flex flex-wrap gap-4">
              <button className="rounded-lg bg-[#F1BE48] px-8 py-3.5 font-medium text-[#1a1a1a] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-[#e5b23c] hover:shadow-xl active:scale-95">
                Shop Textbooks
              </button>
              <button className="rounded-lg bg-white px-8 py-3.5 font-medium text-[#C8102E] shadow-lg transition-all duration-200 hover:scale-105 hover:bg-gray-100 hover:shadow-xl active:scale-95">
                Browse Apparel
              </button>
            </div>
          </div>

          <div className="flex flex-1 justify-center">
            <div className="rounded-2xl bg-white/10 p-10 text-center shadow-xl backdrop-blur-sm">
              <div className="mb-5 text-7xl">🎓</div>
              <h3 className="mb-3 text-white">Spring 2026 Semester</h3>
              <p className="text-lg text-[#F1BE48]">
                Textbook rentals available now!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
