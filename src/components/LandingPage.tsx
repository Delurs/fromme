interface LandingPageProps {
  onExploreMap: () => void;
}

export function LandingPage({
  onExploreMap,
}: LandingPageProps) {
  return (
    <div className="w-full min-h-dvh pt-14 sm:pt-16 bg-[#fbf9f5] dark:bg-[#121110] text-[#1b1c1a] dark:text-[#E8E4DD] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Breathing Wave & Dark Beige Motion Background */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Ambient organic dark beige breathing wave SVGs */}
          <svg
            className="absolute inset-0 w-full h-full object-cover"
            viewBox="0 0 1440 800"
            fill="none"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="darkBeigeWave1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#C9B89D" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#BFAF96" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#A8967C" stopOpacity="0.4" />
              </linearGradient>
              <linearGradient id="darkBeigeWave2" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#D2C3AA" stopOpacity="0.35" />
                <stop offset="60%" stopColor="#C2AF91" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#9E876B" stopOpacity="0.32" />
              </linearGradient>
              <linearGradient id="darkBeigeWave3" x1="50%" y1="0%" x2="50%" y2="100%">
                <stop offset="0%" stopColor="#BAA485" stopOpacity="0.28" />
                <stop offset="100%" stopColor="#8F785C" stopOpacity="0.18" />
              </linearGradient>

              {/* Dark mode gradient overrides with rich, deep warm beige/umber tones */}
              <linearGradient id="darkBeigeWaveDark" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8C7456" stopOpacity="0.22" />
                <stop offset="50%" stopColor="#6E563B" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#533F2B" stopOpacity="0.25" />
              </linearGradient>
            </defs>

            {/* Back Wave Layer - Deep breathing oscillation */}
            <path
              className="animate-wave-breathe-3 dark:hidden"
              fill="url(#darkBeigeWave3)"
              d="M-80,260 C220,160 380,380 680,270 C980,160 1180,340 1520,240 L1520,850 L-80,850 Z"
            />
            {/* Mid Wave Layer - Counter oscillation */}
            <path
              className="animate-wave-breathe-2 dark:hidden"
              fill="url(#darkBeigeWave2)"
              d="M-60,340 C180,440 440,240 760,330 C1080,420 1260,260 1500,320 L1500,850 L-60,850 Z"
            />
            {/* Fore Wave Layer - Primary rhythmic wave motion */}
            <path
              className="animate-wave-breathe-1 dark:hidden"
              fill="url(#darkBeigeWave1)"
              d="M-100,430 C200,310 460,510 820,400 C1180,290 1340,460 1540,380 L1540,850 L-100,850 Z"
            />

            {/* Dark Mode Wave Layers */}
            <path
              className="animate-wave-breathe-2 hidden dark:block"
              fill="url(#darkBeigeWaveDark)"
              d="M-60,320 C240,440 480,260 800,350 C1120,440 1280,280 1500,340 L1500,850 L-60,850 Z"
            />
            <path
              className="animate-wave-breathe-1 hidden dark:block"
              fill="url(#darkBeigeWaveDark)"
              opacity="0.8"
              d="M-100,420 C220,300 480,500 840,390 C1200,280 1360,450 1540,370 L1540,850 L-100,850 Z"
            />
          </svg>

          {/* Soft blur overlay to give the waves an ethereal, silky breathing feel */}
          <div className="absolute inset-0 backdrop-blur-[64px] pointer-events-none opacity-60" />

          {/* Deep gradual gradient fade at the bottom to smoothly transition into the story section */}
          <div className="absolute inset-x-0 bottom-0 h-48 sm:h-64 bg-gradient-to-b from-transparent via-[#fbf9f5]/70 to-[#fbf9f5] dark:via-[#121110]/70 dark:to-[#121110] pointer-events-none" />
        </div>

        {/* Soft background cartographic hint with living path flow */}
        <div className="absolute inset-0 opacity-40 dark:opacity-20 pointer-events-none">
          <svg
            className="w-full h-full object-cover"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
            viewBox="0 0 1440 700"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              className="animate-dash-flow"
              d="M0,120 C320,200 520,60 880,160 C1140,230 1300,110 1440,150"
              stroke="#D8CBB8"
              strokeDasharray="6 6"
              strokeWidth="2"
            />
            <path
              d="M0,480 C380,410 690,560 1050,450 C1240,390 1350,430 1440,410"
              stroke="#D8CBB8"
              strokeWidth="1.5"
            />
            <circle
              className="animate-soft-halo"
               style={{ transformOrigin: '320px 180px' }}
              cx="320"
              cy="180"
              fill="#E1EBE0"
              opacity="0.5"
              r="95"
            />
            <circle
              className="animate-soft-halo delay-300"
              style={{ transformOrigin: '1120px 420px' }}
              cx="1120"
              cy="420"
              fill="#E2E7E4"
              opacity="0.5"
              r="130"
            />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-12 pb-16 sm:pt-20 sm:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Warm Human Copy */}
            <div className="lg:col-span-7 text-center lg:text-left">
              <div className="glass-pill animate-reveal-up inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full mb-6">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#7B523A] dark:text-[#C49A76]">
                  Little notes, left in the world
                </span>
              </div>

              <h1 className="animate-reveal-up delay-75 font-['Playfair_Display'] text-3xl sm:text-5xl lg:text-[54px] font-normal text-[#1b1c1a] dark:text-[#F5EFE6] leading-[1.18] tracking-tight mb-5">
                Some words belong to the places where we{' '}
                <span className="italic text-[#7B523A] dark:text-[#C49A76] inline-block transition-transform duration-500 hover:scale-[1.02]">
                  felt them.
                </span>
              </h1>

              <p className="animate-reveal-up delay-150 text-base sm:text-lg text-[#5C4433] dark:text-[#B8ACA0] leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
                FromMe is a quiet place to leave anonymous little letters on a shared map—tucked
                onto a park bench, outside a favorite coffee shop, or on a street corner that
                still means something to you.
              </p>

              <div className="animate-reveal-up delay-225 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                <button
                  type="button"
                  onClick={onExploreMap}
                  className="glass-accent group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl text-[#1b1c1a] dark:text-[#EDE8E1] font-semibold text-sm sm:text-base transition-all duration-300 transform hover:-translate-y-0.5 cursor-pointer active:scale-95"
                >
                  <span>Explore the Map</span>
                </button>
              </div>

              <p className="animate-reveal-up delay-300 mt-4 text-xs text-[#7A5C43] dark:text-[#8C8279]">
                No sign-ups, no profiles, no noise. Just honest words from real people.
              </p>
            </div>

            {/* Right Column: Sample Postcard Preview */}
            <div className="lg:col-span-5 animate-reveal-up delay-225">
              <div className="relative mx-auto max-w-md lg:max-w-none group">
                <div className="glass-card glass-card-interactive relative overflow-hidden rounded-2xl p-6 sm:p-7">
                  {/* Top specular glass glint */}
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-[#E0BE9F]/45 to-transparent" />

                  <div className="glass-divider-b flex items-center justify-between pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#7B523A] dark:text-[#C49A76]">
                        A Note Found Nearby
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#7A5C43] dark:text-[#9A9086]">
                      <span>Left 2 hrs ago</span>
                    </div>
                  </div>

                  <p className="font-['Playfair_Display'] italic text-lg sm:text-[19px] text-[#1b1c1a] dark:text-[#EDE8E1] leading-relaxed mb-5">
                    “A little reminder for whoever needs it today: you’re allowed to begin again.
                    The years you spent trying to survive were not wasted years; they were the
                    soil.”
                  </p>

                  <div className="glass-divider-t flex items-center justify-between pt-3 text-xs text-[#5C4433] dark:text-[#9A9086]">
                    <div className="flex items-center gap-1.5">
                      <span className="font-medium text-[#1b1c1a] dark:text-[#DCD5CB]">
                        Washington Sq Park
                      </span>
                      <span>— Bench #14</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[#7B523A] dark:text-[#C49A76] font-semibold">
                      <span>Felt by 428</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Brief Humanized Story / Description Section */}
      <section className="animate-reveal-up delay-300 py-16 sm:py-24 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto text-center">
        <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl text-[#1b1c1a] dark:text-[#F5EFE6] mb-5 tracking-tight">
          Why we leave notes behind
        </h2>
        <div className="space-y-4 text-base sm:text-lg text-[#5C4433] dark:text-[#B8ACA0] leading-relaxed">
          <p>
            Every street corner, park bench, and train platform holds a thousand unspoken stories.
            Sometimes it’s a thank-you to a stranger who shared their umbrella in the rain.
            Sometimes it’s a quiet goodbye, a fond memory, or a few kind words for the next person
            sitting alone with their thoughts.
          </p>
          <p>
            FromMe turns the map into a gentle collection of human moments. You don’t need an
            account or a following—just a place in mind and something honest to say.
          </p>
        </div>
      </section>

      {/* How It Works (3 Simple Steps) */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        {/* Soft edge fade masks on top and bottom instead of hard cut straight border lines */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-[#fbf9f5] dark:from-[#121110] to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#fbf9f5] dark:from-[#121110] to-transparent z-10" />

        {/* Soft ambient warm blobs so the glass step cards refract subtle color */}
        <div className="pointer-events-none absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#CCDBCB]/50 dark:bg-[#4A382B]/25 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="animate-reveal-up delay-300 text-center mb-12 sm:mb-16">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7B523A] dark:text-[#C49A76] block mb-2.5">
              Simple & Human
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl lg:text-4xl text-[#1b1c1a] dark:text-[#F5EFE6] tracking-tight">
              How FromMe works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {/* Step 1 */}
            <div className="glass-card glass-card-interactive group relative overflow-hidden animate-reveal-up delay-300 rounded-2xl p-6 hover:-translate-y-1.5">
              <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-[#E0BE9F]/45 to-transparent" />
              <div className="mb-4">
                <img
                  src="/pin_folded_note.png"
                  alt="Wander and read"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-medium text-[#1b1c1a] dark:text-[#F5EFE6] mb-2">
                1. Wander & read
              </h3>
              <p className="text-sm text-[#5C4433] dark:text-[#B8ACA0] leading-relaxed">
                Move around the map and tap on any little envelope you see. Read the thoughts,
                memories, and quiet wishes people have left in those exact spots.
              </p>
            </div>

            {/* Step 2 */}
            <div className="glass-card glass-card-interactive group relative overflow-hidden animate-reveal-up delay-400 rounded-2xl p-6 hover:-translate-y-1.5">
              <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-[#E0BE9F]/45 to-transparent" />
              <div className="mb-4">
                <img
                  src="/fountain_pen.png"
                  alt="Write from the heart"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain group-hover-pen transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-medium text-[#1b1c1a] dark:text-[#F5EFE6] mb-2">
                2. Write from the heart
              </h3>
              <p className="text-sm text-[#5C4433] dark:text-[#B8ACA0] leading-relaxed">
                Write a short note—something you wish you had said, a memory you want to keep
                alive, or a gentle reminder for a stranger passing by.
              </p>
            </div>

            {/* Step 3 */}
            <div className="glass-card glass-card-interactive group relative overflow-hidden animate-reveal-up delay-500 rounded-2xl p-6 hover:-translate-y-1.5">
              <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-[#E0BE9F]/45 to-transparent" />
              <div className="mb-4">
                <img
                  src="/location_stamp.png"
                  alt="Tuck it into a place"
                  className="w-12 h-12 sm:w-14 sm:h-14 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1"
                />
              </div>
              <h3 className="font-['Playfair_Display'] text-xl font-medium text-[#1b1c1a] dark:text-[#F5EFE6] mb-2">
                3. Tuck it into a place
              </h3>
              <p className="text-sm text-[#5C4433] dark:text-[#B8ACA0] leading-relaxed">
                Tap the spot on the map where your note belongs. Once you leave it there, anyone
                wandering by can unfold it and let you know they felt it too.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
