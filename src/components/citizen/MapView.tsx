import { MapPin, Navigation, Filter, Layers } from 'lucide-react';
import { useState } from 'react';
import { mockIssues } from './mockData';

interface MapViewProps {
  onIssueClick: (issueId: string) => void;
}

export function MapView({ onIssueClick }: MapViewProps) {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [viewMode, setViewMode] = useState<'heatmap' | 'pins'>('pins');

  const filteredIssues = selectedFilter === 'all' 
    ? mockIssues 
    : mockIssues.filter(i => i.priority === selectedFilter);

  const getMarkerColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-amber-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-6">
        <h1 className="text-2xl mb-1">City Map</h1>
        <p className="text-blue-100 text-sm">Live issues in your area</p>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            All Issues
          </button>
          <button
            onClick={() => setSelectedFilter('critical')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === 'critical' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Critical
          </button>
          <button
            onClick={() => setSelectedFilter('high')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === 'high' ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            High
          </button>
          <button
            onClick={() => setSelectedFilter('medium')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap text-sm transition-all ${
              selectedFilter === 'medium' ? 'bg-amber-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            Medium
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('pins')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'pins' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Pins
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'heatmap' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <Layers className="w-4 h-4" />
            Heatmap
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative bg-slate-100">
        {/* Simulated Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-green-50 to-slate-50">
          {/* Grid Lines */}
          <svg className="w-full h-full opacity-20">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="slate" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Heatmap Overlay */}
          {viewMode === 'heatmap' && (
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-red-500/30 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-orange-500/30 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-amber-500/30 rounded-full blur-3xl" />
            </div>
          )}

          {/* Issue Markers */}
          {viewMode === 'pins' && filteredIssues.map((issue, index) => {
            const top = 20 + (index % 5) * 15;
            const left = 15 + (index % 4) * 20;
            
            return (
              <button
                key={issue.id}
                onClick={() => onIssueClick(issue.id)}
                className="absolute transform -translate-x-1/2 -translate-y-full animate-bounce"
                style={{ 
                  top: `${top}%`, 
                  left: `${left}%`,
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '2s'
                }}
              >
                <div className={`w-8 h-8 ${getMarkerColor(issue.priority)} rounded-full shadow-lg flex items-center justify-center relative`}>
                  <MapPin className="w-5 h-5 text-white" />
                  {issue.status === 'in-progress' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-white" />
                  )}
                </div>
                {/* Tooltip on hover */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                    {issue.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Location Button */}
        <button className="absolute bottom-24 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <Navigation className="w-5 h-5 text-blue-600" />
        </button>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-3">
          <div className="text-xs text-slate-600 mb-2">Priority Levels</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="text-xs">Critical</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-orange-500 rounded-full" />
              <span className="text-xs">High</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span className="text-xs">Medium</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-slate-400 rounded-full" />
              <span className="text-xs">Low</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Issue Preview Strip */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {filteredIssues.slice(0, 5).map(issue => (
            <button
              key={issue.id}
              onClick={() => onIssueClick(issue.id)}
              className="flex-shrink-0 w-48 bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-all"
            >
              <img src={issue.images[0]} alt={issue.title} className="w-full h-24 object-cover" />
              <div className="p-2">
                <div className="text-xs text-left line-clamp-2 mb-1">{issue.title}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{issue.location}</span>
                  <div className={`w-2 h-2 rounded-full ${getMarkerColor(issue.priority)}`} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
