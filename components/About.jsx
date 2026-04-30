import { useGSAP } from '@gsap/react'
import gsap from 'gsap';
import React from 'react'

const About = () => {
    useGSAP(()=>{
const parallaxTimeline=gsap.timeline({
    scrollTrigger:{
        trigger:"#cocktails",
        start:"top 30%",
        end:"bottom 80%",
        scrub:true,
    }
})
    }
    ,[]);
    return (
        <section id="cocktails" >
            <div className="list">
                <div className="popular">
                    <h2 className="">Most Popular cocktail: </h2>
                </div>
                <div className="loved">
                    <h2 className="">Most Popular cocktail: </h2>
                </div>
            </div>
        </section>          
    )
}

export default About