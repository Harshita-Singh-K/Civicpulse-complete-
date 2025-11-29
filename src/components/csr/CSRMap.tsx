import { MapPin, Navigation, Layers } from 'lucide-react';
import { useState } from 'react';
import { mockCSRProjects } from './mockCSRData';

interface CSRMapProps {
  onProjectClick: (projectId: string) => void;
}

export function CSRMap({ onProjectClick }: CSRMapProps) {
  const [viewMode, setViewMode] = useState<'pins' | 'heatmap'>('pins');

  const getMarkerColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'active':
      case 'sponsored': return 'bg-blue-500';
      default: return 'bg-amber-500';
    }
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-6">
        <h1 className="text-2xl mb-1">Project Map</h1>
        <p className="text-green-100 text-sm">View CSR projects across the city</p>
      </div>

      {/* Controls */}
      <div className="p-4 bg-white border-b border-slate-200">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('pins')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'pins' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'
            }`}
          >
            <MapPin className="w-4 h-4" />
            Pins
          </button>
          <button
            onClick={() => setViewMode('heatmap')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm transition-all ${
              viewMode === 'heatmap' ? 'bg-green-600 text-white' : 'bg-slate-100 text-slate-700'
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
              <pattern id="csr-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="slate" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#csr-grid)" />
          </svg>

          {/* Heatmap Overlay */}
          {viewMode === 'heatmap' && (
            <div className="absolute inset-0">
              <div className="absolute top-1/4 left-1/3 w-48 h-48 bg-green-500/30 rounded-full blur-3xl" />
              <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-blue-500/30 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-emerald-500/30 rounded-full blur-3xl" />
            </div>
          )}

          {/* Project Markers */}
          {viewMode === 'pins' && mockCSRProjects.map((project, index) => {
            const top = 20 + (index % 5) * 15;
            const left = 15 + (index % 4) * 20;
            
            return (
              <button
                key={project.id}
                onClick={() => onProjectClick(project.id)}
                className="absolute transform -translate-x-1/2 -translate-y-full animate-bounce"
                style={{ 
                  top: `${top}%`, 
                  left: `${left}%`,
                  animationDelay: `${index * 0.1}s`,
                  animationDuration: '2s'
                }}
              >
                <div className={`w-8 h-8 ${getMarkerColor(project.status)} rounded-full shadow-lg flex items-center justify-center relative`}>
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
                    {project.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Current Location Button */}
        <button className="absolute bottom-24 right-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
          <Navigation className="w-5 h-5 text-green-600" />
        </button>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white rounded-xl shadow-lg p-3">
          <div className="text-xs text-slate-600 mb-2">Project Status</div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full" />
              <span className="text-xs">Completed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
              <span className="text-xs">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-full" />
              <span className="text-xs">Upcoming</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Project Preview Strip */}
      <div className="bg-white border-t border-slate-200 p-4">
        <div className="flex gap-3 overflow-x-auto pb-2">
          {mockCSRProjects.slice(0, 5).map(project => (
            <button
              key={project.id}
              onClick={() => onProjectClick(project.id)}
              className="flex-shrink-0 w-48 bg-slate-50 rounded-xl overflow-hidden hover:shadow-md transition-all"
            >
              <img src={project.images[0]} alt={project.title} className="w-full h-24 object-cover" />
              <div className="p-2">
                <div className="text-xs text-left line-clamp-2 mb-1">{project.title}</div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-500">{project.location.split(',')[0]}</span>
                  <div className={`w-2 h-2 rounded-full ${getMarkerColor(project.status)}`} />
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
