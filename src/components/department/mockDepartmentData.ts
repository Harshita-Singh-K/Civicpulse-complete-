export interface Worker {
  id: string;
  name: string;
  team: string;
  distance: string;
  slaCompliance: number;
  currentTasks: number;
  maxTasks: number;
  status: 'Available' | 'Busy' | 'Offline';
  skillType: string;
  zone: string;
  completedToday: number;
  rating: number;
  phone: string;
  location: { lat: number; lng: number };
}

export interface DepartmentComplaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  location: string;
  ward: string;
  zone: string;
  reportedBy: string;
  reportedAt: string;
  timeOpen: string;
  slaDeadline: string;
  slaHoursLeft: number;
  status: 'Unassigned' | 'Assigned' | 'In Progress' | 'Completed';
  assignedTo?: string;
  images: string[];
  votes: number;
  coordinates: { lat: number; lng: number };
  timeline?: Array<{
    stage: string;
    timestamp: string;
    notes?: string;
  }>;
}

export const mockWorkers: Worker[] = [
  {
    id: 'W001',
    name: 'Ramesh Kumar',
    team: 'Sanitation Team A',
    distance: '1.2 km',
    slaCompliance: 96,
    currentTasks: 1,
    maxTasks: 3,
    status: 'Available',
    skillType: 'Waste Collection',
    zone: 'Zone A - North',
    completedToday: 4,
    rating: 4.8,
    phone: '+91-9876543001',
    location: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'W002',
    name: 'Suresh Patil',
    team: 'Sanitation Team B',
    distance: '3.5 km',
    slaCompliance: 89,
    currentTasks: 3,
    maxTasks: 3,
    status: 'Busy',
    skillType: 'Drain Cleaning',
    zone: 'Zone B - South',
    completedToday: 3,
    rating: 4.5,
    phone: '+91-9876543002',
    location: { lat: 19.0660, lng: 72.8680 }
  },
  {
    id: 'W003',
    name: 'Vijay Deshmukh',
    team: 'Sanitation Team A',
    distance: '0.8 km',
    slaCompliance: 98,
    currentTasks: 0,
    maxTasks: 3,
    status: 'Available',
    skillType: 'Street Cleaning',
    zone: 'Zone A - North',
    completedToday: 5,
    rating: 4.9,
    phone: '+91-9876543003',
    location: { lat: 19.0800, lng: 72.8800 }
  },
  {
    id: 'W004',
    name: 'Ganesh Yadav',
    team: 'Sanitation Team C',
    distance: '2.1 km',
    slaCompliance: 92,
    currentTasks: 2,
    maxTasks: 3,
    status: 'Available',
    skillType: 'Waste Collection',
    zone: 'Zone C - East',
    completedToday: 3,
    rating: 4.6,
    phone: '+91-9876543004',
    location: { lat: 19.0700, lng: 72.8900 }
  },
  {
    id: 'W005',
    name: 'Prakash Sharma',
    team: 'Sanitation Team B',
    distance: '5.2 km',
    slaCompliance: 85,
    currentTasks: 0,
    maxTasks: 3,
    status: 'Offline',
    skillType: 'Street Cleaning',
    zone: 'Zone D - West',
    completedToday: 0,
    rating: 4.3,
    phone: '+91-9876543005',
    location: { lat: 19.0600, lng: 72.8600 }
  },
  {
    id: 'W006',
    name: 'Ashok Jadhav',
    team: 'Sanitation Team C',
    distance: '1.9 km',
    slaCompliance: 94,
    currentTasks: 1,
    maxTasks: 3,
    status: 'Available',
    skillType: 'Drain Cleaning',
    zone: 'Zone B - South',
    completedToday: 4,
    rating: 4.7,
    phone: '+91-9876543006',
    location: { lat: 19.0720, lng: 72.8750 }
  }
];

