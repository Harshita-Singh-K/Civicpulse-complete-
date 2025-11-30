import { ArrowLeft, TrendingUp, DollarSign, CheckCircle, Clock, BarChart3, PieChart, Download, Share2, MoreHorizontal, Activity } from 'lucide-react';
import { mockCSRProjects } from './mockCSRData';
import { useState, useEffect } from 'react';

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
      {/* Header with Glassmorphism */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-4 sticky top-0 z-20 shadow-lg">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-white/20 rounded-full transition-all tap-scale">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="text-lg font-bold">Analytics Dashboard</h1>
            <p className="text-xs text-green-100 opacity-90">Real-time impact tracking</p>
          </div>
          <div className="flex gap-2">
            <button className="p-2 hover:bg-white/20 rounded-full transition-all tap-scale">
              <Share2 className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center glow-green animate-bounce-in">
              <Activity className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 pb-20">
        {/* KPI Cards with Staggered Animation */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-lift-hover tap-scale animate-fade-slide-up stagger-1">
            <div className="w-10 h-10 bg-blue-50 rounded-full flex items-center justify-center mb-3 icon-bounce-hover">
              <TrendingUp className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-2xl font-bold mb-1 text-slate-800 animate-count-up">{totalSponsored}</div>
            <div className="text-xs text-slate-500 font-medium">Total Projects</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-lift-hover tap-scale animate-fade-slide-up stagger-2">
            <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center mb-3 icon-bounce-hover">
              <DollarSign className="w-5 h-5 text-green-600" />
            </div>
            <div className="text-2xl font-bold mb-1 text-slate-800 animate-count-up" style={{ animationDelay: '0.1s' }}>${(totalDonated / 1000).toFixed(0)}K</div>
            <div className="text-xs text-slate-500 font-medium">Total Donated</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-lift-hover tap-scale animate-fade-slide-up stagger-3">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center mb-3 icon-bounce-hover">
              <CheckCircle className="w-5 h-5 text-emerald-600" />
            </div>
            <div className="text-2xl font-bold mb-1 text-slate-800 animate-count-up" style={{ animationDelay: '0.2s' }}>{completedProjects}</div>
            <div className="text-xs text-slate-500 font-medium">Completed</div>
          </div>

          <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 card-lift-hover tap-scale animate-fade-slide-up stagger-4">
            <div className="w-10 h-10 bg-amber-50 rounded-full flex items-center justify-center mb-3 icon-bounce-hover">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div className="text-2xl font-bold mb-1 text-slate-800 animate-count-up" style={{ animationDelay: '0.3s' }}>{activeProjects}</div>
            <div className="text-xs text-slate-500 font-medium">Active Now</div>
          </div>
        </div>

        {/* Monthly Contributions Graph - Animated */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6 animate-fade-slide-up" style={{ animationDelay: '0.2s' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Monthly Contributions</h3>
              <p className="text-xs text-slate-500">Last 6 months performance</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <BarChart3 className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="flex items-end justify-between gap-3 h-48">
            {monthlyData.map((data, index) => {
              const height = (data.amount / maxAmount) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div className="w-full relative flex items-end h-40 bg-slate-50 rounded-t-lg overflow-hidden">
                    <div
                      className="w-full bg-gradient-to-t from-green-500 to-blue-500 rounded-t-lg relative transition-all duration-1000 ease-out group-hover:opacity-90"
                      style={{ height: `${height}%`, transformOrigin: 'bottom', animation: `grow-up 1s ease-out ${index * 0.1}s backwards` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 text-[10px] font-bold bg-slate-800 text-white px-2 py-1 rounded shadow-lg whitespace-nowrap z-10">
                        ${data.amount}K
                      </div>
                    </div>
                  </div>
                  <div className="text-[10px] font-medium text-slate-500 group-hover:text-slate-800 transition-colors">{data.month}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category-wise Spend - Animated */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 mb-6 animate-fade-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Category Breakdown</h3>
              <p className="text-xs text-slate-500">Distribution by sector</p>
            </div>
            <div className="p-2 bg-slate-50 rounded-lg">
              <PieChart className="w-4 h-4 text-slate-400" />
            </div>
          </div>

          <div className="space-y-4">
            {categoryData.map((cat, index) => {
              const maxCatAmount = Math.max(...categoryData.map(c => c.amount));
              const percentage = (cat.amount / maxCatAmount) * 100;

              return (
                <div key={index} className="group">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <span className="font-medium text-slate-700 group-hover:text-slate-900 transition-colors">{cat.name}</span>
                    <span className="font-bold text-slate-900">${cat.amount}K</span>
                  </div>
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${cat.color} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
                      style={{ width: `${percentage}%`, animation: `slide-right 1s ease-out ${index * 0.1}s backwards` }}
                    >
                      <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Impact Metrics - Grid */}
        <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl border border-green-100 p-5 mb-6 animate-fade-slide-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-sm font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Activity className="w-4 h-4 text-green-600" />
            Community Impact Metrics
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 card-lift-hover">
              <div className="text-2xl font-bold text-green-600 mb-1 animate-count-up">32.5K</div>
              <div className="text-xs font-medium text-slate-600">Citizens Impacted</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 card-lift-hover">
              <div className="text-2xl font-bold text-blue-600 mb-1 animate-count-up" style={{ animationDelay: '0.1s' }}>156</div>
              <div className="text-xs font-medium text-slate-600">Complaints Resolved</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 card-lift-hover">
              <div className="text-2xl font-bold text-purple-600 mb-1 animate-count-up" style={{ animationDelay: '0.2s' }}>85%</div>
              <div className="text-xs font-medium text-slate-600">Avg Success Rate</div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 border border-white/50 card-lift-hover">
              <div className="text-2xl font-bold text-amber-600 mb-1 animate-count-up" style={{ animationDelay: '0.3s' }}>45</div>
              <div className="text-xs font-medium text-slate-600">Jobs Created</div>
            </div>
          </div>

          {/* Mini Map Preview */}
          <div className="mt-4 h-36 bg-slate-200 rounded-xl overflow-hidden relative group cursor-pointer shadow-inner">
            <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center transition-transform duration-700 group-hover:scale-110">
              <div className="text-center z-10">
                <div className="text-sm font-bold text-slate-700 mb-1">Project Heatmap</div>
                <div className="text-xs text-slate-500 bg-white/50 px-3 py-1 rounded-full backdrop-blur-sm">Tap to explore</div>
              </div>
            </div>
            {/* Simulated heatmap dots with pulse */}
            <div className="absolute top-4 left-8 w-3 h-3 bg-green-500 rounded-full opacity-70 animate-pulse" />
            <div className="absolute top-12 right-12 w-3 h-3 bg-blue-500 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '0.5s' }} />
            <div className="absolute bottom-8 left-16 w-3 h-3 bg-purple-500 rounded-full opacity-70 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
          </div>
        </div>

        {/* Recent Projects Feed - Instagram Notification Style */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5 animate-fade-slide-up" style={{ animationDelay: '0.5s' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-slate-800">Recent Activity</h3>
            <button className="text-xs text-blue-600 font-medium hover:text-blue-700">View All</button>
          </div>
          <div className="space-y-4">
            {sponsoredProjects.slice(0, 4).map((project, index) => {
              const progress = (project.amountRaised / project.totalCost) * 100;

              return (
                <div key={project.id} className="group cursor-pointer">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex-shrink-0">
                      <img src={project.images[0]} alt="" className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="text-sm font-medium text-slate-900 truncate pr-2">{project.title}</div>
                        <span className={`px-2 py-0.5 text-[10px] font-bold uppercase rounded-full ${project.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-blue-100 text-blue-700'
                          }`}>
                          {project.status === 'completed' ? 'Done' : 'Active'}
                        </span>
                      </div>
                      <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Clock className="w-3 h-3" />
                        Updated {new Date(project.updates[0]?.date || project.timeline[0].date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  <div className="pl-13">
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-slate-500">Progress</span>
                      <span className="text-green-600 font-bold">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-blue-500 rounded-full transition-all duration-1000"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>

                  {index < 3 && <div className="h-px bg-slate-50 mt-4 mx-2" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Export Report Button */}
        <div className="mt-6 animate-fade-slide-up" style={{ animationDelay: '0.6s' }}>
          <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl shadow-lg shadow-blue-200 hover:shadow-xl transition-all tap-scale flex items-center justify-center gap-2 font-bold">
            <Download className="w-5 h-5" />
            Download Full Report
          </button>
        </div>
      </div>
    </div>
  );
}
