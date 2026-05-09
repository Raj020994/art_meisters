import Image from 'next/image'
import React from 'react'

const About = () => {
    const aboutData=[
        {
          "eventImage": {
            "src": "/Event1.jpeg",
            "width": 450,
            "height": 300,
            "alt": "hero",
            "pos":"items-start"
          },
          "points": [
            "A memorable community gathering where artists showcased their work and shared ideas in an open creative space."
          ]
        },
        {
          "eventImage": {
            "src": "/Event1.jpeg",
            "width": 450,
            "height": 300,
            "alt": "hero",
             "pos":"items-end"
          },
          "points": [
            "An interactive art workshop where members explored new techniques and experimented with bold creative styles.",
          
          ]
        },
        {
          "eventImage": {
            "src": "/Event1.jpeg",
            "width": 450,
            "height": 300,
            "alt": "hero",
             "pos":"items-start"
          },
          "points": [
            "A special exhibition night where artists presented their best creations to an engaged audience."
          ]
        },
        {
          "eventImage": {
            "src": "/Event1.jpeg",
            "width": 450,
            "height": 300,
            "alt": "hero",
             "pos":"items-end"
          },
          "points": [
            "A creative meet-up focused on sharing ideas, building friendships, and supporting artistic growth."
          ]
        },
       
      ]
    return (
        <section id="about" className="relative min-h-screen pt-52 overflow-hidden">
        <h1 className="text-center text-9xl text-white font-bold relative z-10">
          Our Journey
        </h1>
      
        {/* SVG on TOP */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img src="/Stroke.svg" alt="stroke" className="w-full h-full object-cover" />
        </div>
      
        {/* Events BELOW SVG */}
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