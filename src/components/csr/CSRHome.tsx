import { Play, BarChart3, TrendingUp, CheckCircle, Clock } from 'lucide-react';
import { mockCSRProjects, mockCSRReels } from './mockCSRData';

interface CSRHomeProps {
  onProjectClick: (projectId: string) => void;
  onAnalyticsClick: () => void;
}

export function CSRHome({ onProjectClick, onAnalyticsClick }: CSRHomeProps) {
  const sponsoredProjects = mockCSRProjects.filter(p => p.sponsor);
  const activeProjects = sponsoredProjects.filter(p => p.status === 'active' || p.status === 'sponsored');
  const completedProjects = sponsoredProjects.filter(p => p.status === 'completed');
  const totalSponsored = sponsoredProjects.length;

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-50 to-slate-50 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl mb-1">CSR Portal</h1>
            <p className="text-green-100 text-sm">Making communities better together</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm">🤝</span>
          </div>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl mb-1">{totalSponsored}</div>
            <div className="text-xs text-green-100">Sponsored</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl mb-1">{activeProjects.length}</div>
            <div className="text-xs text-green-100">In Progress</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3">
            <div className="text-2xl mb-1">{completedProjects.length}</div>
            <div className="text-xs text-green-100">Completed</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAnalyticsClick}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-sm mb-0.5">Analytics</div>
              <div className="text-xs text-slate-500">View reports</div>
            </div>
          </button>

          <button className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-sm mb-0.5">Impact</div>
              <div className="text-xs text-slate-500">Track metrics</div>
            </div>
          </button>
        </div>
      </div>

      {/* CSR Project Reels */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm">CSR Project Reels</h2>
          <button className="text-xs text-green-600">View All →</button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockCSRReels.map(reel => (
            <div
              key={reel.id}
              className="flex-shrink-0 w-32 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              <div className="relative h-56 bg-slate-200">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <div className="text-white">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center mb-2">
                      <Play className="w-4 h-4 text-green-600 ml-0.5" />
                    </div>
                    <div className="text-xs line-clamp-2">{reel.title}</div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded">
                  {reel.duration}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Active Projects */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm">Your Active Projects</h2>
          <button className="text-xs text-green-600">View All →</button>
        </div>

        <div className="space-y-3">
          {activeProjects.slice(0, 3).map(project => {
            const progress = (project.amountRaised / project.totalCost) * 100;
            
            return (
              <div
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all cursor-pointer"
              >
                <div className="relative h-40 bg-slate-200">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-2 right-2 px-3 py-1 bg-blue-600 text-white text-xs rounded-full">
                    {project.status === 'active' ? 'In Progress' : 'Sponsored'}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="mb-1">{project.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-600 mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{project.category}</span>
                    <span>📍 {project.location}</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-slate-600">Progress</span>
                      <span className="text-green-600">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <span className="text-slate-500">Funded: </span>
                      <span className="text-green-600">${project.amountRaised.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Total: </span>
                      <span>${project.totalCost.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Browse More Projects */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white shadow-lg">
          <h3 className="mb-2">Explore More Projects</h3>
          <p className="text-sm text-blue-100 mb-4">
            Discover new opportunities to make a difference in your community
          </p>
          <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors text-sm">
            Browse Projects →
          </button>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="px-4 mb-6">
        <h2 className="text-sm mb-3">Your Impact This Month</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl mb-1">3</div>
            <div className="text-xs text-slate-600">Projects Completed</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl mb-1">12.5K</div>
            <div className="text-xs text-slate-600">People Impacted</div>
          </div>
        </div>
      </div>
    </div>
  );
}
