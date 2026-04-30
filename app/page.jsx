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
        <main className="min-h-screen bg-black text-white selection:bg-accent">


            <HeroSection />
            <About />
            <section className="relative z-20 max-w-5xl mx-auto px-6 -mt-16 mb-24">
                <div className="glass rounded-2xl p-6 flex justify-between items-center flex-wrap gap-6 md:gap-0">
                    {data.categories.map((cat, index) => {
                        const IconComponent = iconMap[cat.icon];
                        return (
                            <React.Fragment key={cat.id}>
                                {index > 0 && <div className="hidden md:block w-px h-12 bg-white/10"></div>}
                                <CategoryItem
                                    icon={<IconComponent className={cat.active ? "text-accent" : "text-gray-400 group-hover:text-accent transition-colors"} size={32} />}
                                    title={cat.title}
                                    subtitle={cat.subtitle}
                                    active={cat.active}
                                />
                            </React.Fragment>
                        );
                    })}
                </div>
            </section>

            {/* 4. ARTISTS SECTION */}
            <Artist />
            {/* 5. EVENTS SECTION */}
<Events/>
            <Footer />

        </main>
    );
}

// Subcomponents for cleaner code
