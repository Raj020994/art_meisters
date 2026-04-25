"use client"
import React, { useEffect, useState } from 'react'
import { Search, Plus, User } from "lucide-react";
import data from "@/data.json";

export const Navbar = () => {
const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent text-white font-heading font-bold text-xl flex items-center justify-center transform -skew-x-12">
              {data.logoLetter}
            </div>
            <span className="font-heading font-bold text-xl tracking-wider">{data.siteName}</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {data.navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={link.active ? "text-accent" : "hover:text-accent transition-colors"}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <button className="hover:text-accent transition-colors"><Search size={20} /></button>
            <button className="w-8 h-8 rounded-full bg-accent flex items-center justify-center hover:bg-red-700 transition-colors shadow-[0_0_15px_rgba(229,9,20,0.5)]">
              <Plus size={18} />
            </button>
            <button className="hover:text-accent transition-colors"><User size={20} /></button>
          </div>
        </div>
      </nav>
  )
}
