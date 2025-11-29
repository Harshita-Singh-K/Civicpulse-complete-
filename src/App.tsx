import { useState } from 'react';
import { RoleSelection } from './components/auth/RoleSelection';
import { CitizenLogin } from './components/auth/CitizenLogin';
import { CitizenRegistration } from './components/auth/CitizenRegistration';
import { PlaceholderPortal } from './components/auth/PlaceholderPortal';
import { CSRLogin } from './components/auth/CSRLogin';
import { AuthorityLogin } from './components/auth/AuthorityLogin';
import { AuthorityDashboard } from './components/authority/AuthorityDashboard';
import { AuthorityAnalytics } from './components/authority/AuthorityAnalytics';
import { DepartmentalHeadDashboard } from './components/department/DepartmentalHeadDashboard';

// Citizen Components
import { Home } from './components/citizen/Home';
import { MapView } from './components/citizen/MapView';
import { Reels } from './components/citizen/Reels';
import { Leaderboard } from './components/citizen/Leaderboard';
import { Profile } from './components/citizen/Profile';
import { ReportIssue } from './components/citizen/ReportIssue';
import { IssueDetails } from './components/citizen/IssueDetails';

// CSR Components
import { CSRHome } from './components/csr/CSRHome';
import { CSRSponsorship } from './components/csr/CSRSponsorship';
import { CSRProjectDetails } from './components/csr/CSRProjectDetails';
import { CSRAnalytics } from './components/csr/CSRAnalytics';
import { CSRMap } from './components/csr/CSRMap';
import { CSRReels } from './components/csr/CSRReels';
import { CSRSearch } from './components/csr/CSRSearch';
import { CSRProfile } from './components/csr/CSRProfile';

import { Home as HomeIcon, Map, Video, Trophy, User, Search } from 'lucide-react';

export type Screen = 
  // Auth
  | 'role-selection' | 'citizen-login' | 'citizen-register' | 'csr-login' | 'authority-login'
  | 'worker-portal'
  // Authority
  | 'authority-dashboard' | 'authority-analytics'
  // Citizen
  | 'home' | 'map' | 'reels' | 'leaderboard' | 'profile' | 'report' | 'issue-details'
  // CSR
  | 'csr-home' | 'csr-map' | 'csr-reels' | 'csr-search' | 'csr-profile'
  | 'csr-sponsorship' | 'csr-project-details' | 'csr-analytics';

export type UserRole = 'citizen' | 'authority' | 'worker' | 'csr' | null;

export interface Issue {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  status: 'pending' | 'acknowledged' | 'in-progress' | 'resolved';
  priority: 'critical' | 'high' | 'medium' | 'low';
  upvotes: number;
  images: string[];
  reportedBy: string;
  reportedAt: string;
  timeline: Array<{
    status: string;
    timestamp: string;
    note?: string;
  }>;
  comments: Array<{
    user: string;
    text: string;
    timestamp: string;
  }>;
  proofOfWork?: {
    before: string[];
    after: string[];
  };
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('role-selection');
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedIssueId, setSelectedIssueId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    if (role === 'citizen') {
      setCurrentScreen('citizen-login');
    } else if (role === 'csr') {
      setCurrentScreen('csr-login');
    } else if (role === 'authority') {
      setCurrentScreen('authority-login');
    } else if (role === 'worker') {
      setCurrentScreen('worker-portal');
    }
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    if (userRole === 'citizen') {
      setCurrentScreen('home');
    } else if (userRole === 'csr') {
      setCurrentScreen('csr-home');
    } else if (userRole === 'authority') {
      setCurrentScreen('authority-dashboard');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
    setCurrentScreen('role-selection');
  };

  const navigateToIssue = (issueId: string) => {
    setSelectedIssueId(issueId);
    setCurrentScreen('issue-details');
  };

