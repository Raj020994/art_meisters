"use client";
import React from "react";
import { FeaturedEvent } from "@/components/FeaturedEvent";
import { Palette, User, Star, GraduationCap, LayoutGrid, MoveRight } from "lucide-react";
import data from "@/data.json";
import { CategoryItem } from "@/components/CategoryItem";
import { ArtistCard } from "@/components/ArtistCard";
import { EventListItem } from "@/components/EventListItem";
import { Footer } from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import About from "@/components/About";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap, { SplitText } from "gsap/all";
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
  

      <HeroSection/>
      <About/>
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
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-accent font-semibold tracking-widest text-sm uppercase">OUR ARTISTS</span>
              <div className="h-px w-12 bg-accent/50"></div>
            </div>
            <h2 className="font-heading font-bold text-4xl">Meet Our Creators</h2>
          </div>
          <a href="#" className="text-accent hover:text-red-400 items-center gap-2 font-medium group transition-colors hidden sm:flex">
            VIEW ALL ARTISTS
            <MoveRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.artists.map((artist) => (
            <ArtistCard
              key={artist.id}
              id={artist.id}
              name={artist.name}
              role={artist.role}
              desc={artist.desc}
              img={artist.img}
              instagram={artist.instagram}
              youtube={artist.youtube}
            />
          ))}
        </div>
      </section>

      {/* 5. EVENTS SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 mb-32">
        <div className="flex justify-between items-end mb-12">
          <div>
            <div className="flex items-center gap-4 mb-3">
              <span className="text-accent font-semibold tracking-widest text-sm uppercase">UPCOMING EVENTS</span>
              <div className="h-px w-12 bg-accent/50"></div>
            </div>
            <h2 className="font-heading font-bold text-4xl">What's Happening</h2>
          </div>
          <a href="#" className="text-accent hover:text-red-400 items-center gap-2 font-medium group transition-colors hidden sm:flex">
            VIEW ALL EVENTS
            <MoveRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Events List */}
          <div className="flex flex-col gap-4 lg:col-span-1">
            {data.events.map((event) => (
              <EventListItem
                key={event.id}
                date={event.date}
                month={event.month}
                title={event.title}
                desc={event.desc}
                active={event.active}
              />
            ))}
          </div>

          {/* Featured Event */}
        <FeaturedEvent/> 
        </div>
      </section>
<Footer/>
     
    </main>
  );
}

// Subcomponents for cleaner code
