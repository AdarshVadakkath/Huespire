import { useState } from "react";
import logo from "../../public/logo.png";

interface FooterLinkProps {
  children: React.ReactNode;
}

interface FooterColumnProps {
  title: string;
  links: string[];
}

const FooterLink: React.FC<FooterLinkProps> = ({ children }) => {
  const [hovered, setHovered] = useState<boolean>(false);

  return (
    <li>
      <a
        href="#"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="text-sm tracking-wide transition-colors duration-200"
        style={{
          color: "#ffffff",
          textDecoration: "none",
        }}
      >
        {children}
      </a>
    </li>
  );
};

const FooterColumn: React.FC<FooterColumnProps> = ({ title, links }) => (
  <div className="min-w-[140px]">
    <h4 className="text-white text-[0.95rem] font-semibold mb-5 tracking-wide">
      {title}
    </h4>
    <ul className="list-none p-0 m-0 flex flex-col gap-3">
      {links.map((link: string) => (
        <FooterLink key={link}>{link}</FooterLink>
      ))}
    </ul>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-black text-white relative pt-16 pb-56 overflow-x-hidden"
      style={{ fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}
    >
      {/* Top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.08) 30%, rgba(255,255,255,0.08) 70%, transparent)",
        }}
      />

      {/* Main content */}
      <div className="max-w-[1200px] mx-auto px-8 flex gap-16 flex-wrap relative z-10">
        {/* Brand */}
        <div className="flex-none w-[280px]">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-20 h-20 flex items-center justify-center flex-shrink-0">
              <img src={logo} alt="logo" />
            </div>

            <span className="text-[1.1rem] font-bold tracking-tight text-white">
              HUESPIRE
            </span>
          </div>

          <p className="text-white text-sm leading-relaxed m-0">
            © copyright HUESPIRE 2024. All rights reserved.
          </p>
        </div>

        {/* Links */}
        <div className="flex-1 flex gap-12 flex-wrap justify-end">
          <FooterColumn
            title="Pages"
            links={["All Products", "Studio", "Clients", "Pricing", "Blog"]}
          />
          <FooterColumn
            title="Socials"
            links={["Facebook", "Instagram", "Twitter", "LinkedIn"]}
          />
          <FooterColumn
            title="Legal"
            links={["Privacy Policy", "Terms of Service", "Cookie Policy"]}
          />
          <FooterColumn
            title="Register"
            links={["Sign Up", "Login", "Forgot Password"]}
          />
        </div>
      </div>

      {/* Bottom Wordmark */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center pointer-events-none overflow-hidden">
        <span
          className="font-extrabold whitespace-nowrap select-none leading-none text-white"
          style={{
            fontSize: "clamp(90px, 15vw, 200px)",
            letterSpacing: "0.2em",
          }}
        >
          HUESPIRE
        </span>
      </div>
    </footer>
  );
};

export default Footer;
