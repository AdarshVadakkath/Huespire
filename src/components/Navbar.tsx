import logo from "../../public/logo.png";

export default function Navbar() {
  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6">
      <div className="relative flex items-center justify-between">
        {/* LEFT: Logo */}
        <div className="text-white font-bold text-lg tracking-wide bg-transparent">
          {/* or use image */}
          <img src={logo} alt="logo" className="h-20" />
        </div>

        {/* CENTER: Navbar */}
        <nav className="absolute left-1/2 -translate-x-1/2 w-[80%] max-w-2xl">
          <div className="flex items-center justify-center px-10 h-16 rounded-full shadow-2xl border border-white/10 backdrop-blur-xl bg-white/5">
            <div className="flex gap-16 text-center">
              {["Home", "About", "Services", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="relative text-base text-white/70 hover:text-white transition-all duration-300 hover:-translate-y-1 px-4 py-2"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* RIGHT: Button */}
        <div>
          <button className="px-5 py-2 rounded-full bg-white text-black font-medium hover:bg-white/80 transition">
            Book a Call
          </button>
        </div>
      </div>
    </header>
  );
}
