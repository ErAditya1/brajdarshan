import Link from "next/link";
import {
  Facebook,
  Instagram,
  Youtube,
  MapPin,
  Mail,
  Phone,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-linear-to-b from-secondary to-[#010847] text-white  pb-10">
      <hr className="text-gray-500"/>
      <div className="container mx-auto px-4 md:px-6 pt-20">
        {/* ================= TOP GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* ===== Brand ===== */}
          <div className="space-y-5">
            <Link href="/" className="flex flex-column items-center gap-3">
              {/* Logo */}
              <img
                src="/logo/logo2.png"
                alt="Braj Darshan Logo"
                className="w-34  opacity-90"
              />

              {/* Brand Text */}
              {/* <span className="font-serif text-2xl font-bold tracking-tight">
                Braj
                <span className="text-[#E65100]">Darshan</span>
              </span> */}
            </Link>

            <p className="text-gray-400 text-sm leading-relaxed">
              Plan your spiritual journey to Vrindavan & Mathura. Discover
              sacred temples, festivals, trusted guides, and peaceful stays in
              the land of Shri Krishna.
            </p>

            {/* Social */}
            <div className="flex gap-4 pt-2">
              <a
                href="#"
                aria-label="Braj Darshan on Facebook"
                className="p-2 rounded-full bg-white/5 hover:bg-[#E65100]/20 text-gray-400 hover:text-[#E65100] transition-colors"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                aria-label="Braj Darshan on Instagram"
                className="p-2 rounded-full bg-white/5 hover:bg-[#E65100]/20 text-gray-400 hover:text-[#E65100] transition-colors"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                aria-label="Braj Darshan on YouTube"
                className="p-2 rounded-full bg-white/5 hover:bg-[#E65100]/20 text-gray-400 hover:text-[#E65100] transition-colors"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* ===== Explore ===== */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-6 text-[#FFF8F0]">
              Explore Braj
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/places"
                  className="hover:text-[#E65100] transition-colors"
                >
                  Temples in Vrindavan
                </Link>
              </li>
              <li>
                <Link
                  href="/places"
                  className="hover:text-[#E65100] transition-colors"
                >
                  Mathura Heritage
                </Link>
              </li>
              <li>
                <Link
                  href="/festivals"
                  className="hover:text-[#E65100] transition-colors"
                >
                  Festival Calendar
                </Link>
              </li>
              <li>
                <Link
                  href="/map"
                  className="hover:text-[#E65100] transition-colors"
                >
                  Sacred Map View
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== Services ===== */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-6 text-[#FFF8F0]">
              Plan Your Yatra
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link
                  href="/planner"
                  className="hover:text-[#E65100] transition-colors"
                >
                  Yatra Planner
                </Link>
              </li>
              <li>
                <Link
                  href="/hotels"
                  className="hover:text-[#E65100] transition-colors"
                >
                  Book Dharamshalas & Hotels
                </Link>
              </li>
              <li>
                <Link
                  href="/guides"
                  className="hover:text-[#E65100] transition-colors"
                >
                  Local Guides
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-[#E65100] transition-colors"
                >
                  Travel & Bhakti Tips
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== Contact ===== */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-6 text-[#FFF8F0]">
              Contact Us
            </h3>
            <ul className="space-y-4 text-sm text-gray-400">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#E65100] mt-0.5" />
                <span>108 Parikrama Marg, Vrindavan, Uttar Pradesh, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#E65100]" />
                <span>+91 7080 785 785</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-[#E65100]" />
                <span>namaste@brajdarshan.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= DIVIDER ================= */}
        <div className="h-px bg-linear-to-r from-transparent via-[#E65100]/30 to-transparent mb-8" />

        {/* ================= BOTTOM BAR ================= */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>© {new Date().getFullYear()} BrajDarshan. Made with FluteStack.</p>

          <div className="flex gap-6">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>

        {/* ================= BLESSING ================= */}
        <p className="mt-6 text-center text-xs text-gray-400 tracking-wide">
          ॐ नमो भगवते वासुदेवाय
        </p>
      </div>
    </footer>
  );
};
