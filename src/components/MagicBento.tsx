import LaserFlow from "./LaserFlow";

const CapabilitiesSection = () => {
  return (
    <div className="relative w-full overflow-hidden">
      <section
        className="relative w-full flex flex-col items-start justify-start  px-6 pb-20"
        style={{
          paddingTop: "100px",
          zIndex: 0,
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          {/* LaserFlow wrapper — sits above the grid, negative margin pulls it down into cards */}

          <div className="grid grid-cols-1 md:grid-cols-5 gap-5 relative z-0">
            <div className="md:col-span-2 group relative bg-white border border-zinc-200 rounded-3xl">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="relative h-48 mb-6 flex items-center justify-center">
                  <div className="bg-zinc-100 border border-zinc-200 p-4 rounded-lg w-56">
                    <div className="space-y-2">
                      <div className="h-6 bg-zinc-200 rounded text-[10px] px-2 flex items-center text-zinc-400">
                        Run command...
                      </div>
                      <div className="h-6 bg-zinc-900 rounded flex justify-between px-2 text-[10px] text-white items-center">
                        <span>Mark Task</span>
                        <span>V</span>
                      </div>
                    </div>
                  </div>
                </div>
                <h3 className="text-zinc-900 text-lg font-bold">
                  Keyboard shortcuts.{" "}
                  <span className="text-zinc-400 font-normal">
                    Faster actions.
                  </span>
                </h3>
              </div>
            </div>

            <div className="md:col-span-3 group relative bg-white border border-zinc-200 rounded-3xl">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="relative h-48 mb-6 grid grid-cols-2 gap-3">
                  <div className="bg-zinc-50 border p-4 rounded-xl">
                    <p className="text-zinc-800 text-xs">
                      Refactor legacy code
                    </p>
                  </div>
                  <div className="bg-zinc-50 border p-4 rounded-xl mt-6">
                    <p className="text-zinc-800 text-xs">SEO improvements</p>
                  </div>
                </div>
                <h3 className="text-zinc-900 text-lg font-bold">
                  Team Planner.{" "}
                  <span className="text-zinc-400 font-normal">
                    Track tasks visually.
                  </span>
                </h3>
              </div>
            </div>

            <div className="md:col-span-3 group relative bg-white border border-zinc-200 rounded-3xl">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="relative h-48 mb-6 bg-zinc-50 rounded-lg p-3">
                  <div className="text-[10px] text-zinc-400 space-y-3">
                    <div>9 AM</div>
                    <div>10 AM</div>
                  </div>
                </div>
                <h3 className="text-zinc-900 text-lg font-bold">
                  Time-blocking.{" "}
                  <span className="text-zinc-400 font-normal">
                    Structured workflow.
                  </span>
                </h3>
              </div>
            </div>

            <div className="md:col-span-2 group relative bg-white border border-zinc-200 rounded-3xl">
              <div className="p-6 h-full flex flex-col justify-between">
                <div className="relative h-48 mb-6 flex items-center justify-center">
                  <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center text-zinc-500 text-sm font-bold">
                    Notif
                  </div>
                </div>
                <h3 className="text-zinc-900 text-lg font-bold">
                  Notifications.{" "}
                  <span className="text-zinc-400 font-normal">
                    Stay updated.
                  </span>
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CapabilitiesSection;
