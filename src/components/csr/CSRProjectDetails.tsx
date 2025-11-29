import { ArrowLeft, MapPin, CheckCircle, Clock, AlertCircle, DollarSign, TrendingUp } from 'lucide-react';
import { mockCSRProjects } from './mockCSRData';

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
    <div className="h-full flex flex-col bg-white overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg flex-1">Project Details</h1>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm">🤝</span>
          </div>
        </div>
      </div>

      {/* Project Cover */}
      <div className="relative h-64 bg-slate-200">
        <img
          src={project.images[0]}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-4 right-4 px-3 py-1.5 rounded-full text-sm ${
          project.status === 'completed'
            ? 'bg-green-600 text-white'
            : project.status === 'upcoming'
            ? 'bg-blue-600 text-white'
            : 'bg-amber-500 text-white'
        }`}>
          {project.status === 'completed' ? 'Completed' : project.status === 'upcoming' ? 'Upcoming' : 'Active'}
        </div>
      </div>

      <div className="p-4">
        {/* Title & Location */}
        <div className="mb-4">
          <h2 className="mb-2">{project.title}</h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full">
              {project.category}
            </span>
            <span className="px-3 py-1 bg-slate-100 text-slate-700 text-sm rounded-full flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {project.location}
            </span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-6">
          <h3 className="text-sm text-slate-600 mb-2">Project Description</h3>
          <p className="text-sm text-slate-700 leading-relaxed">{project.description}</p>
        </div>

        {/* Budget Summary */}
        <div className="mb-6">
          <h3 className="text-sm text-slate-600 mb-3">Budget Summary</h3>
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
              <div className="text-xs text-blue-600 mb-1">Total Cost</div>
              <div className="text-xl text-blue-900">${(project.totalCost / 1000).toFixed(0)}K</div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
              <div className="text-xs text-green-600 mb-1">Amount Raised</div>
              <div className="text-xl text-green-900">${(project.amountRaised / 1000).toFixed(0)}K</div>
            </div>
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 border border-amber-200">
              <div className="text-xs text-amber-600 mb-1">Remaining</div>
              <div className="text-xl text-amber-900">${(project.amountRemaining / 1000).toFixed(0)}K</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-600">Funding Progress</span>
              <span className="text-green-600">{Math.round(progress)}% Complete</span>
            </div>
            <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Timeline / Milestones */}
        <div className="mb-6">
          <h3 className="text-sm text-slate-600 mb-3">Project Timeline</h3>
          <div className="space-y-3">
            {project.timeline.map((milestone, index) => (
              <div key={index} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full ${getMilestoneColor(milestone.status)} flex items-center justify-center text-white`}>
                    {getMilestoneIcon(milestone.status)}
                  </div>
                  {index < project.timeline.length - 1 && (
                    <div className="w-0.5 h-full bg-slate-200 flex-1 mt-1" />
                  )}
                </div>
                <div className="flex-1 pb-4">
                  <div className="text-sm mb-1">{milestone.milestone}</div>
                  <div className="text-xs text-slate-500">
                    {new Date(milestone.date).toLocaleDateString('en-US', { 
                      month: 'short', 
                      day: 'numeric', 
                      year: 'numeric' 
                    })}
                  </div>
                  <div className={`inline-block px-2 py-0.5 rounded text-xs mt-1 ${
                    milestone.status === 'completed'
                      ? 'bg-green-100 text-green-700'
                      : milestone.status === 'in-progress'
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-slate-100 text-slate-600'
                  }`}>
                    {milestone.status === 'completed' ? 'Completed' : milestone.status === 'in-progress' ? 'In Progress' : 'Pending'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <div className="mb-6">
          <h3 className="text-sm text-slate-600 mb-3">How this project helps the community</h3>
          <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl p-4 border border-green-200">
            <div className="space-y-2">
              {project.impact.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <CheckCircle className="w-3 h-3 text-white" />
                  </div>
                  <p className="text-sm text-slate-700">{item}</p>
                </div>
              ))}
            </div>
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
      <div className="sticky bottom-0 border-t border-slate-200 px-4 py-4 bg-white">
        {project.amountRemaining > 0 ? (
          <div className="space-y-2">
            <button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 rounded-xl hover:shadow-lg transition-all">
              Sponsor This Project →
            </button>
            <button className="w-full bg-slate-100 text-slate-700 py-3 rounded-xl hover:bg-slate-200 transition-all text-sm">
              View Worker Updates
            </button>
          </div>
        ) : (
          <div className="text-center py-3">
            <div className="text-sm text-green-600 mb-1">✓ Fully Funded</div>
            <p className="text-xs text-slate-600">This project has reached its funding goal</p>
          </div>
        )}
      </div>
    </div>
  );
}
