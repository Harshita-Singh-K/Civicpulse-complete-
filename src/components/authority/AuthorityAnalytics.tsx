import { ArrowLeft, TrendingUp, Users, Clock, CheckCircle, AlertTriangle, BarChart3, PieChart, Activity, Award } from 'lucide-react';
import { mockComplaints } from './mockAuthorityData';

interface AuthorityAnalyticsProps {
  onBack: () => void;
}

export function AuthorityAnalytics({ onBack }: AuthorityAnalyticsProps) {
  const totalComplaints = mockComplaints.length;
  const resolvedComplaints = mockComplaints.filter(c => c.status === 'Resolved').length;
  const inProgressComplaints = mockComplaints.filter(c => c.status === 'In Progress').length;
  const pendingComplaints = mockComplaints.filter(c => c.status === 'Reported').length;

  // Department-wise breakdown
  const departmentData = [
    { name: 'Water & Sewage', total: 24, resolved: 18, pending: 6, avgTime: '3.2h', hod: 'Dr. Rajesh Kumar', contact: '+91-9876543210' },
    { name: 'Road Maintenance', total: 31, resolved: 24, pending: 7, avgTime: '5.8h', hod: 'Eng. Priya Sharma', contact: '+91-9876543211' },
    { name: 'Sanitation', total: 19, resolved: 17, pending: 2, avgTime: '2.1h', hod: 'Mr. Amit Patel', contact: '+91-9876543212' },
    { name: 'Street Lighting', total: 15, resolved: 12, pending: 3, avgTime: '4.5h', hod: 'Eng. Sneha Desai', contact: '+91-9876543213' },
    { name: 'Parks & Greenery', total: 8, resolved: 7, pending: 1, avgTime: '6.2h', hod: 'Ms. Meera Singh', contact: '+91-9876543214' }
  ];

  // Monthly trend data
  const monthlyData = [
    { month: 'Jul', reported: 45, resolved: 38, sla: 84 },
    { month: 'Aug', reported: 52, resolved: 47, sla: 90 },
    { month: 'Sep', reported: 48, resolved: 44, sla: 91 },
    { month: 'Oct', reported: 61, resolved: 54, sla: 88 },
    { month: 'Nov', reported: 58, resolved: 51, sla: 87 },
    { month: 'Dec', reported: 42, resolved: 39, sla: 92 }
  ];

  // Zone-wise heatmap data
  const zoneData = [
    { zone: 'Zone A - North', complaints: 34, critical: 8, high: 12, medium: 10, low: 4 },
    { zone: 'Zone B - South', complaints: 28, critical: 5, high: 9, medium: 11, low: 3 },
    { zone: 'Zone C - East', complaints: 42, critical: 11, high: 15, medium: 12, low: 4 },
    { zone: 'Zone D - West', complaints: 23, critical: 4, high: 7, medium: 9, low: 3 }
  ];

  // Predictive hotspot data
  const hotspots = [
    { area: 'Bandra West, MG Road', prediction: 'High', likelihood: 89, category: 'Water & Sewage', trend: 'up' },
    { area: 'Andheri East, Link Road', prediction: 'Critical', likelihood: 94, category: 'Road Maintenance', trend: 'up' },
    { area: 'Malad West, SV Road', prediction: 'Medium', likelihood: 67, category: 'Sanitation', trend: 'stable' }
  ];

  const maxMonthly = Math.max(...monthlyData.map(m => Math.max(m.reported, m.resolved)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-slate-50 to-green-50 pb-20">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-teal-600 to-green-600 bg-clip-text text-transparent">
                Analytics & Reports Dashboard
              </h1>
              <p className="text-sm text-slate-600">Comprehensive insights and department performance</p>
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 py-6">
        {/* Top KPI Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-teal-100 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-teal-600" />
              </div>
              <span className="text-xs text-teal-600 bg-teal-50 px-2 py-1 rounded-full">Total</span>
            </div>
            <div className="text-3xl mb-1">{totalComplaints}</div>
            <div className="text-sm text-slate-600">Total Complaints</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">+12%</span>
            </div>
            <div className="text-3xl mb-1">{resolvedComplaints}</div>
            <div className="text-sm text-slate-600">Resolved</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-full">Active</span>
            </div>
            <div className="text-3xl mb-1">{inProgressComplaints}</div>
            <div className="text-sm text-slate-600">In Progress</div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
              <span className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full">Pending</span>
            </div>
            <div className="text-3xl mb-1">{pendingComplaints}</div>
            <div className="text-sm text-slate-600">Awaiting Action</div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5">
          {/* Monthly Trend Chart */}
          <div className="col-span-8">
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6 mb-5">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg mb-1">Monthly Complaint Trends</h2>
                  <p className="text-sm text-slate-500">Reported vs Resolved over 6 months</p>
                </div>
                <button className="px-4 py-2 bg-teal-100 text-teal-700 rounded-lg text-sm hover:bg-teal-200 transition-colors">
                  Download Report
                </button>
              </div>

              <div className="flex items-end justify-between gap-3 h-64 mb-4">
                {monthlyData.map((data, index) => {
                  const reportedHeight = (data.reported / maxMonthly) * 100;
                  const resolvedHeight = (data.resolved / maxMonthly) * 100;

                  return (
                    <div key={index} className="flex-1 flex flex-col items-center gap-3">
                      <div className="w-full flex justify-center gap-1 h-full items-end">
                        <div className="relative group flex-1">
                          <div
                            className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                            style={{ height: `${reportedHeight}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Reported: {data.reported}
                            </div>
                          </div>
                        </div>
                        <div className="relative group flex-1">
                          <div
                            className="w-full bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg hover:opacity-80 transition-opacity cursor-pointer"
                            style={{ height: `${resolvedHeight}%` }}
                          >
                            <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                              Resolved: {data.resolved}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-slate-600">{data.month}</div>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-blue-500 rounded" />
                  <span className="text-slate-600">Reported</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-500 rounded" />
                  <span className="text-slate-600">Resolved</span>
                </div>
              </div>
            </div>

            {/* Department Performance with HODs */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg mb-1">Department Performance & HODs</h2>
                  <p className="text-sm text-slate-500">Head of Department assignments and metrics</p>
                </div>
              </div>

              <div className="space-y-4">
                {departmentData.map((dept, index) => {
                  const resolutionRate = ((dept.resolved / dept.total) * 100).toFixed(0);

                  return (
                    <div key={index} className="border-2 border-slate-200 rounded-xl p-4 hover:border-teal-300 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="text-sm mb-2">{dept.name}</h3>
                          <div className="flex items-center gap-4 text-xs text-slate-600 mb-3">
                            <span className="flex items-center gap-1">
                              <BarChart3 className="w-3 h-3" />
                              {dept.total} total
                            </span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-green-600" />
                              {dept.resolved} resolved
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-amber-600" />
                              {dept.pending} pending
                            </span>
                            <span className="flex items-center gap-1">
                              <TrendingUp className="w-3 h-3 text-blue-600" />
                              Avg: {dept.avgTime}
                            </span>
                          </div>

                          {/* HOD Information */}
                          <div className="bg-gradient-to-r from-teal-50 to-green-50 rounded-lg p-3 border border-teal-200">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center text-white">
                                  <Users className="w-5 h-5" />
                                </div>
                                <div>
                                  <div className="text-xs text-teal-600 mb-0.5">Head of Department</div>
                                  <div className="text-sm text-teal-900">{dept.hod}</div>
                                  <div className="text-xs text-teal-600">{dept.contact}</div>
                                </div>
                              </div>
                              <button className="px-3 py-1.5 bg-white border border-teal-300 text-teal-700 rounded-lg text-xs hover:bg-teal-50 transition-colors">
                                Contact HOD
                              </button>
                            </div>
                          </div>
                        </div>

                        <div className="text-right ml-4">
                          <div className="text-2xl text-teal-700 mb-1">{resolutionRate}%</div>
                          <div className="text-xs text-slate-500">Resolution Rate</div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-teal-500 to-green-500 rounded-full transition-all"
                          style={{ width: `${resolutionRate}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-4 space-y-5">
            {/* Zone-wise Heatmap */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
              <h3 className="text-sm mb-4 flex items-center gap-2">
                <PieChart className="w-4 h-4 text-teal-600" />
                Zone-wise Distribution
              </h3>
              <div className="space-y-3">
                {zoneData.map((zone, index) => (
                  <div key={index} className="border border-slate-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm">{zone.zone}</div>
                      <div className="text-lg text-teal-700">{zone.complaints}</div>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="px-2 py-0.5 bg-red-100 text-red-700 rounded">C: {zone.critical}</span>
                      <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded">H: {zone.high}</span>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded">M: {zone.medium}</span>
                      <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded">L: {zone.low}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Predictive Hotspots */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg border-2 border-purple-200 p-5">
              <h3 className="text-sm mb-4 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-purple-600" />
                AI Predictive Hotspots
              </h3>
              <div className="space-y-3">
                {hotspots.map((spot, index) => (
                  <div key={index} className="bg-white rounded-lg p-3 border border-purple-200">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <div className="text-sm mb-1">{spot.area}</div>
                        <div className="text-xs text-slate-600">{spot.category}</div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs ${
                        spot.prediction === 'Critical' ? 'bg-red-100 text-red-700' :
                        spot.prediction === 'High' ? 'bg-orange-100 text-orange-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {spot.prediction}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-slate-600">Likelihood: {spot.likelihood}%</span>
                      <span className={`flex items-center gap-1 ${
                        spot.trend === 'up' ? 'text-red-600' : 'text-slate-600'
                      }`}>
                        {spot.trend === 'up' ? '↗' : '→'} {spot.trend}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Breakdown */}
            <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-5">
              <h3 className="text-sm mb-4">Recurring Categories</h3>
              <div className="space-y-3">
                {[
                  { name: 'Road Maintenance', count: 31, color: 'bg-amber-500' },
                  { name: 'Water & Sewage', count: 24, color: 'bg-blue-500' },
                  { name: 'Sanitation', count: 19, color: 'bg-green-500' },
                  { name: 'Street Lighting', count: 15, color: 'bg-purple-500' },
                  { name: 'Parks & Greenery', count: 8, color: 'bg-emerald-500' }
                ].map((cat, index) => {
                  const percentage = ((cat.count / totalComplaints) * 100).toFixed(0);
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-slate-700">{cat.name}</span>
                        <span className="text-slate-900">{cat.count} ({percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${cat.color} rounded-full transition-all`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
