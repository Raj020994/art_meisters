"use client";
import React from "react";
import { FeaturedEvent } from "@/components/FeaturedEvent";
import { Palette, User, Star, GraduationCap, LayoutGrid, MoveRight } from "lucide-react";
import data from "@/data.json";

const iconMap = {
  Palette: Palette,
  User: User,
  Star: Star,
  GraduationCap: GraduationCap,
  LayoutGrid: LayoutGrid,
};

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent  pb-12">
      {/* 1. NAVBAR */}
  

      {/* 2. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.heroImage} 
            alt="Hero abstract art" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent font-semibold tracking-widest text-sm uppercase">{data.heroLabel}</span>
              <div className="h-px w-12 bg-accent"></div>
            </div>
            
            <h1 className="font-heading font-bold text-6xl md:text-8xl leading-none mb-6">
              ART<br/>MEISTERS
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-300">
              Where <span className="text-accent font-medium">creativity</span> meets <span className="text-accent font-medium">expression.</span>
            </h2>
            
            <p className="text-gray-400 mb-10 text-lg max-w-md">
              {data.description}
            </p>
            
            <button className="bg-accent hover:bg-red-700 text-white px-8 py-4 rounded-full font-medium flex items-center gap-3 transition-all hover:shadow-[0_0_20px_rgba(229,9,20,0.6)] group">
              EXPLORE MORE 
              <MoveRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          <div className="w-8 h-1.5 bg-accent rounded-full"></div>
          <div className="w-8 h-1.5 bg-white/20 rounded-full hover:bg-white/40 cursor-pointer transition-colors"></div>
          <div className="w-8 h-1.5 bg-white/20 rounded-full hover:bg-white/40 cursor-pointer transition-colors"></div>
        </div>
      </section>

      {/* 3. CATEGORY BAR */}
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
          <a href="#" className="text-accent hover:text-red-400 flex items-center gap-2 font-medium group transition-colors  sm:flex">
            VIEW ALL ARTISTS
            <MoveRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.artists.map((artist) => (
            <ArtistCard
              key={artist.id}
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
          <a href="#" className="text-accent hover:text-red-400 flex items-center gap-2 font-medium group transition-colors hidden sm:flex">
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

     
    </main>
  );
}

// Subcomponents for cleaner code
function CategoryItem({ icon, title, subtitle, active }) {
  return (
    <div className="flex items-center gap-4 group cursor-pointer p-2 rounded-xl hover:bg-white/5 transition-colors">
      <div className={`p-3 rounded-xl transition-all duration-300 ${active ? 'bg-accent/10 shadow-[0_0_15px_rgba(229,9,20,0.3)]' : 'bg-white/5 group-hover:bg-white/10'}`}>
        {icon}
      </div>
      <div>
        <h4 className={`font-heading font-bold text-lg leading-tight ${active ? 'text-white' : 'text-gray-300 group-hover:text-white transition-colors'}`}>{title}</h4>
        <p className="text-xs text-gray-400">{subtitle}</p>
      </div>
    </div>
  );
}

function ArtistCard({ name, role, desc, img, instagram, youtube }) {
  return (
    <div className="glass rounded-2xl overflow-hidden group hover:-translate-y-2 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(229,9,20,0.1)] hover:border-white/20">
      <div className="h-64 overflow-hidden relative">
        <img 
          src={img} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="font-heading font-bold text-xl mb-1">{name}</h3>
        <p className="text-accent text-sm mb-3 font-medium">{role}</p>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          {desc}
        </p>
        <div className="flex gap-3">
          <a href={instagram} className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors">
            <img src="/instagram.svg" alt="Instagram" width="14" height="14" />
          </a>
          <a href={youtube} className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors">
            <img src="/youtube.svg" alt="YouTube" width="14" height="14" />
          </a>
        </div>
      </div>
    </div>
  );
}

function EventListItem({ date, month, title, desc, active }) {
  return (
    <div className={`glass rounded-2xl p-6 flex items-center gap-6 cursor-pointer transition-all duration-300 ${active ? 'border-accent/30 shadow-[0_0_20px_rgba(229,9,20,0.1)]' : 'hover:border-white/20 hover:bg-white/5'}`}>
      <div className="text-center min-w-[60px]">
        <div className={`font-heading font-bold text-3xl leading-none ${active ? 'text-accent' : 'text-white'}`}>{date}</div>
        <div className="text-xs font-bold tracking-widest text-gray-500 mt-1">{month}</div>
      </div>
      <div className="w-px h-12 bg-white/10"></div>
      <div className="flex-1">
        <h4 className="font-heading font-bold text-xl mb-1 text-white">{title}</h4>
        <p className="text-sm text-gray-400">{desc}</p>
      </div>
      <MoveRight className={`transition-transform duration-300 ${active ? 'text-accent' : 'text-gray-600'} ${active ? 'translate-x-0' : '-translate-x-2'}`} size={20} />
    </div>
  );
}
