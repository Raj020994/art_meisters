import React from 'react';

const CreateEvent = () => {
  return (
    <div className=" w-full max-w-3xl mx-auto">
      <div>
        <h2 className="text-3xl font-serif text-white mb-2">Create New Event</h2>
        <p className="text-gray-400 text-sm">Fill out the details below to schedule a new exhibition or event.</p>
      </div>

      <form className="space-y-5 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md">
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-300">Event Title</label>
          <input 
            type="text" 
            id="title" 
            placeholder="e.g., Summer Art Festival 2026" 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium text-gray-300">Date & Time</label>
            <input 
              type="datetime-local" 
              id="date" 
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all [color-scheme:dark]"
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="location" className="text-sm font-medium text-gray-300">Location</label>
            <input 
              type="text" 
              id="location" 
              placeholder="e.g., Main Gallery" 
              className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-300">Description</label>
          <textarea 
            id="description" 
            rows="4"
            placeholder="Describe the event details, featured artists, and any other relevant information..." 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all resize-y"
          ></textarea>
        </div>

        <div className="space-y-2">
          <label htmlFor="image" className="text-sm font-medium text-gray-300">Cover Image URL</label>
          <input 
            type="url" 
            id="image" 
            placeholder="https://example.com/image.jpg" 
            className="w-full px-4 py-3 rounded-xl bg-black/50 border border-white/10 text-white placeholder:text-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500 transition-all"
          />
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button type="button" className="px-6 py-3 rounded-xl text-white hover:bg-white/5 transition-colors font-medium">
            Cancel
          </button>
          <button type="button" className="px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-500 transition-colors font-medium shadow-lg shadow-red-600/20">
            Publish Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
