import React from "react";
import data from "@/data.json";
import Link from "next/link";
import { MoveLeft, Palette } from "lucide-react";
import Image from "next/image";

export default async function ArtistProfile({ params }) {
    const { id } = await params;
  const artist = data.artists.find((a) => a.id === id);

  if (!artist) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4">Artist Not Found</h1>
        <p className="text-gray-400 mb-8">
          The creator you're looking for doesn't exist in our community yet.
        </p>
        <Link
          href="/"
          className="text-accent hover:underline flex items-center gap-2"
        >
          <MoveLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent pb-20">
      {/* Hero Header */}
      <section className="relative h-[40vh] w-full overflow-hidden">
        <img
          src={artist.img}
          alt={artist.name}
          className="w-full h-full object-cover blur-sm opacity-40 scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="relative  md:-mb-10 w-32 h-32 md:w-60 md:h-60 rounded-2xl  shadow-2xl z-20 group">
              <img
                src={artist.img}
                alt={artist.name}
                className="w-full h-full rounded-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-accent font-semibold tracking-widest text-sm uppercase">
                  {artist.role}
                </span>
                <div className="h-px w-8 bg-accent/50"></div>
              </div>

              <h1 className="font-heading font-bold text-5xl md:text-7xl leading-none">
                {artist.name}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-32 md:pt-40 grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Sidebar Info */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass rounded-2xl p-8 border border-white/5">
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Palette size={20} className="text-accent" />
              Artist Details
            </h3>

            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Specialization
                </p>
                <p className="text-white font-medium">{artist.role}</p>
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Batch
                </p>
                <p className="text-white font-medium">2026 Society</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex gap-4">
                {/* Instagram */}
                {artist.instagram && (
                  <a
                    href={artist.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all"
                  >
                    <Image
                      src="/instagram.svg"
                      height={20}
                      width={20}
                      alt="Instagram"
                    />
                  </a>
                )}

                {/* YouTube */}
                {artist.youtube && (
                  <a
                    href={artist.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all"
                  >
                    <Image
                      src="/youtube.svg"
                      height={20}
                      width={20}
                      alt="YouTube"
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="glass rounded-2xl p-10 border border-white/5">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="text-gray-300 leading-relaxed">
              {artist.bio || "This artist hasn't added a bio yet."}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}