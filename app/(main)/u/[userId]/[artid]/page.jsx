"use client";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Link from "next/link";
import { MoveLeft, ArrowRight, Check, Pencil, Ban, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { deleteArt, getArtProfileById } from "@/service/art";
import { useArtStore } from "@/store/art";
import { useAuthStore } from "@/store/user";
import { changeArtStatus } from "@/service/admin";
import { toast } from "sonner";
export default function ArtPage() {
  const params = useParams();
  const router = useRouter();
  const artId = params.artid;
  const userId = params.userId;
  const user = useAuthStore((state) => state.user);
  const [artist, setartist] = useState(user);
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
    if (artId && userId) {
      let payload = {
        id: artId,
        usrId: userId,
      };
      fetchArtFunc(payload);
    }
  }, [artId, artWork, userId]);
  useEffect(() => {
    if (res?.Success) {
      if (res.Data.Status === "rejected" && role == "user") {
        toast.error("Artwork is rejected");
        return;
      }
      addArt(res.Data);

      setArt(res.Data);
      setartist({
        id: res.Data.UserID,
        username: res.Data.Username?.String,
        image: res.Data.UserImage?.String,
      });
    }
  }, [res]);

  const {
    data: verdict,
    loading,
    error,
    fn: changeArtStatusFn,
  } = useFetch(changeArtStatus);
  const handleArtChange = (id, status) => {
    if (role !== "admin") {
      toast.error("You are not authorized to perform this action");
      return;
    }
    changeArtStatusFn(id, status);
  };
  useEffect(() => {
    if (error) {
      toast.error(error.message || "Failed to update artwork status");
    }
    if (verdict?.Success && !loading && !error) {
      toast.success(`Artwork successfully ${verdict.Data.Status}`);
    }
  }, [error, verdict]);
  const {
    data: deletedData,
    fn: deleteFn,
    loading: deleting,
  } = useFetch(deleteArt);
  const handleDelete = () => {
    if (role !== "artist") {
      toast.error("You are not authorized to perform this action");
      return;
    }
    deleteFn(artId);
  };
  useEffect(() => {
    if (deleting || !deletedData) return;
    if (!deletedData.Success) {
      toast.error(deletedData.message);
      return;
    }
    router.push(`/u/${userId}`);
  }, [deletedData, deleting]);
if (fetchingArt) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <p className="text-gray-400 text-lg animate-pulse">Loading artwork...</p>
    </main>
  );
}

if (!art?.Success || !art?.Data) {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-3">Artwork Not Found</h1>
        <p className="text-gray-400 mb-6">
          This artwork may have been removed or doesn’t exist.
        </p>
        <Link
          href="/"
          className="inline-flex px-5 py-3 bg-red-900 rounded-xl bg-accent text-white font-semibold hover:opacity-90 transition"
        >
          Go Back Home
        </Link>
      </div>
    </main>
  );
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
            <div className="absolute top-6 right-6 z-20 flex gap-3">
              {/* Artist edit */}
              {/* Artist actions */}

              {role === "artist" && (
                <>
                  {/* Edit */}

                  <Link
                    href={`/art/create?id=${artId}`}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-black/40 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all group"
                  >
                    <Pencil
                      size={18}
                      className="text-white group-hover:scale-110 transition-transform"
                    />
                  </Link>

                  {/* Delete */}

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <button className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 hover:bg-red-500/30 transition-all group">
                        <Trash2
                          size={18}
                          className="text-red-400 group-hover:scale-110 transition-transform"
                        />
                      </button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your Art from our servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          className={"bg-red-500 text-white hover:bg-red-600"}
                          onClick={() => handleDelete()}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </>
              )}

              {role === "admin" && (
                <>
                  {/* Show Approve if status is pending or banned */}
                  {(art?.data?.Status === "pending" ||
                    art?.data?.Status === "banned") && (
                    <button
                      onClick={() => handleArtChange(art?.data?.ID, "approved")}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-green-500/20 backdrop-blur-md border border-green-500/30 hover:bg-green-500/30 transition-all group"
                    >
                      <Check
                        size={18}
                        className="text-green-400 group-hover:scale-110 transition-transform"
                      />
                    </button>
                  )}

                  {/* Show Ban if status is pending or approved */}
                  {(art?.data?.Status === "pending" ||
                    art?.data?.Status === "approved") && (
                    <button
                      onClick={() => handleArtChange(art?.data?.ID, "rejected")}
                      className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500/20 backdrop-blur-md border border-red-500/30 hover:bg-red-500/30 transition-all group"
                    >
                      <Ban
                        size={18}
                        className="text-red-400 group-hover:scale-110 transition-transform"
                      />
                    </button>
                  )}
                </>
              )}
            </div>
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
                    src={artist?.image || "/placeholder.png"}
                    alt={artist?.name || "Artist"}
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
