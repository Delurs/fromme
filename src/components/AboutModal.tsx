interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 dark:bg-black/65 backdrop-blur-xs transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#fbf9f5] dark:bg-[#1E1C19] border border-[#eae8e4] dark:border-[#38332D] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-[#efeeea] dark:hover:bg-[#2C2723] transition-colors cursor-pointer"
        >
          <img
            src="/close_soft.png"
            alt="Close"
            className="w-4 h-4 object-contain opacity-70 hover:opacity-100 transition-opacity"
          />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-xl bg-[#efeeea] dark:bg-[#2A2622] flex items-center justify-center p-2 shadow-2xs">
            <img
              src="/pin_open_letter.png"
              alt="About FromMe"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <h2 className="font-['Playfair_Display'] text-[22px] font-medium text-[#1b1c1a] dark:text-[#F5EFE6]">About FromMe</h2>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#83523d] dark:text-[#E2A78F]">Quiet epistles in physical spaces</p>
          </div>
        </div>

        <div className="space-y-3.5 text-[#52443e] dark:text-[#C5BCB2] text-[14.5px] leading-relaxed">
          <p>
            FromMe is an open sanctuary for human tenderness. It allows people to fold thoughts, gratitude, quiet confessions, and encouragement into physical spots across cities and towns.
          </p>
          <p className="font-['Playfair_Display'] italic text-[#1b1c1a] dark:text-[#EBE4DC] border-l-2 border-[#83523d]/50 dark:border-[#E2A78F]/50 pl-3.5 my-2">
            “A note written for nobody in particular, yet found by the exact soul who needed to read it.”
          </p>
          <p>
            Whether pinned to a park bench in autumn or tucked into the bricks of a corner cafe, every letter lives on the map for wanderers near and far.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-[#eae8e4] dark:border-[#2E2924] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#efeeea] dark:bg-[#2C2723] text-[#1b1c1a] dark:text-[#E8E4DD] hover:bg-[#e4e2de] dark:hover:bg-[#3B342E] text-[12px] font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
