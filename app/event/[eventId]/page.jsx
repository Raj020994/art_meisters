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
                    className="text-accent hover:underline flex items-center gap-2"
                >
                    <MoveLeft size={20} /> Back to Home
                </Link>
            </div>
        );
    }

    const isFeatured = featured && featured.title === event.title;

    return (
        <main className="min-h-screen bg-black text-white selection:bg-accent pb-20">
            {/* Back Button */}
            <div className="max-w-4xl mx-auto px-6 md:px-12 pt-8">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm"
                >
                    <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    Back to Community
                </Link>
            </div>

            {/* Event Logo / Image */}
            <section className="max-w-4xl mx-auto px-6 md:px-12 mt-8">
                <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                    <img
                        src={isFeatured ? featured.image : event.image}
                        alt={event.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

                    {/* Status badge overlay */}
                    <div className="absolute top-4 left-4 flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md ${event.active ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-white/10 text-gray-300 border border-white/10"}`}>
                            {event.active ? "● Upcoming" : "● Completed"}
                        </span>
                        {isFeatured && (
                            <span className="px-3 py-1 rounded-full bg-yellow-500/20 text-yellow-300 text-xs font-bold uppercase tracking-wider border border-yellow-500/30 backdrop-blur-md">
                                Featured
                            </span>
                        )}
                    </div>

                    {/* Date badge overlay */}
                    <div className="absolute bottom-4 right-4 flex flex-col items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-xl bg-black/70 backdrop-blur-md border border-white/10">
                        <span className="text-white font-bold text-2xl md:text-3xl leading-none">
                            {event.date}
                        </span>
                        <span className="text-white/60 font-semibold tracking-widest text-xs uppercase mt-1">
                            {event.month}
                        </span>
                    </div>
                </div>

                {/* Event Title */}
                <div className="mt-6">
                    <h1 className="font-heading font-bold text-4xl md:text-6xl leading-tight">
                        {event.title}
                    </h1>
                    <p className="text-gray-400 mt-2 text-lg">{event.desc}</p>
                </div>
            </section>

            {/* Event Details & About Section */}
            <section className="max-w-4xl mx-auto px-6 md:px-12 mt-12 space-y-8">
                {/* Event Details Card */}
                <div className="rounded-2xl p-8 border border-white/10 bg-white/5 backdrop-blur-md">
                    <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <Calendar size={20} className="text-yellow" />
                        Event Details
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Date</p>
                            <p className="text-white font-medium flex items-center gap-2">
                                <Calendar size={14} className="text-yellow" />
                                {event.date} {event.month} {isFeatured ? ` · ${featured.date}` : ""}
                            </p>
                        </div>

                        {isFeatured && featured.location && (
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Location</p>
                                <p className="text-white font-medium flex items-center gap-2">
                                    <MapPin size={14} className="text-yellow" />
                                    {featured.location}
                                </p>
                            </div>
                        )}

                        {isFeatured && featured.time && (
                            <div>
                                <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Time</p>
                                <p className="text-white font-medium flex items-center gap-2">
                                    <Clock size={14} className="text-yellow" />
                                    {featured.time}
                                </p>
                            </div>
                        )}

                        <div>
                            <p className="text-gray-500 text-xs uppercase tracking-widest mb-1">Organized by</p>
                            <p className="text-white font-medium">{data.siteName}</p>
                        </div>
                    </div>
                </div>

                {/* About This Event */}
                <div className="rounded-2xl p-8 md:p-10 border border-white/10 bg-white/5 backdrop-blur-md">
                    <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                    <p className="text-gray-300 leading-relaxed text-lg">
                        {event.desc}
                    </p>
                    {isFeatured && (
                        <p className="text-gray-300 leading-relaxed mt-4 text-lg">
                            {featured.subtitle} — Join us on <span className="text-yellow font-semibold">{featured.date}</span> at <span className="text-yellow font-semibold">{featured.location}</span>. Doors open at <span className="text-yellow font-semibold">{featured.time}</span>.
                        </p>
                    )}
                </div>
            </section>
        </main>
    );
}