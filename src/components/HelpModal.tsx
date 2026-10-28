interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: ModalProps) {
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
          <div className="w-11 h-11 rounded-xl bg-[#dbe6d7] dark:bg-[#263128] flex items-center justify-center p-2 shadow-2xs">
            <img
              src="/wanderer_compass.png"
              alt="Help Guide"
              className="w-7 h-7 object-contain"
            />
          </div>
          <div>
            <h2 className="font-['Playfair_Display'] text-[22px] font-medium text-[#1b1c1a] dark:text-[#F5EFE6]">How It Works</h2>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#576155] dark:text-[#A7BAA9]">Gentle guidelines & wanderer's guide</p>
          </div>
        </div>

        <div className="space-y-4 text-[#52443e] dark:text-[#C5BCB2] text-[13.5px] leading-relaxed">
          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#efeeea] dark:bg-[#2B2723] shrink-0 flex items-center justify-center text-xs font-semibold text-[#83523d] dark:text-[#E2A78F]">1</span>
            <div>
              <span className="font-semibold text-[#1b1c1a] dark:text-[#EDE8E1] block">Finding Letters</span>
              Pan and explore the map. Tap any envelope marker to unseal its thoughts and discover the secret nook where it was left.
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#efeeea] dark:bg-[#2B2723] shrink-0 flex items-center justify-center text-xs font-semibold text-[#83523d] dark:text-[#E2A78F]">2</span>
            <div>
              <span className="font-semibold text-[#1b1c1a] dark:text-[#EDE8E1] block">Leaving a Note</span>
              Hit "Write a Letter" below. Pick a meaningful location, fold your words into a category, and release it into the world.
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-[#efeeea] dark:bg-[#2B2723] shrink-0 flex items-center justify-center text-xs font-semibold text-[#83523d] dark:text-[#E2A78F]">3</span>
            <div>
              <span className="font-semibold text-[#1b1c1a] dark:text-[#EDE8E1] block">Honor & Respect</span>
              No private phone numbers, harassment, or commercial spam. Treat each letter as a sacred message folded into a stone wall.
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#eae8e4] dark:border-[#2E2924] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#83523d] dark:bg-[#A9664E] text-white hover:bg-[#7a5741] dark:hover:bg-[#8F533D] text-[12px] font-semibold transition-colors cursor-pointer"
          >
            Understood
          </button>
        </div>
      </div>
    </div>
  );
}
