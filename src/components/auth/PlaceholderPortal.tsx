import { ArrowLeft, Clock } from 'lucide-react';

interface PlaceholderPortalProps {
  role: string;
  icon: string;
  onBack: () => void;
}

export function PlaceholderPortal({ role, icon, onBack }: PlaceholderPortalProps) {
  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        <div className="text-center max-w-md">
          {/* Icon */}
          <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl">
            <span className="text-5xl">{icon}</span>
          </div>

          {/* Logo */}
          <h1 className="text-3xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            CivicPulse
          </h1>

          {/* Role Title */}
          <h2 className="text-2xl mb-4">{role} Portal</h2>

          {/* Coming Soon Message */}
          <div className="bg-white rounded-2xl p-8 shadow-xl mb-6">
            <div className="w-16 h-16 mx-auto mb-4 bg-amber-100 rounded-full flex items-center justify-center">
              <Clock className="w-8 h-8 text-amber-600" />
            </div>
            <h3 className="mb-3">Coming Soon</h3>
            <p className="text-sm text-slate-600 mb-6">
              The {role} portal is currently under development. We're working hard to bring you an amazing experience.
            </p>
            
            {/* Feature List */}
            <div className="space-y-3 text-left">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-blue-600 rounded-full" />
                <span className="text-slate-700">Advanced dashboard & analytics</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-600 rounded-full" />
                <span className="text-slate-700">Real-time updates & notifications</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-600 rounded-full" />
                <span className="text-slate-700">Comprehensive reporting tools</span>
              </div>
            </div>
          </div>

          {/* Notification Signup */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6">
            <p className="text-sm text-slate-700 mb-3">Get notified when we launch</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 bg-white border-2 border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap">
                Notify Me
              </button>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={onBack}
            className="text-sm text-blue-600 hover:text-blue-700 transition-colors"
          >
            ← Back to role selection
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 pb-8">
        <div className="text-center text-xs text-slate-400">
          <p>CivicPulse © 2025 • Building better communities</p>
        </div>
      </div>
    </div>
  );
}
