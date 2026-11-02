interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: ModalProps) {
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
            src="/pin_open_letter.png"
            alt="About FromMe"
            className="w-10 h-10 sm:w-12 sm:h-12 object-contain shrink-0 animate-gentle-bob"
          />
          <div>
            <h2 className="font-['Playfair_Display'] text-[20px] sm:text-[22px] font-medium text-[#1b1c1a] dark:text-[#F5EFE6]">About FromMe</h2>
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7B523A] dark:text-[#C49A76]">Quiet epistles in physical spaces</p>
          </div>
        </div>

        <div className="space-y-3.5 text-[#5C4433] dark:text-[#C5B8AC] text-[14.5px] leading-relaxed">
          <p>
            FromMe is an open sanctuary for human tenderness. It allows people to fold thoughts, gratitude, quiet confessions, and encouragement into physical spots across cities and towns.
          </p>
          <p className="font-['Playfair_Display'] italic text-[#1b1c1a] dark:text-[#EBE4DC] border-l-2 border-[#7B523A]/60 dark:border-[#C49A76]/50 pl-3.5 my-2">
            “A note written for nobody in particular, yet found by the exact soul who needed to read it.”
          </p>
          <p>
            Whether pinned to a park bench in autumn or tucked into the bricks of a corner cafe, every letter lives on the map for wanderers near and far.
          </p>
        </div>

        <div className="glass-divider-t mt-6 pt-4 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="glass-pill px-5 py-2 rounded-full text-[#1b1c1a] dark:text-[#E8E4DD] hover:brightness-105 text-[12px] font-semibold transition-all cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
