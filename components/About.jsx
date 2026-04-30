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
                
            </div>
        </section>
    )
}

export default About