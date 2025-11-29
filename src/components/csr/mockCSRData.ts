export interface CSRProject {
  id: string;
  title: string;
  category: string;
  description: string;
  location: string;
  lat: number;
  lng: number;
  status: 'active' | 'completed' | 'upcoming' | 'sponsored';
  totalCost: number;
  amountRaised: number;
  amountRemaining: number;
  images: string[];
  sponsor?: string;
  timeline: Array<{
    milestone: string;
    status: 'completed' | 'in-progress' | 'pending';
    date: string;
  }>;
  impact: string[];
  updates: Array<{
    date: string;
    title: string;
    description: string;
    images?: string[];
  }>;
}

export const mockCSRProjects: CSRProject[] = [
  {
    id: 'p1',
    title: 'Community Park Renovation',
    category: 'Parks & Recreation',
    description: 'Complete renovation of Green Valley Park including new playground equipment, landscaping, walking paths, and outdoor fitness area for community wellness.',
    location: 'Green Valley, District 5',
    lat: 40.7200,
    lng: -74.0100,
    status: 'active',
    totalCost: 50000,
    amountRaised: 35000,
    amountRemaining: 15000,
    images: ['https://images.unsplash.com/photo-1510832198440-a52376950479?w=800&q=80'],
    timeline: [
      { milestone: 'Site Survey & Planning', status: 'completed', date: '2025-10-15' },
      { milestone: 'Equipment Procurement', status: 'completed', date: '2025-11-01' },
      { milestone: 'Installation & Construction', status: 'in-progress', date: '2025-11-15' },
      { milestone: 'Final Inspection', status: 'pending', date: '2025-12-10' }
    ],
    impact: [
      'Serves 5,000+ residents in the community',
      'Promotes health and wellness activities',
      'Creates safe play area for 200+ children',
      'Reduces urban heat island effect'
    ],
    updates: [
      {
        date: '2025-11-25',
        title: 'Playground Equipment Installed',
        description: 'New swings, slides, and climbing structures have been successfully installed.',
        images: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80']
      }
    ]
  },
  {
    id: 'p2',
    title: 'Street Lighting Infrastructure',
    category: 'Public Safety',
    description: 'Installation of energy-efficient LED street lights in underserved neighborhoods to improve safety and reduce crime rates.',
    location: 'Oak Avenue Area',
    lat: 40.7180,
    lng: -74.0120,
    status: 'upcoming',
    totalCost: 75000,
    amountRaised: 0,
    amountRemaining: 75000,
    images: ['https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=800&q=80'],
    timeline: [
      { milestone: 'Project Approval', status: 'pending', date: '2025-12-01' },
      { milestone: 'Contractor Selection', status: 'pending', date: '2025-12-15' },
      { milestone: 'Installation Phase 1', status: 'pending', date: '2026-01-10' },
      { milestone: 'Installation Phase 2', status: 'pending', date: '2026-02-01' }
    ],
    impact: [
      'Covers 15 km of residential streets',
      'Improves safety for 8,000+ residents',
      '60% reduction in energy consumption',
      'Estimated 40% reduction in nighttime incidents'
    ],
    updates: []
  },
  {
    id: 'p3',
    title: 'Water Distribution System Upgrade',
    category: 'Water & Sanitation',
    description: 'Replacement of aging water pipes and installation of modern filtration systems to provide clean drinking water to underserved communities.',
    location: 'Riverside District',
    lat: 40.7150,
    lng: -74.0080,
    status: 'active',
    totalCost: 120000,
    amountRaised: 80000,
    amountRemaining: 40000,
    images: ['https://images.unsplash.com/photo-1582719366961-bdf1f9aef653?w=800&q=80'],
    sponsor: 'TechCorp Foundation',
    timeline: [
      { milestone: 'Infrastructure Assessment', status: 'completed', date: '2025-09-01' },
      { milestone: 'Pipe Replacement Phase 1', status: 'completed', date: '2025-10-15' },
      { milestone: 'Filtration System Installation', status: 'in-progress', date: '2025-11-20' },
      { milestone: 'Testing & Commissioning', status: 'pending', date: '2025-12-15' }
    ],
    impact: [
      'Provides clean water to 12,000 residents',
      'Reduces waterborne diseases by 80%',
      'Decreases water wastage by 30%',
      'Creates 15 local employment opportunities'
    ],
    updates: [
      {
        date: '2025-11-20',
        title: 'Filtration System 50% Complete',
        description: 'Modern filtration units are being installed. Water quality testing shows promising results.',
        images: ['https://images.unsplash.com/photo-1548267049-f196ae15c7f3?w=800&q=80']
      }
    ]
  },
  {
    id: 'p4',
    title: 'Road Repair & Resurfacing',
    category: 'Infrastructure',
    description: 'Comprehensive road repair project covering major potholes, resurfacing damaged roads, and improving drainage systems.',
    location: 'Main Street Corridor',
    lat: 40.7128,
    lng: -74.0060,
    status: 'sponsored',
    totalCost: 95000,
    amountRaised: 95000,
    amountRemaining: 0,
    images: ['https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80'],
    sponsor: 'GreenTech Industries',
    timeline: [
      { milestone: 'Road Assessment', status: 'completed', date: '2025-10-01' },
      { milestone: 'Drainage Installation', status: 'completed', date: '2025-10-20' },
      { milestone: 'Road Resurfacing', status: 'in-progress', date: '2025-11-15' },
      { milestone: 'Final Quality Check', status: 'pending', date: '2025-12-01' }
    ],
    impact: [
      'Repairs 8 km of critical road infrastructure',
      'Reduces vehicle damage and accidents',
      'Improves traffic flow for 25,000 daily commuters',
      'Enhances emergency vehicle access'
    ],
    updates: [
      {
        date: '2025-11-27',
        title: 'Resurfacing 70% Complete',
        description: 'Major sections of Main Street have been resurfaced. Quality inspections passed.',
        images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80']
      }
    ]
  },
  {
    id: 'p5',
    title: 'Community Education Center',
    category: 'Education',
    description: 'Construction of a community learning center with digital library, computer lab, and skill development classrooms for underprivileged youth.',
    location: 'Downtown Community Hub',
    lat: 40.7160,
    lng: -74.0090,
    status: 'upcoming',
    totalCost: 150000,
    amountRaised: 45000,
    amountRemaining: 105000,
    images: ['https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80'],
    timeline: [
      { milestone: 'Land Acquisition', status: 'completed', date: '2025-11-01' },
      { milestone: 'Architectural Design', status: 'in-progress', date: '2025-11-30' },
      { milestone: 'Construction Phase', status: 'pending', date: '2026-01-15' },
      { milestone: 'Equipment Setup', status: 'pending', date: '2026-03-01' }
    ],
    impact: [
      'Educational facility for 500+ students',
      'Free digital skills training programs',
      'Community library with 5,000+ books',
      'Creates 10 teaching positions'
    ],
    updates: []
  },
  {
    id: 'p6',
    title: 'Waste Management & Recycling',
    category: 'Environment',
    description: 'Establish community recycling center and implement door-to-door waste segregation program to promote sustainable waste management.',
    location: 'Citywide Initiative',
    lat: 40.7190,
    lng: -74.0110,
    status: 'completed',
    totalCost: 60000,
    amountRaised: 60000,
    amountRemaining: 0,
    images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80'],
    sponsor: 'EcoWorld Foundation',
    timeline: [
      { milestone: 'Recycling Center Setup', status: 'completed', date: '2025-08-15' },
      { milestone: 'Staff Training', status: 'completed', date: '2025-09-01' },
      { milestone: 'Door-to-Door Program Launch', status: 'completed', date: '2025-09-15' },
      { milestone: 'Impact Assessment', status: 'completed', date: '2025-11-15' }
    ],
    impact: [
      'Reduced landfill waste by 45%',
      'Recycling 12 tons of materials monthly',
      'Created 20 green jobs',
      'Environmental awareness for 30,000 households'
    ],
    updates: [
      {
        date: '2025-11-15',
        title: 'Project Completed Successfully',
        description: 'Recycling center is fully operational. Program has exceeded waste reduction targets.',
        images: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80']
      }
    ]
  }
];

export const mockCSRReels = [
  {
    id: 'cr1',
    title: 'Park Renovation Before & After',
    thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80',
    duration: '1:15',
    views: '18.3K',
    likes: 1542,
    category: 'Success Story'
  },
  {
    id: 'cr2',
    title: 'Clean Water Initiative Impact',
    thumbnail: 'https://images.unsplash.com/photo-1548267049-f196ae15c7f3?w=400&q=80',
    duration: '1:45',
    views: '22.1K',
    likes: 1876,
    category: 'Impact Story'
  },
  {
    id: 'cr3',
    title: 'Community Thanks CSR Partners',
    thumbnail: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80',
    duration: '0:58',
    views: '15.7K',
    likes: 1234,
    category: 'Testimonial'
  },
  {
    id: 'cr4',
    title: 'Road Infrastructure Progress',
    thumbnail: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&q=80',
    duration: '1:20',
    views: '12.4K',
    likes: 987,
    category: 'Progress Update'
  }
];
