import { useState } from 'react';
import { ArrowLeft, Camera, Video, Mic, MapPin, Upload, AlertTriangle, CheckCircle, Sparkles } from 'lucide-react';

interface ReportIssueProps {
  onBack: () => void;
}

export function ReportIssue({ onBack }: ReportIssueProps) {
  const [step, setStep] = useState<'upload' | 'details' | 'ai-assist' | 'confirm'>('upload');
  const [uploadType, setUploadType] = useState<'photo' | 'video' | 'voice' | null>(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Main St & 5th Ave');
  const [showAIAssist, setShowAIAssist] = useState(false);
  const [aiSuggestions, setAISuggestions] = useState({
    category: 'Road Maintenance',
    isDuplicate: false,
    isFake: false,
    confidence: 92
  });

  const categories = [
    { name: 'Road Maintenance', icon: '🛣️' },
    { name: 'Street Lighting', icon: '💡' },
    { name: 'Waste Management', icon: '🗑️' },
    { name: 'Water & Sewage', icon: '💧' },
    { name: 'Parks & Greenery', icon: '🌳' },
    { name: 'Vandalism', icon: '🎨' },
    { name: 'Public Safety', icon: '🚨' },
    { name: 'Other', icon: '📋' }
  ];

  const handleUpload = (type: 'photo' | 'video' | 'voice') => {
    setUploadType(type);
    setShowAIAssist(true);
    setTimeout(() => setStep('details'), 1500);
  };

  const handleSubmit = () => {
    setStep('confirm');
  };

  if (step === 'confirm') {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gradient-to-b from-green-50 to-white px-6">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl mb-2 text-center">Report Submitted!</h2>
        <p className="text-center text-slate-600 mb-6">
          Your issue has been reported successfully. We'll keep you updated on the progress.
        </p>
        <div className="bg-blue-50 rounded-xl p-4 mb-6 w-full">
          <div className="text-sm text-blue-900 mb-2">You earned rewards! 🎉</div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="text-xs text-blue-600 mb-1">Points</div>
              <div className="text-xl text-blue-900">+50</div>
            </div>
            <div className="flex-1">
              <div className="text-xs text-blue-600 mb-1">Badge</div>
              <div className="text-xl">⭐ Reporter</div>
            </div>
          </div>
        </div>
        <button
          onClick={onBack}
          className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-xl">Report an Issue</h1>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'upload' ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
            }`}>
              1
            </div>
            <span className="text-xs mt-1">Upload</span>
          </div>
          <div className="flex-1 h-1 bg-blue-500 mx-2" />
          <div className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
              step === 'details' || step === 'ai-assist' ? 'bg-white text-blue-600' : 'bg-blue-500 text-white'
            }`}>
              2
            </div>
            <span className="text-xs mt-1">Details</span>
          </div>
          <div className="flex-1 h-1 bg-blue-500 mx-2" />
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              3
            </div>
            <span className="text-xs mt-1">Submit</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {step === 'upload' && (
          <div className="space-y-4">
            <div>
              <h2 className="mb-2">How would you like to report?</h2>
              <p className="text-sm text-slate-600 mb-6">Choose your preferred method to document the issue</p>
            </div>

            <button
              onClick={() => handleUpload('photo')}
              className="w-full bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Camera className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="mb-1">Take Photo</div>
                  <div className="text-sm text-slate-600">Capture images of the issue</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleUpload('video')}
              className="w-full bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-200 rounded-xl p-6 hover:border-purple-400 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                  <Video className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="mb-1">Record Video</div>
                  <div className="text-sm text-slate-600">Show the issue in detail</div>
                </div>
              </div>
            </button>

            <button
              onClick={() => handleUpload('voice')}
              className="w-full bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Mic className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="mb-1">Voice Description</div>
                  <div className="text-sm text-slate-600">Describe the issue verbally</div>
                </div>
              </div>
            </button>

            <button className="w-full bg-slate-100 border-2 border-slate-200 rounded-xl p-6 hover:border-slate-400 transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-500 rounded-full flex items-center justify-center">
                  <Upload className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1 text-left">
                  <div className="mb-1">Upload from Gallery</div>
                  <div className="text-sm text-slate-600">Choose existing photos/videos</div>
                </div>
              </div>
            </button>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-4">
            {/* AI Assistance Card */}
            {showAIAssist && (
              <div className="bg-gradient-to-r from-violet-50 to-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-purple-900">AI Assistant</span>
                      <span className="text-xs px-2 py-1 bg-purple-200 text-purple-700 rounded">
                        {aiSuggestions.confidence}% confidence
                      </span>
                    </div>
                    <p className="text-sm text-purple-800 mb-3">
                      Based on your image, we suggest:
                    </p>
                    <button
                      onClick={() => setCategory(aiSuggestions.category)}
                      className="px-3 py-2 bg-white border border-purple-300 rounded-lg text-sm hover:bg-purple-100 transition-colors"
                    >
                      📍 {aiSuggestions.category}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Location */}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Location (Auto-detected)</label>
              <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-4 border border-slate-200">
                <MapPin className="w-5 h-5 text-blue-600" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 bg-transparent outline-none"
                />
              </div>
              {/* Mini Map Preview */}
              <div className="mt-2 h-32 bg-slate-200 rounded-xl overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-green-100 flex items-center justify-center">
                  <MapPin className="w-8 h-8 text-red-500" />
                </div>
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Category</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.name}
                    onClick={() => setCategory(cat.name)}
                    className={`p-3 rounded-xl border-2 transition-all ${
                      category === cat.name
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-slate-200 bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{cat.icon}</div>
                    <div className="text-xs">{cat.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="text-sm text-slate-600 mb-2 block">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the issue in detail..."
                rows={4}
                className="w-full p-4 border-2 border-slate-200 rounded-xl outline-none focus:border-blue-500 resize-none"
              />
            </div>

            {/* Warnings */}
            {aiSuggestions.isDuplicate && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-4 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-sm text-amber-900 mb-1">Possible Duplicate</div>
                  <p className="text-xs text-amber-700">
                    A similar issue was reported nearby. Would you like to upvote it instead?
                  </p>
                </div>
              </div>
            )}

            <button
              onClick={handleSubmit}
              disabled={!category || !description}
              className="w-full bg-blue-600 text-white py-4 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Report
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
