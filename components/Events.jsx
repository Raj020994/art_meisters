import React from 'react'
import { EventListItem } from './EventListItem'
import data from "@/data.json";
import { MoveRight } from 'lucide-react';
import { FeaturedEvent } from './FeaturedEvent';
export const Events = () => {
    const events=data.events.slice(0,3)
  return (
    <section className="max-w-7xl mx-auto px-6  md:px-12 mb-32">
    <div className="flex justify-between items-end mb-12">
        <div>
            <div className="flex items-center gap-4 mb-3">
                <span className="text-accent font-semibold tracking-widest text-sm uppercase">UPCOMING EVENTS</span>
                <div className="h-px w-12 bg-accent/50"></div>
            </div>
            <h2 className="font-heading font-bold text-4xl text-red-500">What's Happening</h2>
        </div>
        <a href="#" className="text-accent hover:text-red-400 items-center gap-2 font-medium group transition-colors hidden sm:flex">
            VIEW ALL EVENTS
            <MoveRight className="group-hover:translate-x-1 transition-transform" size={16} />
        </a>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="flex flex-col gap-4 lg:col-span-1">
            {events.map((event) => (
                <EventListItem
                    key={event.id}
                    id={event.id}
                    date={event.date}
                    month={event.month}
                    title={event.title}
                    desc={event.desc}
                    active={event.active}
                />
            ))}
        </div>

        <FeaturedEvent />
    </div>
</section>
  )
}
