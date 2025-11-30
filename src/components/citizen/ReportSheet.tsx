import { useState, useRef, useEffect } from 'react';
import { X, Camera, Image as ImageIcon, Mic, MapPin, Send, Wand2, AlertTriangle, Check, ChevronDown } from 'lucide-react';

interface ReportSheetProps {
    onBack: () => void;
}

export function ReportSheet({ onBack }: ReportSheetProps) {
    const [step, setStep] = useState<'media' | 'details' | 'review'>('media');
    const [mediaType, setMediaType] = useState<'camera' | 'gallery' | 'voice'>('camera');
    const [description, setDescription] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [showAiSuggestions, setShowAiSuggestions] = useState(false);
    const [priority, setPriority] = useState<'low' | 'medium' | 'high' | 'critical'>('medium');
    const sheetRef = useRef<HTMLDivElement>(null);

    // Simulate slide-up animation
    const [isVisible, setIsVisible] = useState(false);
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        setTimeout(onBack, 300);
    };

    const handleNext = () => {
        if (step === 'media') setStep('details');
        else if (step === 'details') setStep('review');
    };

    const handleSubmit = () => {
        // Simulate submission
        handleClose();
    };

    const toggleRecording = () => {
        setIsRecording(!isRecording);
    };

    const analyzeContent = () => {
        setAnalyzing(true);
        setTimeout(() => {
            setAnalyzing(false);
            setShowAiSuggestions(true);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            {/* Backdrop */}
            <div
                className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                onClick={handleClose}
            />

            {/* Sheet */}
            <div
                ref={sheetRef}
                className={`relative w-full max-w-md bg-[var(--bg-card)] rounded-t-3xl shadow-2xl border-t border-[var(--border-subtle)] transition-transform duration-300 ease-out ${isVisible ? 'translate-y-0' : 'translate-y-full'}`}
                style={{ height: '85vh' }}
            >
                {/* Drag Handle */}
                <div className="absolute top-0 left-0 right-0 h-8 flex items-center justify-center cursor-grab active:cursor-grabbing" onClick={handleClose}>
                    <div className="w-12 h-1.5 bg-slate-600 rounded-full" />
                </div>

                {/* Header */}
                <div className="px-5 pt-8 pb-4 flex items-center justify-between border-b border-[var(--border-subtle)]">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">Report Issue</h2>
                    <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/10 text-[var(--text-secondary)]">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="h-full overflow-y-auto pb-24 px-5 pt-4">

                    {/* Step 1: Media Capture */}
                    {step === 'media' && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="aspect-[4/3] bg-black rounded-2xl overflow-hidden relative border border-[var(--border-subtle)] group">
                                {/* Camera Preview Placeholder */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Camera className="w-12 h-12 text-slate-600" />
                                    <p className="absolute bottom-4 text-slate-500 text-xs">Camera Preview</p>
                                </div>

                                {/* Capture Controls */}
                                <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-8">
                                    <button className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                                        <ImageIcon className="w-6 h-6" />
                                    </button>
                                    <button className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center relative">
                                        <div className="w-14 h-14 bg-white rounded-full active:scale-90 transition-transform" />
                                    </button>
                                    <button className="p-3 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-colors">
                                        <Mic className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                                {['Camera', 'Video', 'Voice'].map((mode) => (
                                    <button
                                        key={mode}
                                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${mediaType === mode.toLowerCase()
                                                ? 'bg-[var(--accent-teal)] text-white'
                                                : 'bg-[var(--bg-primary)] text-[var(--text-secondary)] border border-[var(--border-subtle)]'
                                            }`}
                                        onClick={() => setMediaType(mode.toLowerCase() as any)}
                                    >
                                        {mode}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Details */}
                    {step === 'details' && (
                        <div className="space-y-6 animate-fade-in-up">
                            {/* Selected Media Preview */}
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                <div className="w-24 h-24 bg-slate-800 rounded-xl flex-shrink-0 border border-[var(--border-subtle)] relative">
                                    <img src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=200&q=80" className="w-full h-full object-cover rounded-xl opacity-60" />
                                    <div className="absolute top-1 right-1 bg-black/50 rounded-full p-1">
                                        <X className="w-3 h-3 text-white" />
                                    </div>
                                </div>
                                <button className="w-24 h-24 bg-[var(--bg-primary)] rounded-xl flex flex-col items-center justify-center border border-dashed border-slate-600 text-[var(--text-secondary)]">
                                    <Plus className="w-6 h-6 mb-1" />
                                    <span className="text-xs">Add</span>
                                </button>
                            </div>

                            {/* Description Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--text-secondary)]">Description</label>
                                <div className="relative">
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        placeholder="Describe the issue..."
                                        className="w-full bg-[var(--bg-primary)] border border-[var(--border-subtle)] rounded-xl p-4 text-[var(--text-primary)] placeholder:text-slate-600 focus:outline-none focus:border-[var(--accent-teal)] min-h-[120px] resize-none"
                                    />
                                    <button
                                        className={`absolute bottom-3 right-3 p-2 rounded-full transition-colors ${isRecording ? 'bg-red-500/20 text-red-500 animate-pulse' : 'bg-slate-800 text-slate-400'}`}
                                        onClick={toggleRecording}
                                    >
                                        <Mic className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* AI Analysis */}
                            <div className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 rounded-xl p-4 border border-indigo-500/20">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-2 text-indigo-400">
                                        <Wand2 className="w-4 h-4" />
                                        <span className="text-sm font-medium">AI Analysis</span>
                                    </div>
                                    {!showAiSuggestions && (
                                        <button
                                            onClick={analyzeContent}
                                            className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-1 rounded-md hover:bg-indigo-500/30 transition-colors"
                                        >
                                            {analyzing ? 'Analyzing...' : 'Analyze'}
                                        </button>
                                    )}
                                </div>

                                {showAiSuggestions && (
                                    <div className="space-y-3 animate-fade-in-up">
                                        <div className="flex flex-wrap gap-2">
                                            <span className="text-xs bg-indigo-500/20 text-indigo-200 px-2 py-1 rounded-md border border-indigo-500/30">Category: Road Maintenance</span>
                                            <span className="text-xs bg-indigo-500/20 text-indigo-200 px-2 py-1 rounded-md border border-indigo-500/30">Severity: High</span>
                                        </div>
                                        <div className="flex items-start gap-2 text-xs text-indigo-300/80 bg-black/20 p-2 rounded-lg">
                                            <AlertTriangle className="w-3 h-3 mt-0.5 text-amber-500" />
                                            Possible duplicate of issue #4291 reported yesterday.
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Location Preview */}
                            <div className="bg-[var(--bg-primary)] rounded-xl p-3 flex items-center gap-3 border border-[var(--border-subtle)]">
                                <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center">
                                    <MapPin className="w-5 h-5 text-[var(--accent-teal)]" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-[var(--text-primary)]">123 Main Street</p>
                                    <p className="text-xs text-[var(--text-secondary)]">New York, NY 10001</p>
                                </div>
                                <button className="text-xs text-[var(--accent-teal)] font-medium">Edit</button>
                            </div>
                        </div>
                    )}

                    {/* Step 3: Review & Priority */}
                    {step === 'review' && (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-[var(--text-secondary)]">Urgency Level</label>
                                <div className="grid grid-cols-4 gap-2">
                                    {['low', 'medium', 'high', 'critical'].map((p) => (
                                        <button
                                            key={p}
                                            onClick={() => setPriority(p as any)}
                                            className={`py-2 rounded-lg text-xs font-medium capitalize border transition-all ${priority === p
                                                    ? p === 'critical' ? 'bg-red-500/20 border-red-500 text-red-500'
                                                        : p === 'high' ? 'bg-orange-500/20 border-orange-500 text-orange-500'
                                                            : p === 'medium' ? 'bg-amber-500/20 border-amber-500 text-amber-500'
                                                                : 'bg-green-500/20 border-green-500 text-green-500'
                                                    : 'bg-[var(--bg-primary)] border-[var(--border-subtle)] text-[var(--text-secondary)]'
                                                }`}
                                        >
                                            {p}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-[var(--bg-primary)] rounded-xl p-4 border border-[var(--border-subtle)] space-y-3">
                                <h3 className="text-sm font-medium text-[var(--text-primary)]">Summary</h3>
                                <div className="flex gap-3">
                                    <img src="https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=200&q=80" className="w-16 h-16 rounded-lg object-cover" />
                                    <div>
                                        <p className="text-sm text-[var(--text-primary)] line-clamp-2">{description || 'No description provided'}</p>
                                        <p className="text-xs text-[var(--text-secondary)] mt-1">Road Maintenance • High Priority</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                </div>

                {/* Footer Actions */}
                <div className="absolute bottom-0 left-0 right-0 p-5 bg-[var(--bg-card)] border-t border-[var(--border-subtle)] safe-bottom">
                    {step === 'media' ? (
                        <button
                            onClick={handleNext}
                            className="w-full bg-[var(--accent-teal)] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-900/20 active:scale-[0.98] transition-transform"
                        >
                            Next Step
                        </button>
                    ) : step === 'details' ? (
                        <button
                            onClick={handleNext}
                            className="w-full bg-[var(--accent-teal)] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-900/20 active:scale-[0.98] transition-transform"
                        >
                            Review Report
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-[var(--accent-teal)] to-teal-500 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-teal-900/20 active:scale-[0.98] transition-transform flex items-center justify-center gap-2"
                        >
                            <Send className="w-5 h-5" />
                            Submit Report
                        </button>
                    )}
                </div>

            </div>
        </div>
    );
}
