"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { MoveLeft, ArrowRight } from "lucide-react";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { getArtProfileById } from "@/service/art";
import { useArtStore } from "@/store/art";
import { useAuthStore } from "@/store/user";

export default function ArtPage() {
  const params = useParams();
  const [artist, setartist] = useState(null);
  const artId = params.artid;
  const userId = params.userId;
  const user = useAuthStore((state) => state.user);
  const role = user?.ID === userId ? "artist" : user?.Role;
  const [art, setArt] = useState(null);
  const artWork = useArtStore((state) => state.arts[artId]);
  const addArt = useArtStore((state) => state.addArt);
  const {
    data: res,
    fn: fetchArtFunc,
    loading: fetchingArt,
  } = useFetch(getArtProfileById);
  useEffect(() => {
    if (artWork) {
      setArt(artWork);
      return;
    }
    if (artId&&userId) {
      let payload={
        id:artId,
        usrId:userId
      }
      fetchArtFunc(payload);
    }
    
  }, [artId, artWork, userId]);
  useEffect(() => {
    if (res?.Success) {
      addArt(res.Data);

      setArt(res.Data);

    }
  }, [res]);

  if (fetchingArt && !art) {
    return <div>Loading...</div>;
  }

  if (!fetchingArt && !art) {
    return <div>Art Not Found</div>;
  }
  return (
    <main className="min-h-screen bg-black text-white selection:bg-accent pb-20 pt-8  px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <Link
          href={`/u/${art?.data?.UserID}`}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-accent transition-colors group mb-8"
        >
          <MoveLeft
            size={18}
            className="group-hover:-translate-x-1 transition-transform"
          />
          Back to Artist Profile
        </Link>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:auto-rows-[300px]">
          {/* Main Art Display - takes up 2 columns and 2 rows */}
          <div className="md:col-span-2 md:row-span-2 glass rounded-3xl overflow-hidden relative border border-white/5 group h-[400px] md:h-[624px]">
            <img
              src={art?.data?.Image}
              alt={art?.data?.Name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-2 font-heading tracking-tight">
                {art?.data?.Name}
              </h1>
              <p className="text-accent font-semibold tracking-widest text-sm uppercase mt-2">
                {artist?.Name}
              </p>
            </div>
          </div>

          {/* Art Description Bento */}
          <div className="glass rounded-3xl p-8 border border-white/5 flex flex-col justify-center h-full">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              About the Artwork
            </h2>
            <p className="text-gray-300 leading-relaxed overflow-y-auto pr-2 custom-scrollbar">
              {art?.data?.Description.String ||
                "No description provided for this artwork."}
            </p>
          </div>

          <div className="glass rounded-3xl p-8 border border-white/5 flex flex-col justify-between h-full group">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-white/10 shrink-0">
                  <img
                    src={artist?.Image || "/placeholder.png"}
                    alt={artist?.Name || "Artist"}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold line-clamp-1">
                    {artist?.name}
                  </h3>
                  <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">
                    {artist?.role}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-400 mb-6 line-clamp-3">
                {artist?.desc}
              </p>
            </div>

            <Link
              href={`/u/${art?.data?.UserID}`}
              className="inline-flex items-center justify-between w-full py-3 px-4 bg-white/5 hover:bg-white/10 rounded-xl transition-colors border border-white/10"
            >
              <span className="text-sm font-semibold">View Profile</span>
              <ArrowRight
                size={16}
                className="text-accent group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </div>
        </div>

        {/* Explore More from Artist */}
        {/* {otherArtworks.length > 0 && (
          <div className="mt-24">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-bold font-heading">
                  More by {artist?.name}
                </h2>
                <p className="text-gray-500 mt-2">
                  Explore other creations from this artist
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 md:auto-rows-[250px] gap-6">
              {otherArtworks.map((work, index) => {
                // Dynamic bento sizing pattern based on index
                let spanClass = "md:col-span-1 md:row-span-1";
                if (index === 0) spanClass = "md:col-span-2 md:row-span-2";
                else if (index === 3 || index === 4)
                  spanClass = "md:col-span-2 md:row-span-1";

                return (
                  <ArtCard key={work.id} art={work} className={spanClass} />
                );
              })}
            </div>
          </div>
        )} */}
      </div>
    </main>
  );
}
