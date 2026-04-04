export default function Navbar() {
  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[80%] max-w-2xl z-50">
      <nav className="w-full flex items-center justify-center px-10 h-16 rounded-full shadow-2xl border border-white/10 backdrop-blur-xl bg-white/5">
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
      </nav>
    </header>
  );
}
