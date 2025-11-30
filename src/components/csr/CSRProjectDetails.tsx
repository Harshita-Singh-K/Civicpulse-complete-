import { ArrowLeft, MapPin, CheckCircle, Clock, AlertCircle, DollarSign, TrendingUp, MessageCircle, Share2, Heart, MoreHorizontal, ShieldCheck } from 'lucide-react';
import { mockCSRProjects } from './mockCSRData';
import { useState, useEffect } from 'react';

interface CSRProjectDetailsProps {
  projectId: string;
  onBack: () => void;
}

export function CSRProjectDetails({ projectId, onBack }: CSRProjectDetailsProps) {
  const project = mockCSRProjects.find(p => p.id === projectId);

  if (!project) {
    return <div>Project not found</div>;
  }

  const progress = (project.amountRaised / project.totalCost) * 100;
  const [scrolled, setScrolled] = useState(false);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const handleScroll = (e: any) => {
      setScrolled(e.target.scrollTop > 50);
    };
    const container = document.getElementById('project-details-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <Clock className="w-5 h-5 text-blue-600" />;
      default:
        return <AlertCircle className="w-5 h-5 text-slate-400" />;
    }
  };

  const getMilestoneColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'in-progress':
        return 'bg-blue-500';
      default:
        return 'bg-slate-300';
    }
  };

  return (
    <div id="project-details-container" className="h-full flex flex-col bg-white overflow-y-auto relative scroll-smooth">
      {/* Dynamic Header */}
      <div className={`fixed top-0 left-0 right-0 z-20 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
        }`}>
        <div className="px-4 flex items-center justify-between">
          <button
            onClick={onBack}
            className={`p-2 rounded-full transition-colors tap-scale ${scrolled ? 'bg-slate-100 text-slate-700' : 'bg-black/30 text-white backdrop-blur-sm'
              }`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div className={`flex-1 text-center transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-sm font-bold truncate px-4">{project.title}</h1>
          </div>

          <div className="flex items-center gap-2">
            <button className={`p-2 rounded-full transition-colors tap-scale ${scrolled ? 'bg-slate-100 text-slate-700' : 'bg-black/30 text-white backdrop-blur-sm'
              }`}>
              <Share2 className="w-5 h-5" />
            </button>
            <button className={`p-2 rounded-full transition-colors tap-scale ${scrolled ? 'bg-slate-100 text-slate-700' : 'bg-black/30 text-white backdrop-blur-sm'
              }`}>
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Parallax Project Cover */}
      <div className="relative h-80 w-full overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover parallax-image scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white animate-fade-slide-up">
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 bg-green-500/90 backdrop-blur-md text-white text-xs font-bold rounded-full shadow-sm uppercase tracking-wider">
              {project.category}
            </span>
            <div className={`px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md ${project.status === 'completed'
                ? 'bg-green-600/80 text-white'
                : project.status === 'upcoming'
                  ? 'bg-blue-600/80 text-white'
                  : 'bg-amber-500/80 text-white'
              }`}>
              {project.status === 'completed' ? 'Completed' : project.status === 'upcoming' ? 'Upcoming' : 'Active'}
            </div>
          </div>

          <h1 className="text-2xl font-bold mb-2 leading-tight text-shadow-md">{project.title}</h1>

          <div className="flex items-center gap-2 text-sm text-slate-200">
            <MapPin className="w-4 h-4" />
            {project.location}
            {project.sponsor && (
              <div className="flex items-center gap-1 ml-2 pl-2 border-l border-white/30">
                <ShieldCheck className="w-4 h-4 text-blue-400" />
                <span className="text-blue-200">Verified NGO</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 -mt-4 bg-white rounded-t-3xl relative z-10">
        {/* Quick Stats Row */}
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-100">
          <div className="text-center flex-1 border-r border-slate-100">
            <div className="text-lg font-bold text-slate-900 animate-count-up">125</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Backers</div>
          </div>
          <div className="text-center flex-1 border-r border-slate-100">
            <div className="text-lg font-bold text-slate-900 animate-count-up" style={{ animationDelay: '0.1s' }}>12</div>
            <div className="text-xs text-slate-500 uppercase tracking-wide">Days Left</div>
          </div>
          <div className="text-center flex-1">
            <button
              onClick={() => setLiked(!liked)}
              className="flex flex-col items-center justify-center w-full tap-scale"
            >
              <Heart className={`w-6 h-6 mb-1 transition-colors ${liked ? 'text-red-500 fill-red-500' : 'text-slate-400'}`} />
              <span className="text-xs text-slate-500 uppercase tracking-wide">Save</span>
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm text-slate-600 mb-2">Project Description</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>
        </div>

        {/* Budget Breakdown - Animated */}
        <div className="mb-8 animate-fade-slide-up">
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-green-600" />
            Funding Status
          </h3>

          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-4 mb-4">
            <div className="flex items-end justify-between mb-2">
              <div>
                <span className="text-3xl font-bold text-slate-900">${(project.amountRaised / 1000).toFixed(1)}k</span>
                <span className="text-sm text-slate-500 ml-1">raised</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-medium text-slate-900">${(project.totalCost / 1000).toFixed(1)}k</span>
                <span className="text-xs text-slate-500 block">goal</span>
              </div>
            </div>

            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full shadow-sm progress-bar-animated glow-green"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-slate-50 rounded-xl p-2.5 text-center">
                <div className="text-[10px] text-slate-400 uppercase font-bold mb-1">Total</div>
                <div className="text-sm font-bold text-slate-700">${(project.totalCost / 1000).toFixed(0)}K</div>
              </div>
              <div className="bg-green-50 rounded-xl p-2.5 text-center">
                <div className="text-[10px] text-green-600 uppercase font-bold mb-1">Raised</div>
                <div className="text-sm font-bold text-green-700">${(project.amountRaised / 1000).toFixed(0)}K</div>
              </div>
              <div className="bg-blue-50 rounded-xl p-2.5 text-center">
                <div className="text-[10px] text-blue-600 uppercase font-bold mb-1">Left</div>
                <div className="text-sm font-bold text-blue-700">${(project.amountRemaining / 1000).toFixed(0)}K</div>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline - Vertical Instagram Style */}
        <div className="mb-8 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-600" />
            Project Timeline
          </h3>
          <div className="space-y-0 relative pl-2">
            {/* Vertical Line */}
            <div className="absolute left-[27px] top-4 bottom-4 w-0.5 bg-slate-100"></div>

            {project.timeline.map((milestone, index) => (
              <div key={index} className="flex gap-4 relative z-10 group">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full ${getMilestoneColor(milestone.status)} flex items-center justify-center text-white shadow-sm border-4 border-white transition-transform group-hover:scale-110`}>
                    {getMilestoneIcon(milestone.status)}
                  </div>
                </div>
                <div className="flex-1 pb-8 pt-1">
                  <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-1">
                      <div className="text-sm font-bold text-slate-800">{milestone.milestone}</div>
                      <div className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold ${milestone.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : milestone.status === 'in-progress'
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-slate-200 text-slate-600'
                        }`}>
                        {milestone.status === 'completed' ? 'Done' : milestone.status === 'in-progress' ? 'Active' : 'Pending'}
                      </div>
                    </div>
                    <div className="text-xs text-slate-500 font-medium">
                      {new Date(milestone.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section - Grid Cards */}
        <div className="mb-8 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-600" />
            Community Impact
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {project.impact.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-4 border border-purple-100 flex items-center gap-3 card-lift-hover">
                <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm text-purple-600">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <p className="text-sm font-medium text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Updates */}
        {project.updates.length > 0 && (
          <div className="mb-6">
            <h3 className="text-sm text-slate-600 mb-3">Recent Updates</h3>
            <div className="space-y-3">
              {project.updates.map((update, index) => (
                <div key={index} className="bg-white border border-slate-200 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="text-sm">{update.title}</div>
                    <div className="text-xs text-slate-500">
                      {new Date(update.date).toLocaleDateString()}
                    </div>
                  </div>
                  <p className="text-sm text-slate-600 mb-3">{update.description}</p>
                  {update.images && update.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {update.images.map((img, imgIndex) => (
                        <img
                          key={imgIndex}
                          src={img}
                          alt="Update"
                          className="w-full h-24 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Sponsor Info */}
        {project.sponsor && (
          <div className="mb-6 bg-blue-50 border border-blue-200 rounded-xl p-4">
            <div className="text-xs text-blue-600 mb-1">Sponsored by</div>
            <div className="text-sm text-blue-900">{project.sponsor}</div>
          </div>
        )}
      </div>

      {/* Action Bar */}
      {/* Sticky Action Bar */}
      <div className="sticky bottom-0 border-t border-slate-100 px-4 py-4 bg-white/90 backdrop-blur-lg shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] safe-bottom z-30">
        {project.amountRemaining > 0 ? (
          <div className="flex gap-3">
            <button className="flex-1 bg-slate-100 text-slate-700 py-3.5 rounded-xl hover:bg-slate-200 transition-all text-sm font-bold tap-scale flex items-center justify-center gap-2">
              <MessageCircle className="w-4 h-4" />
              Updates
            </button>
            <button className="flex-[2] bg-gradient-to-r from-green-600 to-blue-600 text-white py-3.5 rounded-xl shadow-lg shadow-green-200 hover:shadow-xl transition-all text-sm font-bold tap-scale flex items-center justify-center gap-2 glow-green">
              Sponsor Now
              <ArrowLeft className="w-4 h-4 rotate-180" />
            </button>
          </div>
        ) : (
          <div className="text-center py-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-bold mb-1">
              <CheckCircle className="w-4 h-4" />
              Fully Funded
            </div>
            <p className="text-xs text-slate-500 mt-1">This project has reached its funding goal</p>
          </div>
        )}
      </div>
    </div>
  );
}
