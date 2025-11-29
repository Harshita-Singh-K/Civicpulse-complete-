import { Issue } from '../../App';

export const mockIssues: Issue[] = [
  {
    id: '1',
    title: 'Pothole on Main Street causing accidents',
    category: 'Road Maintenance',
    description: 'Large pothole near the intersection of Main St and 5th Ave. Multiple vehicles have been damaged. Urgent repair needed.',
    location: 'Main St & 5th Ave',
    lat: 40.7128,
    lng: -74.0060,
    status: 'in-progress',
    priority: 'critical',
    upvotes: 127,
    images: ['https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80'],
    reportedBy: 'Sarah Johnson',
    reportedAt: '2025-11-25T10:30:00Z',
    timeline: [
      { status: 'Submitted', timestamp: '2025-11-25T10:30:00Z' },
      { status: 'Acknowledged', timestamp: '2025-11-25T14:15:00Z', note: 'Issue verified by inspection team' },
      { status: 'In Progress', timestamp: '2025-11-27T09:00:00Z', note: 'Repair crew assigned' }
    ],
    comments: [
      { user: 'Mike Davis', text: 'This has been a problem for weeks! Thank you for reporting.', timestamp: '2025-11-25T11:00:00Z' },
      { user: 'City Worker #4521', text: 'Repair scheduled for this week.', timestamp: '2025-11-26T08:30:00Z' }
    ]
  },
  {
    id: '2',
    title: 'Broken street light creating safety hazard',
    category: 'Street Lighting',
    description: 'Street light at the corner of Oak Avenue has been out for 2 weeks. Area is very dark at night.',
    location: 'Oak Ave & 12th St',
    lat: 40.7180,
    lng: -74.0120,
    status: 'acknowledged',
    priority: 'high',
    upvotes: 89,
    images: ['https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=800&q=80'],
    reportedBy: 'John Smith',
    reportedAt: '2025-11-26T18:45:00Z',
    timeline: [
      { status: 'Submitted', timestamp: '2025-11-26T18:45:00Z' },
      { status: 'Acknowledged', timestamp: '2025-11-27T09:00:00Z', note: 'Assigned to electrical maintenance team' }
    ],
    comments: [
      { user: 'Emma Wilson', text: 'Same issue on the next block too!', timestamp: '2025-11-26T19:30:00Z' }
    ]
  },
  {
    id: '3',
    title: 'Illegal dumping in community park',
    category: 'Waste Management',
    description: 'Large amount of construction debris dumped in Green Valley Park. Needs immediate cleanup.',
    location: 'Green Valley Park',
    lat: 40.7200,
    lng: -74.0100,
    status: 'resolved',
    priority: 'high',
    upvotes: 156,
    images: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80'],
    reportedBy: 'Maria Garcia',
    reportedAt: '2025-11-20T12:00:00Z',
    timeline: [
      { status: 'Submitted', timestamp: '2025-11-20T12:00:00Z' },
      { status: 'Acknowledged', timestamp: '2025-11-20T15:30:00Z' },
      { status: 'In Progress', timestamp: '2025-11-21T08:00:00Z', note: 'Cleanup crew dispatched' },
      { status: 'Resolved', timestamp: '2025-11-22T16:00:00Z', note: 'Area cleaned and inspected' }
    ],
    comments: [
      { user: 'Tom Anderson', text: 'Great work by the cleanup team!', timestamp: '2025-11-22T17:00:00Z' }
    ],
    proofOfWork: {
      before: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80'],
      after: ['https://images.unsplash.com/photo-1510832198440-a52376950479?w=800&q=80']
    }
  },
  {
    id: '4',
    title: 'Graffiti on public building walls',
    category: 'Vandalism',
    description: 'Extensive graffiti vandalism on the walls of City Library. Needs professional cleaning.',
    location: 'City Library, Downtown',
    lat: 40.7150,
    lng: -74.0080,
    status: 'pending',
    priority: 'medium',
    upvotes: 45,
    images: ['https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80'],
    reportedBy: 'Lisa Chen',
    reportedAt: '2025-11-28T09:15:00Z',
    timeline: [
      { status: 'Submitted', timestamp: '2025-11-28T09:15:00Z' }
    ],
    comments: []
  },
  {
    id: '5',
    title: 'Water main leak flooding sidewalk',
    category: 'Water & Sewage',
    description: 'Major water leak on Elm Street causing flooding on sidewalk and road.',
    location: 'Elm St & 3rd Ave',
    lat: 40.7160,
    lng: -74.0090,
    status: 'in-progress',
    priority: 'critical',
    upvotes: 203,
    images: ['https://images.unsplash.com/photo-1582719366961-bdf1f9aef653?w=800&q=80'],
    reportedBy: 'Robert Kim',
    reportedAt: '2025-11-27T07:30:00Z',
    timeline: [
      { status: 'Submitted', timestamp: '2025-11-27T07:30:00Z' },
      { status: 'Acknowledged', timestamp: '2025-11-27T07:45:00Z', note: 'Emergency crew notified' },
      { status: 'In Progress', timestamp: '2025-11-27T08:30:00Z', note: 'Water main repair in progress' }
    ],
    comments: [
      { user: 'City Water Dept', text: 'Water shut off to affected area. Repair underway.', timestamp: '2025-11-27T08:45:00Z' }
    ]
  },
  {
    id: '6',
    title: 'Overgrown trees blocking traffic signals',
    category: 'Parks & Greenery',
    description: 'Large tree branches blocking view of traffic lights at intersection.',
    location: 'Pine St & 8th Ave',
    lat: 40.7190,
    lng: -74.0110,
    status: 'acknowledged',
    priority: 'medium',
    upvotes: 67,
    images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&q=80'],
    reportedBy: 'David Wong',
    reportedAt: '2025-11-26T14:20:00Z',
    timeline: [
      { status: 'Submitted', timestamp: '2025-11-26T14:20:00Z' },
      { status: 'Acknowledged', timestamp: '2025-11-27T10:00:00Z', note: 'Scheduled for tree trimming crew' }
    ],
    comments: []
  }
];

