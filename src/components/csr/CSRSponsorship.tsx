import { ArrowLeft, Filter, MapPin, DollarSign } from 'lucide-react';
import { useState } from 'react';
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
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-4">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl">Browse Projects</h1>
          </div>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm">🤝</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-4 bg-white border-b border-slate-200">
        <div className="flex items-center gap-2 mb-3">
          <Filter className="w-4 h-4 text-slate-600" />
          <span className="text-sm">Filters</span>
        </div>

        {/* Category Filter */}
        <div className="mb-3">
          <div className="text-xs text-slate-600 mb-2">Category</div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Budget Filter */}
        <div>
          <div className="text-xs text-slate-600 mb-2">Budget Range</div>
          <div className="flex gap-2 overflow-x-auto pb-2">
            {budgets.map(budget => (
              <button
                key={budget}
                onClick={() => setSelectedBudget(budget)}
                className={`px-3 py-2 rounded-lg text-xs whitespace-nowrap transition-all ${
                  selectedBudget === budget
                    ? 'bg-green-600 text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {budget === 'all' ? 'All Budgets' : budget}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="px-4 py-4">
        <div className="relative h-40 rounded-2xl overflow-hidden shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=800&q=80"
            alt="Community"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-green-600/90 flex flex-col justify-center px-6 text-white">
            <h2 className="mb-2">Support a Civic Improvement Project</h2>
            <p className="text-sm text-blue-100">
              Choose a project that matches your CSR vision
            </p>
          </div>
        </div>
      </div>

      {/* Project List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm text-slate-600">
            {filteredProjects.length} Projects Available
          </h3>
        </div>

        <div className="space-y-3">
          {filteredProjects.map(project => {
            const progress = (project.amountRaised / project.totalCost) * 100;
            const isFullyFunded = project.amountRemaining === 0;

            return (
              <div
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                {/* Thumbnail */}
                <div className="relative h-48 bg-slate-200">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-2 right-2 px-3 py-1 text-xs rounded-full ${
                    isFullyFunded
                      ? 'bg-green-600 text-white'
                      : project.status === 'upcoming'
                      ? 'bg-blue-600 text-white'
                      : 'bg-amber-500 text-white'
                  }`}>
                    {isFullyFunded ? 'Fully Funded' : project.status === 'upcoming' ? 'Upcoming' : 'Active'}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="mb-2">{project.title}</h3>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      {project.category}
                    </span>
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {project.location}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Budget Cards */}
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <div className="bg-slate-50 rounded-lg p-2 text-center">
                      <div className="text-xs text-slate-500 mb-1">Total Cost</div>
                      <div className="text-sm text-slate-900">
                        ${(project.totalCost / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-2 text-center">
                      <div className="text-xs text-green-600 mb-1">Raised</div>
                      <div className="text-sm text-green-900">
                        ${(project.amountRaised / 1000).toFixed(0)}K
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-2 text-center">
                      <div className="text-xs text-blue-600 mb-1">Remaining</div>
                      <div className="text-sm text-blue-900">
                        ${(project.amountRemaining / 1000).toFixed(0)}K
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600">Funding Progress</span>
                      <span className="text-green-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {/* CTA */}
                  <button
                    className={`w-full py-3 rounded-lg text-sm transition-all ${
                      isFullyFunded
                        ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:shadow-lg'
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
