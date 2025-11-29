import { useState } from 'react';
import { Search, ChevronDown, MapPin, Flame, User, Bell, MessageSquare, Phone, Radio, Filter, Layers, AlertTriangle, Clock, TrendingUp, Users, BarChart3 } from 'lucide-react';
import { mockComplaints, Complaint } from './mockAuthorityData';

interface AuthorityDashboardProps {
  onLogout: () => void;
  onNavigateToAnalytics: () => void;
}

export function AuthorityDashboard({ onLogout, onNavigateToAnalytics }: AuthorityDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [sortBy, setSortBy] = useState<'time' | 'priority' | 'votes'>('time');
  const [filterPriority, setFilterPriority] = useState<'all' | 'critical' | 'high' | 'medium' | 'low'>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [mapView, setMapView] = useState<'standard' | 'satellite' | 'heatmap'>('standard');

  const openComplaints = mockComplaints.filter(c => c.status !== 'Resolved');

  // Apply filters
  let filteredComplaints = openComplaints.filter(complaint => {
    const matchesSearch = 
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesPriority = filterPriority === 'all' || 
      (filterPriority === 'critical' && complaint.aiPriority >= 85) ||
      (filterPriority === 'high' && complaint.aiPriority >= 70 && complaint.aiPriority < 85) ||
      (filterPriority === 'medium' && complaint.aiPriority >= 50 && complaint.aiPriority < 70) ||
      (filterPriority === 'low' && complaint.aiPriority < 50);
    
    const matchesCategory = filterCategory === 'all' || complaint.category === filterCategory;
    
    return matchesSearch && matchesPriority && matchesCategory;
  });

  // Sort complaints
  filteredComplaints = filteredComplaints.sort((a, b) => {
    if (sortBy === 'priority') return b.aiPriority - a.aiPriority;
    if (sortBy === 'votes') return b.votes - a.votes;
    return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Water & Sewage': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Road Maintenance': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Sanitation': return 'bg-green-100 text-green-700 border-green-200';
      case 'Street Lighting': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'Parks & Greenery': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Assigned': return 'bg-teal-100 text-teal-700 border-teal-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getPriorityBadge = (priority: number) => {
    if (priority >= 85) return { label: 'Critical', color: 'bg-red-100 text-red-700 border-red-300' };
    if (priority >= 70) return { label: 'High', color: 'bg-orange-100 text-orange-700 border-orange-300' };
    if (priority >= 50) return { label: 'Medium', color: 'bg-amber-100 text-amber-700 border-amber-300' };
    return { label: 'Low', color: 'bg-slate-100 text-slate-700 border-slate-300' };
  };

  const isSLAViolated = (timeOpen: string) => {
    return timeOpen.includes('3d') || timeOpen.includes('4d') || timeOpen.includes('5d') || timeOpen.includes('6d');
  };

  const categories = ['all', 'Water & Sewage', 'Road Maintenance', 'Sanitation', 'Street Lighting', 'Parks & Greenery'];
  
  // Analytics data
  const totalComplaints = openComplaints.length;
  const resolvedToday = 12;
  const slaCompliance = 87;
  const avgResponseTime = '4.2h';

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
              CivicPulse Government Authority Dashboard
            </h1>
            <div className="flex items-center gap-3">
              <button className="relative p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-sm transition-colors">
                Switch View
              </button>
              <button
                onClick={onLogout}
                className="w-9 h-9 bg-gradient-to-br from-teal-500 to-green-500 text-white rounded-full flex items-center justify-center hover:shadow-lg transition-all"
              >
                <User className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by ID, location, category, or citizen name..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:border-teal-500 focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content - 3 Column Layout */}
      <div className="px-6 py-6 pb-24">
        <div className="grid grid-cols-12 gap-5">
          {/* LEFT PANEL - Live City Issue Map */}
          <div className="col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5 sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg">Live City Map</h2>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setMapView('standard')}
                    className={`p-1.5 rounded-lg transition-colors ${mapView === 'standard' ? 'bg-teal-100 text-teal-700' : 'text-slate-400 hover:bg-slate-100'}`}
                  >
                    <MapPin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMapView('satellite')}
                    className={`p-1.5 rounded-lg transition-colors ${mapView === 'satellite' ? 'bg-teal-100 text-teal-700' : 'text-slate-400 hover:bg-slate-100'}`}
                  >
                    <Layers className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setMapView('heatmap')}
                    className={`p-1.5 rounded-lg transition-colors ${mapView === 'heatmap' ? 'bg-teal-100 text-teal-700' : 'text-slate-400 hover:bg-slate-100'}`}
                  >
                    <Flame className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Map Container */}
              <div className="relative h-[600px] bg-slate-100 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-teal-100 to-green-100 relative">
                  {/* Grid pattern */}
                  <svg className="w-full h-full opacity-20">
                    <defs>
                      <pattern id="auth-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="slate" strokeWidth="0.5"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#auth-grid)" />
                  </svg>

                  {/* Heatmap overlay */}
                  {mapView === 'heatmap' && (
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-red-500/30 rounded-full blur-2xl" />
                      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-orange-500/30 rounded-full blur-2xl" />
                      <div className="absolute bottom-1/4 left-1/4 w-28 h-28 bg-amber-500/30 rounded-full blur-2xl" />
                    </div>
                  )}

                  {/* Issue pins */}
                  {filteredComplaints.slice(0, 8).map((complaint, index) => {
                    const top = 15 + (index % 4) * 20;
                    const left = 15 + (index % 3) * 25;
                    
                    return (
                      <button
                        key={complaint.id}
                        onClick={() => setSelectedComplaint(complaint)}
                        className="absolute transform -translate-x-1/2 -translate-y-full group"
                        style={{ top: `${top}%`, left: `${left}%` }}
                      >
                        <div className={`w-6 h-6 rounded-full shadow-lg flex items-center justify-center ${
                          complaint.aiPriority >= 85 ? 'bg-red-500' :
                          complaint.aiPriority >= 70 ? 'bg-orange-500' :
                          complaint.aiPriority >= 50 ? 'bg-amber-500' : 'bg-slate-400'
                        }`}>
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-1.5 shadow-xl">
                            {complaint.title.slice(0, 30)}...
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg text-xs">
                  <div className="font-medium text-slate-700 mb-1">Priority</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full" />
                      <span className="text-slate-600">Critical</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full" />
                      <span className="text-slate-600">High</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full" />
                      <span className="text-slate-600">Medium</span>
                    </div>
                  </div>
                </div>

                {/* Active Hotspots Badge */}
                {mapView === 'heatmap' && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-3 py-1.5 rounded-full shadow-lg">
                    🔥 3 Active Hotspots
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* CENTER PANEL - Real-Time Complaint Feed */}
          <div className="col-span-5">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg mb-1">Real-Time Complaint Feed</h2>
                  <p className="text-sm text-slate-500">{filteredComplaints.length} of {totalComplaints} complaints</p>
                </div>
              </div>

              {/* Filter Row */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200">
                <Filter className="w-4 h-4 text-slate-400" />
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-teal-500"
                >
                  <option value="all">All Priorities</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>

                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-teal-500"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                  ))}
                </select>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs outline-none focus:border-teal-500"
                >
                  <option value="time">Latest First</option>
                  <option value="priority">By Priority</option>
                  <option value="votes">By Votes</option>
                </select>
              </div>

              {/* Complaints Feed */}
              <div className="space-y-3 max-h-[calc(100vh-340px)] overflow-y-auto pr-2">
                {filteredComplaints.map((complaint) => {
                  const priorityBadge = getPriorityBadge(complaint.aiPriority);
                  const slaViolated = isSLAViolated(complaint.timeOpen);

                  return (
                    <div
                      key={complaint.id}
                      onClick={() => setSelectedComplaint(complaint)}
                      className={`relative p-4 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedComplaint?.id === complaint.id
                          ? 'bg-teal-50 border-teal-400 shadow-md'
                          : slaViolated
                          ? 'bg-red-50 border-red-300 hover:border-red-400'
                          : 'bg-white border-slate-200 hover:border-teal-300'
                      } ${slaViolated ? 'animate-pulse' : ''}`}
                    >
                      {/* SLA Violation Alert */}
                      {slaViolated && (
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <AlertTriangle className="w-3 h-3 text-white" />
                        </div>
                      )}

                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-md text-xs border ${getCategoryColor(complaint.category)}`}>
                              {complaint.category}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-xs border ${priorityBadge.color}`}>
                              {priorityBadge.label}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-xs border ${getStatusColor(complaint.status)}`}>
                              {complaint.status}
                            </span>
                          </div>
                          <h3 className="text-sm mb-2 line-clamp-2">{complaint.title}</h3>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {complaint.location}
                        </span>
                        <span className="flex items-center gap-1 text-slate-500">
                          <Clock className="w-3 h-3" />
                          {complaint.timeOpen}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            {complaint.votes}
                          </span>
                          <span className="text-slate-400">ID: {complaint.id}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-lg text-teal-700">
                            {complaint.aiPriority}
                          </div>
                          <div className="text-xs text-slate-500">AI Score</div>
                        </div>
                      </div>

                      {slaViolated && (
                        <div className="mt-2 pt-2 border-t border-red-200">
                          <div className="text-xs text-red-700 flex items-center gap-1">
                            <AlertTriangle className="w-3 h-3" />
                            SLA Violation Alert
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Analytics Snapshots */}
          <div className="col-span-4">
            <div className="space-y-4 sticky top-32">
              {/* Department Performance */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
                <h3 className="text-sm mb-4 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                  Performance Overview
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-3 border border-teal-200">
                    <div className="text-2xl text-teal-700 mb-1">{totalComplaints}</div>
                    <div className="text-xs text-teal-600">Open Issues</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-3 border border-green-200">
                    <div className="text-2xl text-green-700 mb-1">{resolvedToday}</div>
                    <div className="text-xs text-green-600">Resolved Today</div>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3 border border-blue-200">
                    <div className="text-2xl text-blue-700 mb-1">{slaCompliance}%</div>
                    <div className="text-xs text-blue-600">SLA Compliance</div>
                  </div>
                  <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-3 border border-amber-200">
                    <div className="text-2xl text-amber-700 mb-1">{avgResponseTime}</div>
                    <div className="text-xs text-amber-600">Avg Response</div>
                  </div>
                </div>
              </div>

              {/* SLA Compliance Chart */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
                <h3 className="text-sm mb-4">SLA Compliance by Department</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Water & Sewage', compliance: 92, color: 'bg-blue-500' },
                    { name: 'Road Maintenance', compliance: 87, color: 'bg-amber-500' },
                    { name: 'Sanitation', compliance: 95, color: 'bg-green-500' },
                    { name: 'Street Lighting', compliance: 78, color: 'bg-purple-500' }
                  ].map((dept) => (
                    <div key={dept.name}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-600">{dept.name}</span>
                        <span className="text-slate-900">{dept.compliance}%</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${dept.color} rounded-full transition-all`}
                          style={{ width: `${dept.compliance}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Staff Performance */}
              <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
                <h3 className="text-sm mb-4 flex items-center gap-2">
                  <Users className="w-4 h-4 text-teal-600" />
                  Top Performing Staff
                </h3>
                <div className="space-y-3">
                  {[
                    { name: 'Worker Team A', completed: 24, rating: 4.8 },
                    { name: 'Worker Team B', completed: 19, rating: 4.6 },
                    { name: 'Electrical Team 1', completed: 15, rating: 4.9 }
                  ].map((worker, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <div className="text-sm">{worker.name}</div>
                        <div className="text-xs text-slate-500">{worker.completed} tasks completed</div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-amber-600">★ {worker.rating}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl shadow-lg p-5 text-white">
                <h3 className="text-sm mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  <button 
                    onClick={onNavigateToAnalytics}
                    className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-left transition-colors"
                  >
                    📊 View Full Analytics & Reports
                  </button>
                  <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-left transition-colors">
                    📢 Broadcast Announcement
                  </button>
                  <button className="w-full px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg text-sm text-left transition-colors">
                    🔍 View AI Insights
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selected Complaint Details Drawer */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">Complaint Management</h2>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="w-8 h-8 hover:bg-slate-100 rounded-lg flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* AI Routing Suggestion */}
              <div className="mb-6 bg-gradient-to-r from-teal-50 to-green-50 border-2 border-teal-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white text-lg">🤖</span>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-teal-900 mb-1">AI Department Routing</div>
                    <p className="text-sm text-teal-700">
                      Recommended: <strong>{selectedComplaint.category}</strong> Department
                    </p>
                    <p className="text-xs text-teal-600 mt-1">
                      Based on complaint analysis and historical patterns
                    </p>
                  </div>
                </div>
              </div>

              {/* Duplicate Detection */}
              {selectedComplaint.votes > 100 && (
                <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-amber-900 mb-1">Possible Duplicates Detected</div>
                      <p className="text-xs text-amber-700">
                        2 similar complaints found in the same area. Consider merging.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Issue Details Section */}
              <div className="mb-6">
                <h3 className="text-sm mb-4">Issue Details</h3>

                {/* Complaint Info Grid */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Complaint ID</div>
                    <div className="text-sm">{selectedComplaint.id}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Status</div>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs border ${getStatusColor(selectedComplaint.status)}`}>
                      {selectedComplaint.status}
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Category</div>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs border ${getCategoryColor(selectedComplaint.category)}`}>
                      {selectedComplaint.category}
                    </span>
                  </div>
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4 border border-teal-200">
                    <div className="text-xs text-teal-600 mb-1">AI Priority Score</div>
                    <div className="text-2xl text-teal-900">
                      {selectedComplaint.aiPriority}/100
                    </div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Time Open</div>
                    <div className="text-sm text-slate-900">{selectedComplaint.timeOpen}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Citizen Votes</div>
                    <div className="text-sm text-slate-900 flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      {selectedComplaint.votes}
                    </div>
                  </div>
                </div>

                {/* Image */}
                <div className="rounded-xl overflow-hidden mb-4">
                  <img
                    src={selectedComplaint.images[0]}
                    alt="Issue"
                    className="w-full h-64 object-cover"
                  />
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="text-xs text-slate-500 mb-1">Location</div>
                  <div className="text-sm flex items-center gap-1">
                    <MapPin className="w-4 h-4 text-teal-600" />
                    {selectedComplaint.location}, {selectedComplaint.area}
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-4 mb-4">
                  <div className="text-xs text-slate-500 mb-1">Reported By</div>
                  <div className="text-sm">{selectedComplaint.reportedBy}</div>
                  <div className="text-xs text-slate-400 mt-1">
                    {new Date(selectedComplaint.reportedAt).toLocaleString()}
                  </div>
                </div>

                {selectedComplaint.assignedTo && (
                  <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-4">
                    <div className="text-xs text-teal-600 mb-1">Assigned To</div>
                    <div className="text-sm text-teal-900">{selectedComplaint.assignedTo}</div>
                  </div>
                )}

                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-xs text-slate-500 mb-2">Description</div>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedComplaint.description}</p>
                </div>
              </div>

              {/* Worker Assignment Section */}
              <div className="mb-6">
                <h3 className="text-sm mb-4">Assign to Field Worker</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Worker Team A', distance: '2.3 km', completion: 96, tasks: 24, recommended: true },
                    { name: 'Worker Team B', distance: '4.1 km', completion: 89, tasks: 19, recommended: false },
                    { name: 'Emergency Water Team', distance: '1.8 km', completion: 98, tasks: 15, recommended: false }
                  ].map((worker, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        alert(`Assigned to ${worker.name}`);
                        setSelectedComplaint(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                        worker.recommended
                          ? 'bg-gradient-to-r from-teal-50 to-green-50 border-teal-300 hover:border-teal-400'
                          : 'bg-white border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="text-sm mb-1">{worker.name}</div>
                          {worker.recommended && (
                            <div className="text-xs text-teal-600 flex items-center gap-1">
                              ⭐ AI Recommended - Best Match
                            </div>
                          )}
                        </div>
                        <div className="text-xs text-slate-500">{worker.distance} away</div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <span>{worker.completion}% completion rate</span>
                        <span>•</span>
                        <span>{worker.tasks} tasks completed</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Internal Notes */}
              <div className="mb-6">
                <h3 className="text-sm mb-3">Internal Notes & Tags</h3>
                <textarea
                  placeholder="Add internal notes for tracking..."
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl outline-none focus:border-teal-500 text-sm resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button className="px-6 py-3 bg-gradient-to-r from-teal-500 to-green-500 text-white rounded-xl hover:shadow-lg transition-all">
                  Confirm Assignment
                </button>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communication Tools - Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40">
        <div className="px-6 py-3">
          <div className="flex items-center justify-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded-xl transition-colors">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Call Citizen</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl transition-colors">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Chat with Worker</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl transition-colors">
              <Radio className="w-4 h-4" />
              <span className="text-sm">Broadcast Announcement</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