  const navigateToProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setCurrentScreen('csr-project-details');
  };

  const navigateBack = () => {
    if (userRole === 'citizen') {
      setCurrentScreen('home');
    } else if (userRole === 'csr') {
      setCurrentScreen('csr-home');
    }
    setSelectedIssueId(null);
    setSelectedProjectId(null);
  };

  // Auth Screens
  if (!isAuthenticated) {
    if (currentScreen === 'role-selection') {
      return <RoleSelection onRoleSelect={handleRoleSelect} />;
    }
    
    if (currentScreen === 'citizen-login') {
      return (
        <CitizenLogin
          onLogin={handleLogin}
          onRegisterClick={() => setCurrentScreen('citizen-register')}
          onBack={() => setCurrentScreen('role-selection')}
        />
      );
    }
    
    if (currentScreen === 'citizen-register') {
      return (
        <CitizenRegistration
          onRegister={handleLogin}
          onLoginClick={() => setCurrentScreen('citizen-login')}
          onBack={() => setCurrentScreen('citizen-login')}
        />
      );
    }

    if (currentScreen === 'csr-login') {
      return (
        <CSRLogin
          onLogin={handleLogin}
          onBack={() => setCurrentScreen('role-selection')}
        />
      );
    }

    if (currentScreen === 'authority-login') {
      return (
        <AuthorityLogin
          onLogin={handleLogin}
          onBack={() => setCurrentScreen('role-selection')}
        />
      );
    }

    if (currentScreen === 'worker-portal') {
      return <DepartmentalHeadDashboard onLogout={handleLogout} departmentName="Sanitation" />;
    }
  }

  // Citizen App Screens
  if (userRole === 'citizen') {
    const renderScreen = () => {
      switch (currentScreen) {
        case 'home':
          return <Home onReportClick={() => setCurrentScreen('report')} onIssueClick={navigateToIssue} />;
        case 'map':
          return <MapView onIssueClick={navigateToIssue} />;
        case 'reels':
          return <Reels />;
        case 'leaderboard':
          return <Leaderboard />;
        case 'profile':
          return <Profile onLogout={handleLogout} />;
        case 'report':
          return <ReportIssue onBack={() => setCurrentScreen('home')} />;
        case 'issue-details':
          return <IssueDetails issueId={selectedIssueId!} onBack={navigateBack} />;
        default:
          return <Home onReportClick={() => setCurrentScreen('report')} onIssueClick={navigateToIssue} />;
      }
    };

    return (
      <div className="h-screen flex flex-col bg-slate-50 max-w-md mx-auto">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>

        {currentScreen !== 'report' && currentScreen !== 'issue-details' && (
          <nav className="bg-white border-t border-slate-200 px-2 py-3 shadow-lg">
            <div className="flex justify-around items-center">
              <button
                onClick={() => setCurrentScreen('home')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  currentScreen === 'home' ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
                }`}
              >
                <HomeIcon className="w-5 h-5" />
                <span className="text-xs">Home</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('map')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  currentScreen === 'map' ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
                }`}
              >
                <Map className="w-5 h-5" />
                <span className="text-xs">Map</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('reels')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  currentScreen === 'reels' ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="text-xs">Reels</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('leaderboard')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  currentScreen === 'leaderboard' ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
                }`}
              >
                <Trophy className="w-5 h-5" />
                <span className="text-xs">Leaderboard</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('profile')}
                className={`flex flex-col items-center gap-1 px-4 py-2 rounded-lg transition-colors ${
                  currentScreen === 'profile' ? 'text-blue-600 bg-blue-50' : 'text-slate-600'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-xs">Profile</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    );
  }

  // Authority Dashboard
  if (userRole === 'authority') {
    if (currentScreen === 'authority-analytics') {
      return <AuthorityAnalytics onBack={() => setCurrentScreen('authority-dashboard')} />;
    }
    return <AuthorityDashboard onLogout={handleLogout} onNavigateToAnalytics={() => setCurrentScreen('authority-analytics')} />;
  }

  // CSR App Screens
  if (userRole === 'csr') {
    const renderScreen = () => {
      switch (currentScreen) {
        case 'csr-home':
          return <CSRHome onProjectClick={navigateToProject} onAnalyticsClick={() => setCurrentScreen('csr-analytics')} />;
        case 'csr-map':
          return <CSRMap onProjectClick={navigateToProject} />;
        case 'csr-reels':
          return <CSRReels />;
        case 'csr-search':
          return <CSRSearch onProjectClick={navigateToProject} />;
        case 'csr-profile':
          return <CSRProfile onLogout={handleLogout} />;
        case 'csr-sponsorship':
          return <CSRSponsorship onProjectClick={navigateToProject} onBack={() => setCurrentScreen('csr-home')} />;
        case 'csr-project-details':
          return <CSRProjectDetails projectId={selectedProjectId!} onBack={() => setCurrentScreen('csr-home')} />;
        case 'csr-analytics':
          return <CSRAnalytics onBack={() => setCurrentScreen('csr-home')} />;
        default:
          return <CSRHome onProjectClick={navigateToProject} onAnalyticsClick={() => setCurrentScreen('csr-analytics')} />;
      }
    };

    return (
      <div className="h-screen flex flex-col bg-slate-50 max-w-md mx-auto">
        <div className="flex-1 overflow-hidden">
          {renderScreen()}
        </div>

        {!['csr-sponsorship', 'csr-project-details', 'csr-analytics'].includes(currentScreen) && (
          <nav className="bg-white border-t border-slate-200 px-2 py-3 shadow-lg">
            <div className="flex justify-around items-center relative">
              <button
                onClick={() => setCurrentScreen('csr-map')}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  currentScreen === 'csr-map' ? 'text-green-600 bg-green-50' : 'text-slate-600'
                }`}
              >
                <Map className="w-5 h-5" />
                <span className="text-xs">Map</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('csr-reels')}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  currentScreen === 'csr-reels' ? 'text-green-600 bg-green-50' : 'text-slate-600'
                }`}
              >
                <Video className="w-5 h-5" />
                <span className="text-xs">Reels</span>
              </button>

              {/* Elevated Center Home Button */}
              <button
                onClick={() => setCurrentScreen('csr-home')}
                className={`-mt-6 w-14 h-14 rounded-full shadow-xl transition-all ${
                  currentScreen === 'csr-home' 
                    ? 'bg-gradient-to-r from-green-500 to-green-600' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600'
                }`}
              >
                <HomeIcon className="w-6 h-6 text-white mx-auto" />
              </button>
              
              <button
                onClick={() => setCurrentScreen('csr-search')}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  currentScreen === 'csr-search' ? 'text-green-600 bg-green-50' : 'text-slate-600'
                }`}
              >
                <Search className="w-5 h-5" />
                <span className="text-xs">Search</span>
              </button>
              
              <button
                onClick={() => setCurrentScreen('csr-profile')}
                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-lg transition-colors ${
                  currentScreen === 'csr-profile' ? 'text-green-600 bg-green-50' : 'text-slate-600'
                }`}
              >
                <User className="w-5 h-5" />
                <span className="text-xs">Profile</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    );
  }

  return null;
}
