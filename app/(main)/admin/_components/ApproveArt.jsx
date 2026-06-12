"use client";
import React, { useEffect, useState } from "react";
import useFetch from "@/hooks/useFetch";
import { changeArtStatus } from "@/service/admin";
const ApproveArt = ({ art }) => {
  const [artWorks, setArtWorks] = useState(art ?? []);

  useEffect(() => {
    if (art) setArtWorks(art);
  }, [art]);
  const {
    data: res,
    loading,
    error,
    fn: changeArtStatusFn,
  } = useFetch(changeArtStatus);
  const handleArtChange = (id, status) => {
    changeArtStatusFn(id, status);
  };
  useEffect(() => {
    if (error) {
      toast.error(error.Message);
    }
    if(res?.Success&&!loading&&!error){
      setArtWorks(artWorks?.filter((art)=>art.ID!==res.Data.ID))
    }
  }, [error,res]);
  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-serif text-white mb-2">
          Pending Artworks
        </h2>
        <p className="text-gray-400 text-sm">
          Review newly submitted artworks for the gallery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {artWorks?.map((art) => (
          <div
            key={art.ID}
            className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex flex-col"
          >
            <div className="h-48 w-full relative">
              <img
                src={art.Image}
                alt={art.Name}
                className="w-full h-full object-cover"
              />

              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white capitalize">
                {art.Status}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl text-white font-medium truncate">
                  {art.Name}
                </h3>

                <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                  {art.Description?.Valid
                    ? art.Description.String
                    : "No description"}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {art.Tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 rounded bg-white/10 text-xs text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Submitted: {new Date(art.CreatedAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => {
                    handleArtChange(art.ID, "rejected");
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium"
                >
                  Reject
                </button>

                <button
                  onClick={() => {
                    handleArtChange(art.ID, "approved");
                  }}
                  className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors text-sm font-medium"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}

        {artWorks?.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500 border border-white/5 rounded-2xl bg-white/5 border-dashed">
            No pending artworks to review.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveArt;
