import { Settings, Bell, HelpCircle, FileText, LogOut, ChevronRight, Building2, Award, TrendingUp } from 'lucide-react';

interface CSRProfileProps {
  onLogout: () => void;
}

export function CSRProfile({ onLogout }: CSRProfileProps) {
  const organization = {
    name: 'TechCorp Foundation',
    type: 'Corporate CSR',
    email: 'csr@techcorp.com',
    phone: '+1 (555) 987-6543',
    since: 'Jan 2024',
    stats: {
      projects: 6,
      donated: 315000,
      impact: 32500,
      certificates: 3
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-50 overflow-y-auto pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 pt-6 pb-16">
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
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-2xl flex-shrink-0">
              🤝
            </div>
            <div className="flex-1">
              <h2 className="mb-1">{organization.name}</h2>
              <p className="text-sm text-slate-600 mb-2">{organization.type}</p>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <Building2 className="w-3 h-3" />
                Member since {organization.since}
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-3 pt-4 border-t border-slate-100">
            <div className="text-center">
              <div className="text-xl text-green-600 mb-1">{organization.stats.projects}</div>
              <div className="text-xs text-slate-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-blue-600 mb-1">${(organization.stats.donated / 1000).toFixed(0)}K</div>
              <div className="text-xs text-slate-600">Donated</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-purple-600 mb-1">{(organization.stats.impact / 1000).toFixed(1)}K</div>
              <div className="text-xs text-slate-600">Impact</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-amber-600 mb-1">{organization.stats.certificates}</div>
              <div className="text-xs text-slate-600">Badges</div>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Summary */}
      <div className="px-4 mb-4">
        <h3 className="text-sm text-slate-600 mb-3">This Month's Impact</h3>
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-4 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Projects Funded</div>
                <div className="text-xs text-slate-500">3 new projects sponsored</div>
              </div>
              <div className="text-xl text-green-600">+3</div>
            </div>
          </div>

          <div className="p-4 border-b border-slate-100">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Community Members Helped</div>
                <div className="text-xs text-slate-500">Direct impact measurement</div>
              </div>
              <div className="text-xl text-blue-600">12.5K</div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Impact Reports Generated</div>
                <div className="text-xs text-slate-500">Ready for stakeholders</div>
              </div>
              <div className="text-xl text-purple-600">5</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="px-4 mb-4">
        <h3 className="text-sm text-slate-600 mb-3">Achievements</h3>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md text-center min-w-[80px]">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs">Top Sponsor</div>
          </div>
          <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md text-center min-w-[80px]">
            <div className="text-2xl mb-1">🌟</div>
            <div className="text-xs">Early Adopter</div>
          </div>
          <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md text-center min-w-[80px]">
            <div className="text-2xl mb-1">💚</div>
            <div className="text-xs">Impact Leader</div>
          </div>
          <div className="flex-shrink-0 bg-slate-100 rounded-xl p-3 text-center min-w-[80px] opacity-50">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs">10 Projects</div>
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
              <FileText className="w-5 h-5 text-slate-600" />
              <span className="text-sm">Download Reports</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>

          <button className="w-full flex items-center justify-between p-4 border-b border-slate-100 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-3">
              <Award className="w-5 h-5 text-slate-600" />
              <span className="text-sm">Certificates</span>
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
              <span className="text-sm">Settings</span>
            </div>
            <ChevronRight className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* About Section */}
      <div className="px-4 mb-4">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4">
          <h3 className="text-sm mb-2">About CivicPulse CSR</h3>
          <p className="text-xs text-slate-600 mb-3">
            Transparent CSR platform connecting corporate sponsors with impactful civic improvement projects.
          </p>
          <div className="flex items-center gap-4 text-xs text-green-600">
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
