"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Search,
  User,
  LogOut,
  LayoutDashboard,
  Shield,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { signOut, useSession } from "next-auth/react";
import { useClickOutside } from "@/hooks/useClickOutside";
import { AvatarButton } from "../ui/avatar-button";

export const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false); // desktop
  const [userSheet, setUserSheet] = useState(false); // mobile

  const pathname = usePathname();
  const router = useRouter();

  const navRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useClickOutside(navRef, () => setNavOpen(false));
  useClickOutside(userRef, () => setUserMenu(false));
  useClickOutside(sheetRef, () => setUserSheet(false));

  const { data: session, status } = useSession();
  const user: any = session?.user;

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Places", path: "/places" },
    { name: "Festivals", path: "/festivals" },
    { name: "Plan Trip", path: "/planner" },
    { name: "Blog", path: "/blog" },
    { name: "Gallery", path: "/gallery" },
  ];

  /* ---------- BODY SCROLL LOCK ---------- */
  useEffect(() => {
    document.body.style.overflow = navOpen || userSheet ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [navOpen, userSheet]);

  /* ---------- CLOSE ON ROUTE CHANGE ---------- */
  useEffect(() => {
    setNavOpen(false);
    setUserMenu(false);
    setUserSheet(false);
  }, [pathname]);

  const initials =
    user?.name
      ?.split(" ")
      .map((n: string) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[#FFF8F0]/80 border-b border-orange-200/30">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* ---------- LOGO ---------- */}
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo/icon.png" className="w-10 h-10" />
          <span className="font-serif font-bold text-xl text-orange-600">
            Braj<span className="text-blue-900">Darshan</span>
          </span>
        </Link>

        {/* ---------- DESKTOP NAV ---------- */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`relative text-sm font-medium transition-colors
              ${
                pathname === item.path
                  ? "text-orange-600"
                  : "text-gray-800 hover:text-orange-600"
              }`}
            >
              {item.name}
              {pathname === item.path && (
                <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-orange-500 rounded" />
              )}
            </Link>
          ))}
        </nav>

        {/* ---------- DESKTOP ACTIONS ---------- */}
        <div className="hidden md:flex items-center gap-3 relative">
          <button className="p-2 rounded-full hover:bg-orange-100">
            <Search size={20} />
          </button>

          {status !== "loading" && !user && (
            <>
              <Link
                href="/login"
                className="p-2 rounded-full hover:bg-orange-100"
              >
                <User size={20} />
              </Link>
              <button
                onClick={() => router.push("/login")}
                className="px-5 py-2 rounded-full text-sm font-semibold
                bg-linear-to-r from-orange-500 to-orange-600 text-white"
              >
                Begin Yatra
              </button>
            </>
          )}

          {user && (
            <>
              <button
                onClick={() => router.push("/planner")}
                className="px-5 py-2 rounded-full text-sm font-semibold
                bg-linear-to-r from-orange-500 to-orange-600 text-white"
              >
                Book Yatra
              </button>

              {/* USER DROPDOWN */}
              <div ref={userRef} className="relative">
               
                  <AvatarButton className="w-10 h-10 rounded-full bg-orange-100
                  flex items-center justify-center font-bold text-orange-600" onClick={() => setUserMenu((v) => !v)} image={user?.avatar.url} name={user.name}/>
              

                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b flex gap-2">
                        <AvatarButton image={user?.avatar.url} name={user.name}/>
                        <div>
                          <p className="font-semibold text-sm">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>

                      <Link href="/dashboard" className="menu-item">
                        <LayoutDashboard size={16} /> Dashboard
                      </Link>

                      <Link href="/profile" className="menu-item">
                        <User size={16} /> Profile
                      </Link>

                      {(user.role === "admin" || user.role === "editor") && (
                        <Link href="/admin" className="menu-item">
                          <Shield size={16} /> Admin Panel
                        </Link>
                      )}

                      <button
                        onClick={() => signOut({ callbackUrl: "/" })}
                        className="menu-item text-red-600 hover:bg-red-50"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </>
          )}
        </div>

        {/* ---------- MOBILE ACTIONS ---------- */}
        <div className="md:hidden flex items-center gap-2">
          {user ? (
            
            <AvatarButton onClick={() => setUserSheet(!userSheet)} image={user?.avatar.url} name={user.name}/>
          ) : (
            <Link
              href="/login"
              className="p-2 rounded-full hover:bg-orange-100"
            >
              <User size={20} />
            </Link>
          )}

          <button onClick={() => setNavOpen((v) => !v)} className="p-2">
            {navOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* ---------- MOBILE NAV ---------- */}
      <AnimatePresence>
        {navOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setNavOpen(false)}
            />

            <motion.div
              ref={navRef}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              className="fixed top-16 inset-x-0 z-50 bg-[#FFF8F0] border-b"
            >
              <nav className="flex flex-col p-5 gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    href={item.path}
                    className="text-lg font-medium py-2 border-b"
                    onClick={() => setNavOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {user ? (
                  <button
                    onClick={() => {
                      router.push("/planner");
                      setNavOpen(false);
                    }}
                    className="px-5 py-3 rounded-full text-sm font-semibold
                bg-linear-to-r from-orange-500 to-orange-600 text-white"
                  >
                    Book Yatra
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      router.push("/login");
                      setNavOpen(false);
                    }}
                    className="px-5 py-3 rounded-full text-sm font-semibold
                bg-linear-to-r from-orange-500 to-orange-600 text-white"
                  >
                    Get Started
                  </button>
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ---------- MOBILE USER SHEET ---------- */}
      <AnimatePresence>
        {userSheet && user && (
          <>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed top-95 inset-x-0 z-50
              bg-white rounded-t-3xl p-6"
              ref={sheetRef}
            >
              <div className="flex items-center gap-4 border-b pb-4">
                <AvatarButton className="border-none" image={user?.avatar.url} name={user.name}/>
                <div>
                  <p className="font-semibold">{user.name}</p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>

              <div className="mt-5 space-y-3">
                <Link href="/profile" className="sheet-btn">
                  Profile
                </Link>
                <Link href="/dashboard" className="sheet-btn primary">
                  Dashboard
                </Link>

                {(user.role === "admin" || user.role === "editor") && (
                  <Link href="/admin" className="sheet-btn">
                    Admin Panel
                  </Link>
                )}

                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="sheet-btn danger"
                >
                  Logout
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
