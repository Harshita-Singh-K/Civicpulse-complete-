import { Play, Heart, MessageCircle, Share2, Bookmark, MoreHorizontal, ArrowLeft, Camera, Volume2, VolumeX, MapPin } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { mockReels } from './mockData';

export function Reels() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ axis: 'y', loop: false, dragFree: false });
  const [muted, setMuted] = useState(true);
  const [likedReels, setLikedReels] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setActiveIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  const toggleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (likedReels.includes(id)) {
      setLikedReels(likedReels.filter(r => r !== id));
    } else {
      setLikedReels([...likedReels, id]);
    }
  };

  const toggleMute = () => setMuted(!muted);

  return (
    <div className="h-full bg-black relative overflow-hidden">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-20 p-4 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent">
        <button className="text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-white font-bold text-lg drop-shadow-md">Civic Reels</h1>
        <button className="text-white">
          <Camera className="w-6 h-6" />
        </button>
      </div>

      {/* Vertical Carousel */}
      <div className="h-full" ref={emblaRef}>
        <div className="h-full flex flex-col touch-pan-y">
          {mockReels.map((reel, index) => (
            <div key={reel.id} className="flex-[0_0_100%] relative h-full w-full bg-slate-900">
              {/* Media */}
              <img
                src={reel.thumbnail}
                alt={reel.title}
                className="w-full h-full object-cover opacity-90"
              />

              {/* Video Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/80" />

              {/* Play/Pause/Mute Overlay */}
              <div
                className="absolute inset-0 flex items-center justify-center z-10"
                onClick={toggleMute}
              >
                {index === activeIndex && (
                  <div className="bg-black/30 p-4 rounded-full backdrop-blur-sm animate-pulse-soft">
                    {muted ? <VolumeX className="w-8 h-8 text-white" /> : <Volume2 className="w-8 h-8 text-white" />}
                  </div>
                )}
              </div>

              {/* Right Action Bar */}
              <div className="absolute bottom-20 right-4 z-20 flex flex-col items-center gap-6">
                <button
                  onClick={(e) => toggleLike(reel.id, e)}
                  className="flex flex-col items-center gap-1 group"
                >
                  <Heart
                    className={`w-8 h-8 transition-all duration-200 ${likedReels.includes(reel.id) ? 'fill-red-500 text-red-500 scale-110' : 'text-white group-active:scale-90'}`}
                  />
                  <span className="text-white text-xs font-medium drop-shadow-md">{reel.likes + (likedReels.includes(reel.id) ? 1 : 0)}</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <MessageCircle className="w-8 h-8 text-white group-active:scale-90 transition-transform" />
                  <span className="text-white text-xs font-medium drop-shadow-md">124</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <Share2 className="w-8 h-8 text-white group-active:scale-90 transition-transform" />
                  <span className="text-white text-xs font-medium drop-shadow-md">Share</span>
                </button>

                <button className="flex flex-col items-center gap-1 group">
                  <MoreHorizontal className="w-8 h-8 text-white group-active:scale-90 transition-transform" />
                </button>
              </div>

              {/* Bottom Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20 pb-8 bg-gradient-to-t from-black/90 to-transparent">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold text-white border border-white/20">
                    CP
                  </div>
                  <span className="text-white font-semibold text-sm drop-shadow-md">CivicPulse Official</span>
                  <button className="px-2 py-0.5 rounded-md border border-white/30 text-white text-[10px] font-medium backdrop-blur-sm">
                    Follow
                  </button>
                </div>

                <h2 className="text-white text-base font-medium mb-1 drop-shadow-md line-clamp-2 pr-12">
                  {reel.title}
                </h2>

                <div className="flex items-center gap-3 text-white/80 text-xs mb-3">
                  <span className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded-full backdrop-blur-md">
                    <Play className="w-3 h-3 fill-white/80" /> {reel.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Downtown
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full bg-[var(--accent-teal)] transition-all duration-1000 ease-linear ${index === activeIndex ? 'w-full' : 'w-0'}`}
                    style={{ transitionDuration: index === activeIndex ? '15s' : '0s' }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
