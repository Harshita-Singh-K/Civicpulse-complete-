import { Trophy, Medal, Star, TrendingUp, Award } from 'lucide-react';
import { mockLeaderboard } from './mockData';

export function Leaderboard() {
  const currentUser = {
    rank: 15,
    name: 'You',
    points: 620,
    badge: '⭐',
    reports: 10,
    resolved: 8
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-amber-50 to-slate-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-6">
        <h1 className="text-2xl mb-1">Leaderboard</h1>
        <p className="text-amber-100 text-sm">Top civic contributors this month</p>
      </div>

      {/* Your Rank Card */}
      <div className="px-4 py-4 -mt-6 relative z-10">
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-sm text-blue-100 mb-1">Your Rank</div>
              <div className="text-3xl">#{currentUser.rank}</div>
            </div>
            <div className="text-4xl">{currentUser.badge}</div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl mb-1">{currentUser.points}</div>
              <div className="text-xs text-blue-100">Points</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl mb-1">{currentUser.reports}</div>
              <div className="text-xs text-blue-100">Reports</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl mb-1">{currentUser.resolved}</div>
              <div className="text-xs text-blue-100">Resolved</div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="px-4 mb-4">
        <h2 className="text-sm text-slate-600 mb-3">Your Badges</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md text-center min-w-[80px]">
            <div className="text-2xl mb-1">🎯</div>
            <div className="text-xs">First Report</div>
          </div>
          <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md text-center min-w-[80px]">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs">Quick Reporter</div>
          </div>
          <div className="flex-shrink-0 bg-white rounded-xl p-3 shadow-md text-center min-w-[80px]">
            <div className="text-2xl mb-1">👥</div>
            <div className="text-xs">Community Hero</div>
          </div>
          <div className="flex-shrink-0 bg-slate-100 rounded-xl p-3 text-center min-w-[80px] opacity-50">
            <div className="text-2xl mb-1">🏆</div>
            <div className="text-xs">Top 10</div>
          </div>
          <div className="flex-shrink-0 bg-slate-100 rounded-xl p-3 text-center min-w-[80px] opacity-50">
            <div className="text-2xl mb-1">💎</div>
            <div className="text-xs">Champion</div>
          </div>
        </div>
      </div>

      {/* Top 3 Podium */}
      <div className="px-4 mb-4">
        <h2 className="text-sm text-slate-600 mb-3">Top Contributors</h2>
        <div className="flex items-end justify-center gap-2 mb-4">
          {/* 2nd Place */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-slate-300 to-slate-400 rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
              <Medal className="w-8 h-8" />
            </div>
            <div className="text-xs mb-1">{mockLeaderboard[1].name}</div>
            <div className="bg-slate-300 rounded-t-xl py-6 px-2">
              <div className="text-2xl mb-1">🥈</div>
              <div className="text-sm">{mockLeaderboard[1].points}</div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex-1 text-center">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center text-white mb-2 shadow-xl">
              <Trophy className="w-10 h-10" />
            </div>
            <div className="text-xs mb-1">{mockLeaderboard[0].name}</div>
            <div className="bg-amber-400 rounded-t-xl py-8 px-2">
              <div className="text-3xl mb-1">🏆</div>
              <div>{mockLeaderboard[0].points}</div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex-1 text-center">
            <div className="w-16 h-16 mx-auto bg-gradient-to-br from-orange-400 to-orange-500 rounded-full flex items-center justify-center text-white mb-2 shadow-lg">
              <Award className="w-8 h-8" />
            </div>
            <div className="text-xs mb-1">{mockLeaderboard[2].name}</div>
            <div className="bg-orange-400 rounded-t-xl py-4 px-2">
              <div className="text-2xl mb-1">🥉</div>
              <div className="text-sm">{mockLeaderboard[2].points}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {mockLeaderboard.slice(3).map((user, index) => (
            <div
              key={user.rank}
              className="flex items-center gap-3 p-4 border-b border-slate-100 last:border-b-0 hover:bg-slate-50 transition-colors"
            >
              <div className="w-8 text-center text-slate-500">
                #{user.rank}
              </div>
              
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                {user.name[0]}
              </div>

              <div className="flex-1">
                <div className="text-sm mb-1">{user.name}</div>
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span>{user.reports} reports</span>
                  <span>•</span>
                  <span>{user.resolved} resolved</span>
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm text-blue-600 mb-1">{user.points}</div>
                <div className="text-xs text-slate-400">points</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Points Legend */}
      <div className="px-4 py-3 bg-white border-t border-slate-200">
        <div className="text-xs text-slate-600 mb-2">How to earn points:</div>
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
            <span className="text-slate-600">Report issue: +50</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full" />
            <span className="text-slate-600">Issue resolved: +100</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-purple-500 rounded-full" />
            <span className="text-slate-600">Upvote: +5</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <span className="text-slate-600">Comment: +10</span>
          </div>
        </div>
      </div>
    </div>
  );
}
