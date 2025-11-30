import { ArrowLeft, Filter, MapPin, DollarSign, Search, SlidersHorizontal } from 'lucide-react';
import { useState, useEffect } from 'react';
import { mockCSRProjects } from './mockCSRData';

interface CSRSponsorshipProps {
  onProjectClick: (projectId: string) => void;
  onBack: () => void;
}

export function CSRSponsorship({ onProjectClick, onBack }: CSRSponsorshipProps) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');

  const categories = ['all', 'Infrastructure', 'Education', 'Environment', 'Water & Sanitation', 'Public Safety'];
  const budgets = ['all', 'Under $50K', '$50K-$100K', 'Above $100K'];

  const filteredProjects = mockCSRProjects.filter(project => {
    if (selectedCategory !== 'all' && project.category !== selectedCategory) return false;
    if (selectedBudget !== 'all') {
      if (selectedBudget === 'Under $50K' && project.totalCost >= 50000) return false;
      if (selectedBudget === '$50K-$100K' && (project.totalCost < 50000 || project.totalCost > 100000)) return false;
      if (selectedBudget === 'Above $100K' && project.totalCost <= 100000) return false;
    }
    return true;
  });

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header with Glassmorphism */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-4 relative overflow-hidden shadow-lg z-20">
        <div className="absolute inset-0 bg-white/10 backdrop-blur-md"></div>
        <div className="relative z-10 flex items-center gap-3 mb-2">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-all tap-scale">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-shadow-sm">Browse Projects</h1>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center glow-green animate-bounce-in border border-white/30">
            <span className="text-lg">🤝</span>
          </div>
        </div>

        {/* Search Bar Overlay */}
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-white/70" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border-none rounded-xl leading-5 bg-white/20 text-white placeholder-white/70 focus:outline-none focus:bg-white/30 focus:ring-0 sm:text-sm transition-colors backdrop-blur-sm"
            placeholder="Search projects..."
          />
        </div>
      </div>

      {/* Filters - Instagram Story Style */}
      <div className="bg-white border-b border-slate-100 shadow-sm sticky top-0 z-10">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-green-600" />
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Filters</span>
            </div>
            <button className="p-1.5 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
              <SlidersHorizontal className="w-3 h-3 text-slate-600" />
            </button>
          </div>

          {/* Category Filter - Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 snap-x smooth-scroll scrollbar-hide-csr">
            {categories.map((cat, index) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all tap-scale snap-start ${selectedCategory === cat
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md transform scale-105'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                  }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Budget Filter - Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-1 mt-1 snap-x smooth-scroll scrollbar-hide-csr">
            {budgets.map((budget, index) => (
              <button
                key={budget}
                onClick={() => setSelectedBudget(budget)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all tap-scale snap-start ${selectedBudget === budget
                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                    : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                  }`}
              >
                {budget === 'all' ? 'Any Budget' : budget}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner with Parallax Feel */}
      <div className="px-4 py-4 animate-fade-slide-up">
        <div className="relative h-44 rounded-2xl overflow-hidden shadow-lg card-lift-hover group cursor-pointer">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
            alt="Community"
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-green-900/80 flex flex-col justify-center px-6 text-white backdrop-blur-[1px]">
            <div className="w-10 h-1 bg-green-400 rounded-full mb-3"></div>
            <h2 className="mb-2 text-xl font-bold text-shadow-md">Support a Civic Improvement Project</h2>
            <p className="text-sm text-blue-100 max-w-[80%]">
              Choose a project that matches your CSR vision and make a real impact today.
            </p>
          </div>
        </div>
      </div>

      {/* Project List - Instagram Explore Style */}
      <div className="flex-1 overflow-y-auto px-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wide">
            {filteredProjects.length} Projects Available
          </h3>
          <span className="text-xs text-slate-500">Sorted by Relevance</span>
        </div>

        <div className="space-y-3">
          {filteredProjects.map((project, index) => {
            const progress = (project.amountRaised / project.totalCost) * 100;
            const isFullyFunded = project.amountRemaining === 0;

            return (
              <div
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl transition-all cursor-pointer card-lift-hover tap-scale animate-fade-slide-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Thumbnail with Zoom Effect */}
                <div className="relative h-52 bg-slate-200 overflow-hidden">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60"></div>

                  <div className={`absolute top-3 right-3 px-3 py-1.5 text-xs font-bold rounded-full shadow-sm backdrop-blur-md ${isFullyFunded
                      ? 'bg-green-500/90 text-white'
                      : project.status === 'upcoming'
                        ? 'bg-blue-500/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}>
                    {isFullyFunded ? 'Fully Funded' : project.status === 'upcoming' ? 'Upcoming' : 'Active'}
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="px-2 py-0.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-medium rounded uppercase tracking-wider border border-white/10">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="text-lg font-bold leading-tight text-shadow-sm">{project.title}</h3>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-center gap-1 text-xs text-slate-500 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {project.location}
                  </div>

                  <p className="text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Budget Cards - Compact */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    <div className="bg-slate-50 rounded-lg p-2 text-center border border-slate-100">
                      <div className="text-[10px] text-slate-400 uppercase font-bold mb-0.5">Total</div>
                      <div className="text-sm font-bold text-slate-700">
                        ${(project.totalCost / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 text-center border border-green-100">
                      <div className="text-[10px] text-green-600 uppercase font-bold mb-0.5">Raised</div>
                      <div className="text-sm font-bold text-green-700">
                        ${(project.amountRaised / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2 text-center border border-blue-100">
                      <div className="text-[10px] text-blue-600 uppercase font-bold mb-0.5">Left</div>
                      <div className="text-sm font-bold text-blue-700">
                        ${(project.amountRemaining / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500 font-medium">Funding Progress</span>
                      <span className="text-green-600 font-bold">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-sm progress-bar-animated"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className={`w-full py-3.5 rounded-xl text-sm font-bold transition-all transform active:scale-95 ${isFullyFunded
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg shadow-green-200 hover:shadow-xl hover:shadow-green-300'
                      }`}
                    disabled={isFullyFunded}
                  >
                    {isFullyFunded ? 'Fully Funded' : 'Sponsor Now →'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
