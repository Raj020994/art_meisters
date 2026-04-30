"use client"

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { SplitText } from "gsap/all";
import { useRef } from "react";
import { useMediaQuery } from "react-responsive";

//ffmpeg -i input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p output.mp4(for key frame)
const Hero = () => {
 const videoRef = useRef();
 
 const isMobile = useMediaQuery({ maxWidth: 767 });
 
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
	
	gsap
	.timeline({
	 scrollTrigger: {
		trigger: "#hero",
		start: "top top",
		end: "bottom top",
		scrub: true,
	 },
	})
	
	const startValue = isMobile ? "top 50%" : "center 60%";
	const endValue = isMobile ? "120% top" : "bottom top";
	
	let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});
	
	const setupVideoTimeline = () => {
	 if (videoRef.current && videoRef.current.duration) {
		tl.to(videoRef.current, {
		 currentTime: videoRef.current.duration,
		});
	 }
	};

	if (videoRef.current) {
	 if (videoRef.current.readyState >= 1) {
		setupVideoTimeline();
	 } else {
		videoRef.current.onloadedmetadata = setupVideoTimeline;
	 }
	}
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
	 <div className="video absolute inset-0">
		<video
		 ref={videoRef}
		 muted
		 playsInline
		 preload="auto"
		 src="/output.mp4"
		/>
	 </div>
	</>
 );
};

export default Hero;