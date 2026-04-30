import data from "@/data.json";
import Link from "next/link";
import { MoveLeft, Calendar, MapPin, Clock } from "lucide-react";

export default async function EventDetail({ params }) {
  const { eventId } = await params;
  const event = data.events.find((e) => e.id === eventId);
  const featured = data.featuredEvent;

  if (!event) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
        <h1 className="text-4xl font-bold mb-4">Event Not Found</h1>
        <p className="text-gray-400 mb-8">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/"
          className="text-red-400 hover:underline flex items-center gap-2"
        >
          <MoveLeft size={20} /> Back to Home
        </Link>
      </div>
    );
  }

  const isFeatured = featured && featured.title === event.title;

  const registerLink =
    event.registerLink ||
    (isFeatured ? featured.registerLink : null) ||
    "https://forms.gle/YOUR_GOOGLE_FORM_LINK";

  return (
    <main className="min-h-screen bg-black text-white selection:bg-red-500 pb-20">
      {/* Banner Section */}
      <section className="w-full ">
        <div className="relative w-full h-[300px] md:h-[480px] overflow-hidden border-y border-white/10">
          <img
            src={isFeatured ? featured.image : event.image}
            alt={event.title}
            className="w-full h-full blur-sm object-cover scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          {/* Content Overlay */}
          <div className="absolute inset-0 flex items-end">
            <div className="max-w-6xl mx-auto w-full px-6 md:px-12 pb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              {/* Left Side (Logo + Title) */}
              <div className="flex items-center gap-5">
                {/* Event Logo */}
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-2xl overflow-hidden bg-black/60 backdrop-blur-md border border-white/10 shadow-xl flex items-center justify-center">
                  <img
                    src={event.logo || "/logo.png"}
                    alt="Event Logo"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Title */}
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${
                        event.active
                          ? "bg-green-500/20 text-green-400 border border-green-500/30"
                          : "bg-white/10 text-gray-300 border border-white/10"
                      }`}
                    >
                      {event.active ? "● Upcoming" : "● Completed"}
                    </span>

                    {isFeatured && (
                      <span className="px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-xs font-bold uppercase tracking-wider border border-red-500/30 backdrop-blur-md">
                        Featured
                      </span>
                    )}
                  </div>

                  <h1 className="font-heading font-bold text-3xl md:text-6xl leading-tight">
                    {event.title}
                  </h1>
                  <p className="text-gray-300 mt-2 text-base md:text-lg max-w-xl">
                    {event.desc}
                  </p>
                </div>
              </div>

              {/* Right Side (Date + Register Button) */}
              <div className="flex items-center gap-4">
                {/* Date Badge */}
                <div className="flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                  <span className="text-white font-bold text-2xl md:text-3xl leading-none">
                    {event.date}
                  </span>
                  <span className="text-white/60 font-semibold tracking-widest text-xs uppercase mt-1">
                    {event.month}
                  </span>
                </div>

                {/* Register Button */}
                {event.active && (
                  <a
                    href={registerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 rounded-xl bg-red-500 text-white font-bold text-sm md:text-base hover:bg-red-600 transition shadow-lg"
                  >
                    Register Now
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Event Details & About Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 mt-12 space-y-8">
        {/* Event Details Card */}
        <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-md">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Calendar size={20} className="text-red-400" />
            Event Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                Date
              </p>
              <p className="text-white font-medium flex items-center gap-2">
                <Calendar size={14} className="text-red-400" />
                {event.date} {event.month}{" "}
                {isFeatured ? ` · ${featured.date}` : ""}
              </p>
            </div>

            {isFeatured && featured.location && (
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Location
                </p>
                <p className="text-white font-medium flex items-center gap-2">
                  <MapPin size={14} className="text-red-400" />
                  {featured.location}
                </p>
              </div>
            )}

            {isFeatured && featured.time && (
              <div>
                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                  Time
                </p>
                <p className="text-white font-medium flex items-center gap-2">
                  <Clock size={14} className="text-red-400" />
                  {featured.time}
                </p>
              </div>
            )}

            <div>
              <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">
                Organized by
              </p>
              <p className="text-white font-medium">{data.siteName}</p>
            </div>
          </div>

          {/* Register Button in Details Card */}
          {event.active && (
            <div className="mt-8">
              <a
                href={registerLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3 rounded-xl bg-red-500 text-white font-bold hover:bg-red-600 transition shadow-lg"
              >
                Register via Google Form
              </a>
            </div>
          )}
        </div>

        {/* About This Event */}
        <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/5 backdrop-blur-md">
          <h2 className="text-2xl font-bold mb-4">About This Event</h2>
          <p className="text-gray-300 leading-relaxed text-lg">{event.desc}</p>

          {isFeatured && (
            <p className="text-gray-300 leading-relaxed mt-4 text-lg">
              {featured.subtitle} — Join us on{" "}
              <span className="text-red-400 font-semibold">{featured.date}</span>{" "}
              at{" "}
              <span className="text-red-400 font-semibold">
                {featured.location}
              </span>
              . Doors open at{" "}
              <span className="text-red-400 font-semibold">{featured.time}</span>
              .
            </p>
          )}
        </div>
      </section>
    </main>
  );
}