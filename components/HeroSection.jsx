"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import Image from "next/image";
const Hero = () => {
 
 useGSAP(() => {
	const heroSplit = new SplitText(".title", {
	 type: "chars, words",
	});
	
	const paragraphSplit = new SplitText(".subtitle", {
	 type: "lines",
	});
	
	// Apply text-gradient class once before animating
	heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));
	
	gsap.from(heroSplit.chars, {
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	});
	
	gsap.from(paragraphSplit.lines, {
	 opacity: 0,
	 yPercent: 100,
	 duration: 1.8,
	 ease: "expo.out",
	 stagger: 0.06,
	 delay: 1,
	});
	
	
  }, []);
 
 return (
	<>
	 <section id="hero" >
		<h1 className="title pt-8">Art Meister</h1>
		
		<div className="body">
		 
		 <div className="content">
			<div className="space-y-5 hidden md:block">
			 <p>Curate. Create. Connect.</p>
			 <p className="subtitle">
				Unleash Your <br /> Creative Spirit
			 </p>
			</div>
			
			<div className="hero-info">
			 <p className="subtitle">
				Art Meister is a premier community for artists and enthusiasts. 
				We provide a space where imagination knows no bounds and 
				creativity is celebrated in every form.
			 </p>
			 <a href="#art">Explore Gallery</a>
			</div>
		 </div>
		</div>
	 </section>
	 <div className=" relative bottom-120 left-[30%]">
		<Image
        src={"/brush.png"}
        width={100}
        height={100}
        alt="hero"
        className="w-[500px] h-[500px]"
        />
	 </div>
	</>
 );
};

export default Hero;