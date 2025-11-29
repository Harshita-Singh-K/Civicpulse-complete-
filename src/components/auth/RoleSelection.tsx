import { Users, Building2, HardHat, Heart } from 'lucide-react';
import { UserRole } from '../../App';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const roles = [
    {
      id: 'citizen' as UserRole,
      title: 'Citizen',
      description: 'Report & track civic issues',
      icon: Users,
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      id: 'authority' as UserRole,
      title: 'Municipal Authority',
      description: 'Monitor & manage complaints',
      icon: Building2,
      gradient: 'from-purple-500 to-purple-600',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    },
    {
      id: 'worker' as UserRole,
      title: 'Departmental Head',
      description: 'Execute & complete tasks',
      icon: HardHat,
      gradient: 'from-amber-500 to-amber-600',
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600'
    },
    {
      id: 'csr' as UserRole,
      title: 'CSR / NGO',
      description: 'Sponsor civic projects',
      icon: Heart,
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    }
  ];

  return (
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="px-6 pt-12 pb-8 text-center">
        <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center shadow-xl">
          <span className="text-4xl">🏛️</span>
        </div>
        <h1 className="text-3xl mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          CivicPulse
        </h1>
        <p className="text-slate-600">Choose your login role</p>
      </div>

      {/* Role Cards */}
      <div className="flex-1 px-6 pb-8 overflow-y-auto">
        <div className="grid gap-4 max-w-2xl mx-auto">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => onRoleSelect(role.id)}
                className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] active:scale-[0.98] border-2 border-transparent hover:border-blue-200"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-16 h-16 ${role.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-8 h-8 ${role.iconColor}`} />
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="mb-1 group-hover:text-blue-600 transition-colors">
                      {role.title}
                    </h3>
                    <p className="text-sm text-slate-600">{role.description}</p>
                  </div>
                  <div className="text-slate-400 group-hover:text-blue-600 transition-colors">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 mb-2">Building better communities together</p>
          <div className="flex items-center justify-center gap-4 text-xs text-slate-400">
            <button className="hover:text-blue-600 transition-colors">Terms</button>
            <span>•</span>
            <button className="hover:text-blue-600 transition-colors">Privacy</button>
            <span>•</span>
            <button className="hover:text-blue-600 transition-colors">Help</button>
          </div>
        </div>
      </div>
    </div>
  );
}
