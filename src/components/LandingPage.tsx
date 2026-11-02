interface LandingPageProps {
  onExploreMap: () => void;
}

export function LandingPage({
  onExploreMap,
}: LandingPageProps) {
  return (
    <div className="w-full min-h-dvh pt-14 sm:pt-16 bg-[#fbf9f5] dark:bg-[#121110] text-[#1b1c1a] dark:text-[#E8E4DD] transition-colors duration-500">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[#eae8e4] dark:border-[#24211E]">
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
                <img
                  src="/pin_open_letter.png"
                  alt="Little notes"
                  className="w-6 h-6 sm:w-7 sm:h-7 object-contain animate-gentle-bob"
                />
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
                  <img
                    src="/wanderer_compass.png"
                    alt="Explore"
                    className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:scale-110"
                  />
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
                {/* Warm ambient glow behind glass card */}
                <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-gradient-to-tr from-[#D8C3A5]/50 via-[#CCDBCB]/35 to-white/45 dark:from-[#7B523A]/30 dark:via-[#3B2A1E]/20 dark:to-transparent blur-2xl opacity-85 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Decorative pure frosted glass back card with gentle counter-float */}
                <div className="animate-float-backcard absolute -inset-2 sm:-inset-3 rounded-3xl bg-white/25 dark:bg-white/[0.04] backdrop-blur-xl border border-white/80 dark:border-white/15 shadow-[inset_0_1.5px_1px_rgba(255,255,255,0.85),0_0_0_1px_rgba(180,148,118,0.16)] dark:shadow-[inset_0_1px_1px_rgba(255,248,238,0.16),0_0_0_1px_rgba(0,0,0,0.45)] pointer-events-none transition-transform duration-500 group-hover:rotate-3 group-hover:scale-[1.01]" />

                <div className="glass-card glass-card-interactive animate-float-slow relative overflow-hidden rounded-2xl p-6 sm:p-7">
                  {/* Top specular glass glint */}
                  <div className="pointer-events-none absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white dark:via-[#E0BE9F]/45 to-transparent" />

                  <div className="glass-divider-b flex items-center justify-between pb-3 mb-4">
                    <div className="flex items-center gap-2.5">
                      <img
                        src="/pin_open_letter.png"
                        alt="Found letter"
                        className="w-7 h-7 sm:w-8 sm:h-8 object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
                      />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-[#7B523A] dark:text-[#C49A76]">
                        A Note Found Nearby
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-[#7A5C43] dark:text-[#9A9086]">
                      <img
                        src="/pocket_watch.png"
                        alt="Time"
                        className="w-6 h-6 object-contain"
                      />
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
                      <img
                        src="/location_stamp.png"
                        alt="Location"
                        className="w-6 h-6 object-contain"
                      />
                      <span className="font-medium text-[#1b1c1a] dark:text-[#DCD5CB]">
                        Washington Sq Park
                      </span>
                      <span>— Bench #14</span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-[#7B523A] dark:text-[#C49A76] font-semibold">
                      <img
                        src="/heart_pressed.png"
                        alt="Felt"
                        className="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-115"
                      />
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
      <section className="animate-reveal-up delay-300 py-14 sm:py-20 px-4 sm:px-6 md:px-8 max-w-3xl mx-auto text-center">
        <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl text-[#1b1c1a] dark:text-[#F5EFE6] mb-4">
          Why we leave notes behind
        </h2>
        <p className="text-[15px] sm:text-base text-[#5C4433] dark:text-[#B8ACA0] leading-relaxed mb-4">
          Every street corner, park bench, and train platform holds a thousand unspoken stories.
          Sometimes it’s a thank-you to a stranger who shared their umbrella in the rain.
          Sometimes it’s a quiet goodbye, a fond memory, or a few kind words for the next person
          sitting alone with their thoughts.
        </p>
        <p className="text-[15px] sm:text-base text-[#5C4433] dark:text-[#B8ACA0] leading-relaxed">
          FromMe turns the map into a gentle collection of human moments. You don’t need an
          account or a following—just a place in mind and something honest to say.
        </p>
      </section>

      {/* How It Works (3 Simple Steps) */}
      <section className="relative overflow-hidden py-12 sm:py-16 border-y border-white/80 dark:border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.85),0_0_0_1px_rgba(196,168,142,0.18)] dark:shadow-[inset_0_1px_0_0_rgba(255,248,238,0.08)]">
        {/* Soft ambient warm blobs so the glass step cards refract subtle color */}
        <div className="pointer-events-none absolute -top-20 left-1/4 w-72 h-72 rounded-full bg-[#D8C3A5]/45 dark:bg-[#7B523A]/20 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-[#CCDBCB]/50 dark:bg-[#4A382B]/25 blur-3xl" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 md:px-8">
          <div className="animate-reveal-up delay-300 text-center mb-10 sm:mb-12">
            <span className="text-[11px] font-bold uppercase tracking-widest text-[#7B523A] dark:text-[#C49A76] block mb-2">
              Simple & Human
            </span>
            <h2 className="font-['Playfair_Display'] text-2xl sm:text-3xl text-[#1b1c1a] dark:text-[#F5EFE6]">
              How FromMe works
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
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
