import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React from 'react'

const About = () => {
    useGSAP(() => {
        const parallaxTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: "#cocktails",
                start: "top 30%",
                end: "bottom 80%",
                scrub: true,
            }
        })
    }
        , []);
    return (
        <section id="about" className="py-20 relative z-10">
            <div className="container mx-auto px-5">
                <div className="flex flex-col md:flex-row justify-between items-start gap-20">
                    <div className="space-y-8 w-full md:w-1/2">
                        <h2 className="text-5xl font-serif text-yellow">Our Creative Spirit</h2>
                        <p className="text-lg opacity-80 leading-relaxed">
                            Art Meister is more than just a gallery; it's a living, breathing community.
                            We believe in the power of art to transform spaces and souls.
                            Our curated collections represent the pinnacle of modern expression.
                        </p>
                    </div>
                    <div className="space-y-8 w-full md:w-1/2">
                        <div className="popular">
                            <h2 className="text-2xl font-medium mb-4">Most Celebrated Styles:</h2>
                            <ul className="space-y-4">
                                <li className="text-xl text-yellow">Digital Surrealism</li>
                                <li className="text-xl text-yellow">Abstract Expressionism</li>
                                <li className="text-xl text-yellow">Minimalist Sculpture</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default About