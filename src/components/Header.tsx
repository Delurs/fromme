import frommeLogo from '../assets/fromme_logo.png';
import frommeLogoDark from '../assets/fromme_logo_dark_mode.png';

interface HeaderProps {
  isDark: boolean;
  isLanding?: boolean;
  onToggleTheme: () => void;
  onNavigateHome?: () => void;
  onExploreMap?: () => void;
  onOpenAbout: () => void;
  onOpenHelp: () => void;
}

export default function Header({
  isDark,
  isLanding = false,
  onToggleTheme,
  onNavigateHome,
  onExploreMap,
  onOpenAbout,
  onOpenHelp,
}: HeaderProps) {
  return (
    <header className="glass-header fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300">
      {/* Subtle center-weighted specular rim highlight along bottom edge of header */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/90 dark:via-[#E0BE9F]/30 to-transparent" />
      <div className="relative h-14 sm:h-16 max-w-[1280px] mx-auto px-3 sm:px-6 md:px-8 flex items-center justify-between">
        {/* Left balance spacer (desktop only, where logo is dead-center) */}
        <div className="hidden md:block md:w-24 invisible pointer-events-none" />

        {/* Brand Logo: Left-aligned on mobile to avoid colliding with nav, dead-center on md+ */}
        <div className="md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 pointer-events-auto flex items-center justify-start md:justify-center">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigateHome?.();
            }}
            className="group relative flex items-center justify-start md:justify-center text-decoration-none h-9 sm:h-10 w-32 sm:w-44 md:w-48 transition-transform duration-300 hover:scale-[1.03] active:scale-95"
            aria-label="FromMe"
          >
            {/* Light Mode Logo */}
            <img
              src={frommeLogo}
              alt="FromMe Logo"
              className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 h-8 sm:h-10 w-auto object-contain transition-all duration-500 ease-out pointer-events-none ${
                isDark ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            />
            {/* Dark Mode Logo */}
            <img
              src={frommeLogoDark}
              alt="FromMe Logo"
              className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 h-8 sm:h-10 w-auto object-contain transition-all duration-500 ease-out pointer-events-none ${
                isDark ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
            />
          </a>
        </div>

        {/* Right: Theme Toggle & Links */}
        <div className="flex items-center gap-2 sm:gap-4 ml-auto z-10">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle appearance"
            className="glass-pill w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:brightness-105 flex items-center justify-center transition-all duration-300 cursor-pointer hover:scale-105 active:scale-95 p-1.5"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            <div className="relative w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center overflow-hidden">
              <img
                src="/sun_warm.png"
                alt="Light mode"
                className={`absolute w-5 h-5 sm:w-6 sm:h-6 object-contain transition-all duration-500 cubic-bezier(0.22,1,0.36,1) ${
                  isDark ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'
                }`}
              />
              <img
                src="/moon_crescent.png"
                alt="Night mode"
                className={`absolute w-5 h-5 sm:w-6 sm:h-6 object-contain transition-all duration-500 cubic-bezier(0.22,1,0.36,1) ${
                  isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'
                }`}
              />
            </div>
          </button>

          <span className="w-[1px] h-4 bg-gradient-to-b from-transparent via-[#C4A88E]/80 dark:via-[#52463B] to-transparent" />

          <nav className="glass-pill flex items-center gap-0.5 sm:gap-1 p-1 rounded-full">
            {isLanding ? (
              <button
                type="button"
                onClick={onExploreMap}
                className="text-[11px] font-bold text-[#1b1c1a]/80 dark:text-[#E8E4DD]/80 hover:text-[#1b1c1a] dark:hover:text-white uppercase tracking-widest transition-all px-2.5 sm:px-3.5 py-1.5 rounded-full hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] cursor-pointer"
              >
                Map
              </button>
            ) : (
              <button
                type="button"
                onClick={onNavigateHome}
                className="text-[11px] font-bold text-[#1b1c1a]/80 dark:text-[#E8E4DD]/80 hover:text-[#1b1c1a] dark:hover:text-white uppercase tracking-widest transition-all px-2.5 sm:px-3.5 py-1.5 rounded-full hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] cursor-pointer"
              >
                Home
              </button>
            )}
            <button
              type="button"
              onClick={onOpenAbout}
              className="text-[11px] font-bold text-[#1b1c1a]/80 dark:text-[#E8E4DD]/80 hover:text-[#1b1c1a] dark:hover:text-white uppercase tracking-widest transition-all px-2.5 sm:px-3.5 py-1.5 rounded-full hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={onOpenHelp}
              className="text-[11px] font-bold text-[#1b1c1a]/80 dark:text-[#E8E4DD]/80 hover:text-[#1b1c1a] dark:hover:text-white uppercase tracking-widest transition-all px-2.5 sm:px-3.5 py-1.5 rounded-full hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.8)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] cursor-pointer"
            >
              Help
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
