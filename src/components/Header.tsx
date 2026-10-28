import frommeLogo from '../assets/fromme_logo.png';
import frommeLogoDark from '../assets/fromme_logo_dark_mode.png';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenAbout: () => void;
  onOpenHelp: () => void;
}

export default function Header({
  isDark,
  onToggleTheme,
  onOpenAbout,
  onOpenHelp,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#fbf9f5]/90 dark:bg-[#121110]/90 backdrop-blur-md border-b border-[#eae8e4] dark:border-[#262421] transition-colors duration-300">
      <div className="relative h-16 max-w-[1280px] mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Left balance spacer */}
        <div className="w-9 sm:w-24 invisible pointer-events-none" />

        {/* Absolute Dead-Center Brand Logo Image (Light & Dark Mode) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-auto flex items-center justify-center">
          <a
            href="#"
            className="flex items-center justify-center text-decoration-none h-10"
            aria-label="FromMe"
          >
            <img
              key={isDark ? 'dark' : 'light'}
              src={isDark ? frommeLogoDark : frommeLogo}
              alt="FromMe Logo"
              className="h-9 sm:h-10 w-auto object-contain"
            />
          </a>
        </div>

        {/* Right: Theme Toggle & Links */}
        <div className="flex items-center gap-4 sm:gap-6 ml-auto z-10">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label="Toggle appearance"
            className="w-9 h-9 rounded-full bg-[#efeeea] dark:bg-[#25221F] hover:bg-[#e4e2de] dark:hover:bg-[#322E2A] flex items-center justify-center border border-[#d6c2bb]/40 dark:border-[#38332D] transition-all cursor-pointer shadow-xs hover:scale-105 p-1.5"
            title={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <img
                src="/moon_crescent.png"
                alt="Night mode"
                className="w-5 h-5 object-contain"
              />
            ) : (
              <img
                src="/sun_warm.png"
                alt="Light mode"
                className="w-5 h-5 object-contain"
              />
            )}
          </button>

          <span className="w-[1px] h-4 bg-[#d6c2bb]/60 dark:bg-[#3E3831]" />

          <nav className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={onOpenAbout}
              className="text-[11px] font-bold text-[#52443e] dark:text-[#A89F95] hover:text-[#83523d] dark:hover:text-[#f8b89d] uppercase tracking-widest transition-colors px-3 py-1.5 rounded-full hover:bg-[#efeeea] dark:hover:bg-[#25221F] cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={onOpenHelp}
              className="text-[11px] font-bold text-[#52443e] dark:text-[#A89F95] hover:text-[#83523d] dark:hover:text-[#f8b89d] uppercase tracking-widest transition-colors px-3 py-1.5 rounded-full hover:bg-[#efeeea] dark:hover:bg-[#25221F] cursor-pointer"
            >
              Help
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}
