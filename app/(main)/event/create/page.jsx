"use client";
import React, { useEffect, useRef, useState } from "react";
import {useParams, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { createEvent } from "@/service/event";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { eventSchema } from "@/schema/event";
import { uploadDummy } from "@/service/upload";
import { toast } from "sonner";
import { useAuthStore } from "@/store/user";

const ImageInput = ({ label, inputRef }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    if (preview) URL.revokeObjectURL(preview);
    setPreview(URL.createObjectURL(f));
  };

  const handleRemove = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-white/80">{label}</label>

      {preview ? (
        <div className="relative w-full rounded-xl overflow-hidden border border-white/10">
          <img
            src={preview}
            alt={`${label} preview`}
            className="w-full max-h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 bg-black/60 hover:bg-red-700 text-white text-xs px-2 py-1 rounded-lg transition-all"
          >
            Remove
          </button>
        </div>
      ) : (
        <div
          className="w-full bg-white/5 border border-white/10 border-dashed rounded-xl px-4 py-6 text-center cursor-pointer hover:bg-white/10 transition-all"
          onClick={() => inputRef.current?.click()}
        >
          <p className="text-white/40 text-sm">Click to upload image</p>
          <input
            type="file"
            ref={inputRef}
            accept="image/*"
            onChange={handleChange}
            className="hidden"
          />
        </div>
      )}
    </div>
  );
};

const CreateEventPage = () => {
  const user = useAuthStore((state) => state.user);
  useEffect(() => {
    if (!user) return;

    if (user.Role !== "admin") {
      router.push("/");
    }
  }, [user]);
  const router = useRouter();
  const params = useParams();
  const logoRef = useRef(null);
  const bannerRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const eventId = params.eventId;
  const {
    data: event,
    fn: createEventFn,
    loading: creatingEvent,
  } = useFetch(createEvent);

  const isEdit = !!eventId;

  const handleOnSubmit = async (data) => {
    const bannerUrl = await uploadDummy(bannerRef.current?.files[0]);
    const logoUrl = await uploadDummy(logoRef.current?.files[0]);
    console.log("Logo",logoUrl?.Url)
    console.log("Banner",bannerUrl?.Url)
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("venue", data.venue);
    formData.append("status", data.status);
    formData.append("date", data.date);
    formData.append("LogoUrl", logoUrl?.Url);
    formData.append("bannerUrl", bannerUrl?.Url);
    createEventFn(formData);
  };
  useEffect(() => {
    if (event) {
      toast.success(event.message);
      router.push(`/event/${event.Data.ID}`);
    }
  }, [event]);

  if (isEdit) return <div>EditEventPage</div>;

  return (
    <section>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-serif text-gradient mb-2">
          Create Event
        </h1>
        <p className="text-white/60">
          Organize and share your event with the community.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(handleOnSubmit)}>
        {/* Event Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">
            Event Name
          </label>
          <input
            type="text"
            placeholder="Art Exhibition 2026"
            {...register("name")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
          {errors.name?.message && (
            <p className="text-red-800/50 text-sm">{errors.name?.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={5}
            placeholder="Tell people about your event..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 resize-none"
          />
          {errors.description?.message && (
            <p className="text-red-800/50 text-sm">
              {errors.description?.message}
            </p>
          )}
        </div>

        {/* Venue */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Venue</label>
          <input
            {...register("venue")}
            type="text"
            placeholder="Delhi Convention Centre"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
          {errors.venue?.message && (
            <p className="text-red-800/50 text-sm">{errors.venue?.message}</p>
          )}
        </div>

        {/* Status */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">Status</label>
          <select
            {...register("status")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          >
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>
        </div>

        {/* Event Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/80">
            Event Date
          </label>
          <input
            type="date"
            {...register("date")}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
          {errors.date?.message && (
            <p className="text-red-800/50 text-sm">{errors.date?.message}</p>
          )}
        </div>

        {/* Logo & Banner */}
        <ImageInput label="Event Logo" inputRef={logoRef} />
        <ImageInput label="Event Banner" inputRef={bannerRef} />

        <button
          type="submit"
          disabled={creatingEvent}
          className="w-full bg-red-800 hover:bg-red-700 disabled:bg-red-800/50 text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2"
        >
          {creatingEvent ? "Creating Event..." : "Create Event"}
        </button>
      </form>
    </section>
  );
};

export default CreateEventPage;
