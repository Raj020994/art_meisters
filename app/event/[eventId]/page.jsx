"use client";
import React from "react";
import { useParams } from "next/navigation";
import data from "@/data.json";
import { Calendar, MapPin, Clock, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function EventDetail() {
    const params = useParams();
    const eventId = params.eventId;

    const event = data.events.find((e) => e.id === eventId) || data.featuredEvent;

    if (!event) return <div className="min-h-screen bg-black text-white flex-center">Event not found</div>;

    return (
        <main className="min-h-screen bg-black text-white">
            <Navbar />
            
            <div className="pt-32 pb-20 container mx-auto px-6">
                <Link href="/" className="inline-flex items-center gap-2 text-accent hover:text-red-400 transition-colors mb-12 group">
                    <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    BACK TO HOME
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    <div className="relative rounded-3xl overflow-hidden glass aspect-video lg:aspect-auto lg:h-[600px]">
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full h-full object-cover"
                        />
                    </div>

                    <div className="space-y-8">
                        <div>
                            <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded uppercase tracking-wider mb-4 inline-block">
                                {event.active ? "Upcoming" : "Event"}
                            </span>
                            <h1 className="font-heading font-bold text-5xl md:text-6xl text-red-500 mb-4 leading-tight">
                                {event.title}
                            </h1>
                            <p className="text-xl text-gray-400">
                                {event.desc || event.subtitle}
                            </p>
                        </div>

                        <div className="glass rounded-2xl p-8 space-y-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex-center text-accent">
                                    <Calendar size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Date</p>
                                    <p className="text-xl font-medium">{event.date} {event.month}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex-center text-accent">
                                    <MapPin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Location</p>
                                    <p className="text-xl font-medium">{event.location || "Art Meisters Studio"}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-full bg-accent/10 flex-center text-accent">
                                    <Clock size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 uppercase tracking-wider font-bold">Time</p>
                                    <p className="text-xl font-medium">{event.time || "10:00 AM - 4:00 PM"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8">
                            <button className="w-full bg-accent hover:bg-red-700 text-white py-4 rounded-xl font-bold text-lg shadow-[0_0_30px_rgba(229,9,20,0.2)] transition-all">
                                REGISTER FOR EVENT
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </main>
    );
}