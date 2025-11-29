import { Play, Heart, MessageCircle, Share2, Bookmark } from 'lucide-react';
import { mockReels } from './mockData';

export function Reels() {
  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-purple-50 to-pink-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-6">
        <h1 className="text-2xl mb-1">Civic Reels</h1>
        <p className="text-purple-100 text-sm">Community awareness & success stories</p>
      </div>

      {/* Reels Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {mockReels.map(reel => (
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
                    <Play className="w-6 h-6 text-purple-600 ml-1" />
                  </div>
                </div>

                {/* Duration Badge */}
                <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {reel.duration}
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

        {/* Featured Reel Section */}
        <div className="mt-6">
          <h2 className="mb-3">Featured Story</h2>
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80"
                alt="Featured"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 text-purple-600 ml-1" />
                </button>
              </div>
            </div>
            <div className="p-4">
              <h3 className="mb-2">Community Cleanup Drive Success</h3>
              <p className="text-sm text-slate-600 mb-3">
                Watch how our community came together to clean up Green Valley Park. Over 200 volunteers participated!
              </p>
              <div className="flex items-center gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                  <Play className="w-4 h-4" />
                  25K views
                </span>
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  2.1K likes
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  342
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="mt-6 mb-4">
          <h2 className="mb-3">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">💡</div>
              <div className="text-sm">Tips & Guides</div>
            </div>
            <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">🌱</div>
              <div className="text-sm">Success Stories</div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">📢</div>
              <div className="text-sm">Awareness</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl p-4 cursor-pointer hover:scale-105 transition-transform">
              <div className="text-2xl mb-2">🎓</div>
              <div className="text-sm">Education</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
