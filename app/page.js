"use client";

import Image from "next/image";
import { Search, Plus, User, Palette, Users, Star, GraduationCap, LayoutGrid, MapPin, Clock, Calendar, MoveRight, Send, Heart } from "lucide-react";

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.43z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor" stroke="none" />
    </svg>
  );
}
import { useState, useEffect } from "react";

export default function Home() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent selection:text-white pb-12">
      {/* 1. NAVBAR */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-nav py-4" : "bg-transparent py-6"}`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent text-white font-heading font-bold text-xl flex items-center justify-center transform -skew-x-12">
              A
            </div>
            <span className="font-heading font-bold text-xl tracking-wider">ART MEISTERS</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            <a href="#" className="text-accent">HOME</a>
            <a href="#" className="hover:text-accent transition-colors">ABOUT</a>
            <a href="#" className="hover:text-accent transition-colors">ARTISTS</a>
            <a href="#" className="hover:text-accent transition-colors">SOCIALS</a>
            <a href="#" className="hover:text-accent transition-colors">MERCHANDISE</a>
            <a href="#" className="hover:text-accent transition-colors">BLOG</a>
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

      {/* 2. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center pt-20">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2670&auto=format&fit=crop" 
            alt="Hero abstract art" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-r from-black via-black/80 to-transparent"></div>
          <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-accent font-semibold tracking-widest text-sm uppercase">ART SOCIETY</span>
              <div className="h-px w-12 bg-accent"></div>
            </div>
            
            <h1 className="font-heading font-bold text-6xl md:text-8xl leading-none mb-6">
              ART<br/>MEISTERS
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-light mb-6 text-gray-300">
              Where <span className="text-accent font-medium">creativity</span> meets <span className="text-accent font-medium">expression.</span>
            </h2>
            
            <p className="text-gray-400 mb-10 text-lg max-w-md">
              A platform to inspire, create and showcase the artists within us. Join our vibrant community of creators.
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
          <CategoryItem icon={<Palette className="text-accent" size={32} />} title="2026 Batch" subtitle="Current Artists" active />
          <div className="hidden md:block w-px h-12 bg-white/10"></div>
          <CategoryItem icon={<User className="text-gray-400 group-hover:text-accent transition-colors" size={32} />} title="2025 Batch" subtitle="Rising Talents" />
          <div className="hidden md:block w-px h-12 bg-white/10"></div>
          <CategoryItem icon={<Star className="text-gray-400 group-hover:text-accent transition-colors" size={32} />} title="Core Team" subtitle="The Pillars" />
          <div className="hidden md:block w-px h-12 bg-white/10"></div>
          <CategoryItem icon={<GraduationCap className="text-gray-400 group-hover:text-accent transition-colors" size={32} />} title="Alumni" subtitle="Our Legacy" />
          <div className="hidden md:block w-px h-12 bg-white/10"></div>
          <CategoryItem icon={<LayoutGrid className="text-gray-400 group-hover:text-accent transition-colors" size={32} />} title="All Artists" subtitle="Explore All" />
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
          <a href="#" className="text-accent hover:text-red-400 flex items-center gap-2 font-medium group transition-colors hidden sm:flex">
            VIEW ALL ARTISTS
            <MoveRight className="group-hover:translate-x-1 transition-transform" size={16} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ArtistCard 
            name="Arjun Verma" 
            role="Digital Artist" 
            desc="Blending imagination with digital brilliance."
            img="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=800&auto=format&fit=crop"
          />
          <ArtistCard 
            name="Ishita Sharma" 
            role="Watercolor Artist" 
            desc="Capturing emotions with every stroke."
            img="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800&auto=format&fit=crop"
          />
          <ArtistCard 
            name="Rohan Das" 
            role="Sketch Artist" 
            desc="Lines that speak beyond words."
            img="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop"
          />
          <ArtistCard 
            name="Meera Nair" 
            role="Acrylic Artist" 
            desc="Colors that bring stories to life."
            img="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop"
          />
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
            <EventListItem date="24" month="MAY" title="Canvas Clash 2026" desc="Inter-College Art Competition" active />
            <EventListItem date="10" month="JUN" title="Art Exhibition 2026" desc="Showcasing Talents" />
            <EventListItem date="21" month="JUN" title="Workshop: Watercolor" desc="Learn. Create. Inspire." />
          </div>

          {/* Featured Event */}
          <div className="lg:col-span-2 relative rounded-2xl overflow-hidden group glass h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1531058020387-3be344556be6?q=80&w=1200&auto=format&fit=crop" 
              alt="Art Exhibition" 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>
            
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 inline-block">
                Featured Event
              </span>
              <h3 className="font-heading font-bold text-3xl mb-2">Art Exhibition 2026</h3>
              <p className="text-gray-300 mb-6">A Celebration of Creativity</p>
              
              <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-300">
                <div className="flex items-center gap-2"><Calendar size={16} className="text-accent" /> 10 June 2026</div>
                <div className="flex items-center gap-2"><MapPin size={16} className="text-accent" /> City Art Gallery</div>
                <div className="flex items-center gap-2"><Clock size={16} className="text-accent" /> 11:00 AM Onwards</div>
              </div>
              
              <button className="bg-accent hover:bg-red-700 text-white px-6 py-2 rounded-full font-medium flex items-center gap-2 transition-all">
                LEARN MORE <MoveRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="border-t border-white/10 pt-16 pb-8 bg-black">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-accent text-white font-heading font-bold text-xl flex items-center justify-center transform -skew-x-12">
                  A
                </div>
                <span className="font-heading font-bold text-xl tracking-wider">ART MEISTERS</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                A community of passionate artists inspiring creativity and celebrating art in all its forms.
              </p>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/_artmeisters_?igsh=MWl6NmFsa3RsNXRnbQ=="  className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-accent transition-colors"><InstagramIcon size={18} /></a>
                <a href="#" className="w-10 h-10 rounded-full glass flex items-center justify-center hover:bg-accent transition-colors"><YoutubeIcon size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-accent">QUICK LINKS</h4>
              <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Artists</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Merchandise</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-accent">RESOURCES</h4>
              <ul className="flex flex-col gap-3 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Join Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Gallery</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Press Kit</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-heading font-bold text-lg mb-6 text-accent">NEWSLETTER</h4>
              <p className="text-gray-400 text-sm mb-4">Stay updated with our latest events and showcases.</p>
              <div className="flex relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-white/5 border border-white/10 rounded-lg py-3 px-4 pr-12 text-sm focus:outline-none focus:border-accent transition-colors text-white"
                />
                <button className="absolute right-1 top-1 bottom-1 w-10 bg-accent rounded-md flex items-center justify-center hover:bg-red-700 transition-colors">
                  <Send size={16} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 text-xs text-gray-500">
            <p>© 2026 Art Meisters. All Rights Reserved.</p>
            <p className="mt-2 md:mt-0 flex items-center gap-1">Designed with <Heart size={12} className="text-accent" /> by Art Meisters Team</p>
          </div>
        </div>
      </footer>
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

function ArtistCard({ name, role, desc, img }) {
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
          <a href="https://www.instagram.com/_artmeisters_?igsh=MWl6NmFsa3RsNXRnbQ==" className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors">
            <InstagramIcon size={14} />
          </a>
          <a href="#" className="w-8 h-8 rounded border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-accent hover:bg-accent/10 transition-colors">
            <YoutubeIcon size={14} />
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
