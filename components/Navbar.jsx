"use client"
import React, { useEffect, useState } from 'react'
import { Search, Plus, User } from "lucide-react";
import data from "@/data.json";
import Image from 'next/image';
import Link from 'next/link';

export const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("hero");

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);

        const sections = data.navLinks.map(link => link.href.replace("#", ""));
        
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px", 
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        sections.forEach((id) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => {
            window.removeEventListener("scroll", handleScroll);
            observer.disconnect();
        };
    }, []);

    return (
        <nav className={`fixed  left-1/2 -translate-x-1/2 mx-atuo  container z-50 transition-all duration-300 ${scrolled ? "nav py-2 bg-black/20 backdrop-blur-xl text-white h-28 rounded-2xl" : ""}`}>
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
                <Link href={"/"}>
                    <div className="flex items-center justify-center gap-3">
                        <div className="flex rounded-full h-16 w-16 justify-center bg-white items-center">
                            <Image src="/Logo.jpeg" alt="Logo" height={64} width={64} />
                        </div>

                        <span className="font-heading font-bold text-xl tracking-wider">{data.siteName}</span>
                    </div>
                </Link>

                <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
                    {data.navLinks.map((link) => (
                        <a
                            key={link.label}
                            href={link.href}
                            className={activeSection === link.href.replace("#", "") ? "text-red-500" : "transition-colors"}
                        >
                            {link.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}
