import { Heading } from "./Heading";
import LaserFlow from "./LaserFlow";
import bento from "../assets/bento1.mp4";
import bento1 from "../assets/bento2.mp4";
import bento5 from "../assets/bento5.mp4";
import bento3 from "../assets/bento3.mp4";

const CapabilitiesSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <section
        className="relative w-full flex flex-col items-center justify-start px-6 pb-20"
        style={{
          paddingTop: "100px",
          zIndex: 0,
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* Heading — just above the bento cards */}
          <Heading />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative z-0">
            <div className="md:col-span-2 group relative bg-white border border-zinc-200 rounded-3xl">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="flex gap-6 h-full">
                  {/* LEFT: Content */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-zinc-900 text-lg font-bold mb-1">
                        Marketing Automation AI
                      </h3>
                      <p className="text-zinc-700 font-medium text-sm mb-5">
                        Scale smarter with AI systems
                      </p>
                      <ul className="space-y-3 mb-6 font-semibold">
                        {[
                          {
                            label: "AI Workflows",
                            icon: (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <circle
                                  cx="8"
                                  cy="8"
                                  r="6"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                                <path
                                  d="M5 8l2 2 4-4"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ),
                          },
                          {
                            label: "Email Automation",
                            icon: (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <rect
                                  x="2"
                                  y="3"
                                  width="12"
                                  height="10"
                                  rx="2"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                                <path
                                  d="M2 6l6 4 6-4"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ),
                          },
                          {
                            label: "Lead Scoring",
                            icon: (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <polyline
                                  points="2,12 6,7 9,10 14,4"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ),
                          },
                          {
                            label: "CRM Integrations",
                            icon: (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <circle
                                  cx="5"
                                  cy="6"
                                  r="2.5"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                                <circle
                                  cx="11"
                                  cy="6"
                                  r="2.5"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                                <path
                                  d="M1 13c0-2 1.8-3 4-3s4 1 4 3"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M11 10c1.5 0 3.5.8 4 3"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ),
                          },
                        ].map((f) => (
                          <li
                            key={f.label}
                            className="flex items-center gap-3 text-sm text-zinc-700"
                          >
                            <span className="w-7 h-7 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
                              {f.icon}
                            </span>
                            {f.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="self-start flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-2xl hover:bg-zinc-700 transition-colors">
                      Explore Service
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6h8M6 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>

                  {/* RIGHT: AI Hub + Video */}
                  <div className="flex flex-col gap-4 w-52 flex-shrink-0">
                    {/* AI Hub */}

                    {/* Video */}
                    <div className="rounded-2xl overflow-hidden  flex-1 min-h-[100px]">
                      <video
                        className="w-full h-full object-cover"
                        src={bento}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-3 group relative bg-white border border-zinc-200 rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2 h-full">
                {/* LEFT SIDE */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                      Funnel & Web Design
                    </h3>
                    <p className="text-zinc-500 mb-6">
                      Designed to convert, not just look good
                    </p>

                    <ul className="space-y-3 text-sm text-zinc-700">
                      <li className="flex items-center gap-2">
                        ✅ Landing Pages
                      </li>
                      <li className="flex items-center gap-2">
                        ✅ Sales Funnels
                      </li>
                      <li className="flex items-center gap-2">
                        ✅ Mobile Optimization
                      </li>
                      <li className="flex items-center gap-2">
                        ✅ Lightning Speed UX
                      </li>
                    </ul>
                  </div>
                  <button className="self-start flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-2xl hover:bg-zinc-700 transition-colors">
                    Explore Service
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M6 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* RIGHT SIDE (VIDEO) */}
                <div className="relative h-[260px] md:h-full">
                  <video
                    src={bento5} // 🔁 replace with your video path
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Optional overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="md:col-span-3 group relative bg-white border border-zinc-200 rounded-3xl overflow-hidden">
              <div className="grid md:grid-cols-2 h-full">
                {/* LEFT SIDE */}
                <div className="p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-bold text-zinc-900 mb-3">
                      Funnel & Web Design
                    </h3>
                    <p className="text-zinc-500 mb-6">
                      Designed to convert, not just look good
                    </p>

                    <ul className="space-y-3 text-sm text-zinc-700">
                      <li className="flex items-center gap-2">
                        ✅ Landing Pages
                      </li>
                      <li className="flex items-center gap-2">
                        ✅ Sales Funnels
                      </li>
                      <li className="flex items-center gap-2">
                        ✅ Mobile Optimization
                      </li>
                      <li className="flex items-center gap-2">
                        ✅ Lightning Speed UX
                      </li>
                    </ul>
                  </div>

                  <button className="self-start flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-2xl hover:bg-zinc-700 transition-colors">
                    Explore Service
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M6 2l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* RIGHT SIDE (VIDEO) */}
                <div className="relative h-[260px] md:h-full">
                  <video
                    src={bento3} // 🔁 replace with your video path
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />

                  {/* Optional overlay glow */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="md:col-span-2 group relative bg-white border border-zinc-200 rounded-3xl">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="flex gap-6 h-full">
                  {/* LEFT: Content */}
                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-zinc-900 text-lg font-bold mb-1">
                        Marketing Automation AI
                      </h3>
                      <p className="text-zinc-700 text-sm mb-5 font-medium">
                        Scale smarter with AI systems
                      </p>
                      <ul className="space-y-3 mb-6 font-semibold">
                        {[
                          {
                            label: "AI Workflows",
                            icon: (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <circle
                                  cx="8"
                                  cy="8"
                                  r="3"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                                <path
                                  d="M8 2v2M8 12v2M2 8h2M12 8h2"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ),
                          },
                          {
                            label: "Email Automation",
                            icon: (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <rect
                                  x="2"
                                  y="3"
                                  width="12"
                                  height="10"
                                  rx="2"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                                <path
                                  d="M2 6l6 4 6-4"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ),
                          },
                          {
                            label: "Lead Scoring",
                            icon: (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <polyline
                                  points="2,12 6,7 9,10 14,4"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ),
                          },
                          {
                            label: "CRM Integrations",
                            icon: (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 16 16"
                                fill="none"
                              >
                                <circle
                                  cx="5"
                                  cy="6"
                                  r="2.5"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                                <circle
                                  cx="11"
                                  cy="6"
                                  r="2.5"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                />
                                <path
                                  d="M1 13c0-2 1.8-3 4-3s4 1 4 3"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                                <path
                                  d="M11 10c1.5 0 3.5.8 4 3"
                                  stroke="currentColor"
                                  strokeWidth="1.2"
                                  strokeLinecap="round"
                                />
                              </svg>
                            ),
                          },
                        ].map((f) => (
                          <li
                            key={f.label}
                            className="flex items-center gap-3 text-sm text-zinc-700"
                          >
                            <span className="w-7 h-7 rounded-lg border border-zinc-200 bg-zinc-50 flex items-center justify-center text-zinc-500 flex-shrink-0">
                              {f.icon}
                            </span>
                            {f.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <button className="self-start flex items-center gap-2 bg-zinc-900 text-white text-sm font-medium px-5 py-2.5 rounded-2xl hover:bg-zinc-700 transition-colors">
                      Explore Service
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
                        <path
                          d="M2 6h8M6 2l4 4-4 4"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex flex-row gap-4 w-52 flex-shrink-0">
                    {/* AI Hub */}

                    {/* Video */}
                    <div className="rounded-2xl overflow-hidden  flex-1 min-h-[100px]">
                      <video
                        className="w-full h-full object-cover"
                        src={bento1}
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapabilitiesSection;
