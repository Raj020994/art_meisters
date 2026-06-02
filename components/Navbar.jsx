"use client";

import React, { useEffect, useState } from "react";
import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, LogOut , User2, UserIcon } from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const { data: session, status } = useSession();
  const user = session?.user;
  console.log(user);
  
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);

    window.addEventListener("scroll", handleScroll);

    const sections = data.navLinks.map((link) => link.href.replace("#", ""));

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);

      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 w-[95%] mx-auto -translate-x-1/2 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "rounded-2xl bg-black/80 backdrop-blur-xl text-white shadow-lg border border-white/5"
          : "text-white"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <Link href="/">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image
                src="/Logo.jpeg"
                alt="Logo"
                width={56}
                height={56}
                className="object-cover"
              />
            </div>

            <span className="font-heading text-lg font-bold tracking-wider md:text-xl">
              {data.siteName}
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-8 text-sm font-medium tracking-wide md:flex">
          {data.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`transition-colors hover:text-red-400 ${
                activeSection === link.href.replace("#", "")
                  ? "text-red-500"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {status === "authenticated" && user ? (
            <div className="relative hidden md:block">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2 focus:outline-none cursor-pointer"
              >
                <div className="relative h-11 w-11 overflow-hidden rounded-full border border-white/20 hover:border-red-500 transition-colors">
                {user.image?<> <Image
                    src={user.image }
                    alt="profile"
                    fill
                    className="object-cover"
                  /></>:<> 
                  <User2/>
                  </>}
                </div>
              </button>

              {dropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-30" 
                    onClick={() => setDropdownOpen(false)}
                  />
                  <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-white/10 bg-neutral-950/90 backdrop-blur-xl p-2.5 shadow-2xl z-40 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="px-3.5 py-2.5">
                      <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                      <p className="truncate text-xs text-white/50 font-mono mt-0.5">{user.email}</p>
                    </div>
                    <div className="h-px bg-white/10 my-1.5" />
                    <Link
                      href={`/u/${user.id}`}
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm text-white/80 hover:text-white hover:bg-white/5 transition-all"
                    >
                      <UserIcon className="size-4" />
                      My Profile
                    </Link>
                    <div className="h-px bg-white/10 my-1.5" />
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        signOut({ callbackUrl: "/" });
                      }}
                      className="flex w-full items-center gap-2.5 rounded-xl px-3.5 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-950/10 transition-all cursor-pointer"
                    >
                      <LogOut className="size-4" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-3">
              <Link href="/sign-in">
                <button className="rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-4 py-2 text-sm font-medium transition-all cursor-pointer">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up">
                <button className="rounded-xl bg-red-800 hover:bg-red-700 px-4 py-2 text-sm font-medium transition-all shadow-lg shadow-red-900/20 cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </div>
          )}

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-white"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4 pt-2 md:hidden border-t border-white/5 mt-2">
          {data.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`transition-colors hover:text-red-400 text-sm ${
                activeSection === link.href.replace("#", "")
                  ? "text-red-500 font-semibold"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="h-px bg-white/10 my-1" />
          {status === "authenticated" && user ? (
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 px-1">
                <div className="relative h-10 w-10 overflow-hidden flex justify-center items-center rounded-full border border-white/20">
               {user.image?<>
                  <Image
                    src={user.image}
                    alt="profile"
                    fill
                    className="object-cover"
                  />
               </>:<>
               <User2 className="p-2"/>
               </>}
                </div>
                <div>
                  <p className="truncate text-sm font-semibold text-white">{user.name}</p>
                  <p className="truncate text-xs text-white/50 font-mono">{user.email}</p>
                </div>
              </div>
              <Link
                href={`/u/${user.id}`}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 text-sm text-white/80 hover:text-white px-1 py-1"
              >
                <UserIcon className="size-4" />
                My Profile
              </Link>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  signOut({ callbackUrl: "/" });
                }}
                className="flex items-center gap-2.5 text-sm text-red-400 hover:text-red-300 text-left px-1 py-1 cursor-pointer"
              >
                <LogOut className="size-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <Link href="/sign-in" onClick={() => setMobileOpen(false)}>
                <button className="w-full rounded-xl border border-white/10 bg-white/5 py-2 text-sm font-medium transition-all text-center">
                  Sign In
                </button>
              </Link>
              <Link href="/sign-up" onClick={() => setMobileOpen(false)}>
                <button className="w-full rounded-xl bg-red-800 py-2 text-sm font-medium transition-all text-center">
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};


