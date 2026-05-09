"use client";
import React from "react";

import { Palette, User, Star, GraduationCap, LayoutGrid } from "lucide-react";
import data from "@/data.json";
import { CategoryItem } from "@/components/CategoryItem";

import { Footer } from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap, { SplitText } from "gsap/all";
import { Artist } from "@/components/Artist";
import { Events } from "@/components/Events";
gsap.registerPlugin(ScrollTrigger, SplitText);
const iconMap = {
    Palette: Palette,
    User: User,
    Star: Star,
    GraduationCap: GraduationCap,
    LayoutGrid: LayoutGrid,
};

export default function Home() {
    return (
        <main className="min-h-screen p-0 bg-black text-white selection:bg-accent">
            <HeroSection />
            <About />
            <Artist />
            <Events />
            <Footer />
        </main>
    );
}

// Subcomponents for cleaner code
