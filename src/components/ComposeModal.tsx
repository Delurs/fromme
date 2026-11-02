import { useState } from 'react';

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

  if (!isOpen) return null;

  const handleClose = () => {
    setMessage('');
    setError('');
    onClose();
  };

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

    setMessage('');
    setError('');

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
      onClick={handleClose}
      className="animate-modal-backdrop fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/25 dark:bg-black/50 backdrop-blur-md"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="glass-card glass-modal animate-modal-card rounded-2xl max-w-lg w-full max-h-[calc(100dvh-1.5rem)] overflow-y-auto p-5 sm:p-8 relative"
      >
        <div className="pointer-events-none absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-[#E0BE9F]/45 to-transparent" />
        <button
          type="button"
          onClick={handleClose}
          aria-label="Close modal"
          className="glass-pill absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full flex items-center justify-center text-[#1b1c1a]/70 dark:text-[#E8E4DD]/70 hover:text-[#1b1c1a] dark:hover:text-[#EDE8E1] transition-all duration-200 hover:rotate-90 cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4 sm:mb-5 pr-8">
          <img
            src="/fountain_pen.png"
            alt="Write a Letter"
            className="w-9 h-9 sm:w-10 sm:h-10 object-contain shrink-0 animate-gentle-bob"
          />
          <div>
            <h2 className="font-['Playfair_Display'] text-[20px] sm:text-[22px] font-medium text-[#1b1c1a] dark:text-[#F5EFE6]">
              Write a Letter
            </h2>
            <p className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#7B523A] dark:text-[#C49A76]">
              {preselectedCoords ? 'Location Selected • Ready to Release' : 'Step 1: Fold your words'}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 px-3.5 py-2 rounded-lg bg-red-50/80 dark:bg-red-950/50 backdrop-blur-xs border border-red-200 dark:border-red-900/50 text-red-700 dark:text-red-300 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleAction} className="space-y-3.5 sm:space-y-4">
          <div className="relative">
            <textarea
              rows={5}
              autoFocus
              maxLength={320}
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                if (error) setError('');
              }}
              placeholder="Write what you couldn't say, a memory you want to leave behind, or gentle words for someone passing by..."
              className="glass-input w-full p-3.5 sm:p-4 pb-7 rounded-xl font-['Playfair_Display'] text-[15px] sm:text-base italic leading-relaxed text-[#1b1c1a] dark:text-[#EDE8E1] focus:outline-none focus:ring-2 focus:ring-[#7B523A] transition-all placeholder:text-[#7A5C43]/60"
            />
            <span className="absolute bottom-3 right-3 text-[11px] text-[#7A5C43] dark:text-[#8C8279]">
              {message.length} / 320
            </span>
          </div>

          <p className="text-[11px] text-[#7A5C43] dark:text-[#8C8279] leading-normal">
            <strong>Public Note Notice:</strong> Letters are placed openly on the physical map. Never include private phone numbers, real names, or home addresses.
          </p>

          <div className="glass-divider-t mt-5 sm:mt-6 pt-3.5 sm:pt-4 flex items-center justify-end gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="glass-pill px-4 py-2 rounded-full text-xs font-semibold text-[#1b1c1a]/80 dark:text-[#E8E4DD]/80 hover:text-[#1b1c1a] dark:hover:text-white hover:brightness-105 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="glass-accent px-5 sm:px-6 py-2.5 rounded-full text-[#1b1c1a] dark:text-[#EDE8E1] text-xs font-semibold transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              {preselectedCoords ? 'Send Letter' : 'Choose Spot on Map →'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
