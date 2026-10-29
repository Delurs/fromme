import { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
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

  const [letters, setLetters] = useState<Letter[]>(SAMPLE_LETTERS);
  const [selectedLetter, setSelectedLetter] = useState<Letter>(SAMPLE_LETTERS[0]);
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

  // Flow B Cancel placement
  const handleCancelPlacement = () => {
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
    if (selectedLetter.id === letterId) {
      setSelectedLetter((prev) => ({
        ...prev,
        feltCount: alreadyFelt ? prev.feltCount - 1 : prev.feltCount + 1,
      }));
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
    <div className="w-full bg-[#fbf9f5] dark:bg-[#121110] min-h-screen text-[#1b1c1a] dark:text-[#E8E4DD] transition-colors duration-300 select-none">
      {/* Fixed Top Header */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark((prev) => !prev)}
        onOpenAbout={() => setIsAboutOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
      />

      {/* Main Full-Screen Map Container */}
      <main className="w-full min-h-screen pt-16">
        <div
          ref={mapContainerRef}
          onClick={handleMapCanvasClick}
          className={`relative w-full h-[calc(100vh-4rem)] overflow-hidden bg-[#F5F2EB] dark:bg-[#161513] ${isPickingLocationMode ? 'cursor-crosshair' : 'cursor-default'
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

            <path className="map-dashed" d="M790,750 C850,725 910,705 960,695" stroke="#D3C3B0" strokeDasharray="4 4" strokeWidth="4" />
            <path className="map-dashed" d="M760,800 C830,770 890,745 980,720" stroke="#D3C3B0" strokeDasharray="4 4" strokeWidth="4" />

            <text className="map-label" fill="#84746D" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="700" letterSpacing="4" textAnchor="middle" x="585" y="150">CENTRAL PARK</text>
            <text className="map-label" fill="#84746D" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fontWeight="600" letterSpacing="2" textAnchor="middle" x="585" y="565">WASHINGTON SQUARE</text>
            <text className="map-label" fill="#84746D" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="14" fontWeight="700" letterSpacing="5" textAnchor="middle" x="1160" y="720">BROOKLYN</text>
            <text className="map-label" fill="#84746D" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="12" fontWeight="700" letterSpacing="3" textAnchor="middle" x="440" y="370">CHELSEA</text>
            <text className="map-label" fill="#84746D" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="11" fontWeight="600" letterSpacing="2" textAnchor="middle" x="450" y="610">GREENWICH VILLAGE</text>
          </svg>

          {/* Top-Left Area Count Badge */}
          <div data-floating-card className="absolute top-6 left-6 z-20 flex items-center gap-3">
            <div className="bg-[#fbf9f5]/90 dark:bg-[#1D1B18]/90 backdrop-blur-md px-4 py-2 rounded-full shadow-xs flex items-center gap-2.5 border border-[#eae8e4]/60 dark:border-[#302B25] transition-colors">
              <span className="w-2 h-2 rounded-full bg-[#83523d] dark:bg-[#E2A78F] inline-block animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1b1c1a] dark:text-[#E8E4DD]">
                {letters.length} Letters Left in this Area
              </span>
            </div>
          </div>

          {/* Top-Right Map Controls with Custom Artwork Icons */}
          <div data-floating-card className="absolute top-6 right-6 z-20 flex items-center gap-1.5 bg-[#fbf9f5]/90 dark:bg-[#1D1B18]/90 backdrop-blur-md p-1.5 rounded-full shadow-md border border-[#eae8e4]/60 dark:border-[#302B25] transition-colors">
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#efeeea] dark:hover:bg-[#2C2824] transition-all cursor-pointer p-1.5 hover:scale-105 active:scale-95"
              title="Zoom in"
            >
              <img
                src="/zoom_in.png"
                alt="Zoom in"
                className="w-6 h-6 object-contain"
              />
            </button>
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#efeeea] dark:hover:bg-[#2C2824] transition-all cursor-pointer p-1.5 hover:scale-105 active:scale-95"
              title="Zoom out"
            >
              <img
                src="/zoom_out.png"
                alt="Zoom out"
                className="w-6 h-6 object-contain"
              />
            </button>
            <span className="w-[1px] h-4 bg-[#d6c2bb]/60 dark:bg-[#3E3831] mx-0.5" />
            <button
              type="button"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#efeeea] dark:hover:bg-[#2C2824] transition-all cursor-pointer p-1.5 hover:scale-105 active:scale-95"
              title="Locate Me"
            >
              <img
                src="/wanderer_compass.png"
                alt="Locate Me"
                className="w-6 h-6 object-contain"
              />
            </button>
          </div>

          {/* Top-Center Notification Banner for Flow B Location Selection */}
          {isPickingLocationMode && (
            <div
              data-floating-card
              className="absolute top-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 bg-[#83523d] dark:bg-[#A9664E] text-white px-5 py-2.5 rounded-full shadow-2xl animate-bounce"
            >
              <span className="material-symbols-outlined text-[18px]">touch_app</span>
              <span className="text-xs font-semibold">
                Click anywhere on the map to set your letter's location
              </span>
              <button
                type="button"
                onClick={handleCancelPlacement}
                className="ml-2 text-xs opacity-80 hover:opacity-100 underline cursor-pointer"
              >
                Cancel
              </button>
            </div>
          )}

          {/* Flow A: Map Click Prompt ("Leave a letter here?") */}
          {mapClickPromptPoint && !isPickingLocationMode && (
            <>
              {/* Location stamp with bottom tip accurately touching the cursor */}
              <div
                style={{ left: `${mapClickPromptPoint.x}%`, top: `${mapClickPromptPoint.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full pointer-events-none z-30 select-none"
              >
                <img
                  src="/location_stamp.png"
                  alt="Location stamp"
                  className="w-9 h-auto object-contain drop-shadow-md block"
                />
              </div>

              {/* Popover Card */}
              <div
                data-floating-card
                style={{ left: `${mapClickPromptPoint.x}%`, top: `${mapClickPromptPoint.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full -mt-16 z-40 bg-[#fbf9f5] dark:bg-[#1E1C19] border border-[#83523d]/40 dark:border-[#E2A78F]/40 p-3 rounded-xl shadow-2xl flex items-center gap-2.5 animate-in fade-in zoom-in-95"
              >
                <img
                  src="/fountain_pen.png"
                  alt="Fountain pen"
                  className="w-5 h-5 object-contain"
                />
                <span className="text-xs font-semibold text-[#1b1c1a] dark:text-[#EDE8E1] whitespace-nowrap">
                  Leave a letter here?
                </span>
                <button
                  type="button"
                  onClick={handleOpenComposeFromMapPrompt}
                  className="px-3 py-1 bg-[#83523d] dark:bg-[#A9664E] text-white text-xs font-semibold rounded-lg hover:scale-105 active:scale-95 transition-all cursor-pointer shadow-xs"
                >
                  Write Note
                </button>
                <button
                  type="button"
                  onClick={() => setMapClickPromptPoint(null)}
                  className="px-2 py-1 text-xs text-[#84746d] hover:text-[#1b1c1a] dark:hover:text-[#EDE8E1] transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </>
          )}

          {/* Flow B: Temporary Glowing Preview Pin & Confirmation Card ("Send" vs "Cancel") */}
          {placementConfirmationPoint && isPickingLocationMode && (
            <>
              {/* Glowing Preview Pin */}
              <div
                style={{ left: `${placementConfirmationPoint.x}%`, top: `${placementConfirmationPoint.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30"
              >
                <span className="absolute -inset-4 rounded-full bg-[#83523d]/35 dark:bg-[#E2A78F]/35 animate-ping" />
                <span className="absolute -inset-2 rounded-full bg-[#83523d]/20 dark:bg-[#E2A78F]/25 animate-pulse" />
                <div className="relative w-12 h-12 rounded-full bg-[#83523d] dark:bg-[#A9664E] shadow-2xl ring-4 ring-[#fbf9f5] dark:ring-[#1E1C19] flex items-center justify-center p-2">
                  <img
                    src="/pin_open_letter.png"
                    alt="Preview letter pin"
                    className="w-7 h-7 object-contain animate-bounce"
                  />
                </div>
              </div>

              {/* Confirmation Card */}
              <div
                data-floating-card
                style={{ left: `${placementConfirmationPoint.x}%`, top: `${placementConfirmationPoint.y}%` }}
                className="absolute -translate-x-1/2 -translate-y-full -mt-7 z-40 bg-[#fbf9f5] dark:bg-[#1E1C19] border border-[#83523d] dark:border-[#E2A78F] p-3.5 rounded-xl shadow-2xl flex items-center gap-3 animate-in fade-in zoom-in-95"
              >
                <img
                  src="/fountain_pen.png"
                  alt="Fountain pen"
                  className="w-5 h-5 object-contain"
                />
                <div>
                  <p className="text-xs font-bold text-[#1b1c1a] dark:text-[#EDE8E1] whitespace-nowrap">
                    Place your letter here?
                  </p>
                </div>
                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    type="button"
                    onClick={handleCancelPlacement}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold text-[#52443e] dark:text-[#A89F95] hover:bg-[#efeeea] dark:hover:bg-[#25221F] transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleConfirmPlacementSend}
                    className="px-4 py-1.5 rounded-lg bg-[#83523d] dark:bg-[#A9664E] text-white text-xs font-bold hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer"
                  >
                    Send
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Existing Letter Markers on Map */}
          {letters.map((letter) => {
            const isSelected = selectedLetter.id === letter.id;

            return (
              <div
                key={letter.id}
                data-pin-element
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedLetter(letter);
                  setMapClickPromptPoint(null);
                }}
                style={{ left: `${letter.xPercent}%`, top: `${letter.yPercent}%` }}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-transform ${isSelected ? 'z-20 scale-105' : 'z-10 hover:scale-110'
                  }`}
              >
                {/* Active marker animated ping halo */}
                {isSelected && (
                  <>
                    <span className="absolute -inset-3 rounded-full bg-[#83523d]/20 dark:bg-[#E2A78F]/25 animate-ping opacity-75" />
                    <span className="absolute -inset-5 rounded-full bg-[#83523d]/10 dark:bg-[#E2A78F]/15" />
                  </>
                )}

                <div className="relative flex flex-col items-center">
                  <div
                    className={`rounded-full flex items-center justify-center transition-all ${isSelected
                      ? 'w-12 h-12 bg-[#83523d] dark:bg-[#A9664E] shadow-xl ring-4 ring-[#fbf9f5] dark:ring-[#1E1C19] p-2'
                      : 'w-10 h-10 bg-white dark:bg-[#25221F] shadow-md ring-2 ring-[#d6c2bb]/60 dark:ring-[#443D36] p-1.5 hover:shadow-lg'
                      }`}
                  >
                    <img
                      src={isSelected ? '/pin_open_letter.png' : '/pin_folded_note.png'}
                      alt={isSelected ? 'Open letter pin' : 'Folded note pin'}
                      className={`${isSelected ? 'w-7 h-7' : 'w-6 h-6'} object-contain`}
                    />
                  </div>

                  {isSelected && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#c58b72] dark:bg-[#5E3827] border border-[#fbf9f5] dark:border-[#1E1C19] flex items-center justify-center text-[8px] text-[#4d2613] dark:text-[#FFDBCD] font-serif font-bold">
                      ✦
                    </div>
                  )}
                </div>
              </div>
            );
          })}

          {/* Floating Selected Note Card (Bottom-Left) */}
          {selectedLetter && !isPickingLocationMode && (
            <div
              data-floating-card
              className="absolute left-4 sm:left-8 bottom-24 z-20 max-w-md w-[calc(100%-2rem)] sm:w-[420px] bg-[#fbf9f5]/95 dark:bg-[#1E1C19]/95 backdrop-blur-md rounded-2xl p-5 shadow-2xl border border-[#eae8e4]/60 dark:border-[#342F29] transition-colors duration-300"
            >
              <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-[#eae8e4]/60 dark:border-[#2D2823]">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#83523d] dark:text-[#E2A78F]">
                  Selected Note
                </span>
                <div className="flex items-center gap-1.5 text-[#52443e] dark:text-[#9A9086] text-[11px] font-semibold">
                  <img
                    src="/pocket_watch.png"
                    alt="Time"
                    className="w-5 h-5 object-contain"
                  />
                  <span>{selectedLetter.timeAgo}</span>
                </div>
              </div>

              <div className="mb-3.5">
                <p className="font-['Playfair_Display'] text-[17px] text-[#1b1c1a] dark:text-[#EDE8E1] leading-relaxed italic mb-2">
                  “{selectedLetter.message}”
                </p>
                {selectedLetter.locationName && (
                  <div className="flex items-center gap-2 text-[#52443e] dark:text-[#9A9086] text-[12px]">
                    <img
                      src="/location_stamp.png"
                      alt="Location"
                      className="w-5 h-5 object-contain shrink-0"
                    />
                    <span className="font-medium text-[#1b1c1a] dark:text-[#DCD5CB]">
                      {selectedLetter.locationName}
                    </span>
                    {selectedLetter.detailLocation && (
                      <>
                        <span className="text-[#d6c2bb] dark:text-[#524943]">—</span>
                        <span className="text-[#84746d] dark:text-[#8C8279] text-[11px]">
                          {selectedLetter.detailLocation}
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-2.5 border-t border-[#eae8e4]/60 dark:border-[#2D2823]">
                <button
                  type="button"
                  onClick={() => handleToggleFelt(selectedLetter.id)}
                  aria-pressed={feltIds.includes(selectedLetter.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[12px] font-semibold transition-colors shadow-xs cursor-pointer ${feltIds.includes(selectedLetter.id)
                    ? 'bg-[#c58b72] text-[#4d2613] dark:bg-[#5E3827] dark:text-[#FFDBCD]'
                    : 'bg-[#fdcdb3] dark:bg-[#3E291E] text-[#795540] dark:text-[#FFDBCD] hover:bg-[#ffdbcd]'
                    }`}
                >
                  <img
                    src="/heart_pressed.png"
                    alt="Felt"
                    className={`w-5 h-5 object-contain transition-transform ${feltIds.includes(selectedLetter.id) ? 'scale-110' : ''
                      }`}
                  />
                  <span>Felt by {selectedLetter.feltCount}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleToggleSave(selectedLetter.id)}
                  className="text-[#52443e] dark:text-[#A89F95] hover:text-[#83523d] dark:hover:text-[#E2A78F] transition-colors flex items-center gap-1.5 text-[12px] font-semibold cursor-pointer"
                >
                  <img
                    src="/ribbon_bookmark.png"
                    alt="Bookmark"
                    className={`w-5 h-5 object-contain ${savedIds.includes(selectedLetter.id)
                      ? 'opacity-100 scale-105'
                      : 'opacity-70 hover:opacity-100'
                      }`}
                  />
                  <span>{savedIds.includes(selectedLetter.id) ? 'Saved' : 'Save note'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Floating Call To Action (Bottom-Center) with Fountain Pen Icon */}
          {!isPickingLocationMode && (
            <div data-floating-card className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30">
              <button
                type="button"
                onClick={() => {
                  setPreselectedMapPoint(null);
                  setMapClickPromptPoint(null);
                  setIsComposeOpen(true);
                }}
                className="inline-flex items-center justify-center gap-3 bg-[#83523d]/40 dark:bg-[#A9664E]/40 text-white hover:bg-[#83523d]/60 dark:hover:bg-[#A9664E]/60 text-base px-10 sm:px-12 min-w-[260px] sm:min-w-[280px] py-3.5 rounded-xl shadow-2xl backdrop-blur-md transition-all transform hover:-translate-y-0.5 tracking-wide border border-[#83523d]/30 dark:border-[#E2A78F]/30 hover:shadow-[0_8px_24px_rgba(131,82,61,0.35)] dark:hover:shadow-[0_8px_24px_rgba(169,102,78,0.3)] cursor-pointer active:scale-95 whitespace-nowrap"
              >
                <img
                  src="/fountain_pen.png"
                  alt="Fountain pen"
                  className="w-6 h-6 object-contain"
                />
                <span className="font-semibold">Write a Letter</span>
              </button>
            </div>
          )}
        </div>
      </main>

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
