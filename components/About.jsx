import Image from 'next/image'
import React from 'react'

const About = () => {
    return (
        <section id="about" className="relative h-screen p-0 overflow-hidden">
            <div className="flex flex-col items-start px-10 ">
                <Image
                    src={"/Event1.jpeg"}
                    width={800}
                    height={600}
                    alt="hero"
                    className="w-[450px] h-[300px]"
                />
                <ul className="text-white mt-6  space-y-3 max-w-md list-disc leading-relaxed">

                    <li>

                        A memorable community gathering where artists showcased their work and shared

                        ideas in an open creative space.

                    </li>

                    <li>

                        This event marked an important milestone in our timeline, strengthening our

                        mission to support and connect creators.

                    </li>

                    <li>

                        Moments like these inspire us to keep building experiences where creativity,

                        collaboration, and expression come alive.

                    </li>

                </ul>
            </div>
            <div className="flex flex-col items-start px-10 ">
                <Image
                    src={"/Event1.jpeg"}
                    width={800}
                    height={600}
                    alt="hero"
                    className="w-[450px] h-[300px]"
                />
                <ul className="text-white mt-6  space-y-3 max-w-md list-disc leading-relaxed">

                    <li>

                        A memorable community gathering where artists showcased their work and shared

                        ideas in an open creative space.

                    </li>

                    <li>

                        This event marked an important milestone in our timeline, strengthening our

                        mission to support and connect creators.

                    </li>

                    <li>

                        Moments like these inspire us to keep building experiences where creativity,

                        collaboration, and expression come alive.

                    </li>

                </ul>
            </div>
            <div className="flex flex-col items-start px-10 ">
                <Image
                    src={"/Event1.jpeg"}
                    width={800}
                    height={600}
                    alt="hero"
                    className="w-[450px] h-[300px]"
                />
                <ul className="text-white mt-6  space-y-3 max-w-md list-disc leading-relaxed">

                    <li>

                        A memorable community gathering where artists showcased their work and shared

                        ideas in an open creative space.

                    </li>

                    <li>

                        This event marked an important milestone in our timeline, strengthening our

                        mission to support and connect creators.

                    </li>

                    <li>

                        Moments like these inspire us to keep building experiences where creativity,

                        collaboration, and expression come alive.

                    </li>

                </ul>
            </div>
        </section>
    )
}

export default About