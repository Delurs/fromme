import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import { LandingPage } from './components/LandingPage';
import { AboutModal } from './components/AboutModal';
import { HelpModal } from './components/HelpModal';
import { ComposeModal } from './components/ComposeModal';
import { SAMPLE_LETTERS } from './data/sampleLetters';
import type { Letter } from './types/letter';

export default function App() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    return (
      localStorage.getItem('fromme_theme') === 'dark' ||
      (!localStorage.getItem('fromme_theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
  });

  const [showLanding, setShowLanding] = useState<boolean>(true);
  const [letters, setLetters] = useState<Letter[]>(SAMPLE_LETTERS);
  const [selectedLetter, setSelectedLetter] = useState<Letter | null>(SAMPLE_LETTERS[0]);
  const [feltIds, setFeltIds] = useState<string[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);

  // Navigation Modals
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);

  // Compose & Map Placement State
  const [isComposeOpen, setIsComposeOpen] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [preselectedMapPoint, setPreselectedMapPoint] = useState<{ x: number; y: number } | null>(null);
  const [mapClickPromptPoint, setMapClickPromptPoint] = useState<{ x: number; y: number } | null>(null);
  const [isPickingLocationMode, setIsPickingLocationMode] = useState(false);
  const [placementConfirmationPoint, setPlacementConfirmationPoint] = useState<{ x: number; y: number } | null>(null);

  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('fromme_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('fromme_theme', 'light');
    }
  }, [isDark]);

  // Flow B Cancel placement
  const handleCancelPlacement = () => {
    setPendingMessage(null);
    setPlacementConfirmationPoint(null);
    setIsPickingLocationMode(false);
  };

  // Close modals or cancel placement on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAboutOpen(false);
        setIsHelpOpen(false);
        setIsComposeOpen(false);
        setMapClickPromptPoint(null);
        handleCancelPlacement();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Click on the map container to get percentage coordinates
  const handleMapCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // If clicking on an existing pin or floating UI card, ignore canvas click
    if (
      (e.target as HTMLElement).closest('[data-pin-element]') ||
      (e.target as HTMLElement).closest('[data-floating-card]') ||
      (e.target as HTMLElement).closest('button')
    ) {
      return;
    }

    if (!mapContainerRef.current) return;
    const rect = mapContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Use high-precision percentages to prevent integer-rounding coordinate snapping
    const xPercent = (clickX / rect.width) * 100;
    const yPercent = (clickY / rect.height) * 100;

    // Keep within safe map boundaries without arbitrary margin snapping
    const boundedX = Number(Math.max(1, Math.min(99, xPercent)).toFixed(2));
    const boundedY = Number(Math.max(2, Math.min(98, yPercent)).toFixed(2));

    if (isPickingLocationMode) {
      // Flow B: User already wrote note and is now confirming placement
      setPlacementConfirmationPoint({ x: boundedX, y: boundedY });
      setMapClickPromptPoint(null);
    } else {
      // Flow A: User simply clicked the map first
      setMapClickPromptPoint({ x: boundedX, y: boundedY });
      setPlacementConfirmationPoint(null);
    }
  };

  // Flow A Action: User confirms "Leave a letter here?" -> "Write Note"
  const handleOpenComposeFromMapPrompt = () => {
    if (!mapClickPromptPoint) return;
    setPreselectedMapPoint(mapClickPromptPoint);
    setMapClickPromptPoint(null);
    setIsComposeOpen(true);
  };

  // Flow A Send: Release note with already locked coordinates
  const handleSendWithCoords = (message: string, coords: { x: number; y: number }) => {
    const newLetter: Letter = {
      id: `ltr-${Date.now()}`,
      message,
      locationName: 'Secret Spot',
      timeAgo: 'Just now',
      feltCount: 0,
      xPercent: coords.x,
      yPercent: coords.y,
      coordinates: {
        lat: 40.73 + (coords.y / 100 - 0.5) * 0.05,
        lng: -73.99 + (coords.x / 100 - 0.5) * 0.05,
      },
    };

    setLetters((prev) => [newLetter, ...prev]);
    setSelectedLetter(newLetter);
    setIsComposeOpen(false);
    setPreselectedMapPoint(null);
  };

  // Flow B Step 1: User types note and clicks "Choose Spot on Map →"
  const handleProceedToPickLocation = (message: string) => {
    setPendingMessage(message);
    setIsComposeOpen(false);
    setShowLanding(false);
    setIsPickingLocationMode(true);
    setPlacementConfirmationPoint(null);
  };

  // Flow B Send: User confirms placement preview on map
  const handleConfirmPlacementSend = () => {
    if (!pendingMessage || !placementConfirmationPoint) return;

    const newLetter: Letter = {
      id: `ltr-${Date.now()}`,
      message: pendingMessage,
      locationName: 'Chosen Location',
      timeAgo: 'Just now',
      feltCount: 0,
      xPercent: placementConfirmationPoint.x,
      yPercent: placementConfirmationPoint.y,
      coordinates: {
        lat: 40.73 + (placementConfirmationPoint.y / 100 - 0.5) * 0.05,
        lng: -73.99 + (placementConfirmationPoint.x / 100 - 0.5) * 0.05,
      },
    };

    setLetters((prev) => [newLetter, ...prev]);
    setSelectedLetter(newLetter);

    // Reset Flow B state
    setPendingMessage(null);
    setPlacementConfirmationPoint(null);
    setIsPickingLocationMode(false);
  };

  // Reactions
  const handleToggleFelt = (letterId: string) => {
    const alreadyFelt = feltIds.includes(letterId);
    setFeltIds((prev) =>
      alreadyFelt ? prev.filter((id) => id !== letterId) : [...prev, letterId]
    );
    setLetters((prev) =>
      prev.map((ltr) =>
        ltr.id === letterId
          ? { ...ltr, feltCount: alreadyFelt ? ltr.feltCount - 1 : ltr.feltCount + 1 }
          : ltr
      )
    );
    if (selectedLetter?.id === letterId) {
      setSelectedLetter((prev) =>
        prev
          ? {
              ...prev,
              feltCount: alreadyFelt ? prev.feltCount - 1 : prev.feltCount + 1,
            }
          : null
      );
    }
  };

  const handleToggleSave = (letterId: string) => {
    setSavedIds((prev) =>
      prev.includes(letterId)
        ? prev.filter((id) => id !== letterId)
        : [...prev, letterId]
    );
  };

  return (
    <div className="w-full bg-[#fbf9f5] dark:bg-[#121110] min-h-dvh text-[#1b1c1a] dark:text-[#E8E4DD] transition-colors duration-300 select-none">
      {/* Fixed Top Header */}
      <Header
        isDark={isDark}
        isLanding={showLanding}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onNavigateHome={() => {
          setShowLanding(true);
          handleCancelPlacement();
          setMapClickPromptPoint(null);
        }}
        onExploreMap={() => setShowLanding(false)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {showLanding ? (
        <LandingPage
          onExploreMap={() => setShowLanding(false)}
        />
      ) : (
        /* Main Full-Screen Map Container */
        <main className="w-full min-h-dvh pt-14 sm:pt-16">
        <div
          ref={mapContainerRef}
          onClick={handleMapCanvasClick}
          className={`relative w-full h-[calc(100dvh-3.5rem)] sm:h-[calc(100dvh-4rem)] overflow-hidden bg-[#F5F2EB] dark:bg-[#161513] ${
            isPickingLocationMode ? 'cursor-crosshair' : 'cursor-default'
          }`}
        >
          {/* Cartographic SVG Map Background */}
          <svg
            className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-colors duration-300"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1440 900"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect className="map-land" fill="#F4EFE6" height="900" width="1440" />
            <path className="map-water" d="M0,0 L260,0 C320,240 290,460 250,650 C220,800 160,900 120,900 L0,900 Z" fill="#E2E7E4" />
            <path className="map-water" d="M1120,0 C980,180 880,300 940,430 C1000,560 1050,620 920,740 C840,820 720,870 620,900 L1440,900 L1440,0 Z" fill="#E2E7E4" />
            <path className="map-water" d="M980,560 C1090,520 1220,550 1440,580 L1440,900 L760,900 C830,830 920,780 970,710 C1010,650 970,590 980,560 Z" fill="#EFE9DC" />
            <rect className="map-park" fill="#E1EBE0" height="220" rx="16" stroke="#CCDBCB" strokeWidth="1.5" width="210" x="480" y="40" />
            <rect className="map-park" fill="#E1EBE0" height="80" rx="10" stroke="#CCDBCB" strokeWidth="1.5" width="110" x="530" y="520" />
            <path className="map-park" d="M370,410 C380,450 395,500 390,600" stroke="#CCDBCB" strokeLinecap="round" strokeWidth="10" />
            <path className="map-park" d="M370,410 C380,450 395,500 390,600" stroke="#D3E2D2" strokeLinecap="round" strokeWidth="5" />
            <path className="map-park" d="M860,730 C880,780 830,840 780,880" stroke="#CCDBCB" strokeLinecap="round" strokeWidth="12" />

            <g className="map-road-grid" opacity="0.85" stroke="#E8E0D2" strokeLinecap="round" strokeWidth="2">
              <line x1="420" x2="470" y1="100" y2="840" />
              <line x1="510" x2="560" y1="100" y2="840" />
              <line x1="600" x2="650" y1="100" y2="840" />
              <line x1="690" x2="740" y1="100" y2="840" />
              <line x1="780" x2="820" y1="100" y2="640" />
              <line x1="870" x2="900" y1="100" y2="520" />
              <line className="map-highway" stroke="#DFD4C3" strokeWidth="3.5" x1="700" x2="470" y1="60" y2="750" />
              <line x1="320" x2="960" y1="160" y2="130" />
              <line x1="320" x2="960" y1="230" y2="200" />
              <line x1="330" x2="940" y1="300" y2="270" />
              <line x1="340" x2="950" y1="370" y2="340" />
              <line x1="350" x2="970" y1="440" y2="410" />
              <line x1="360" x2="960" y1="510" y2="480" />
              <line x1="370" x2="920" y1="580" y2="550" />
              <line x1="380" x2="900" y1="650" y2="620" />
              <line x1="390" x2="840" y1="720" y2="690" />
              <line x1="400" x2="760" y1="790" y2="760" />
            </g>

            <path className="map-dashed animate-dash-flow" d="M790,750 C850,725 910,705 960,695" stroke="#D3C3B0" strokeDasharray="4 4" strokeWidth="4" />
            <path className="map-dashed animate-dash-flow" d="M760,800 C830,770 890,745 980,720" stroke="#D3C3B0" strokeDasharray="4 4" strokeWidth="4" />

            <text className="map-label" fill="#7A5C43" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="700" letterSpacing="4" textAnchor="middle" x="585" y="150">CENTRAL PARK</text>
            <text className="map-label" fill="#7A5C43" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fontWeight="600" letterSpacing="2" textAnchor="middle" x="585" y="565">WASHINGTON SQUARE</text>
            <text className="map-label" fill="#7A5C43" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="700" letterSpacing="5" textAnchor="middle" x="1160" y="720">BROOKLYN</text>
            <text className="map-label" fill="#7A5C43" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="700" letterSpacing="3" textAnchor="middle" x="440" y="370">CHELSEA</text>
            <text className="map-label" fill="#7A5C43" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fontWeight="600" letterSpacing="2" textAnchor="middle" x="450" y="610">GREENWICH VILLAGE</text>
          </svg>

          {/* Top-Left Active Writers Badge */}
          <div
            data-floating-card
            className={`animate-banner-in absolute top-3 left-3 sm:top-6 sm:left-6 z-20 items-center gap-3 ${
              isPickingLocationMode ? 'hidden md:flex' : 'flex'
            }`}
          >
            <div className="glass-pill px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2 transition-all">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#7B523A] dark:bg-[#C49A76] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#7B523A] dark:bg-[#C49A76]" />
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#1b1c1a] dark:text-[#E8E4DD] whitespace-nowrap">
                Active writers right now
              </span>
            </div>
          </div>

          {/* Top-Right Map Controls with Custom Artwork Icons */}
          <div
            data-floating-card
            className={`glass-pill animate-banner-in delay-75 absolute top-3 right-3 sm:top-6 sm:right-6 z-20 items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full transition-all ${
              isPickingLocationMode ? 'hidden md:flex' : 'flex'
            }`}
          >
            <button
              type="button"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer p-1 hover:scale-110 active:scale-95"
              title="Zoom in"
            >
              <img
                src="/zoom_in.png"
                alt="Zoom in"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
            </button>
            <button
              type="button"
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer p-1 hover:scale-110 active:scale-95"
              title="Zoom out"
            >
              <img
                src="/zoom_out.png"
                alt="Zoom out"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain"
              />
            </button>
            <span className="w-[1px] h-4 bg-gradient-to-b from-transparent via-[#C4A88E]/80 dark:via-[#52463B] to-transparent mx-0.5" />
            <button
              type="button"
              className="group w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center hover:bg-white/75 dark:hover:bg-white/10 hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85)] dark:hover:shadow-[inset_0_1px_0_0_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer p-1 hover:scale-110 active:scale-95"
              title="Locate Me"
            >
              <img
                src="/wanderer_compass.png"
                alt="Locate Me"
                className="w-6 h-6 sm:w-7 sm:h-7 object-contain transition-transform duration-500 group-hover:rotate-45"
              />
            </button>
          </div>

          {/* Top-Center Notification Banner for Flow B Location Selection */}
          {isPickingLocationMode && (
            <div
              data-floating-card
              className="glass-accent animate-banner-in absolute top-3 sm:top-6 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-1.5rem)] sm:w-auto max-w-md flex items-center justify-between sm:justify-center gap-2.5 sm:gap-3 text-[#1b1c1a] dark:text-[#EDE8E1] px-4 sm:px-5 py-2.5 rounded-2xl sm:rounded-full"
            >
              <div className="flex items-center gap-2 min-w-0">
                <span className="material-symbols-outlined text-[18px] shrink-0 animate-gentle-bob">touch_app</span>
                <span className="text-[11px] sm:text-xs font-semibold leading-tight">
                  Tap anywhere on the map to set your letter's location
                </span>
              </div>
              <button
                type="button"
                onClick={handleCancelPlacement}
                className="shrink-0 text-xs font-semibold opacity-85 hover:opacity-100 underline cursor-pointer px-1 transition-opacity"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Flow A: Map Click Prompt ("Leave a letter here?") */}
          {mapClickPromptPoint && !isPickingLocationMode && (
            <div key={`prompt-${mapClickPromptPoint.x}-${mapClickPromptPoint.y}`}>
              {/* Subtle ink ripple at the exact clicked map coordinate */}
              <span
                style={{ left: `${mapClickPromptPoint.x}%`, top: `${mapClickPromptPoint.y}%` }}
                className="animate-ink-ripple absolute w-8 h-8 rounded-full border-2 border-[#7B523A]/50 dark:border-[#C49A76]/50 pointer-events-none z-20"
              />

              {/* Location stamp with bottom tip accurately touching the cursor */}
              <div
                style={{ left: `${mapClickPromptPoint.x}%`, top: `${mapClickPromptPoint.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-30 select-none"
              >
                <img
                  src="/location_stamp.png"
                  alt="Location stamp"
                  className="animate-stamp-drop w-11 sm:w-12 h-auto object-contain drop-shadow-md block"
                />
              </div>

              {/* Popover Card (clamped horizontally and flipped vertically near top edge) */}
              <div
                data-floating-card
                style={{
                  left: `clamp(9.75rem, ${mapClickPromptPoint.x}%, calc(100% - 9.75rem))`,
                  top: `${mapClickPromptPoint.y}%`,
                }}
                className={`glass-card animate-paper-unfold absolute -translate-x-1/2 z-40 max-w-[calc(100%-1rem)] p-2.5 sm:p-3 rounded-xl flex items-center gap-2 sm:gap-2.5 ${
                  mapClickPromptPoint.y < 24 ? 'mt-3' : '-translate-y-full -mt-14'
                }`}
              >
                <img
                  src="/fountain_pen.png"
                  alt="Fountain pen"
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 animate-gentle-bob"
                />
                <span className="text-xs font-semibold text-[#1b1c1a] dark:text-[#EDE8E1] whitespace-nowrap">
                  Leave a letter here?
                </span>
                <button
                  type="button"
                  onClick={handleOpenComposeFromMapPrompt}
                  className="glass-accent px-2.5 sm:px-3 py-1 text-[#1b1c1a] dark:text-[#EDE8E1] text-xs font-semibold rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer whitespace-nowrap"
                >
                  Write Note
                </button>
                <button
                  type="button"
                  onClick={() => setMapClickPromptPoint(null)}
                  className="px-1.5 sm:px-2 py-1 text-xs text-[#1b1c1a]/70 dark:text-[#EDE8E1]/70 hover:text-[#1b1c1a] dark:hover:text-[#EDE8E1] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Flow B: Temporary Glowing Preview Pin & Confirmation Card ("Send" vs "Cancel") */}
          {placementConfirmationPoint && isPickingLocationMode && (
            <div key={`confirm-${placementConfirmationPoint.x}-${placementConfirmationPoint.y}`}>
              {/* Glowing Preview Pin */}
              <div
                style={{ left: `${placementConfirmationPoint.x}%`, top: `${placementConfirmationPoint.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
              >
                <span className="absolute -inset-4 rounded-full bg-white/40 dark:bg-white/20 animate-ping" />
                <span className="absolute -inset-2 rounded-full bg-white/30 dark:bg-white/15 animate-soft-halo" />
                <div className="animate-pin-entrance relative flex items-center justify-center">
                  <img
                    src="/pin_open_letter.png"
                    alt="Preview letter pin"
                    className="w-12 h-12 sm:w-14 sm:h-14 object-contain drop-shadow-lg animate-gentle-bob"
                  />
                </div>
              </div>

              {/* Confirmation Card (clamped horizontally and flipped vertically near top edge) */}
              <div
                data-floating-card
                style={{
                  left: `clamp(10rem, ${placementConfirmationPoint.x}%, calc(100% - 10rem))`,
                  top: `${placementConfirmationPoint.y}%`,
                }}
                className={`glass-card animate-paper-unfold absolute -translate-x-1/2 z-40 max-w-[calc(100%-1rem)] p-3 sm:p-3.5 rounded-xl flex items-center gap-2.5 sm:gap-3 ${
                  placementConfirmationPoint.y < 26 ? 'mt-8' : '-translate-y-full -mt-8'
                }`}
              >
                <img
                  src="/fountain_pen.png"
                  alt="Fountain pen"
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain shrink-0 animate-gentle-bob"
                />
                <div>
                  <p className="text-xs font-bold text-[#1b1c1a] dark:text-[#EDE8E1] whitespace-nowrap">
                    Place your letter here?
                  </p>
                </div>
                <div className="flex items-center gap-1.5 ml-1 sm:ml-2">
                  <button
                    type="button"
                    onClick={handleCancelPlacement}
                    className="px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-semibold text-[#1b1c1a]/75 dark:text-[#EDE8E1]/75 hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmPlacementSend}
                    className="glass-accent px-3.5 sm:px-4 py-1.5 rounded-lg text-[#1b1c1a] dark:text-[#EDE8E1] text-xs font-bold hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Existing Letter Markers on Map */}
          {letters.map((letter, idx) => {
            const isSelected = selectedLetter?.id === letter.id;

            return (
              <div
                key={letter.id}
                data-pin-element
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLetter(letter);
                  setMapClickPromptPoint(null);
                }}
                style={{
                  left: `${letter.xPercent}%`,
                  top: `${letter.yPercent}%`,
                  animationDelay: `${Math.min(idx * 55, 400)}ms`,
                }}
                className={`animate-pin-entrance group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 ease-out ${
                  isSelected ? 'z-20 scale-105' : 'z-10 hover:scale-115 hover:-translate-y-[56%]'
                }`}
              >
                {/* Active marker animated ping halo */}
                {isSelected && (
                  <>
                    <span className="absolute -inset-2 rounded-full bg-white/45 dark:bg-white/20 animate-ping opacity-75" />
                    <span className="absolute -inset-4 rounded-full bg-white/30 dark:bg-white/15 animate-soft-halo" />
                  </>
                )}

                <div className={`relative flex flex-col items-center ${isSelected ? 'animate-gentle-bob' : ''}`}>
                  <img
                    src={isSelected ? '/pin_open_letter.png' : '/pin_folded_note.png'}
                    alt={isSelected ? 'Open letter pin' : 'Folded note pin'}
                    className={`${
                      isSelected
                        ? 'w-12 h-12 sm:w-14 sm:h-14 drop-shadow-lg'
                        : 'w-10 h-10 sm:w-12 sm:h-12 drop-shadow-md group-hover:-rotate-6 group-hover:brightness-105'
                    } object-contain transition-all duration-300`}
                  />
                </div>
              </div>
            );
          })}

          {/* Floating Selected Note Card (Bottom-Left on desktop, docked above CTA on mobile) */}
          {selectedLetter && !isPickingLocationMode && (
            <div
              key={selectedLetter.id}
              data-floating-card
              className="glass-card glass-card-interactive animate-paper-unfold absolute left-3 right-3 sm:left-8 sm:right-auto bottom-20 sm:bottom-24 z-20 max-w-md w-auto sm:w-[420px] mx-auto sm:mx-0 max-h-[45dvh] sm:max-h-none overflow-y-auto rounded-2xl p-4 sm:p-5"
            >
              {/* Top specular glass highlight */}
              <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-[#E0BE9F]/45 to-transparent" />

              <div className="glass-divider-b flex items-center justify-between pb-2 sm:pb-2.5 mb-2 sm:mb-2.5">
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-[#7B523A] dark:text-[#C49A76]">
                  Selected Note
                </span>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 text-[#5C4433] dark:text-[#9A9086] text-[11px] font-semibold">
                    <img
                      src="/pocket_watch.png"
                      alt="Time"
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain"
                    />
                    <span>{selectedLetter.timeAgo}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSelectedLetter(null)}
                    aria-label="Minimize note"
                    title="Minimize note"
                    className="sm:hidden ml-1 w-6 h-6 rounded-full flex items-center justify-center text-[#1b1c1a]/70 dark:text-[#EDE8E1]/70 hover:bg-white/60 dark:hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[16px]">close</span>
                  </button>
                </div>
              </div>

              <div className="mb-3 sm:mb-3.5">
                <p className="font-['Playfair_Display'] text-[15px] sm:text-[17px] text-[#1b1c1a] dark:text-[#EDE8E1] leading-relaxed italic mb-2">
                  “{selectedLetter.message}”
                </p>
                {selectedLetter.locationName && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[#5C4433] dark:text-[#9A9086] text-[11px] sm:text-[12px]">
                    <img
                      src="/location_stamp.png"
                      alt="Location"
                      className="w-5 h-5 sm:w-6 sm:h-6 object-contain shrink-0"
                    />
                    <span className="font-medium text-[#1b1c1a] dark:text-[#DCD5CB]">
                      {selectedLetter.locationName}
                    </span>
                    {selectedLetter.detailLocation && (
                      <>
                        <span className="text-[#C4A88E] dark:text-[#524943]">—</span>
                        <span className="text-[#7A5C43] dark:text-[#8C8279] text-[11px]">
                          {selectedLetter.detailLocation}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="glass-divider-t flex items-center justify-between pt-2 sm:pt-2.5">
                <button
                  type="button"
                  onClick={() => handleToggleFelt(selectedLetter.id)}
                  aria-pressed={feltIds.includes(selectedLetter.id)}
                  className={`inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full text-[11px] sm:text-[12px] font-semibold transition-all duration-300 cursor-pointer active:scale-95 ${
                    feltIds.includes(selectedLetter.id)
                      ? 'glass-accent text-[#1b1c1a] dark:text-[#EDE8E1]'
                      : 'glass-pill text-[#1b1c1a]/80 dark:text-[#EDE8E1]/80 hover:brightness-105'
                  }`}
                >
                  <img
                    src="/heart_pressed.png"
                    alt="Felt"
                    className={`w-5 h-5 sm:w-6 sm:h-6 object-contain transition-transform ${
                      feltIds.includes(selectedLetter.id) ? 'animate-heart-pop' : ''
                    }`}
                  />
                  <span>Felt by {selectedLetter.feltCount}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleSave(selectedLetter.id)}
                  className="group text-[#1b1c1a]/80 dark:text-[#EDE8E1]/80 hover:text-[#1b1c1a] dark:hover:text-white transition-colors flex items-center gap-1.5 text-[11px] sm:text-[12px] font-semibold cursor-pointer"
                >
                  <img
                    src="/ribbon_bookmark.png"
                    alt="Bookmark"
                    className={`w-5 h-5 sm:w-6 sm:h-6 object-contain transition-all duration-300 ${
                      savedIds.includes(selectedLetter.id)
                        ? 'opacity-100 scale-115 -translate-y-0.5'
                        : 'opacity-70 group-hover:opacity-100 group-hover:-translate-y-0.5'
                    }`}
                  />
                  <span>{savedIds.includes(selectedLetter.id) ? 'Saved' : 'Save note'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Floating Call To Action (Bottom-Center) with Fountain Pen Icon */}
          {!isPickingLocationMode && (
            <div data-floating-card className="animate-reveal-up delay-150 absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 w-[calc(100%-1.5rem)] sm:w-auto max-w-md sm:max-w-none flex justify-center">
              <button
                type="button"
                onClick={() => {
                  setPreselectedMapPoint(null);
                  setMapClickPromptPoint(null);
                  setIsComposeOpen(true);
                }}
                className="glass-accent group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 sm:gap-3 text-[#1b1c1a] dark:text-[#EDE8E1] text-sm sm:text-base px-6 sm:px-12 sm:min-w-[280px] py-3 sm:py-3.5 rounded-xl transition-all duration-300 transform hover:-translate-y-1 tracking-wide cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <img
                  src="/fountain_pen.png"
                  alt="Fountain pen"
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain group-hover-pen"
                />
                <span className="font-semibold">Write a Letter</span>
              </button>
            </div>
          )}
        </div>
      </main>
      )}

      {/* Composer Modal */}
      <ComposeModal
        isOpen={isComposeOpen}
        preselectedCoords={preselectedMapPoint}
        onClose={() => {
          setIsComposeOpen(false);
          setPreselectedMapPoint(null);
        }}
        onSendWithCoords={handleSendWithCoords}
        onProceedToPickLocation={handleProceedToPickLocation}
      />

      {/* About & Help Modals */}
      <AboutModal isOpen={isAboutOpen} onClose={() => setIsAboutOpen(false)} />
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </div>
  );
}
