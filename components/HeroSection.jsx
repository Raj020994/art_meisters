"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText);

const HeroSection = () => {
    const videoRef = useRef(null);

    const isMobile = useMediaQuery({ maxWidth: 767 });

    useGSAP(() => {
        const heroSplit = new SplitText(".title", {
            type: "chars, words",
        });

        const paragraphSplit = new SplitText(".subtitle", {
            type: "lines",
        });

        heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

        gsap.from(heroSplit.chars, {
            yPercent: 120,
            duration: 1.6,
            ease: "expo.out",
            stagger: 0.05,
        });

        gsap.from(paragraphSplit.lines, {
            opacity: 0,
            yPercent: 120,
            duration: 1.4,
            ease: "expo.out",
            stagger: 0.08,
            delay: 0.6,
        });

        const startValue = isMobile ? "top 50%" : "center 60%";
        const endValue = isMobile ? "120% top" : "bottom top";

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: "top top",
                end: "bottom top",
                scrub: true,
            },
        });

    

        const videoTL = gsap.timeline({
            scrollTrigger: {
                trigger: "#hero",
                start: startValue,
                end: endValue,
                scrub: true,
                pin: true,
            },
        });

        videoRef.current.onloadedmetadata = () => {
            videoTL.to(videoRef.current, {
                currentTime: videoRef.current.duration,
                ease: "none",
            });
        };
    }, [isMobile]);

    return (
        <section
            id="hero"
            className="relative min-h-screen w-full flex flex-col overflow-hidden"
        >

            <div className="absolute inset-0 -z-10">
                <video
                    ref={videoRef}
                    muted
                    playsInline
                    preload="auto"
                    src="/output.mp4"
                    className="h-full w-full object-cover opacity-90"
                />
            </div>


            <div className="hero-content gap-48  relative z-10 min-h-screen flex  flex-col ju items-center mt-32 ">
                <h1 className="title text-[72px] selection:none font-extrabold tracking-tight md:text-[140px] lg:text-[170px]">
                    Art Meister
                </h1>


                    <div className="mt-8  mx-auto container space-y-8">
                        <div className="hidden space-y-3 text-lg text-red-400 md:flex md:justify-between">
                            <p className="subtitle">Cool. Crisp. Classic.</p>
                            <p className="subtitle text-3xl font-semibold text-red-400 md:text-5xl">
                                Sip the Spirit <br /> of Summer
                            </p>
                        </div>


                    </div>
                    

            </div>
        </section>
    );
};

export default HeroSection;