import { useState } from 'react';
import { Search, MapPin, Filter, Clock, AlertTriangle, CheckCircle, User, MessageSquare, Phone, Radio, Users, TrendingUp, Activity, Layers, Flame, Zap, Target, Award } from 'lucide-react';
import { mockDepartmentComplaints, mockWorkers, DepartmentComplaint, Worker } from './mockDepartmentData';

interface DepartmentalHeadDashboardProps {
  onLogout: () => void;
  departmentName?: string;
}

export function DepartmentalHeadDashboard({ onLogout, departmentName = 'Sanitation' }: DepartmentalHeadDashboardProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState<DepartmentComplaint | null>(null);
  const [showWorkerAssignment, setShowWorkerAssignment] = useState(false);
  const [filterStatus, setFilterStatus] = useState<'all' | 'Unassigned' | 'Assigned' | 'In Progress' | 'Completed'>('all');
  const [filterPriority, setFilterPriority] = useState<'all' | 'Critical' | 'High' | 'Medium' | 'Low'>('all');
  const [filterZone, setFilterZone] = useState<string>('all');
  const [mapView, setMapView] = useState<'complaints' | 'workers' | 'heatmap'>('complaints');
  const [workerFilters, setWorkerFilters] = useState({
    distance: 'all',
    status: 'all',
    zone: 'all'
  });

  // Apply filters
  let filteredComplaints = mockDepartmentComplaints.filter(complaint => {
    const matchesSearch = 
      complaint.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      complaint.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (complaint.assignedTo && complaint.assignedTo.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = filterStatus === 'all' || complaint.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || complaint.priority === filterPriority;
    const matchesZone = filterZone === 'all' || complaint.zone === filterZone;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesZone;
  });

  // Sort by priority and time
  filteredComplaints = filteredComplaints.sort((a, b) => {
    const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    }
    return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
  });

  // Filter workers for assignment
  const filteredWorkers = mockWorkers.filter(worker => {
    const matchesDistance = workerFilters.distance === 'all' || 
      (workerFilters.distance === 'near' && parseFloat(worker.distance) < 2) ||
      (workerFilters.distance === 'far' && parseFloat(worker.distance) >= 2);
    
    const matchesStatus = workerFilters.status === 'all' || worker.status === workerFilters.status;
    const matchesZone = workerFilters.zone === 'all' || worker.zone === workerFilters.zone;
    
    return matchesDistance && matchesStatus && matchesZone;
  });

  // Get AI recommended worker (closest available with best SLA)
  const getRecommendedWorker = () => {
    const availableWorkers = filteredWorkers.filter(w => w.status === 'Available' && w.currentTasks < w.maxTasks);
    if (availableWorkers.length === 0) return null;
    
    return availableWorkers.sort((a, b) => {
      // Sort by SLA compliance first, then by distance
      if (b.slaCompliance !== a.slaCompliance) {
        return b.slaCompliance - a.slaCompliance;
      }
      return parseFloat(a.distance) - parseFloat(b.distance);
    })[0];
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-300';
      case 'High': return 'bg-orange-100 text-orange-700 border-orange-300';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-300';
      default: return 'bg-slate-100 text-slate-700 border-slate-300';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'In Progress': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'Assigned': return 'bg-teal-100 text-teal-700 border-teal-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getSLAColor = (hoursLeft: number) => {
    if (hoursLeft < 0) return 'text-red-600';
    if (hoursLeft < 4) return 'text-orange-600';
    if (hoursLeft < 12) return 'text-amber-600';
    return 'text-green-600';
  };

  const zones = ['all', 'Zone A - North', 'Zone B - South', 'Zone C - East', 'Zone D - West'];

  // Worker statistics
  const totalWorkers = mockWorkers.length;
  const activeWorkers = mockWorkers.filter(w => w.status === 'Available' || w.status === 'Busy').length;
  const onTaskWorkers = mockWorkers.filter(w => w.currentTasks > 0).length;
  const idleWorkers = mockWorkers.filter(w => w.status === 'Available' && w.currentTasks === 0).length;

  // Complaint statistics
  const unassignedCount = filteredComplaints.filter(c => c.status === 'Unassigned').length;
  const assignedCount = filteredComplaints.filter(c => c.status === 'Assigned').length;
  const inProgressCount = filteredComplaints.filter(c => c.status === 'In Progress').length;
  const completedCount = filteredComplaints.filter(c => c.status === 'Completed').length;

  const handleAssignWorker = (worker: Worker) => {
    if (selectedComplaint) {
      alert(`Assigned complaint ${selectedComplaint.id} to ${worker.name}`);
      setShowWorkerAssignment(false);
      setSelectedComplaint(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 shadow-lg sticky top-0 z-50">
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl text-white">
                CivicPulse — Departmental Head Dashboard
              </h1>
              <p className="text-sm text-purple-100 mt-1">{departmentName} Department</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative group">
                <button className="w-10 h-10 bg-white/20 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-white/30 transition-all border border-white/30">
                  <User className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50">Switch Department</button>
                  <button className="w-full px-4 py-2 text-left text-sm hover:bg-purple-50">Settings</button>
                  <button onClick={onLogout} className="w-full px-4 py-2 text-left text-sm hover:bg-red-50 text-red-600">Logout</button>
                </div>
              </div>
            </div>
          </div>

          {/* Global Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/60" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search complaints by ID, worker, or location..."
              className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-2xl outline-none focus:bg-white/30 transition-all text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>

      {/* Main Content - Different Layout: Left Map, Center Feed, Right Stats */}
      <div className="px-6 py-6 pb-24">
        {/* Top Stats Bar */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-md border-l-4 border-purple-500 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl text-purple-700 mb-1">{totalWorkers}</div>
                <div className="text-sm text-slate-600">Total Workers</div>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border-l-4 border-green-500 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl text-green-700 mb-1">{activeWorkers}</div>
                <div className="text-sm text-slate-600">Active</div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border-l-4 border-indigo-500 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl text-indigo-700 mb-1">{onTaskWorkers}</div>
                <div className="text-sm text-slate-600">On Task</div>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-md border-l-4 border-pink-500 p-5">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl text-pink-700 mb-1">{idleWorkers}</div>
                <div className="text-sm text-slate-600">Idle</div>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* LEFT PANEL - Department Task Map (Smaller) */}
          <div className="col-span-4">
            <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-5 sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Department Task Map</h2>
                <div className="flex items-center gap-1 bg-purple-50 rounded-lg p-1">
                  <button
                    onClick={() => setMapView('complaints')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${mapView === 'complaints' ? 'bg-purple-600 text-white shadow' : 'text-purple-400 hover:text-purple-600'}`}
                  >
                    <MapPin className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setMapView('workers')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${mapView === 'workers' ? 'bg-purple-600 text-white shadow' : 'text-purple-400 hover:text-purple-600'}`}
                  >
                    <Users className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setMapView('heatmap')}
                    className={`p-1.5 rounded-md text-xs transition-colors ${mapView === 'heatmap' ? 'bg-purple-600 text-white shadow' : 'text-purple-400 hover:text-purple-600'}`}
                  >
                    <Layers className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Map Container */}
              <div className="relative h-[500px] bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 rounded-2xl overflow-hidden border-2 border-purple-200 shadow-inner">
                <div className="w-full h-full relative">
                  {/* Decorative circles */}
                  <svg className="w-full h-full opacity-10">
                    <defs>
                      <pattern id="dept-circles" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="2" fill="purple" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#dept-circles)" />
                  </svg>

                  {/* Heatmap overlay */}
                  {mapView === 'heatmap' && (
                    <div className="absolute inset-0">
                      <div className="absolute top-1/4 left-1/3 w-32 h-32 bg-purple-500/40 rounded-full blur-3xl" />
                      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-pink-500/40 rounded-full blur-3xl" />
                      <div className="absolute bottom-1/4 left-1/2 w-28 h-28 bg-indigo-500/40 rounded-full blur-3xl" />
                    </div>
                  )}

                  {/* Complaint pins */}
                  {mapView === 'complaints' && filteredComplaints.slice(0, 8).map((complaint, index) => {
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
                          complaint.priority === 'Critical' ? 'bg-red-500' :
                          complaint.priority === 'High' ? 'bg-orange-500' :
                          complaint.priority === 'Medium' ? 'bg-amber-500' : 'bg-slate-400'
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

                  {/* Worker icons */}
                  {mapView === 'workers' && mockWorkers.slice(0, 6).map((worker, index) => {
                    const top = 20 + (index % 3) * 25;
                    const left = 20 + (index % 2) * 40;
                    
                    return (
                      <div
                        key={worker.id}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                        style={{ top: `${top}%`, left: `${left}%` }}
                      >
                        <div className={`w-8 h-8 rounded-full shadow-lg flex items-center justify-center border-2 ${
                          worker.status === 'Available' ? 'bg-green-500 border-green-300' :
                          worker.status === 'Busy' ? 'bg-orange-500 border-orange-300' :
                          'bg-slate-400 border-slate-300'
                        }`}>
                          <Users className="w-4 h-4 text-white" />
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                          <div className="bg-slate-900 text-white text-xs rounded-lg px-3 py-1.5 shadow-xl">
                            {worker.name} - {worker.status}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Map Legend */}
                <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg text-xs">
                  <div className="font-medium text-slate-700 mb-1">
                    {mapView === 'workers' ? 'Worker Status' : 'Priority'}
                  </div>
                  <div className="space-y-1">
                    {mapView === 'workers' ? (
                      <>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full" />
                          <span className="text-slate-600">Available</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-orange-500 rounded-full" />
                          <span className="text-slate-600">Busy</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-slate-400 rounded-full" />
                          <span className="text-slate-600">Offline</span>
                        </div>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Mini Control Panel */}
              <div className="mt-4 space-y-2">
                <button className="w-full px-3 py-2 bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100 border border-purple-200 text-purple-700 rounded-xl text-sm transition-colors text-left flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Show SLA Status
                </button>
                <select className="w-full px-3 py-2 bg-purple-50 border border-purple-200 rounded-xl text-sm outline-none focus:border-purple-400">
                  <option>Filter by Zone</option>
                  <option>Zone A - North</option>
                  <option>Zone B - South</option>
                  <option>Zone C - East</option>
                  <option>Zone D - West</option>
                </select>
              </div>

              {/* Quick Stats */}
              <div className="mt-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-4 text-white">
                <h3 className="text-sm mb-3">Department Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-100">Complaints Today</span>
                    <span className="font-medium">{filteredComplaints.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-100">Needs Assignment</span>
                    <span className="font-medium">{unassignedCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-purple-100">Completed</span>
                    <span className="font-medium">{completedCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CENTER PANEL - Department Complaint Feed (Wider) */}
          <div className="col-span-5">
            <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Department Complaint Feed</h2>
                  <p className="text-sm text-slate-500 mt-1">{filteredComplaints.length} complaints for {departmentName}</p>
                </div>
              </div>

              {/* Filter Row - Styled Pills */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-purple-100 flex-wrap">
                <div className="flex items-center gap-1 text-xs text-purple-600">
                  <Filter className="w-3.5 h-3.5" />
                  Filters:
                </div>
                <select
                  value={filterPriority}
                  onChange={(e) => setFilterPriority(e.target.value as any)}
                  className="px-3 py-2 bg-purple-50 border border-purple-200 rounded-full text-xs outline-none focus:border-purple-400 hover:bg-purple-100 transition-colors"
                >
                  <option value="all">All Priorities</option>
                  <option value="Critical">Critical</option>
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>

                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as any)}
                  className="px-3 py-2 bg-indigo-50 border border-indigo-200 rounded-full text-xs outline-none focus:border-indigo-400 hover:bg-indigo-100 transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="Unassigned">Unassigned</option>
                  <option value="Assigned">Assigned</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>

                <select
                  value={filterZone}
                  onChange={(e) => setFilterZone(e.target.value)}
                  className="px-3 py-2 bg-pink-50 border border-pink-200 rounded-full text-xs outline-none focus:border-pink-400 hover:bg-pink-100 transition-colors"
                >
                  {zones.map(zone => (
                    <option key={zone} value={zone}>{zone === 'all' ? 'All Zones' : zone}</option>
                  ))}
                </select>
              </div>

              {/* Complaints Feed */}
              <div className="space-y-3 max-h-[calc(100vh-340px)] overflow-y-auto pr-2">
                {filteredComplaints.map((complaint) => {
                  const isSLAViolated = complaint.slaHoursLeft < 0;
                  const isNearDeadline = complaint.slaHoursLeft < 4 && complaint.slaHoursLeft >= 0;

                  return (
                    <div
                      key={complaint.id}
                      onClick={() => setSelectedComplaint(complaint)}
                      className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer ${
                        selectedComplaint?.id === complaint.id
                          ? 'bg-gradient-to-br from-purple-50 to-pink-50 border-purple-400 shadow-lg'
                          : isSLAViolated
                          ? 'bg-red-50 border-red-300 hover:border-red-400 hover:shadow-md'
                          : isNearDeadline
                          ? 'bg-orange-50 border-orange-300 hover:border-orange-400 hover:shadow-md'
                          : 'bg-white border-slate-200 hover:border-purple-300 hover:shadow-md'
                      }`}
                    >
                      {/* Needs Assignment Badge */}
                      {complaint.status === 'Unassigned' && (
                        <div className="absolute -top-3 -right-3 px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs rounded-full shadow-lg animate-pulse">
                          Needs Assignment
                        </div>
                      )}

                      {/* SLA Violation Alert */}
                      {isSLAViolated && (
                        <div className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                          <AlertTriangle className="w-3 h-3 text-white" />
                        </div>
                      )}

                      <div className="flex items-start gap-3 mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2 flex-wrap">
                            <span className={`px-2 py-0.5 rounded-md text-xs border ${getPriorityColor(complaint.priority)}`}>
                              {complaint.priority}
                            </span>
                            <span className={`px-2 py-0.5 rounded-md text-xs border ${getStatusColor(complaint.status)}`}>
                              {complaint.status}
                            </span>
                            <span className="px-2 py-0.5 rounded-md text-xs bg-slate-100 text-slate-700 border border-slate-200">
                              {complaint.ward}
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

                      {complaint.assignedTo && (
                        <div className="mb-3 text-xs text-blue-700 bg-blue-50 px-2 py-1 rounded">
                          👷 Assigned to: {complaint.assignedTo}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xs">
                          <span className="flex items-center gap-1">
                            <Flame className="w-3 h-3 text-orange-500" />
                            {complaint.votes}
                          </span>
                          <span className="text-slate-400">{complaint.id}</span>
                        </div>
                        <div className="text-right">
                          <div className={`text-sm ${getSLAColor(complaint.slaHoursLeft)}`}>
                            {isSLAViolated ? 'VIOLATED' : `${complaint.slaHoursLeft.toFixed(1)}h left`}
                          </div>
                          <div className="text-xs text-slate-500">SLA</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL - Worker Performance & Analytics */}
          <div className="col-span-3">
            <div className="space-y-4 sticky top-32">
              {/* Worker Performance - Featured */}
              <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-pink-600 rounded-2xl shadow-xl p-6 text-white">
                <h3 className="text-base mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Top Performing Workers
                </h3>
                <div className="space-y-3">
                  {mockWorkers
                    .sort((a, b) => b.slaCompliance - a.slaCompliance)
                    .slice(0, 3)
                    .map((worker, index) => (
                      <div key={worker.id} className="flex items-center justify-between p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-sm shadow-lg ${
                            index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-slate-300' : 'bg-orange-400'
                          }`}>
                            {index === 0 ? '🥇' : index === 1 ? '🥈' : '🥉'}
                          </div>
                          <div>
                            <div className="text-sm">{worker.name}</div>
                            <div className="text-xs text-purple-100">{worker.team}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg">{worker.slaCompliance}%</div>
                          <div className="text-xs text-purple-100">SLA</div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Complaint Summary Chart */}
              <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-5">
                <h3 className="text-sm mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Complaint Summary</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Unassigned</span>
                    <span className="text-sm text-red-600">{unassignedCount}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: `${(unassignedCount / filteredComplaints.length) * 100}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Assigned</span>
                    <span className="text-sm text-teal-600">{assignedCount}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-teal-500 rounded-full" style={{ width: `${(assignedCount / filteredComplaints.length) * 100}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">In Progress</span>
                    <span className="text-sm text-blue-600">{inProgressCount}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(inProgressCount / filteredComplaints.length) * 100}%` }} />
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-600">Completed</span>
                    <span className="text-sm text-green-600">{completedCount}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${(completedCount / filteredComplaints.length) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* SLA Violations Alert */}
              {filteredComplaints.filter(c => c.slaHoursLeft < 0).length > 0 && (
                <div className="bg-gradient-to-br from-red-500 to-pink-500 border-2 border-red-400 rounded-2xl shadow-xl p-5 text-white animate-pulse">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm mb-1">⚠️ SLA Violations</h3>
                      <p className="text-xs text-red-50">
                        {filteredComplaints.filter(c => c.slaHoursLeft < 0).length} complaints have exceeded SLA deadline
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Daily Performance */}
              <div className="bg-white rounded-2xl shadow-lg border border-purple-200 p-5">
                <h3 className="text-sm mb-4 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Today's Performance</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                    <span className="text-sm text-green-700">Completed</span>
                    <span className="text-xl text-green-700">{completedCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-indigo-50 to-blue-50 rounded-xl border border-indigo-200">
                    <span className="text-sm text-indigo-700">In Progress</span>
                    <span className="text-xl text-indigo-700">{inProgressCount}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                    <span className="text-sm text-red-700">Pending</span>
                    <span className="text-xl text-red-700">{unassignedCount}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Complaint Details Drawer */}
      {selectedComplaint && !showWorkerAssignment && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end justify-end">
          <div className="w-[600px] h-full bg-white shadow-2xl overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl">Complaint Details</h2>
                <button
                  onClick={() => setSelectedComplaint(null)}
                  className="w-8 h-8 hover:bg-slate-100 rounded-lg flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Duplicate Detection */}
              {selectedComplaint.votes > 80 && (
                <div className="mb-6 bg-amber-50 border-2 border-amber-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm text-amber-900 mb-1">Possible Duplicate Detected</div>
                      <p className="text-xs text-amber-700">
                        Similar complaint found in the same area. Review before assigning.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Issue Details */}
              <div className="mb-6">
                <h3 className="text-sm mb-4">Issue Information</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Complaint ID</div>
                    <div className="text-sm">{selectedComplaint.id}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Priority</div>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs border ${getPriorityColor(selectedComplaint.priority)}`}>
                      {selectedComplaint.priority}
                    </span>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-4">
                    <div className="text-xs text-slate-500 mb-1">Status</div>
                    <span className={`inline-block px-3 py-1 rounded-lg text-xs border ${getStatusColor(selectedComplaint.status)}`}>
                      {selectedComplaint.status}
                    </span>
                  </div>
                  <div className={`rounded-xl p-4 border-2 ${
                    selectedComplaint.slaHoursLeft < 0 ? 'bg-red-50 border-red-300' :
                    selectedComplaint.slaHoursLeft < 4 ? 'bg-orange-50 border-orange-300' :
                    'bg-green-50 border-green-300'
                  }`}>
                    <div className="text-xs mb-1 ${getSLAColor(selectedComplaint.slaHoursLeft)}">SLA Timer</div>
                    <div className={`text-lg ${getSLAColor(selectedComplaint.slaHoursLeft)}`}>
                      {selectedComplaint.slaHoursLeft < 0 ? 'VIOLATED' : `${selectedComplaint.slaHoursLeft.toFixed(1)}h`}
                    </div>
                  </div>
                </div>

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
                    <MapPin className="w-4 h-4 text-blue-600" />
                    {selectedComplaint.location}, {selectedComplaint.zone}
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
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                    <div className="text-xs text-blue-600 mb-1">Assigned To</div>
                    <div className="text-sm text-blue-900">{selectedComplaint.assignedTo}</div>
                  </div>
                )}

                <div className="bg-slate-50 rounded-xl p-4">
                  <div className="text-xs text-slate-500 mb-2">Description</div>
                  <p className="text-sm text-slate-700 leading-relaxed">{selectedComplaint.description}</p>
                </div>
              </div>

              {/* Task Timeline */}
              {selectedComplaint.timeline && selectedComplaint.timeline.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm mb-4">Task Timeline</h3>
                  <div className="space-y-3">
                    {selectedComplaint.timeline.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm">{item.stage}</div>
                          <div className="text-xs text-slate-500">{new Date(item.timestamp).toLocaleString()}</div>
                          {item.notes && (
                            <div className="text-xs text-slate-600 mt-1">{item.notes}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {selectedComplaint.status === 'Unassigned' && (
                  <button
                    onClick={() => setShowWorkerAssignment(true)}
                    className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-all"
                  >
                    Assign Worker
                  </button>
                )}
                <button className="w-full px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-all">
                  Add Notes
                </button>
                {selectedComplaint.votes > 80 && (
                  <button className="w-full px-6 py-3 bg-amber-100 text-amber-700 rounded-xl hover:bg-amber-200 transition-all">
                    Mark as Duplicate
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Worker Assignment Modal */}
      {showWorkerAssignment && selectedComplaint && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-6">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl">Assign Worker to Complaint</h2>
                  <p className="text-sm text-slate-600 mt-1">{selectedComplaint.id} - {selectedComplaint.title}</p>
                </div>
                <button
                  onClick={() => setShowWorkerAssignment(false)}
                  className="w-8 h-8 hover:bg-slate-100 rounded-lg flex items-center justify-center transition-colors"
                >
                  ✕
                </button>
              </div>

              {/* Worker Filters */}
              <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-200">
                <span className="text-sm text-slate-600">Filters:</span>
                <select
                  value={workerFilters.distance}
                  onChange={(e) => setWorkerFilters({ ...workerFilters, distance: e.target.value })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                >
                  <option value="all">All Distances</option>
                  <option value="near">Within 2km</option>
                  <option value="far">Beyond 2km</option>
                </select>
                <select
                  value={workerFilters.status}
                  onChange={(e) => setWorkerFilters({ ...workerFilters, status: e.target.value })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Offline">Offline</option>
                </select>
                <select
                  value={workerFilters.zone}
                  onChange={(e) => setWorkerFilters({ ...workerFilters, zone: e.target.value })}
                  className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:border-blue-500"
                >
                  {zones.map(zone => (
                    <option key={zone} value={zone}>{zone === 'all' ? 'All Zones' : zone}</option>
                  ))}
                </select>
              </div>

              {/* AI Recommended Worker */}
              {getRecommendedWorker() && (
                <div className="mb-6 bg-gradient-to-br from-purple-500 via-indigo-500 to-pink-500 border-2 border-purple-400 rounded-2xl p-6 text-white shadow-xl">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0 border-2 border-white/30">
                      <span className="text-3xl">🤖</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm mb-1 flex items-center gap-2">
                        <span>⚡ AI Recommended Worker</span>
                      </div>
                      <p className="text-xs text-purple-100">
                        Most optimal SLA match + nearest location
                      </p>
                    </div>
                  </div>
                  {(() => {
                    const recommended = getRecommendedWorker()!;
                    return (
                      <button
                        onClick={() => handleAssignWorker(recommended)}
                        className="w-full bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl p-4 hover:bg-white/20 transition-all text-left"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-sm mb-1 text-white">⭐ {recommended.name}</div>
                            <div className="text-xs text-purple-100">{recommended.team}</div>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs ${
                            recommended.status === 'Available' ? 'bg-green-400 text-green-900' :
                            recommended.status === 'Busy' ? 'bg-orange-400 text-orange-900' :
                            'bg-slate-400 text-slate-900'
                          }`}>
                            {recommended.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-purple-100 flex-wrap">
                          <span>📍 {recommended.distance}</span>
                          <span>•</span>
                          <span>✅ {recommended.slaCompliance}% SLA</span>
                          <span>•</span>
                          <span>📋 {recommended.currentTasks}/{recommended.maxTasks} tasks</span>
                          <span>•</span>
                          <span>⭐ {recommended.rating}</span>
                        </div>
                      </button>
                    );
                  })()}
                </div>
              )}

              {/* Worker List */}
              <div className="mb-6">
                <h3 className="text-sm mb-4">All Available Workers</h3>
                <div className="grid grid-cols-2 gap-4">
                  {filteredWorkers.map((worker) => {
                    const isRecommended = worker.id === getRecommendedWorker()?.id;
                    
                    return (
                      <button
                        key={worker.id}
                        onClick={() => handleAssignWorker(worker)}
                        disabled={worker.status === 'Offline'}
                        className={`text-left p-4 rounded-xl border-2 transition-all ${
                          isRecommended
                            ? 'bg-blue-50 border-blue-300'
                            : worker.status === 'Offline'
                            ? 'bg-slate-50 border-slate-200 opacity-50 cursor-not-allowed'
                            : 'bg-white border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="text-sm mb-1">{worker.name}</div>
                            <div className="text-xs text-slate-600">{worker.team}</div>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            worker.status === 'Available' ? 'bg-green-100 text-green-700' :
                            worker.status === 'Busy' ? 'bg-orange-100 text-orange-700' :
                            'bg-slate-100 text-slate-700'
                          }`}>
                            {worker.status}
                          </span>
                        </div>
                        <div className="text-xs text-slate-600 space-y-1">
                          <div>📍 {worker.distance} away</div>
                          <div>✅ SLA: {worker.slaCompliance}%</div>
                          <div>📋 Tasks: {worker.currentTasks}/{worker.maxTasks}</div>
                          <div>⭐ Rating: {worker.rating}/5</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Communication Tools - Sticky Bottom Bar with Purple Theme */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-indigo-600 to-pink-600 shadow-2xl z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-center gap-3">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all border border-white/30">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Chat with Worker</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all border border-white/30">
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm">Chat with Authority</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all border border-white/30">
              <Phone className="w-4 h-4" />
              <span className="text-sm">Masked Call</span>
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full transition-all border border-white/30">
              <Radio className="w-4 h-4" />
              <span className="text-sm">Broadcast to Workers</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
