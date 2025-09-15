export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  type: 'apartment' | 'house' | 'commercial' | 'land';
  status: 'available' | 'sold' | 'rented' | 'pending';
  surface: number;
  rooms: number;
  bathrooms: number;
  address: string;
  city: string;
  zipCode: string;
  images: string[];
  features: string[];
  createdAt: string;
  updatedAt: string;
  isActive: boolean;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: 'admin' | 'agent' | 'client';
  status: 'active' | 'inactive' | 'suspended';
  createdAt: string;
  lastLogin: string;
  avatar?: string;
}

export interface Contact {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  message: string;
  propertyId?: string;
  propertyTitle?: string;
  status: 'new' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface StaticContent {
  id: string;
  section: 'hero' | 'about' | 'services' | 'testimonials' | 'footer' | 'legal';
  title: string;
  content: string;
  updatedAt: string;
}

export interface DashboardStats {
  totalProperties: number;
  activeProperties: number;
  totalUsers: number;
  activeUsers: number;
  totalContacts: number;
  newContacts: number;
  monthlyRevenue: number;
  revenueGrowth: number;
}