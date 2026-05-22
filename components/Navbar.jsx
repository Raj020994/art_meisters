"use client";
import React, { useEffect, useState } from "react";
import data from "@/data.json";
import Image from "next/image";
import Link from "next/link";
import { User } from "lucide-react";

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const user = {
    Success: true,
    Data: {
      ID: "f1529ef0-abbe-43b1-9711-e44a1ccd5ca4",
      Name: "Jane Doe",
      Email: "janehh@example.com",
      Batch: "2026",
      Status: "pending",
      Role: "user",
      Image: {
        String: "/me.png",
        Valid: true,
      },
      BannerImage: {
        String: "/me.png",
        Valid: true,
      },
      Description: {
        String: "Creative digital artist specializing in surrealism.",
        Valid: true,
      },
      SocialLinks: {
        twitter: "https://twitter.com/janedoe",
        instagram: "https://instagram.com/janedoe",
      },
      CreatedAt: "2026-05-22T18:12:15.145381Z",
      UpdatedAt: "2026-05-22T18:12:15.145381Z",
    },
  };
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const sections = data.navLinks.map((link) => link.href.replace("#", ""));

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav
      className={`fixed left-1/2 flex items-center justify-center  -translate-x-1/2 z-50 transition-all duration-300 ${scrolled ? "nav py-2 bg-black/20 backdrop-blur-xl text-white h-28 rounded-2xl" : ""}`}
    >
      <div className="flex items-center justify-between">
        <div className="">
          <Link href={"/"}>
            <div className="flex items-center justify-center gap-3">
              <div className="flex rounded-full h-16 w-16 justify-center bg-white items-center">
                <Image src="/Logo.jpeg" alt="Logo" height={64} width={64} />
              </div>

              <span className="font-heading font-bold text-xl tracking-wider">
                {data.siteName}
              </span>
            </div>
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
          {data.navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={
                activeSection === link.href.replace("#", "")
                  ? "text-red-500"
                  : "transition-colors"
              }
            >
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center justify-center">
          <div className="flex items-center justify-center">
            <div className="relative h-13 w-13 overflow-hidden rounded-full">
              <Image
                src={user.Data.Image.String}
                alt="profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
