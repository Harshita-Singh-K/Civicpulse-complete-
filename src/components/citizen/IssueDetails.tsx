import { ArrowLeft, ThumbsUp, Share2, MessageCircle, MapPin, Calendar, User, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { mockIssues } from './mockData';

interface IssueDetailsProps {
  issueId: string;
  onBack: () => void;
}

export function IssueDetails({ issueId, onBack }: IssueDetailsProps) {
  const issue = mockIssues.find(i => i.id === issueId);
  const [upvoted, setUpvoted] = useState(false);
  const [comment, setComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  if (!issue) {
    return <div>Issue not found</div>;
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Resolved': return 'bg-green-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Acknowledged': return 'bg-amber-500';
      default: return 'bg-slate-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Resolved': return <CheckCircle className="w-5 h-5" />;
      case 'In Progress': return <Clock className="w-5 h-5" />;
      case 'Acknowledged': return <AlertCircle className="w-5 h-5" />;
      default: return <Clock className="w-5 h-5" />;
    }
  };

  const getPriorityBadge = (priority: string) => {
    const colors = {
      critical: 'bg-red-500',
      high: 'bg-orange-500',
      medium: 'bg-amber-500',
      low: 'bg-slate-400'
    };
    return (
      <span className={`px-3 py-1 ${colors[priority as keyof typeof colors]} text-white rounded-full text-xs`}>
        {priority.toUpperCase()}
      </span>
    );
  };

  return (
    <div className="h-full flex flex-col bg-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-lg">Issue Details</h1>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Image Gallery */}
        <div className="relative">
          <img
            src={issue.images[0]}
            alt={issue.title}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-3 right-3">
            {getPriorityBadge(issue.priority)}
          </div>
        </div>

        <div className="p-4">
          {/* Title & Category */}
          <div className="mb-4">
            <h2 className="mb-2">{issue.title}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                {issue.category}
              </span>
              <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-sm flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {issue.location}
              </span>
            </div>
          </div>

          {/* Status Timeline */}
          <div className="mb-6">
            <h3 className="text-sm text-slate-600 mb-3">Progress Timeline</h3>
            <div className="space-y-3">
              {issue.timeline.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-full ${getStatusColor(item.status)} text-white flex items-center justify-center`}>
                      {getStatusIcon(item.status)}
                    </div>
                    {index < issue.timeline.length - 1 && (
                      <div className="w-0.5 h-full bg-slate-200 flex-1 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <div className="text-sm mb-1">{item.status}</div>
                    <div className="text-xs text-slate-500 mb-1">
                      {new Date(item.timestamp).toLocaleString()}
                    </div>
                    {item.note && (
                      <div className="text-xs text-slate-600 bg-slate-50 rounded-lg p-2 mt-2">
                        {item.note}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-sm text-slate-600 mb-2">Description</h3>
            <p className="text-sm text-slate-700">{issue.description}</p>
          </div>

          {/* Proof of Work - If Resolved */}
          {issue.proofOfWork && (
            <div className="mb-6">
              <h3 className="text-sm text-slate-600 mb-3">Proof of Work</h3>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="text-xs text-slate-500 mb-2">Before</div>
                  <img
                    src={issue.proofOfWork.before[0]}
                    alt="Before"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
                <div>
                  <div className="text-xs text-slate-500 mb-2">After</div>
                  <img
                    src={issue.proofOfWork.after[0]}
                    alt="After"
                    className="w-full h-32 object-cover rounded-lg"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Reporter Info */}
          <div className="mb-6 bg-slate-50 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white">
                <User className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="text-sm mb-1">Reported by</div>
                <div className="text-xs text-slate-600">{issue.reportedBy}</div>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {new Date(issue.reportedAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div className="mb-6">
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center gap-2 text-sm text-blue-600 mb-3"
            >
              <MessageCircle className="w-4 h-4" />
              {issue.comments.length} Comments
            </button>

            {showComments && (
              <div className="space-y-3">
                {issue.comments.map((comm, index) => (
                  <div key={index} className="bg-slate-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center text-xs">
                        {comm.user[0]}
                      </div>
                      <div className="text-sm">{comm.user}</div>
                      <div className="text-xs text-slate-400 ml-auto">
                        {new Date(comm.timestamp).toLocaleTimeString()}
                      </div>
                    </div>
                    <p className="text-sm text-slate-700">{comm.text}</p>
                  </div>
                ))}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 px-4 py-2 border border-slate-200 rounded-lg outline-none focus:border-blue-500 text-sm"
                  />
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors">
                    Post
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="border-t border-slate-200 px-4 py-3 bg-white">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setUpvoted(!upvoted)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all ${
              upvoted
                ? 'bg-blue-600 text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <ThumbsUp className="w-5 h-5" />
            <span className="text-sm">
              {upvoted ? 'Upvoted' : 'Upvote'} ({issue.upvotes + (upvoted ? 1 : 0)})
            </span>
          </button>

          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl hover:bg-slate-200 transition-colors">
            <Share2 className="w-5 h-5" />
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
}
