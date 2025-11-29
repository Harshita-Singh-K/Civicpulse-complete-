import { Plus, TrendingUp, Clock, CheckCircle, AlertCircle, Filter, Search } from 'lucide-react';
import { useState } from 'react';
import { mockIssues } from './mockData';

interface HomeProps {
  onReportClick: () => void;
  onIssueClick: (issueId: string) => void;
}

export function Home({ onReportClick, onIssueClick }: HomeProps) {
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'in-progress' | 'resolved'>('all');
  const [sortBy, setSortBy] = useState<'trending' | 'urgent' | 'recent'>('trending');

  const filteredIssues = mockIssues.filter(issue => 
    filterStatus === 'all' ? true : issue.status === filterStatus
  );

  const sortedIssues = [...filteredIssues].sort((a, b) => {
    if (sortBy === 'urgent') {
      const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    if (sortBy === 'trending') {
      return b.upvotes - a.upvotes;
    }
    return new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime();
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'resolved': return 'text-green-600 bg-green-50';
      case 'in-progress': return 'text-blue-600 bg-blue-50';
      case 'acknowledged': return 'text-amber-600 bg-amber-50';
      default: return 'text-slate-600 bg-slate-50';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-amber-500';
      default: return 'bg-slate-400';
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-blue-50 to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-6 rounded-b-3xl shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl mb-1">CivicPulse</h1>
            <p className="text-blue-100 text-sm">Building better communities together</p>
          </div>
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <span className="text-sm">👤</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
          <Search className="w-5 h-5 text-blue-200" />
          <input
            type="text"
            placeholder="Search issues in your area..."
            className="bg-transparent border-none outline-none text-white placeholder-blue-200 flex-1"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 py-4 -mt-8 relative z-10">
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="text-2xl mb-1">247</div>
            <div className="text-xs text-slate-600">Total Issues</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="text-2xl text-green-600 mb-1">189</div>
            <div className="text-xs text-slate-600">Resolved</div>
          </div>
          <div className="bg-white rounded-xl p-3 shadow-md">
            <div className="text-2xl text-amber-600 mb-1">58</div>
            <div className="text-xs text-slate-600">Pending</div>
          </div>
        </div>
      </div>

      {/* Civic Reels Banner */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm mb-1">🎬 Civic Reels</div>
              <div className="text-xs text-purple-100">Watch awareness videos from your community</div>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <span className="text-xl">▶️</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="px-4 mb-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              filterStatus === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              filterStatus === 'pending' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('in-progress')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              filterStatus === 'in-progress' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'
            }`}
          >
            In Progress
          </button>
          <button
            onClick={() => setFilterStatus('resolved')}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
              filterStatus === 'resolved' ? 'bg-blue-600 text-white' : 'bg-white text-slate-600'
            }`}
          >
            Resolved
          </button>
        </div>

        <div className="flex gap-2 mt-2">
          <button
            onClick={() => setSortBy('trending')}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs ${
              sortBy === 'trending' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'
            }`}
          >
            <TrendingUp className="w-3 h-3" />
            Trending
          </button>
          <button
            onClick={() => setSortBy('urgent')}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs ${
              sortBy === 'urgent' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'
            }`}
          >
            <AlertCircle className="w-3 h-3" />
            Urgent
          </button>
          <button
            onClick={() => setSortBy('recent')}
            className={`flex items-center gap-1 px-3 py-2 rounded-lg text-xs ${
              sortBy === 'recent' ? 'bg-slate-800 text-white' : 'bg-white text-slate-600'
            }`}
          >
            <Clock className="w-3 h-3" />
            Recent
          </button>
        </div>
      </div>

      {/* Issues Feed */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm text-slate-600">Nearby Issues</h2>
          <span className="text-xs text-blue-600">View Map →</span>
        </div>

        <div className="space-y-3">
          {sortedIssues.map(issue => (
            <div
              key={issue.id}
              onClick={() => onIssueClick(issue.id)}
              className="bg-white rounded-xl shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-all"
            >
              {/* Issue Image */}
              {issue.images[0] && (
                <div className="relative h-48 bg-slate-200">
                  <img src={issue.images[0]} alt={issue.title} className="w-full h-full object-cover" />
                  <div className={`absolute top-2 left-2 w-2 h-2 rounded-full ${getPriorityColor(issue.priority)}`} />
                  <div className={`absolute top-2 right-2 px-2 py-1 rounded-lg text-xs ${getStatusColor(issue.status)}`}>
                    {issue.status.replace('-', ' ')}
                  </div>
                </div>
              )}

              {/* Issue Content */}
              <div className="p-4">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="flex-1">{issue.title}</h3>
                  <div className="flex items-center gap-1 text-slate-600">
                    <span className="text-sm">👍</span>
                    <span className="text-sm">{issue.upvotes}</span>
                  </div>
                </div>

                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{issue.description}</p>

                <div className="flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-4">
                    <span className="px-2 py-1 bg-slate-100 rounded">📍 {issue.location}</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded">{issue.category}</span>
                  </div>
                </div>

                <div className="mt-2 text-xs text-slate-400">
                  Reported {new Date(issue.reportedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Report Button */}
      <button
        onClick={onReportClick}
        className="fixed bottom-20 right-6 w-14 h-14 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-50"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
