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
  <path
    fill="none"
    stroke="red"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="500"
    d="M1085 250c-868 126.5-961 907-29.5 1453S1397 3353 733 3318s-606-718-53.6-808c552.3-90 1689.3 743.4 475.6 1689-985 767.5-234 1313-234 1702.5"
    id="main-path"
  />
</svg>
            </div>

            <div className="flex flex-col relative z-10 gap-48">
                {aboutData.map((event, index) => (
                    <div key={index} className={`flex flex-col ${event.eventImage.pos} px-10`}>
                        <Image
                            src={event.eventImage.src}
                            width={event.eventImage.width}
                            height={event.eventImage.height}
                            alt={event.eventImage.alt}
                            className="w-[450px] h-[300px]"
                        />

                        <ul className="text-white mt-6 space-y-3 max-w-md list-disc leading-relaxed">
                            {event.points.map((point, pointIndex) => (
                                <li key={pointIndex}>{point}</li>
                            ))}
                        </ul>
                    </div>
                ))}
                <div className="flex items-center justify-center">

                    <Image
                        src={"/brush.png"}
                        alt='paint-brush'
                        width={500}
                        height={500}
                        className="w-[400px] h-[400px] mt-10 -rotate-45"
                    />
                </div>
            </div>
        </section>
    )
}

export default About