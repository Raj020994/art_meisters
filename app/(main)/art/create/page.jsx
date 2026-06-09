"use client";
import { ArrowRight, Check, Upload } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const page = () => {
const categories = [
  {
    value: "digital-art",
    label: "Digital Art",
  },
  {
    value: "photography",
    label: "Photography",
  },
  {
    value: "illustration",
    label: "Illustration",
  },
  {
    value: "painting",
    label: "Painting",
  },
  {
    value: "3d",
    label: "3D Art",
  },
];
const [selectedCategories, setSelectedCategories] = useState([]);
const toggleCategory = (value) => {
  setSelectedCategories((prev) =>
    prev.includes(value)
      ? prev.filter((item) => item !== value)
      : [...prev, value]
  );
};
  let isEdit = false;
  if (isEdit) {
    return <div>Edit</div>;
  }
  return (
    <div>
      <div className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-64 h-64 bg-red-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-yellow/10 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="auth-card w-full max-w-2xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative z-10 mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-serif text-gradient mb-2">
              Upload Artwork
            </h1>
            <p className="text-white/60">
              Share your creativity with the world.
            </p>
          </div>

          <form className="space-y-5">
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Artwork Title
              </label>

              <input
                type="text"
                placeholder="Sunset Dreams"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Description
              </label>

              <textarea
                rows={5}
                placeholder="Tell viewers about your artwork..."
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20 resize-none"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Category
              </label>

         <Popover>
  <PopoverTrigger asChild>
    <Button
      variant="outline"
      className="w-full min-h-12 h-auto justify-start flex-wrap"
    >
      {selectedCategories.length ? (
        <div className="flex flex-wrap gap-2">
          {selectedCategories.map((value) => {
            const category = categories.find(
              (c) => c.value === value
            );

            return (
              <Badge
                key={value}
                className="flex items-center gap-1"
              >
                {category?.label}
              </Badge>
            );
          })}
        </div>
      ) : (
        <span className="text-muted-foreground">
          Select Categories
        </span>
      )}
    </Button>
  </PopoverTrigger>

  <PopoverContent className="w-[300px] p-0">
    <Command>
      <CommandInput placeholder="Search categories..." />

      <CommandList>
        <CommandEmpty>No category found.</CommandEmpty>

        <CommandGroup>
          {categories.map((category) => (
            <CommandItem
              key={category.value}
              onSelect={() =>
                toggleCategory(category.value)
              }
            >
              <Check
                className={`mr-2 h-4 w-4 ${
                  selectedCategories.includes(category.value)
                    ? "opacity-100"
                    : "opacity-0"
                }`}
              />

              {category.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  </PopoverContent>
</Popover>
            </div>

            {/* Upload Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Artwork Image
              </label>

              <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-10 cursor-pointer hover:border-red-800/40 transition-all">
                <Upload size={40} className="text-white/40 mb-3" />

                <span className="text-white/70 font-medium">
                  Click to upload artwork
                </span>

                <span className="text-white/30 text-sm mt-1">
                  PNG, JPG, WEBP
                </span>

                <input type="file" accept="image/*" className="hidden" />
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-red-800 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-red-900/20 flex items-center justify-center gap-2 group"
            >
              Upload Artwork
              <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default page;
