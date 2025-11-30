import { Plus, TrendingUp, Clock, CheckCircle, AlertCircle, Filter, Search, MapPin, Play, ChevronRight, Heart, MessageCircle, Share2, MoreHorizontal, Flag, Bookmark } from 'lucide-react';
import { useState, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { mockIssues, mockReels } from './mockData';

interface HomeProps {
  onReportClick: () => void;
  onIssueClick: (issueId: string) => void;
}

export function Home({ onReportClick, onIssueClick }: HomeProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'urgent' | 'recent'>('trending');
  const [scrolled, setScrolled] = useState(false);
  const [emblaRef] = useEmblaCarousel({ loop: false, align: 'start', dragFree: true });

  // Handle scroll effect for header
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrolled(e.currentTarget.scrollTop > 20);
  };

  const filteredIssues = mockIssues.filter(issue =>
    filterStatus === 'all' ? true : issue.status === filterStatus
  );

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortBy === 'urgent') {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === 'trending') {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-400 bg-green-400/10 border-green-400/20';
      case 'in-progress': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      case 'acknowledged': return 'text-amber-400 bg-amber-400/10 border-amber-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 shadow-red-500/50';
      case 'high': return 'bg-orange-500 shadow-orange-500/50';
      case 'medium': return 'bg-amber-500 shadow-amber-500/50';
      default: return 'bg-slate-500 shadow-slate-500/50';
    }
  };

  return (
    <div
      className="h-full flex flex-col bg-[var(--bg-primary)] overflow-y-auto scrollbar-hide"
      onScroll={handleScroll}
    >
      {/* Dynamic Header */}
      <div className={`sticky top-0 z-40 transition-all duration-300 ${scrolled
        ? 'glass-panel py-3 shadow-lg shadow-black/20'
        : 'bg-gradient-to-b from-[var(--bg-primary)] to-transparent py-5'
        }`}>
        <div className="px-5 flex items-center justify-between mb-4">
          <div className="transition-all duration-300">
            <h1 className={`font-bold text-[var(--text-primary)] tracking-tight transition-all ${scrolled ? 'text-xl' : 'text-2xl'}`}>
              CivicPulse
            </h1>
            <p className={`text-[var(--text-secondary)] transition-all ${scrolled ? 'text-[0px] h-0 opacity-0 overflow-hidden' : 'text-xs h-auto opacity-100'}`}>
              Building better communities
            </p>
          </div>
          <div className="w-10 h-10 rounded-full border border-[var(--border-subtle)] flex items-center justify-center animate-scale-tap active:scale-95 transition-transform cursor-pointer bg-[var(--bg-card)]">
            <span className="text-lg">👤</span>
          </div>
        </div>

        {/* Search Bar - Morphing */}
        <div className={`px-5 transition-all duration-300 ${scrolled ? 'scale-95 origin-top' : 'scale-100'}`}>
          <div className="bg-[var(--bg-card)] rounded-xl border border-[var(--border-subtle)] px-4 py-2.5 flex items-center gap-3 transition-all focus-within:border-[var(--accent-teal)] focus-within:shadow-[0_0_0_2px_rgba(14,165,163,0.2)]">
            <Search className="w-4 h-4 text-[var(--text-secondary)]" />
            <input
              type="text"
              placeholder="Search issues..."
              className="bg-transparent border-none outline-none text-[var(--text-primary)] placeholder-[var(--text-secondary)] flex-1 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Filters and Sort - Sticky */}
      <div className={`px-5 py-3 sticky top-[72px] z-30 transition-all duration-300 ${scrolled ? 'glass-panel border-t-0' : 'bg-transparent'}`}>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-5 px-5">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${filterStatus === 'all'
              ? 'bg-[var(--accent-teal)] text-white border-transparent shadow-lg shadow-teal-900/20'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${filterStatus === 'pending'
              ? 'bg-[var(--accent-amber)] text-white border-transparent shadow-lg shadow-amber-900/20'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('in-progress')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${filterStatus === 'in-progress'
              ? 'bg-blue-600 text-white border-transparent shadow-lg shadow-blue-900/20'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border ${filterStatus === 'resolved'
              ? 'bg-green-600 text-white border-transparent shadow-lg shadow-green-900/20'
              : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border-[var(--border-subtle)]'
              }`}
          >
            Resolved
          </button>
        </div>
      </div>

      {/* Civic Reels Carousel */}
      <div className="mb-8 animate-fade-in-up animation-delay-100">
        <div className="px-5 mb-3 flex items-center justify-between">
          <h2 className="font-bold text-[var(--text-primary)] text-lg">Civic Reels</h2>
          <span className="text-xs font-medium text-[var(--accent-teal)] flex items-center gap-1">
            View All <ChevronRight className="w-3 h-3" />
          </span>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex px-5 gap-3">
            {mockReels.map((reel) => (
              <div key={reel.id} className="flex-[0_0_40%] min-w-0 relative group cursor-pointer active:scale-95 transition-transform duration-200">
                <div className="relative rounded-xl overflow-hidden aspect-[9/16] shadow-lg border border-[var(--border-subtle)]">
                  <img src={reel.thumbnail} alt={reel.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-white fill-white ml-0.5" />
                    </div>
                  </div>

                  <div className="absolute bottom-2 left-2 right-2">
                    <p className="text-[10px] font-medium text-white line-clamp-2 leading-tight mb-1">{reel.title}</p>
                    <div className="flex items-center gap-1 text-[9px] text-white/80">
                      <Play className="w-2 h-2 fill-current" /> {reel.views}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Map Preview */}
      <div className="px-5 mb-8 animate-fade-in-up animation-delay-200">
        <div className="bg-[var(--bg-card)] rounded-xl p-1 border border-[var(--border-subtle)] overflow-hidden">
          <div className="relative h-24 bg-[#1a263e] rounded-lg overflow-hidden group cursor-pointer">
            {/* Dark Map Pattern */}
            <div className="absolute inset-0 opacity-30" style={{
              backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)',
              backgroundSize: '12px 12px'
            }}></div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative">
                <div className="w-12 h-12 bg-[var(--accent-teal)]/20 rounded-full animate-pulse-soft absolute -top-3 -left-3"></div>
                <MapPin className="w-6 h-6 text-[var(--accent-teal)] relative z-10" />
              </div>
            </div>

            <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between">
              <div className="bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                <span className="text-xs font-medium text-white">12 Issues Nearby</span>
              </div>
              <div className="bg-[var(--accent-teal)] text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 group-hover:scale-105 transition-transform shadow-lg shadow-teal-900/20">
                View Map <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Issues Feed - Full Bleed Cards */}
      <div className="flex-1 pb-24">
        <div className="px-5 mb-4 flex items-center justify-between">
          <h2 className="font-bold text-[var(--text-primary)] text-lg">Recent Reports</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('trending')}
              className={`p-1.5 rounded-lg transition-colors ${sortBy === 'trending' ? 'bg-[var(--bg-card)] text-[var(--accent-teal)]' : 'text-[var(--text-secondary)]'}`}
            >
              <TrendingUp className="w-4 h-4" />
            </button>
            <button
              onClick={() => setSortBy('recent')}
              className={`p-1.5 rounded-lg transition-colors ${sortBy === 'recent' ? 'bg-[var(--bg-card)] text-[var(--accent-teal)]' : 'text-[var(--text-secondary)]'}`}
            >
              <Clock className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="space-y-6">
          {sortedIssues.map((issue, index) => (
            <div
              key={issue.id}
              onClick={() => onIssueClick(issue.id)}
              className="bg-[var(--bg-card)] border-y border-[var(--border-subtle)] sm:border sm:rounded-2xl sm:mx-5 overflow-hidden animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Card Header */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white">
                    {issue.id.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Citizen Report</p>
                    <p className="text-[10px] text-[var(--text-secondary)]">{issue.location} • {new Date(issue.reportedAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <MoreHorizontal className="w-5 h-5 text-[var(--text-secondary)]" />
              </div>

              {/* Media Area - Full Bleed */}
              <div className="relative aspect-[4/3] bg-slate-900">
                {issue.images[0] ? (
                  <img src={issue.images[0]} alt={issue.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[var(--text-secondary)]">
                    <MapPin className="w-12 h-12 opacity-20" />
                  </div>
                )}

                {/* Overlays */}
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <div className={`w-2.5 h-2.5 rounded-full shadow-lg ${getPriorityColor(issue.priority).split(' ')[0]} ring-2 ring-black/20`} />
                </div>

                <div className="absolute bottom-3 left-3">
                  <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm ${getStatusColor(issue.status)}`}>
                    {issue.status.replace('-', ' ')}
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="group flex items-center gap-1.5 text-[var(--text-primary)] transition-colors">
                    <Heart className="w-6 h-6 group-active:scale-75 transition-transform" />
                    <span className="text-sm font-medium">{issue.upvotes}</span>
                  </button>
                  <button className="text-[var(--text-primary)]">
                    <MessageCircle className="w-6 h-6" />
                  </button>
                  <button className="text-[var(--text-primary)]">
                    <Share2 className="w-6 h-6" />
                  </button>
                </div>
                <button className="text-[var(--text-primary)]">
                  <Bookmark className="w-6 h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="px-4 pb-4">
                <h3 className="font-bold text-[var(--text-primary)] mb-1">{issue.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2 mb-2">
                  <span className="font-medium text-[var(--text-primary)] mr-2">{issue.category}</span>
                  This issue requires immediate attention. Local residents have reported multiple occurrences...
                </p>
                <div className="text-[10px] text-[var(--text-secondary)] uppercase tracking-wide font-medium mt-2">
                  {new Date(issue.reportedAt).getHours()} hours ago
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Report Button */}
      <button
        onClick={onReportClick}
        className="fixed bottom-24 right-5 w-14 h-14 bg-gradient-to-tr from-[var(--accent-teal)] to-teal-500 text-white rounded-full shadow-lg shadow-teal-500/30 flex items-center justify-center hover:scale-110 active:scale-95 transition-all z-50 animate-float border-2 border-[var(--bg-primary)]"
      >
        <Plus className="w-7 h-7" />
      </button>
    </div>
  );
}
