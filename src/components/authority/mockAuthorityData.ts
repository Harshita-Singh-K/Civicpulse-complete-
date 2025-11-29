export interface Complaint {
  id: string;
  title: string;
  category: 'Water & Sewage' | 'Road Maintenance' | 'Sanitation' | 'Street Lighting' | 'Parks & Greenery';
  status: 'Reported' | 'Assigned' | 'In Progress' | 'Resolved';
  location: string;
  area: string;
  timeOpen: string;
  votes: number;
  aiPriority: number;
  description: string;
  images: string[];
  reportedBy: string;
  reportedAt: string;
  assignedTo?: string;
  lat: number;
  lng: number;
}

export const mockComplaints: Complaint[] = [
  {
    id: 'C001',
    title: 'Sewage overflow blocking main road',
    category: 'Water & Sewage',
    status: 'Assigned',
    location: 'MG Road, Sector 14',
    area: 'Bandra West',
    timeOpen: '3d 0h',
    votes: 142,
    aiPriority: 95,
    description: 'Major sewage overflow causing road blockage and health hazard. Requires immediate attention from sanitation team.',
    images: ['https://images.unsplash.com/photo-1582719366961-bdf1f9aef653?w=800&q=80'],
    reportedBy: 'Rahul Sharma',
    reportedAt: '2025-11-26T08:30:00Z',
    assignedTo: 'Worker Team A',
    lat: 19.0596,
    lng: 72.8295
  },
  {
    id: 'C002',
    title: 'Multiple potholes on residential street',
    category: 'Road Maintenance',
    status: 'In Progress',
    location: 'Link Road, Block C',
    area: 'Andheri East',
    timeOpen: '1d 12h',
    votes: 89,
    aiPriority: 82,
    description: 'Several large potholes causing traffic issues and vehicle damage. Road repair needed urgently.',
    images: ['https://images.unsplash.com/photo-1581094271901-8022df4466f9?w=800&q=80'],
    reportedBy: 'Priya Patel',
    reportedAt: '2025-11-27T14:20:00Z',
    assignedTo: 'Worker Team B',
    lat: 19.1136,
    lng: 72.8697
  },
  {
    id: 'C003',
    title: 'Garbage not collected for 5 days',
    category: 'Sanitation',
    status: 'Reported',
    location: 'SV Road, Zone 3',
    area: 'Malad West',
    timeOpen: '5d 4h',
    votes: 203,
    aiPriority: 88,
    description: 'Waste accumulation causing unhygienic conditions. Multiple residents affected. Urgent collection required.',
    images: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&q=80'],
    reportedBy: 'Amit Kumar',
    reportedAt: '2025-11-24T10:15:00Z',
    lat: 19.1864,
    lng: 72.8493
  },
  {
    id: 'C004',
    title: 'Street lights not working - safety concern',
    category: 'Street Lighting',
    status: 'Assigned',
    location: 'Station Road, Near Park',
    area: 'Borivali West',
    timeOpen: '2d 8h',
    votes: 67,
    aiPriority: 76,
    description: 'Multiple street lights out in residential area creating safety hazard during night hours.',
    images: ['https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?w=800&q=80'],
    reportedBy: 'Sneha Desai',
    reportedAt: '2025-11-26T18:45:00Z',
    assignedTo: 'Electrical Team 1',
    lat: 19.2403,
    lng: 72.8576
  },
  {
    id: 'C005',
    title: 'Park equipment damaged and unsafe',
    category: 'Parks & Greenery',
    status: 'Reported',
    location: 'Central Park, Gate 2',
    area: 'Kandivali East',
    timeOpen: '6h 30m',
    votes: 34,
    aiPriority: 54,
    description: 'Playground swings broken, poses danger to children. Repair or replacement needed.',
    images: ['https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&q=80'],
    reportedBy: 'Meera Singh',
    reportedAt: '2025-11-28T17:00:00Z',
    lat: 19.2074,
    lng: 72.8777
  },
  {
    id: 'C006',
    title: 'Water pipeline burst flooding street',
    category: 'Water & Sewage',
    status: 'In Progress',
    location: 'Pipeline Road, Junction',
    area: 'Goregaon West',
    timeOpen: '8h 15m',
    votes: 178,
    aiPriority: 92,
    description: 'Major water pipeline burst causing street flooding. Emergency repair in progress.',
    images: ['https://images.unsplash.com/photo-1582719366961-bdf1f9aef653?w=800&q=80'],
    reportedBy: 'Vikram Joshi',
    reportedAt: '2025-11-28T15:30:00Z',
    assignedTo: 'Emergency Water Team',
    lat: 19.1663,
    lng: 72.8526
  }
];
