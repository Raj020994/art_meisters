import React from 'react'
import { ArtistCard } from './ArtistCard'
import { MoveRight } from 'lucide-react'
import data from "@/data.json";
export const Artist = () => {
    return (
        <section id='artists' className="max-w-7xl mx-auto px-6 md:px-12 ">
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
    )
}
