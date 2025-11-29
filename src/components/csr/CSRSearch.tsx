import { Search, MapPin, DollarSign, Clock } from 'lucide-react';
import { useState } from 'react';
import { mockCSRProjects } from './mockCSRData';

interface CSRSearchProps {
  onProjectClick: (projectId: string) => void;
}

export function CSRSearch({ onProjectClick }: CSRSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'active' | 'upcoming' | 'completed'>('all');

  const filteredProjects = mockCSRProjects.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || project.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="h-full flex flex-col bg-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-6">
        <h1 className="text-2xl mb-4">Search Projects</h1>
        
        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-green-200" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, location, or category..."
            className="bg-transparent border-none outline-none text-white placeholder-green-200 flex-1"
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-4 bg-white border-b border-slate-200">
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === 'all' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            All Projects
          </button>
          <button
            onClick={() => setSelectedFilter('active')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === 'active' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setSelectedFilter('upcoming')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === 'upcoming' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setSelectedFilter('completed')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === 'completed' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Completed
          </button>
        </div>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-20">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm text-slate-600">
            {filteredProjects.length} {filteredProjects.length === 1 ? 'Result' : 'Results'}
          </h3>
        </div>

        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="mb-2 text-slate-700">No projects found</h3>
            <p className="text-sm text-slate-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredProjects.map(project => {
              const progress = (project.amountRaised / project.totalCost) * 100;
              
              return (
                <div
                  key={project.id}
                  onClick={() => onProjectClick(project.id)}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="flex gap-3 p-3">
                    {/* Thumbnail */}
                    <div className="w-24 h-24 bg-slate-200 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={project.images[0]}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm mb-1 line-clamp-1">{project.title}</h3>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded">
                          {project.category}
                        </span>
                        <span className={`px-2 py-0.5 text-xs rounded ${
                          project.status === 'completed'
                            ? 'bg-green-100 text-green-700'
                            : project.status === 'active'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-3 text-xs text-slate-600 mb-2">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {project.location.split(',')[0]}
                        </span>
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ${(project.totalCost / 1000).toFixed(0)}K
                        </span>
                      </div>

                      {/* Mini Progress Bar */}
                      <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
