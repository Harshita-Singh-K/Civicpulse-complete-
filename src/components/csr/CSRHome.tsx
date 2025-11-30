import { Play, BarChart3, TrendingUp, CheckCircle, Clock, Sparkles, Target, Users } from 'lucide-react';
import { mockCSRProjects, mockCSRReels } from './mockCSRData';
import { useState, useEffect } from 'react';

interface CSRHomeProps {
  onProjectClick: (projectId: string) => void;
  onAnalyticsClick: () => void;
}

export function CSRHome({ onProjectClick, onAnalyticsClick }: CSRHomeProps) {
  const sponsoredProjects = mockCSRProjects.filter(p => p.sponsor);
  const activeProjects = sponsoredProjects.filter(p => p.status === 'active' || p.status === 'sponsored');
  const completedProjects = sponsoredProjects.filter(p => p.status === 'completed');
  const totalSponsored = sponsoredProjects.length;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-green-50 to-slate-50 overflow-y-auto pb-20">
      {/* Header with Glassmorphism */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-6 rounded-b-3xl shadow-lg relative overflow-hidden">
        {/* Animated Background Blur */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6 animate-fade-slide-up">
            <div>
              <h1 className="text-2xl mb-1 font-bold text-gradient">CivicPulse CSR</h1>
              <p className="text-green-100 text-sm">Making communities better together</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center glow-green animate-bounce-in">
              <span className="text-lg">🤝</span>
            </div>
          </div>

          {/* Metric Cards with Animations */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 tap-scale cursor-pointer hover:bg-white/20 transition-all animate-fade-slide-up stagger-1 shadow-md">
              <div className="text-2xl font-bold mb-1 animate-count-up">{totalSponsored}</div>
              <div className="text-xs text-green-100">Sponsored</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 tap-scale cursor-pointer hover:bg-white/20 transition-all animate-fade-slide-up stagger-2 shadow-md">
              <div className="text-2xl font-bold mb-1 animate-count-up">{activeProjects.length}</div>
              <div className="text-xs text-green-100">In Progress</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 tap-scale cursor-pointer hover:bg-white/20 transition-all animate-fade-slide-up stagger-3 shadow-md">
              <div className="text-2xl font-bold mb-1 animate-count-up">{completedProjects.length}</div>
              <div className="text-xs text-green-100">Completed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions with Enhanced Interactions */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onAnalyticsClick}
            className="bg-white rounded-xl p-4 shadow-md card-lift-hover tap-scale ripple-container flex items-center gap-3 animate-fade-slide-up stagger-1"
          >
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center icon-bounce-hover">
              <BarChart3 className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium mb-0.5">Analytics</div>
              <div className="text-xs text-slate-500">View reports</div>
            </div>
          </button>

          <button className="bg-white rounded-xl p-4 shadow-md card-lift-hover tap-scale ripple-container flex items-center gap-3 animate-fade-slide-up stagger-2">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center icon-bounce-hover">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-left">
              <div className="text-sm font-medium mb-0.5">Impact</div>
              <div className="text-xs text-slate-500">Track metrics</div>
            </div>
          </button>
        </div>

        {/* Additional Quick Action Tiles */}
        <div className="grid grid-cols-3 gap-2 mt-3">
          <button className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-3 tap-scale card-lift-hover animate-fade-slide-up stagger-3">
            <Sparkles className="w-5 h-5 text-purple-600 mx-auto mb-1" />
            <div className="text-xs font-medium text-purple-900">Explore</div>
          </button>
          <button className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-3 tap-scale card-lift-hover animate-fade-slide-up stagger-4">
            <Target className="w-5 h-5 text-orange-600 mx-auto mb-1" />
            <div className="text-xs font-medium text-orange-900">Adopt</div>
          </button>
          <button className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-lg p-3 tap-scale card-lift-hover animate-fade-slide-up stagger-5">
            <Users className="w-5 h-5 text-teal-600 mx-auto mb-1" />
            <div className="text-xs font-medium text-teal-900">Track</div>
          </button>
        </div>
      </div>

      {/* CSR Project Reels - Instagram Style */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">CSR Impact Reels</h2>
          <button className="text-xs text-green-600 font-medium hover:text-green-700">View All →</button>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-2 snap-x smooth-scroll scrollbar-hide-csr">
          {mockCSRReels.map((reel, index) => (
            <div
              key={reel.id}
              className="flex-shrink-0 w-32 bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all cursor-pointer snap-center card-lift-hover tap-scale animate-fade-slide-left"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative h-56 bg-slate-200">
                <img
                  src={reel.thumbnail}
                  alt={reel.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                  <div className="text-white">
                    <div className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center mb-2 hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 text-green-600 ml-0.5 animate-pulse" />
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

      {/* Active Projects with Scroll Reveal */}
      <div className="px-4 mb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold">Your Active Projects</h2>
          <button className="text-xs text-green-600 font-medium hover:text-green-700">View All →</button>
        </div>

        <div className="space-y-3">
          {activeProjects.slice(0, 3).map((project, index) => {
            const progress = (project.amountRaised / project.totalCost) * 100;

            return (
              <div
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="bg-white rounded-xl shadow-md overflow-hidden card-lift-hover tap-scale cursor-pointer animate-fade-slide-up"
                style={{ animationDelay: `${index * 0.15}s` }}
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
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all progress-bar-animated glow-green"
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

      {/* Browse More Projects - Enhanced CTA */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl p-6 text-white shadow-lg card-lift-hover animate-fade-slide-up relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10">
            <h3 className="font-bold mb-2">Explore More Projects</h3>
            <p className="text-sm text-blue-100 mb-4">
              Discover new opportunities to make a difference in your community
            </p>
            <button className="px-6 py-3 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-all text-sm font-medium tap-scale shadow-md">
              Browse Projects →
            </button>
          </div>
        </div>
      </div>

      {/* Impact Summary with Counter Animations */}
      <div className="px-4 mb-6">
        <h2 className="text-sm font-semibold mb-3">Your Impact This Month</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white rounded-xl p-4 shadow-md card-lift-hover tap-scale animate-fade-slide-up stagger-1">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3 icon-bounce-hover">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold mb-1 animate-count-up">3</div>
            <div className="text-xs text-slate-600 font-medium">Projects Completed</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md card-lift-hover tap-scale animate-fade-slide-up stagger-2">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3 icon-bounce-hover">
              <Clock className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold mb-1 animate-count-up">12.5K</div>
            <div className="text-xs text-slate-600 font-medium">People Impacted</div>
          </div>
        </div>
      </div>
    </div>
  );
}
