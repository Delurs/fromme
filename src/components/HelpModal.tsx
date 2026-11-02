interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="animate-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/25 dark:bg-black/50 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card glass-modal animate-modal-card rounded-2xl max-w-lg w-full max-h-[calc(100dvh-1.5rem)] overflow-y-auto p-5 sm:p-8 relative"
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-[#E0BE9F]/45 to-transparent" />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="glass-pill absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:rotate-90 cursor-pointer"
        >
          <img
            src="/close_soft.png"
            alt="Close"
            className="w-5 h-5 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </button>

        <div className="flex items-center gap-3 mb-4 pr-8">
          <img
            src="/wanderer_compass.png"
            alt="Help Guide"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 transition-transform duration-500 hover:rotate-45"
          />
          <div>
            <h2 className="font-['Playfair_Display'] text-[20px] sm:text-[22px] font-medium text-[#1b1c1a] dark:text-[#F5EFE6]">How It Works</h2>
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#576155] dark:text-[#A7BAA9]">Gentle guidelines & wanderer's guide</p>
          </div>
        </div>

        <div className="space-y-4 text-[#5C4433] dark:text-[#C5B8AC] text-[13.5px] leading-relaxed">
          <div className="flex gap-3 items-start">
            <span className="glass-pill w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-[#7B523A] dark:text-[#C49A76]">1</span>
            <div>
              <span className="font-semibold text-[#1b1c1a] dark:text-[#EDE8E1] block">Finding Letters</span>
              Pan and explore the map. Tap any envelope marker to unseal its thoughts and discover the secret nook where it was left.
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="glass-pill w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-[#7B523A] dark:text-[#C49A76]">2</span>
            <div>
              <span className="font-semibold text-[#1b1c1a] dark:text-[#EDE8E1] block">Leaving a Note</span>
              Hit "Write a Letter" below. Pick a meaningful location, write what's in your heart, and release it into the world.
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="glass-pill w-6 h-6 rounded-full shrink-0 flex items-center justify-center text-xs font-semibold text-[#7B523A] dark:text-[#C49A76]">3</span>
            <div>
              <span className="font-semibold text-[#1b1c1a] dark:text-[#EDE8E1] block">Honor & Respect</span>
              No private phone numbers, harassment, or commercial spam. Treat each letter as a sacred message folded into a stone wall.
            </div>
          </div>
        </div>

        <div className="glass-divider-t mt-6 pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="glass-accent px-5 py-2 rounded-full text-[#1b1c1a] dark:text-[#EDE8E1] text-[12px] font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
