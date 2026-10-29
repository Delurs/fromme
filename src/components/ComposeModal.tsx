import { useState, useEffect } from 'react';

interface ComposeModalProps {
  isOpen: boolean;
  preselectedCoords: { x: number; y: number } | null;
  onClose: () => void;
  // If coordinates were already chosen via map click, send immediately
  onSendWithCoords?: (message: string, coords: { x: number; y: number }) => void;
  // If user started from the CTA button, transition to picking a spot
  onProceedToPickLocation?: (message: string) => void;
}

export function ComposeModal({
  isOpen,
  preselectedCoords,
  onClose,
  onSendWithCoords,
  onProceedToPickLocation,
}: ComposeModalProps) {
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isOpen) {
      setMessage('');
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = message.trim();
    if (!trimmed) {
      setError('Please write a message before releasing your note.');
      return;
    }
    if (trimmed.length < 5) {
      setError('A note should be at least a few words.');
      return;
    }

    if (preselectedCoords && onSendWithCoords) {
      // Flow A: Coordinates were already clicked on map
      onSendWithCoords(trimmed, preselectedCoords);
    } else if (onProceedToPickLocation) {
      // Flow B: User now chooses location on map
      onProceedToPickLocation(trimmed);
    }
  };

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
          className="absolute top-5 right-5 text-[#52443e] dark:text-[#A89F95] hover:text-[#1b1c1a] dark:hover:text-[#EDE8E1] transition-colors cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5">
          <img
            src="/fountain_pen.png"
            alt="Write a Letter"
            className="w-10 h-10 object-contain"
          />
          <div>
            <h2 className="font-['Playfair_Display'] text-[22px] font-medium text-[#1b1c1a] dark:text-[#F5EFE6]">
              Write a Letter
            </h2>
            <p className="text-[11px] font-bold uppercase tracking-wider text-[#83523d] dark:text-[#E2A78F]">
              {preselectedCoords ? 'Location Selected • Ready to Release' : 'Step 1: Fold your words'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 px-3.5 py-2 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleAction} className="space-y-4">
          <div className="relative">
            <textarea
              rows={6}
              autoFocus
              maxLength={320}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError('');
              }}
              placeholder="Write what you couldn't say, a memory you want to leave behind, or gentle words for someone passing by..."
              className="w-full p-4 rounded-xl font-['Playfair_Display'] text-base italic leading-relaxed border border-[#d6c2bb]/60 dark:border-[#38332D] bg-[#FFFEFA] dark:bg-[#161513] text-[#1b1c1a] dark:text-[#EDE8E1] focus:outline-none focus:ring-2 focus:ring-[#83523d] transition-all placeholder:text-[#84746d]/50"
            />
            <span className="absolute bottom-3 right-3 text-[11px] text-[#84746d] dark:text-[#8C8279]">
              {message.length} / 320
            </span>
          </div>

          <p className="text-[11px] text-[#84746d] dark:text-[#8C8279] leading-normal">
            <strong>Public Note Notice:</strong> Letters are placed openly on the physical map. Never include private phone numbers, real names, or home addresses.
          </p>

          <div className="mt-6 pt-4 border-t border-[#eae8e4] dark:border-[#2E2924] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-semibold text-[#52443e] dark:text-[#A89F95] hover:bg-[#efeeea] dark:hover:bg-[#25221F] transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-full bg-[#83523d] dark:bg-[#A9664E] text-white hover:bg-[#7a5741] dark:hover:bg-[#8F533D] text-xs font-semibold shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              {preselectedCoords ? 'Send Letter' : 'Choose Spot on Map →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
