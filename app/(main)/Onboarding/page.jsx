"use client";
import React, { useRef, useState } from "react";

const ImageInput = ({ label, inputRef }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };
};
const onboarding = () => {
  const logoRef = useRef(null);
  const bannerRef = useRef(null);
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif text-gradient mb-3">
            Complete Your Profile
          </h2>
          <p className="text-white/60 text-lg">
            Set up your identity and let the community know who you are.
          </p>
        </div>

        <form className="space-y-8">
          {/* Username */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              Username
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40">
                @
              </span>
              <input
                type="text"
                placeholder="blueonion"
                className="w-full pl-8 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Bio</label>
            <textarea
              rows={5}
              placeholder="Tell the world about your art, style, or creative journey..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-accent"
            />
          </div>

          {/* Batch */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              Batch / Year
            </label>
            <input
              type="text"
              placeholder="2026"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
            />
          </div>

          {/* Social Links */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Instagram
              </label>
              <input
                type="url"
                placeholder="https://instagram.com/yourname"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                YouTube
              </label>
              <input
                type="url"
                placeholder="https://youtube.com/@yourchannel"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />
            </div>
          </div>

          {/* Profile Images */}
          <div className="grid md:grid-cols-2 gap-6">
            <ImageInput label="Profile Picture" inputRef={logoRef} />
            <ImageInput label="Banner Image" inputRef={bannerRef} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-red-800 hover:opacity-90 text-white font-bold py-4 rounded-xl transition-all"
          >
            Complete Onboarding
          </button>
        </form>
      </section>
    </div>
  );
};

export default onboarding;
