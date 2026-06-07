"use client";

import React, { useEffect, useState } from "react";
import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import { Menu, User, X } from "lucide-react";
import useFetch from "@/hooks/useFetch";
import { getCurrUser } from "@/service/auth";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { data: user, fn:refetchUser,loading: userLoading } = useFetch(getCurrUser);
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
  useEffect(() => {
    refetchUser();
  }, []);
  return (
    <nav
      className={`fixed top-4 left-1/2 z-50 w-[95%] mx-auto -translate-x-1/2 transition-all duration-300 ${
        scrolled
          ? "rounded-2xl bg-black/20 backdrop-blur-xl text-white shadow-lg"
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
          {user ? (
            <>
              <div className="relative h-12 w-12 overflow-hidden flex items-center justify-center rounded-full border border-white/20">
              {user.Data.Image.String?
              <>
               <Image
                  src={user.Data.Image.String}
                  alt="profile"
                  fill
                  className="object-cover"
                /></>
              :<>
              <User className=" text-white"/>
              </>}
               
              </div>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden"
              >
                {mobileOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </>
          ) : (
            <>
              <Link href={"/sign-in"}>
                <button className="border px-3 py-2 rounded-md bg-red-900">
                  Login
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {mobileOpen && (
        <div className="flex flex-col gap-4 px-4 pb-4 pt-2 md:hidden">
          {data.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
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
      )}
    </nav>
  );
};
