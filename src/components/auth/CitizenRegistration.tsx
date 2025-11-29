import { useState } from 'react';
import { ArrowLeft, User, Phone, Mail, Lock, Eye, EyeOff, MapPin, Globe } from 'lucide-react';

interface CitizenRegistrationProps {
  onRegister: () => void;
  onLoginClick: () => void;
  onBack: () => void;
}

export function CitizenRegistration({ onRegister, onLoginClick, onBack }: CitizenRegistrationProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
    language: 'English'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [locationPermission, setLocationPermission] = useState(false);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Simulate registration
    onRegister();
  };

  const handleGoogleSignup = () => {
    // Simulate Google OAuth signup flow
    const popup = window.confirm('Sign up with Google?\n\nQuickly create your CivicPulse account using Google.');
    if (popup) {
      // Simulate successful OAuth registration
      setTimeout(() => {
        alert('✓ Account created successfully!\n\nWelcome to CivicPulse!');
        onRegister();
      }, 800);
    }
  };

  const requestLocation = () => {
    setLocationPermission(true);
    // Simulate geolocation request
    setTimeout(() => {
      alert('Location access granted!');
    }, 500);
  };

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
        
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
            <span className="text-3xl">✨</span>
          </div>
          <h1 className="text-2xl mb-2">Create Account</h1>
          <p className="text-sm text-slate-600">Join the CivicPulse community</p>
        </div>
      </div>

      {/* Registration Form */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">OTP verification will be sent</p>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleChange('password', e.target.value)}
                  placeholder="Create a strong password"
                  className="w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
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

            {/* Confirm Password */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleChange('confirmPassword', e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full pl-12 pr-12 py-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-sm text-slate-600 mb-2">Preferred Language</label>
              <div className="relative">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  value={formData.language}
                  onChange={(e) => handleChange('language', e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 transition-colors appearance-none cursor-pointer"
                >
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>Hindi</option>
                  <option>Mandarin</option>
                </select>
              </div>
            </div>

            {/* Location Permission */}
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="text-sm text-blue-900 mb-2">Location Access</div>
                  <p className="text-xs text-blue-700 mb-3">
                    Allow location access to automatically tag issue locations and find nearby problems
                  </p>
                  <button
                    type="button"
                    onClick={requestLocation}
                    disabled={locationPermission}
                    className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                      locationPermission
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {locationPermission ? '✓ Access Granted' : 'Grant Access'}
                  </button>
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-slate-50 rounded-xl p-4">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-blue-600"
                  required
                />
                <span className="text-xs text-slate-600">
                  I agree to the{' '}
                  <button type="button" className="text-blue-600 hover:underline">Terms of Service</button>
                  {' '}and{' '}
                  <button type="button" className="text-blue-600 hover:underline">Privacy Policy</button>
                </span>
              </label>
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl hover:shadow-lg transition-all active:scale-[0.98]"
            >
              Register as Citizen
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-sm text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Google Signup */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleGoogleSignup}
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
              <span className="text-sm text-slate-700">Sign up with Google</span>
            </button>
          </div>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-slate-600">
              Already have an account?{' '}
              <button
                onClick={onLoginClick}
                className="text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign In
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