export const mockDepartmentComplaints: DepartmentComplaint[] = [
  {
    id: 'DH-1001',
    title: 'Overflowing garbage bins near market',
    description: 'Multiple garbage bins are overflowing near the main market area. The waste is spilling onto the street causing hygiene issues.',
    category: 'Sanitation',
    priority: 'Critical',
    location: 'MG Road, Market Junction',
    ward: 'Ward 12',
    zone: 'Zone A - North',
    reportedBy: 'Anjali Mehta',
    reportedAt: '2024-01-15T08:30:00',
    timeOpen: '4h 30m',
    slaDeadline: '2024-01-15T20:00:00',
    slaHoursLeft: 7.5,
    status: 'Unassigned',
    images: ['https://images.unsplash.com/photo-1530587191325-3db32d826c18?w=800'],
    votes: 87,
    coordinates: { lat: 19.0760, lng: 72.8777 }
  },
  {
    id: 'DH-1002',
    title: 'Blocked drain causing water stagnation',
    description: 'The drain is completely blocked with garbage and debris. Water is accumulating on the road.',
    category: 'Sanitation',
    priority: 'High',
    location: 'Station Road, Near Bus Stand',
    ward: 'Ward 8',
    zone: 'Zone B - South',
    reportedBy: 'Rahul Verma',
    reportedAt: '2024-01-15T09:15:00',
    timeOpen: '3h 45m',
    slaDeadline: '2024-01-16T09:15:00',
    slaHoursLeft: 20.75,
    status: 'Assigned',
    assignedTo: 'Ramesh Kumar',
    images: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800'],
    votes: 54,
    coordinates: { lat: 19.0700, lng: 72.8700 },
    timeline: [
      { stage: 'Reported', timestamp: '2024-01-15T09:15:00' },
      { stage: 'Assigned to Worker', timestamp: '2024-01-15T10:00:00', notes: 'Assigned to Ramesh Kumar' }
    ]
  },
  {
    id: 'DH-1003',
    title: 'Street sweeping required urgently',
    description: 'Post-festival cleanup needed. The entire street is littered with waste materials.',
    category: 'Sanitation',
    priority: 'High',
    location: 'Temple Street, Old City',
    ward: 'Ward 5',
    zone: 'Zone A - North',
    reportedBy: 'Priya Singh',
    reportedAt: '2024-01-15T07:00:00',
    timeOpen: '6h',
    slaDeadline: '2024-01-15T19:00:00',
    slaHoursLeft: 6,
    status: 'In Progress',
    assignedTo: 'Vijay Deshmukh',
    images: ['https://images.unsplash.com/photo-1604187351574-c75ca79f5807?w=800'],
    votes: 102,
    coordinates: { lat: 19.0800, lng: 72.8800 },
    timeline: [
      { stage: 'Reported', timestamp: '2024-01-15T07:00:00' },
      { stage: 'Assigned to Worker', timestamp: '2024-01-15T08:30:00', notes: 'Assigned to Vijay Deshmukh' },
      { stage: 'Worker Accepted', timestamp: '2024-01-15T08:45:00' },
      { stage: 'Worker Arrived', timestamp: '2024-01-15T09:30:00' },
      { stage: 'Work Started', timestamp: '2024-01-15T09:45:00' }
    ]
  },
  {
    id: 'DH-1004',
    title: 'Dead animal removal required',
    description: 'A dead animal is lying on the roadside. Immediate removal is required for hygiene.',
    category: 'Sanitation',
    priority: 'Critical',
    location: 'Highway Service Road',
    ward: 'Ward 15',
    zone: 'Zone C - East',
    reportedBy: 'Mohit Khanna',
    reportedAt: '2024-01-15T11:00:00',
    timeOpen: '2h',
    slaDeadline: '2024-01-15T17:00:00',
    slaHoursLeft: 4,
    status: 'Unassigned',
    images: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800'],
    votes: 65,
    coordinates: { lat: 19.0650, lng: 72.8900 }
  },
  {
    id: 'DH-1005',
    title: 'Public toilet cleaning needed',
    description: 'The public toilet is in very poor condition and needs immediate cleaning and sanitization.',
    category: 'Sanitation',
    priority: 'Medium',
    location: 'City Park, Main Gate',
    ward: 'Ward 10',
    zone: 'Zone B - South',
    reportedBy: 'Neha Kapoor',
    reportedAt: '2024-01-14T16:30:00',
    timeOpen: '20h 30m',
    slaDeadline: '2024-01-15T16:30:00',
    slaHoursLeft: -4,
    status: 'Unassigned',
    images: ['https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800'],
    votes: 43,
    coordinates: { lat: 19.0720, lng: 72.8650 }
  },
  {
    id: 'DH-1006',
    title: 'Garbage collection missed for 3 days',
    description: 'Regular garbage collection has been missed for the past 3 days in our residential area.',
    category: 'Sanitation',
    priority: 'High',
    location: 'Green Valley Apartments',
    ward: 'Ward 7',
    zone: 'Zone A - North',
    reportedBy: 'Sanjay Joshi',
    reportedAt: '2024-01-15T10:30:00',
    timeOpen: '2h 30m',
    slaDeadline: '2024-01-16T10:30:00',
    slaHoursLeft: 21.5,
    status: 'Completed',
    assignedTo: 'Ganesh Yadav',
    images: ['https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800'],
    votes: 78,
    coordinates: { lat: 19.0780, lng: 72.8820 },
    timeline: [
      { stage: 'Reported', timestamp: '2024-01-15T10:30:00' },
      { stage: 'Assigned to Worker', timestamp: '2024-01-15T11:00:00', notes: 'Assigned to Ganesh Yadav' },
      { stage: 'Worker Accepted', timestamp: '2024-01-15T11:15:00' },
      { stage: 'Worker Arrived', timestamp: '2024-01-15T11:45:00' },
      { stage: 'Work Started', timestamp: '2024-01-15T12:00:00' },
      { stage: 'Work Completed', timestamp: '2024-01-15T12:45:00', notes: 'Collection completed successfully' }
    ]
  }
];
