"use client";
import { ArrowRight, Check, Upload, X } from "lucide-react";

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
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import useFetch from "@/hooks/useFetch";
import { createArt } from "@/service/art";
import { zodResolver } from "@hookform/resolvers/zod";
import { artworkSchema } from "@/schema/art";
import { toast } from "sonner";

const page = () => {
  const categories = [
    { value: "digital-art", label: "Digital Art" },
    { value: "photography", label: "Photography" },
    { value: "illustration", label: "Illustration" },
    { value: "painting", label: "Painting" },
    { value: "3d", label: "3D Art" },
  ];
  const {
    register,

    reset,

    formState: { errors },

    handleSubmit,
  } = useForm({
    resolver: zodResolver(artworkSchema),
  });

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [preview, setPreview] = useState(null);
  const [file, setFile] = useState(null);

  const {
    fn: createArtFunc,
    data: createdArt,
    loading: uploadingArt,
  } = useFetch(createArt);
  const inputRef = useRef(null);
  const toggleCategory = (value) => {
    setSelectedCategories((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };
  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    setFile(null);
    if (inputRef.current) inputRef.current.value = "";
  };
  const handleOnSubmit = async (data) => {
    try {
      const url = `${process.env.NEXT_PUBLIC_BASE_URL}/default.jpeg`;
      const createData = new FormData();

      createData.append("name", data.title);

      createData.append("description", data.description);

      createData.append("url", url);

      selectedCategories.forEach((tag) => {
        createData.append("tags", tag);
      });

      createArtFunc(createData);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    if (createdArt) {
      toast.success(createdArt.message);
      reset();
    }
  }, [createdArt]);

  let isEdit = false;
  if (isEdit) return <div>Edit</div>;

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

          <form
            onSubmit={handleSubmit(
              handleOnSubmit,

              (errors) => {
                console.log("Validation errors:", errors);
              },
            )}
          >
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Artwork Title
              </label>
              <input
                type="text"
                placeholder="Sunset Dreams"
                {...register("title")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20"
              />
              {errors.title?.message && (
                <p className="text-red-800/50 text-sm">
                  {errors.title?.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Description
              </label>
              <textarea
                rows={5}
                placeholder="Tell viewers about your artwork..."
                {...register("description")}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-red-800/50 focus:bg-white/10 transition-all text-white placeholder:text-white/20 resize-none"
              />
              {errors.description?.message && (
                <p className="text-red-800/50 text-sm">
                  {errors.description?.message}
                </p>
              )}
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
                            (c) => c.value === value,
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
                            onSelect={() => toggleCategory(category.value)}
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

              {preview ? (
                <div className="relative rounded-2xl overflow-hidden border-2 border-white/10">
                  <img
                    src={preview}
                    alt="Artwork preview"
                    className="w-full h-64 object-cover"
                  />
                  <button
                    type="button"
                    onClick={handleRemove}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl p-10 cursor-pointer hover:border-red-800/40 transition-all">
                  <Upload size={40} className="text-white/40 mb-3" />
                  <span className="text-white/70 font-medium">
                    Click to upload artwork
                  </span>
                  <span className="text-white/30 text-sm mt-1">
                    PNG, JPG, WEBP
                  </span>
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              )}
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
