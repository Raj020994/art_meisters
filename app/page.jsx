"use client";

import { Footer } from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap, { SplitText } from "gsap/all";
import { Artist } from "@/components/Artist";
import { Events } from "@/components/Events";
gsap.registerPlugin(ScrollTrigger, SplitText);

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


