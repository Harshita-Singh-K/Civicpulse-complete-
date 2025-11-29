import { useState } from 'react';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

interface AuthorityLoginProps {
  onLogin: () => void;
  onBack: () => void;
}

export function AuthorityLogin({ onLogin, onBack }: AuthorityLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin();
  };

  const handleGoogleLogin = () => {
    const popup = window.confirm('Sign in with Google Workspace?\n\nThis will authenticate your municipal authority account.');
    if (popup) {
      setTimeout(() => {
        alert('✓ Google Workspace authentication successful!\n\nWelcome, Municipal Authority!');
        onLogin();
      }, 800);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-teal-50 via-white to-green-50">
      {/* Header */}
      <div className="px-6 pt-8 pb-6">
        <button
          onClick={onBack}
          className="p-2 hover:bg-white/50 rounded-lg transition-colors mb-6"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600" />
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-teal-500 to-green-500 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">🏛️</span>
          </div>
          <h1 className="text-2xl mb-2">Municipal Authority Login</h1>
          <p className="text-sm text-slate-600">Access the staff dashboard to manage civic complaints</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Staff Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="staff@municipal.gov"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-teal-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-teal-600 hover:text-teal-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-teal-500 to-green-500 text-white py-4 rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Sign In to Dashboard
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Google Workspace Login */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center gap-3 py-3 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 hover:shadow-md transition-all active:scale-[0.98]"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              <span className="text-sm text-slate-700">Continue with Google Workspace</span>
            </button>
          </div>

          {/* Info Box */}
          <div className="mt-6 bg-teal-50 border-2 border-teal-200 rounded-xl p-4">
            <h3 className="text-sm text-teal-900 mb-2">🏛️ Staff Access</h3>
            <ul className="text-xs text-teal-700 space-y-1">
              <li>• Monitor and manage citizen complaints</li>
              <li>• Assign tasks to field workers</li>
              <li>• Track real-time progress and SLA compliance</li>
              <li>• AI-powered priority and routing insights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
