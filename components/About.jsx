"use client"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap/all'
import Image from 'next/image'
import React, { useRef } from 'react'

const About = () => {
    const aboutData = [
        {
            "eventImage": {
                "src": "/Event1.jpeg",
                "width": 450,
                "height": 300,
                "alt": "hero",
                "pos": "items-start"
            },
            "points": [
                "A memorable community gathering where artists showcased their work and shared ideas in an open creative space."
            ]
        },
        {
            "eventImage": {
                "src": "/Event2.jpeg",
                "width": 450,
                "height": 300,
                "alt": "hero",
                "pos": "items-end"
            },
            "points": [
                "An interactive art workshop where members explored new techniques and experimented with bold creative styles.",

            ]
        },
        {
            "eventImage": {
                "src": "/Event3.jpeg",
                "width": 450,
                "height": 300,
                "alt": "hero",
                "pos": "items-start"
            },
            "points": [
                "A special exhibition night where artists presented their best creations to an engaged audience."
            ]
        },
        {
            "eventImage": {
                "src": "/Event4.jpeg",
                "width": 450,
                "height": 300,
                "alt": "hero",
                "pos": "items-end"
            },
            "points": [
                "A creative meet-up focused on sharing ideas, building friendships, and supporting artistic growth."
            ]
        },

    ]
    const svgRef = useRef(null);
    useGSAP(() => {
        const paths = svgRef.current.querySelectorAll("path");

        paths.forEach((p) => {
            const length = p.getTotalLength();
            gsap.set(p, {
                strokeDasharray: length,
                strokeDashoffset: length,
            });
        });
        gsap.from(".event-img", {
            y: 100,
            ease: "power1.out",
            scrollTrigger: {
                trigger: ".event-img",
                start: "top 95%",
                end: "bottom 100%",
                scrub: 1,
            },
        })
        gsap.to(paths, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: "#about",
                start: "top 90%",
                end: "bottom 90%",
                scrub: 1,
            },
        });
    }, []);
    return (
        <section id="about" className="relative min-h-screen pt-52 overflow-hidden">
            <h1 className="text-center text-9xl text-white font-bold relative z-10">
                Our Journey
            </h1>

            <div className="absolute inset-0 z-0 pointer-events-none">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1944.2 6151.5"
                    className="absolute inset-0 h-full w-full max-md:hidden"
                    id="desktop-svg"
                    ref={svgRef}
                    preserveAspectRatio="none"
                >
                    <defs>
                        {/* paint texture */}
                        <filter id="paint-texture">
                            <feTurbulence
                                type="fractalNoise"
                                baseFrequency="0.06"
                                numOctaves="4"
                                result="noise"
                            />
                            <feDisplacementMap
                                in="SourceGraphic"
                                in2="noise"
                                scale="35"
                                xChannelSelector="R"
                                yChannelSelector="G"
                            />
                        </filter>

                        {/* deeper paint gradient */}
                        <linearGradient id="paint-red" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#7f1d1d" />
                            <stop offset="50%" stopColor="#991b1b" />
                            <stop offset="100%" stopColor="#b91c1c" />
                        </linearGradient>
                    </defs>

                    <g filter="url(#paint-texture)">
                        {/* main stroke */}
                        <path
                            fill="none"
                            stroke="url(#paint-red)"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="480"
                            d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3353 733 3318s-606-718-53.6-808c552.3-90 1689.3 743.4 475.6 1689-985 767.5-234 1313-234 1702.5"
                            id="main-path"
                        />

                        {/* drips */}
                        <path d="M450 1400 v 150" stroke="url(#paint-red)" strokeWidth="80" strokeLinecap="round" />
                        <path d="M1200 3200 v 200" stroke="url(#paint-red)" strokeWidth="60" strokeLinecap="round" />
                        <path d="M300 3500 v 120" stroke="url(#paint-red)" strokeWidth="90" strokeLinecap="round" />
                        <path d="M1400 4500 v 180" stroke="url(#paint-red)" strokeWidth="70" strokeLinecap="round" />
                        <path d="M600 5500 v 250" stroke="url(#paint-red)" strokeWidth="100" strokeLinecap="round" />

                        {/* splatters */}
                        <path d="M1150 400 l 1 1" stroke="url(#paint-red)" strokeWidth="30" strokeLinecap="round" />
                        <path d="M800 1200 l 1 1" stroke="url(#paint-red)" strokeWidth="20" strokeLinecap="round" />
                        <path d="M500 2500 l 1 1" stroke="url(#paint-red)" strokeWidth="40" strokeLinecap="round" />
                        <path d="M1500 3800 l 1 1" stroke="url(#paint-red)" strokeWidth="25" strokeLinecap="round" />
                        <path d="M1000 4800 l 1 1" stroke="url(#paint-red)" strokeWidth="35" strokeLinecap="round" />
                        <path d="M400 5800 l 1 1" stroke="url(#paint-red)" strokeWidth="50" strokeLinecap="round" />
                        <path d="M1250 3500 l 1 1" stroke="url(#paint-red)" strokeWidth="15" strokeLinecap="round" />
                        <path d="M650 2800 l 1 1" stroke="url(#paint-red)" strokeWidth="28" strokeLinecap="round" />
                        <path d="M1300 5200 l 1 1" stroke="url(#paint-red)" strokeWidth="20" strokeLinecap="round" />
                        <path d="M900 1800 l 1 1" stroke="url(#paint-red)" strokeWidth="25" strokeLinecap="round" />
                        <path d="M1600 2200 l 1 1" stroke="url(#paint-red)" strokeWidth="18" strokeLinecap="round" />
                        <path d="M200 4200 l 1 1" stroke="url(#paint-red)" strokeWidth="32" strokeLinecap="round" />
                    </g>
                </svg>
            </div>

            <div className="flex flex-col relative z-10 gap-48">
                {aboutData.map((event, index) => (
                    <div
                        key={index}
                        className={`event-img px-10 flex flex-col ${event.eventImage.pos}`}
                    >
                        <div className="group w-[450px] bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-md p-6 shadow-lg transition-transform duration-300 hover:scale-[1.02]">

                            {/* Image */}
                            <div className="">
                                <Image
                                    src={event.eventImage.src}
                                    width={event.eventImage.width}
                                    height={event.eventImage.height}
                                    alt={event.eventImage.alt}
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                    }}
                                />
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <ul className="text-white space-y-3 list-disc pl-5 leading-relaxed">
                                    {event.points.map((point, pointIndex) => (
                                        <li key={pointIndex} className="text-sm text-gray-200">
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                        </div>
                    </div>
                ))}
                <div className="flex items-center justify-center">

                    <Image
                        src={"/brush.png"}
                        alt='paint-brush'
                        width={500}
                        height={500}
                        className="mt-10 -rotate-45"
                        style={{
                            width: '400px',
                            height: '400px',
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

export default About