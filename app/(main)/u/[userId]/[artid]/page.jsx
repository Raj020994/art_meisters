import React from 'react'
import data from "@/data.json";
import Link from 'next/link';
import { MoveLeft, ArrowRight } from "lucide-react";
import { ArtCard } from './_components/ArtCard';

export default async function ArtPage({ params }) {
    const resolvedParams = await params;
    const artId = resolvedParams.artid || resolvedParams.artId;
    const art = data.artworks.find((a) => String(a.id) === String(artId));
    if (!art){
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 pt-32">
                <h1 className="text-4xl font-bold mb-4">Art Not Found</h1>
                <p className="text-gray-400 mb-8">
                  The artwork with ID "{artId}" doesn't exist.
                </p>
                <Link
                  href="/"
                  className="text-accent hover:underline flex items-center gap-2"
                >
                  <MoveLeft size={20} /> Back to Home
                </Link>
            </div>
        )
    }

    const artist = data.artists.find((a) => String(a.id) === String(art.userId));
    const otherArtworks = data.artworks.filter(a => String(a.userId) === String(art.userId) && String(a.id) !== String(artId));

    return (
        <main className='min-h-screen bg-black text-white selection:bg-accent pb-20 pt-8  px-6 md:px-12'>
            <div className="max-w-7xl mx-auto">
                <Link 
                    href={`/u/${artist?.id}`}
                    className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition-colors group mb-8"
                >
                    <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Artist Profile
                </Link>

                {/* Bento Grid */}
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]'>
                    {/* Main Art Display - takes up 2 columns and 2 rows */}
                    <div className='md:col-span-2 md:row-span-2 glass rounded-3xl overflow-hidden relative border border-white/5 group h-[400px] md:h-[624px]'>
                        <img 
                            src={art.url} 
                            alt={art.title} 
                            className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-700'
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                            <h1 className='text-4xl md:text-6xl font-bold mb-2 font-heading tracking-tight'>{art.title}</h1>
                            <p className="text-accent font-semibold tracking-widest text-sm uppercase mt-2">
                              {artist?.name}
                            </p>
                        </div>
                    </div>

                    {/* Art Description Bento */}
                    <div className='glass rounded-3xl p-8 border border-white/5 flex flex-col justify-center h-full'>
                        <h2 className='text-xl font-bold mb-4 flex items-center gap-2'>
                            About the Artwork
                        </h2>
                        <p className='text-gray-300 leading-relaxed overflow-y-auto pr-2 custom-scrollbar'>
                            {art.description || "No description provided for this artwork."}
                        </p>
                    </div>


                    <div className='glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between h-full group'>
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                                    <img src={artist?.img || '/placeholder.png'} alt={artist?.name || 'Artist'} className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold line-clamp-1">{artist?.name}</h3>
                                    <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">{artist?.role}</p>
                                </div>
                            </div>
                            <p className='text-sm text-gray-400 mb-6 line-clamp-3'>{artist?.desc}</p>
                        </div>
                        
                        <Link href={`/${artist?.id}`} className="inline-flex items-center justify-between w-full py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10">
                            <span className="text-sm font-semibold">View Profile</span>
                            <ArrowRight size={16} className="text-accent group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </div>

                {/* Explore More from Artist */}
                {otherArtworks.length > 0 && (
                    <div className="mt-24">
                        <div className="flex justify-between items-end mb-8">
                            <div>
                                <h2 className="text-3xl font-bold font-heading">More by {artist?.name}</h2>
                                <p className="text-gray-500 mt-2">Explore other creations from this artist</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[250px] gap-6">
                            {otherArtworks.map((work, index) => {
                                // Dynamic bento sizing pattern based on index
                                let spanClass = "md:col-span-1 md:row-span-1";
                                if (index === 0) spanClass = "md:col-span-2 md:row-span-2"; // First one is big
                                else if (index === 3 || index === 4) spanClass = "md:col-span-2 md:row-span-1"; // Wide items
                                
                                return <ArtCard key={work.id} art={work} className={spanClass} />
                            })}
                        </div>
                    </div>
                )}
            </div>
        </main>
    )
}
