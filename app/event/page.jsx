import React from 'react'
import data from "@/data.json";
import { EventCard } from './_components/EventCard';
import Link from 'next/link';

export default function EventPage() {
    const allEvents = data.events;

    return (
        <section className='container mx-auto bg-red-600'>
            <h1 className="text-4xl font-bold text-white ">Events</h1>
        <div className="flex-col">
            {
                allEvents.map((event)=>{
                    return <Link href={`/event/${event.id}`} className="" key={event.id}>
                        <EventCard event={event}/>
                    </Link>
                })
            }

        </div>
        </section>
    );
}
