import { Play, Heart, Share2 } from 'lucide-react';
import { mockCSRReels } from './mockCSRData';

export function CSRReels() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-6">
        <h1 className="text-2xl mb-1">CSR Project Reels</h1>
        <p className="text-green-100 text-sm">Success stories & impact updates</p>
      </div>

      {/* Reels Grid */}
      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="grid grid-cols-2 gap-3">
          {mockCSRReels.map(reel => (
            <div
              key={reel.id}
              className="relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer group"
            >
              {/* Thumbnail */}
              <div className="relative h-64 bg-slate-200">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-green-600 ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {reel.duration}
                </div>

                {/* Category Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 bg-green-600 text-white text-xs rounded">
                  {reel.category}
                </div>
              </div>

              {/* Info */}
              <div className="p-3">
                <h3 className="text-sm mb-2 line-clamp-2">{reel.title}</h3>
                
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <Play className="w-3 h-3" />
                      {reel.views}
                    </span>
                    <span className="flex items-center gap-1">
                      <Heart className="w-3 h-3" />
                      {reel.likes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Story */}
        <div className="mt-6">
          <h2 className="mb-3">Featured Impact Story</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-48 bg-gradient-to-r from-green-500 to-blue-500">
              <img
                src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
                alt="Featured"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-green-600 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2">Water Project Changes Lives</h3>
              <p className="text-sm text-slate-600 mb-3">
                See how clean water access transformed an entire community of 12,000 residents. A CSR success story.
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  35K views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  3.2K likes
                </span>
                <span className="flex items-center gap-1">
                  <Share2 className="w-4 h-4" />
                  892
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-6">
          <h2 className="mb-3">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">✅</div>
              <div className="text-sm">Success Stories</div>
            </div>
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">📊</div>
              <div className="text-sm">Impact Updates</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">🎬</div>
              <div className="text-sm">Behind the Scenes</div>
            </div>
            <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">💚</div>
              <div className="text-sm">Testimonials</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
