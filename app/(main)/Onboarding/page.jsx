"use client";
import useFetch from "@/hooks/useFetch";
import { onBoardingSchema } from "@/schema/user";
import { uploadDummy } from "@/service/upload";
import { updateUser } from "@/service/user";
import { useAuthStore } from "@/store/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const ImageInput = ({ label, inputRef }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(file));
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">{label}</label>

      {/* Keep input always mounted */}
      <input
        type="file"
        ref={inputRef}
        accept="image/*"
        onChange={handleChange}
        className="hidden"
      />

      {preview ? (
        <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
          <img
            src={preview}
            alt={`${label} preview`}
            className="w-full max-h-48 object-cover"
          />

          <div className="absolute top-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className="bg-black/60 hover:bg-white/20 text-white text-xs px-2 py-1 rounded-lg"
            >
              Change
            </button>

            <button
              type="button"
              onClick={handleRemove}
              className="bg-black/60 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-lg"
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer hover:bg-white/10 transition-all"
          onClick={() => inputRef.current?.click()}
        >
          <p className="text-white/40 text-sm">Click to upload image</p>
        </div>
      )}
    </div>
  );
};
const onboarding = () => {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const router = useRouter();
  const [isEdit, setIsEdit] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(onBoardingSchema),
    defaultValues: {
      username: "",
      description: "",
      batch: "",
      instagram: "",
      youtube: "",
    },
  });

  useEffect(() => {
    if (user) {
      const editing = user?.Username?.Valid;
      setIsEdit(editing);

      reset({
        username: user?.Username?.String || "",
        description: user?.Description?.String || "",
        batch: user?.Batch?.String || "",
        instagram: user?.SocialLinks?.instagram || "",
        youtube: user?.SocialLinks?.youtube || "",
      });
    }
  }, [user, reset]);

  const {
    data: updatedUser,
    fn: onboardUser,
    loading: updating,
  } = useFetch(updateUser);

  const handleOnSubmit = async (data) => {
    try {
      let image = "";
      let bannerImage = "";
      console.log("logo", logoRef);
      console.log("banner", bannerRef);

      if (logoRef?.current?.files?.[0]) {
        const logoImgRes = await uploadDummy(logoRef.current.files[0]);
        console.log("logo", logoImgRes);
        image = logoImgRes?.Url;
      }

      if (bannerRef?.current?.files?.[0]) {
        const bannerImgRes = await uploadDummy(bannerRef.current.files[0]);
        console.log("banner", bannerImgRes);
        bannerImage = bannerImgRes?.Url;
      }

      const payload = {
        username: data.username || null,
        description: data.description || null,
        batch: data.batch || null,
        image: image || null,
        banner_image: bannerImage || null,
        social:
          data.instagram || data.youtube
            ? {
                instagram: data.instagram || "",
                youtube: data.youtube || "",
              }
            : null,
      };

      onboardUser(user?.ID, payload);
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  useEffect(() => {
    if (!updating && updatedUser) {
      toast.success(
        isEdit
          ? "Profile updated successfully"
          : "Profile created successfully",
      );

      setUser(updatedUser?.Data);
      router.push(`/u/${updatedUser?.Data?.ID}`);
    }
  }, [updatedUser, updating, isEdit, router, setUser]);

  const logoRef = useRef(null);
  const bannerRef = useRef(null);
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-16">
      <section className="w-full max-w-3xl glass rounded-3xl border border-white/10 p-8 md:p-12 shadow-2xl">
        <div className="text-center mb-10">
          <h2 className="text-4xl md:text-5xl font-serif text-gradient mb-3">
            Complete Your Profile
          </h2>
          <p className="text-white/60 text-lg">
            Set up your identity and let the community know who you are.
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit(handleOnSubmit)}>
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
                {...register("username")}
                placeholder="blueonion"
                className="w-full pl-8 bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">Bio</label>
            <textarea
              rows={5}
              {...register("description")}
              placeholder="Tell the world about your art, style, or creative journey..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 resize-none focus:outline-none focus:border-accent"
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Batch */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-white/80">
              Batch / Year
            </label>
            <input
              type="text"
              {...register("batch")}
              placeholder="2026"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent"
            />
            {errors.batch && (
              <p className="text-red-500 text-sm">{errors.batch.message}</p>
            )}
          </div>

          {/* Social Links */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/80">
                Instagram
              </label>
              <input
                type="url"
                {...register("instagram")}
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
                {...register("youtube")}
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
