"use client";
import Link from "next/link";
import { MoveLeft, Palette, ExternalLink, Plus, Upload } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { useEffect, useState } from "react";
import { getAllArtistArt, getArtistProfile } from "@/service/art";
import { toast } from "sonner";
import { useAuthStore } from "@/store/user";
export default function ArtistProfile() {
  const params = useParams();
  const [artist, setartist] = useState(null);
  const [artistArtworks, setartistArtworks] = useState(null);
  const user = useAuthStore((state) => state.user);
  const usrId = params.userId;
  const {
    data,
    fn: getData,
    loading: fetchingData,
  } = useFetch(getArtistProfile);
  const {
    data:arts,
    fn: getArt,
    loading: fetchingArtworks,
  } = useFetch(getAllArtistArt);
const isUserProfile = user?.ID === usrId;

useEffect(() => {
  if (!usrId) return;

  if (isUserProfile) {
    setartist(user);
    getArt(usrId);
  } else {
    getData(usrId);
  }
}, [usrId, isUserProfile, user]);
  useEffect(() => {
    if (!isUserProfile) {
      if (!fetchingData) {
        if (!data) return;
        if (!data.Success) {
          toast.error(data.message);
          return;
        }
        setartist(data.Data.User);
        setartistArtworks(data.Data.Art);
      }
    } else {
      if (!fetchingArtworks) {
        if (!arts) return;
        console.log("Art", arts);
        if (!arts.Success) {
          toast.error(arts.message);
          return;
        }

        setartistArtworks(arts.Data);
      }
    }
  }, [data, arts]);

  if (fetchingData || fetchingArtworks) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }
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
          src={artist?.Image?.String || "/default.jpeg"}
          alt={artist?.Name}
          className="w-full h-full object-cover blur-sm opacity-40 scale-110"
        />

        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent"></div>

        <div className="absolute bottom-0 left-0 w-full p-6 md:p-12">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-end gap-8">
            <div className="relative md:-mb-10 w-32 h-32 md:w-60 md:h-60 rounded-full overflow-hidden shadow-2xl z-20 group border-4 border-black">
              <img
                src={artist?.Image?.String || "/default.jpeg"}
                alt={artist?.Name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 pb-4">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-accent font-semibold tracking-widest text-sm uppercase">
                  {artist?.Role}
                </span>
                <div className="h-px w-8 bg-accent/50"></div>
              </div>

              <h1 className="font-heading font-bold text-white text-5xl md:text-7xl leading-none">
                {artist?.Name}
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
                  Role
                </p>
                <p className="text-white font-medium">
                  {artist?.Role || "User"}
                </p>
              </div>

              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Batch
                </p>
                <p className="text-white font-medium">
                  {artist?.Batch || "Not specified"}
                </p>
              </div>

              {(artist?.SocialLinks?.instagram ||
                artist?.SocialLinks?.youtube) && (
                <div className="pt-4 border-t border-white/5 flex gap-4">
                  {artist?.SocialLinks?.instagram && (
                    <a
                      href={artist.SocialLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all group"
                    >
                      <Image
                        src="/instagram.svg"
                        height={20}
                        width={20}
                        alt="Instagram"
                        className="group-hover:scale-110 transition-transform"
                      />
                    </a>
                  )}

                  {artist?.SocialLinks?.youtube && (
                    <a
                      href={artist.SocialLinks.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl border border-white/10 flex items-center justify-center hover:border-accent hover:bg-accent/10 transition-all group"
                    >
                      <Image
                        src="/youtube.svg"
                        height={20}
                        width={20}
                        alt="YouTube"
                        className="group-hover:scale-110 transition-transform"
                      />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>

          <Link
            href="/"
            className="flex items-center gap-2 text-gray-500 hover:text-accent transition-colors group"
          >
            <MoveLeft
              size={18}
              className="group-hover:-translate-x-1 transition-transform"
            />
            Back to Community
          </Link>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <div className="glass rounded-2xl p-10 border border-white/5">
            <h2 className="text-2xl font-bold mb-4">About</h2>

            <p className="text-gray-300 leading-relaxed">
              {artist?.Description?.String?.trim()
                ? artist.Description.String
                : "This artist hasn't added a bio yet."}
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold">Featured Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {artistArtworks?.map((art) => (
                <div
                  key={art.ID}
                  className="group relative aspect-square rounded-2xl overflow-hidden glass border border-white/5"
                >
                  <img
                    src={art.Image}
                    alt={art.Name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-6">
                    <h4 className="text-xl font-bold text-white mb-1">
                      {art.Name}
                    </h4>

                    <p className="text-gray-300 text-sm line-clamp-2">
                      {art.Description?.String}
                    </p>

                    <Link href={`/u/${usrId}/${art.ID}`}>
                      <button className="mt-4 text-accent text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:opacity-80 transition-opacity">
                        View Details <ExternalLink size={12} />
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
              {isUserProfile && (
                <>
                  <div className="flex items-center justify-center">
                    <Link
                      href={"/art/create"}
                      className="flex items-center gap-2 justify-center rounded-full h-12 w-30 border bg-white font-semibold text-black text-center"
                    >
                      <Upload size={24} />
                      Upload
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
