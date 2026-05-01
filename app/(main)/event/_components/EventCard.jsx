import React, { useRef } from 'react';
import { Calendar, ArrowRight } from 'lucide-react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export const EventCard = ({ event }) => {
    const cardRef = useRef(null);
    const imageRef = useRef(null);
    const arrowRef = useRef(null);

    const handleMouseEnter = () => {
        gsap.to(imageRef.current, {
            scale: 1.1,
            duration: 0.6,
            ease: "power2.out"
        });
        gsap.to(arrowRef.current, {
            x: 5,
            opacity: 1,
            duration: 0.3
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imageRef.current, {
            scale: 1,
            duration: 0.6,
            ease: "power2.out"
        });
        gsap.to(arrowRef.current, {
            x: 0,
            opacity: 0.7,
            duration: 0.3
        });
    };

    return (
        <div 
            ref={cardRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:shadow-2xl hover:shadow-red-500/10 cursor-pointer h-full"
        >
            {/* Image Section */}
            <div className="relative h-72 w-full overflow-hidden">
                <img 
                    ref={imageRef}
                    src={event.image} 
                    alt={event.title} 
                    className="h-full w-full object-cover transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-transparent" />
                
                {/* Date Badge */}
                <div className="absolute top-6 left-6 flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-xl">
                    <span className="text-white font-bold text-2xl leading-none">{event.date}</span>
                    <span className="text-white/60 font-semibold tracking-widest text-[11px] uppercase mt-1">{event.month}</span>
                </div>

                {/* Status Badge */}
                <div className="absolute top-6 right-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur-md border ${
                        event.active 
                        ? "bg-green-500/20 text-green-400 border-green-500/30" 
                        : "bg-white/10 text-gray-400 border-white/10"
                    }`}>
                        {event.active ? "Upcoming" : "Completed"}
                    </span>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col grow space-y-4">
                <h3 className="text-3xl font-bold text-white group-hover:text-red-400 transition-colors duration-300 leading-tight">
                    {event.title}
                </h3>
                <p className="text-gray-400 line-clamp-2 text-base leading-relaxed font-light">
                    {event.desc}
                </p>
                
                <div className="mt-auto pt-6 flex items-center justify-between border-t border-white/5">
                    <div className="flex items-center gap-3 text-[11px] font-bold text-gray-500 uppercase tracking-[0.15em]">
                        <Calendar size={16} className="text-red-500" />
                        <span>ART SOCIETY EVENT</span>
                    </div>
                    <div ref={arrowRef} className="opacity-70 group-hover:text-red-400">
                        <ArrowRight size={24} />
                    </div>
                </div>
            </div>
        </div>
    );
};
