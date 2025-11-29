import { ArrowLeft, TrendingUp, DollarSign, CheckCircle, Clock, BarChart3, PieChart } from 'lucide-react';
import { mockCSRProjects } from './mockCSRData';

interface CSRAnalyticsProps {
  onBack: () => void;
}

export function CSRAnalytics({ onBack }: CSRAnalyticsProps) {
  const sponsoredProjects = mockCSRProjects.filter(p => p.sponsor);
  const totalSponsored = sponsoredProjects.length;
  const totalDonated = sponsoredProjects.reduce((sum, p) => sum + p.amountRaised, 0);
  const completedProjects = sponsoredProjects.filter(p => p.status === 'completed').length;
  const activeProjects = sponsoredProjects.filter(p => p.status === 'active' || p.status === 'sponsored').length;

  // Mock monthly data
  const monthlyData = [
    { month: 'Jul', amount: 45 },
    { month: 'Aug', amount: 60 },
    { month: 'Sep', amount: 52 },
    { month: 'Oct', amount: 75 },
    { month: 'Nov', amount: 95 },
    { month: 'Dec', amount: 80 }
  ];

  const maxAmount = Math.max(...monthlyData.map(d => d.amount));

  // Category breakdown
  const categoryData = [
    { name: 'Infrastructure', amount: 95, color: 'bg-blue-500' },
    { name: 'Water & Sanitation', amount: 80, color: 'bg-green-500' },
    { name: 'Environment', amount: 60, color: 'bg-emerald-500' },
    { name: 'Education', amount: 45, color: 'bg-purple-500' },
    { name: 'Parks & Recreation', amount: 35, color: 'bg-amber-500' }
  ];

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-4 sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg flex-1">Analytics Dashboard</h1>
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <BarChart3 className="w-4 h-4" />
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* KPI Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mb-3">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl mb-1">{totalSponsored}</div>
            <div className="text-xs text-slate-600">Total Projects Sponsored</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mb-3">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl mb-1">${(totalDonated / 1000).toFixed(0)}K</div>
            <div className="text-xs text-slate-600">Total Amount Donated</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mb-3">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl mb-1">{completedProjects}</div>
            <div className="text-xs text-slate-600">Projects Completed</div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md">
            <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl mb-1">{activeProjects}</div>
            <div className="text-xs text-slate-600">Active Projects</div>
          </div>
        </div>

        {/* Monthly Contributions Graph */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Monthly Contributions</h3>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="flex items-end justify-between gap-2 h-40">
            {monthlyData.map((data, index) => {
              const height = (data.amount / maxAmount) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full relative flex items-end h-32">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-blue-500 rounded-t-lg relative group cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ height: `${height}%` }}
                    >
                      <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-slate-900 text-white px-2 py-1 rounded whitespace-nowrap">
                        ${data.amount}K
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600">{data.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category-wise Spend */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm">Category-wise Spend</h3>
            <PieChart className="w-4 h-4 text-slate-400" />
          </div>
          
          <div className="space-y-3">
            {categoryData.map((cat, index) => {
              const maxCatAmount = Math.max(...categoryData.map(c => c.amount));
              const percentage = (cat.amount / maxCatAmount) * 100;
              
              return (
                <div key={index}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-slate-700">{cat.name}</span>
                    <span className="text-slate-900">${cat.amount}K</span>
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

        {/* Impact Metrics */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-4 mb-6">
          <h3 className="text-sm mb-4">Community Impact Metrics</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-2xl text-green-600 mb-1">32.5K</div>
              <div className="text-xs text-slate-600">Citizens Impacted</div>
            </div>
            <div>
              <div className="text-2xl text-blue-600 mb-1">156</div>
              <div className="text-xs text-slate-600">Complaints Resolved</div>
            </div>
            <div>
              <div className="text-2xl text-purple-600 mb-1">85%</div>
              <div className="text-xs text-slate-600">Avg Success Rate</div>
            </div>
            <div>
              <div className="text-2xl text-amber-600 mb-1">45</div>
              <div className="text-xs text-slate-600">Jobs Created</div>
            </div>
          </div>

          {/* Mini Map Preview */}
          <div className="mt-4 h-32 bg-slate-200 rounded-lg overflow-hidden relative">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-slate-600 mb-1">Project Heatmap</div>
                <div className="text-xs text-slate-500">View full map →</div>
              </div>
            </div>
            {/* Simulated heatmap dots */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-green-500 rounded-full opacity-70" />
            <div className="absolute top-12 right-12 w-3 h-3 bg-blue-500 rounded-full opacity-70" />
            <div className="absolute bottom-8 left-16 w-3 h-3 bg-purple-500 rounded-full opacity-70" />
          </div>
        </div>

        {/* Recent Projects Feed */}
        <div className="bg-white rounded-xl shadow-md p-4">
          <h3 className="text-sm mb-4">Recent Project Activity</h3>
          <div className="space-y-3">
            {sponsoredProjects.slice(0, 4).map((project) => {
              const progress = (project.amountRaised / project.totalCost) * 100;
              
              return (
                <div key={project.id} className="border-b border-slate-100 last:border-b-0 pb-3 last:pb-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="text-sm mb-1">{project.title}</div>
                      <div className="text-xs text-slate-500">{project.location}</div>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'completed'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {project.status === 'completed' ? 'Completed' : 'Active'}
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs text-slate-500">
                      Last updated: {new Date(project.updates[0]?.date || project.timeline[0].date).toLocaleDateString()}
                    </div>
                    <div className="text-xs text-green-600">{Math.round(progress)}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Report Button */}
        <div className="mt-6">
          <button className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-xl hover:shadow-lg transition-all">
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
