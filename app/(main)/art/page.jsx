"use client";

import { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { getAllArt } from "@/service/art";
import Link from "next/link";

const Page = () => {
  const { data: arts, loading, fn: getArts } = useFetch(getAllArt);
  const [artsArr, setArtsArr] = useState([]);

  useEffect(() => {
    getArts();
  }, []);

  useEffect(() => {
    if (!loading && arts?.Success) {
      setArtsArr([
        {
          ID: "f1a82033-e82a-4375-ac80-401e039e1111",
          Name: "Neon Skyline",
          Image: "/Drawing.png",
          UserID: "user-001",
        },
        {
          ID: "f2a82033-e82a-4375-ac80-401e039e2222",
          Name: "Forest Whisper",
          Image: "/Drawing1.png",
          UserID: "user-002",
        },
        {
          ID: "f3a82033-e82a-4375-ac80-401e039e3333",
          Name: "Ocean Depths",
          Image: "/Drawing2.png",
          UserID: "user-003",
        },
        {
          ID: "f4a82033-e82a-4375-ac80-401e039e4444",
          Name: "Golden Hour",
          Image: "/Drawing3.png",
          UserID: "user-004",
        },
        {
          ID: "f5a82033-e82a-4375-ac80-401e039e5555",
          Name: "Broken Reality",
          Image: "/Drawing4.png",
          UserID: "user-005",
        },
        {
          ID: "f6a82033-e82a-4375-ac80-401e039e6666",
          Name: "Midnight Bloom",
          Image: "/Drawing5.png",
          UserID: "user-006",
        },
        {
          ID: "f7a82033-e82a-4375-ac80-401e039e7777",
          Name: "Urban Chaos",
          Image: "/Drawing6.png",
          UserID: "user-007",
        },
        {
          ID: "f8a82033-e82a-4375-ac80-401e039e8888",
          Name: "Dream Layers",
          Image: "/Event1.jpeg",
          UserID: "user-008",
        },
        {
          ID: "f9a82033-e82a-4375-ac80-401e039e9999",
          Name: "Vintage Echoes",
          Image: "/Event2.jpeg",
          UserID: "user-009",
        },
        {
          ID: "f10a82033-e82a-4375-ac80-401e039e1010",
          Name: "Celestial Drift",
          Image: "/Event3.jpeg",
          UserID: "user-010",
        },
      ]);
    }
  }, [arts, loading]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl bg-black">
        Loading art...
      </div>
    );
  }

  return (
    <section>
      <div className="min-h-screen bg-black text-white px-6 py-10">
        <div className="mb-10 text-center">
          <h2 className="text-5xl font-bold tracking-tight">
            Art
            <span className="text-red-700 mx-2">Exhibition</span>
          </h2>
          <p className="text-white/60 mt-2">
            Discover creativity in every frame.
          </p>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-3 space-y-3">
          {artsArr.map((art) => (
            <div key={art.ID} className="break-inside-avoid overflow-hidden rounded-2xl relative group cursor-pointer">
              <Link
                href={`/u/${art.UserID}/${art.ID}`}
                className="absolute inset-0 z-10"
              />
              <img
                src={art.Image}
                alt={art.Name}
                className="w-full object-cover transition duration-300 group-hover:brightness-75"
              />
              <span
                className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full text-xs font-medium
                opacity-0 group-hover:opacity-100 transition duration-300
                ${
                  art.Status === "approved"
                    ? "bg-emerald-500/80 text-white"
                    : "bg-yellow-400/80 text-black"
                }`}
              >
                {art.Status}
              </span>
              <div
                className="absolute inset-0 flex flex-col justify-end p-3
              bg-linear-to-t from-black/70 via-black/10 to-transparent
              opacity-0 group-hover:opacity-100 transition duration-300"
              >
                <p className="text-sm font-semibold text-white truncate">
                  {art.Name}
                </p>

                {art.Description?.Valid && (
                  <p className="text-xs text-white/60 line-clamp-2 mt-0.5">
                    {art.Description.String}
                  </p>
                )}

                {art.Tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {art.Tags.map((tag, i) => (
                      <span key={i} className="text-xs text-white/50">
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;
