import React from 'react';

const ApproveArt = () => {
  const dummyArtworks = [
    { id: 1, title: 'Sunset Boulevard', artist: 'Alice Smith', type: 'Painting', price: '$1,200', image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?auto=format&fit=crop&q=80&w=400&h=300' },
    { id: 2, title: 'Modern Abstract', artist: 'David Clark', type: 'Digital', price: '$850', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400&h=300' },
  ];

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto">
      <div>
        <h2 className="text-3xl font-serif text-white mb-2">Pending Artworks</h2>
        <p className="text-gray-400 text-sm">Review newly submitted artworks for the gallery.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {dummyArtworks.map((art) => (
          <div key={art.id} className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md overflow-hidden flex flex-col">
            <div className="h-48 w-full relative">
              <img src={art.image} alt={art.title} className="w-full h-full object-cover" />
              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-white">
                {art.price}
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <h3 className="text-xl text-white font-medium truncate">{art.title}</h3>
                <p className="text-sm text-gray-400 mt-1">by <span className="text-red-400">{art.artist}</span></p>
                <div className="mt-3 inline-block px-2 py-1 rounded bg-white/10 text-xs text-gray-300">
                  {art.type}
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2">
                <button className="flex-1 px-4 py-2 rounded-lg border border-red-500/50 text-red-400 hover:bg-red-500/10 transition-colors text-sm font-medium">
                  Reject
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500 transition-colors text-sm font-medium">
                  Approve
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {dummyArtworks.length === 0 && (
          <div className="col-span-1 md:col-span-2 text-center py-12 text-gray-500 border border-white/5 rounded-2xl bg-white/5 border-dashed">
            No pending artworks to review.
          </div>
        )}
      </div>
    </div>
  );
};

export default ApproveArt;