export const mockReels = [
  {
    id: 'r1',
    title: 'How to Report Issues Effectively',
    thumbnail: 'https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400&q=80',
    duration: '0:45',
    views: '12.5K',
    likes: 892
  },
  {
    id: 'r2',
    title: 'Community Cleanup Success Story',
    thumbnail: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80',
    duration: '1:20',
    views: '8.3K',
    likes: 654
  },
  {
    id: 'r3',
    title: 'Water Conservation Tips',
    thumbnail: 'https://images.unsplash.com/photo-1548267049-f196ae15c7f3?w=400&q=80',
    duration: '1:05',
    views: '15.2K',
    likes: 1203
  },
  {
    id: 'r4',
    title: 'Recycling Best Practices',
    thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80',
    duration: '0:55',
    views: '9.7K',
    likes: 723
  }
];

export const mockLeaderboard = [
  { rank: 1, name: 'Sarah Johnson', points: 2850, badge: '🏆', reports: 47, resolved: 42 },
  { rank: 2, name: 'Mike Davis', points: 2340, badge: '🥈', reports: 38, resolved: 35 },
  { rank: 3, name: 'Emma Wilson', points: 2120, badge: '🥉', reports: 35, resolved: 31 },
  { rank: 4, name: 'John Smith', points: 1890, badge: '⭐', reports: 31, resolved: 28 },
  { rank: 5, name: 'Maria Garcia', points: 1650, badge: '⭐', reports: 27, resolved: 24 },
  { rank: 6, name: 'Tom Anderson', points: 1420, badge: '⭐', reports: 23, resolved: 21 },
  { rank: 7, name: 'Lisa Chen', points: 1280, badge: '⭐', reports: 21, resolved: 19 },
  { rank: 8, name: 'Robert Kim', points: 1150, badge: '⭐', reports: 19, resolved: 17 },
  { rank: 9, name: 'David Wong', points: 980, badge: '⭐', reports: 16, resolved: 14 },
  { rank: 10, name: 'Anna Martinez', points: 850, badge: '⭐', reports: 14, resolved: 12 }
];
