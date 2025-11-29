import { Settings, Bell, HelpCircle, Shield, LogOut, ChevronRight, MapPin, Calendar, TrendingUp, Award } from 'lucide-react';

interface ProfileProps {
  onLogout: () => void;
}

export function Profile({ onLogout }: ProfileProps) {
  const user = {
    name: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'Downtown District',
    joinedDate: 'Jan 2025',
    stats: {
      reports: 10,
      resolved: 8,
      points: 620,
      rank: 15
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 pt-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl">Profile</h1>
          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Profile Card */}
      <div className="px-4 -mt-12 mb-4">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              {user.name[0]}
            </div>
            <div className="flex-1">
              <h2 className="mb-1">{user.name}</h2>
              <p className="text-sm text-slate-600 mb-2">{user.email}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <MapPin className="w-3 h-3" />
                {user.location}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="text-center">
              <div className="text-xl text-blue-600 mb-1">{user.stats.reports}</div>
              <div className="text-xs text-slate-600">Reports</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-green-600 mb-1">{user.stats.resolved}</div>
              <div className="text-xs text-slate-600">Resolved</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-purple-600 mb-1">{user.stats.points}</div>
              <div className="text-xs text-slate-600">Points</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-amber-600 mb-1">#{user.stats.rank}</div>
              <div className="text-xs text-slate-600">Rank</div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="px-4 mb-4">
        <h3 className="text-sm text-slate-600 mb-3">Recent Activity</h3>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Issue Upvoted</div>
                <div className="text-xs text-slate-500">Pothole on Main Street - 2 hours ago</div>
              </div>
            </div>
          </div>

          <div className="p-4 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Badge Earned</div>
                <div className="text-xs text-slate-500">Community Hero badge - 1 day ago</div>
              </div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Issue Reported</div>
                <div className="text-xs text-slate-500">Broken street light - 3 days ago</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-4 mb-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-slate-600" />
              <span className="text-sm">Notifications</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-slate-600" />
              <span className="text-sm">Privacy & Security</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <HelpCircle className="w-5 h-5 text-slate-600" />
              <span className="text-sm">Help & Support</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <Settings className="w-5 h-5 text-slate-600" />
              <span className="text-sm">App Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
          <h3 className="text-sm mb-2">About CivicPulse</h3>
          <p className="text-xs text-slate-600 mb-3">
            CivicPulse helps build better communities by enabling citizens to report and track civic issues efficiently.
          </p>
          <div className="flex items-center gap-4 text-xs text-blue-600">
            <button>Terms of Service</button>
            <span className="text-slate-400">•</span>
            <button>Privacy Policy</button>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="px-4 pb-6">
        <button
          onClick={onLogout}
          className="w-full flex items-center justify-center gap-2 p-4 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
}
