/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Flock {
  id: string;
  name: string;
  breed: string;
  count: number;
  ageInWeeks: number;
  arrivalDate: string;
  status: 'Active' | 'Sold' | 'Quarantined';
  type: 'Broiler' | 'Layer';
}

export interface ChickenProduct {
  id: string;
  name: string;
  pricePerKg: number;
  photos: string[];
  videos: string[];
}

export type ChickenType = 'BB83' | 'Javari' | 'Juttada' | 'Rooster/Hen' | 'Nati' | 'Kadaknath';

export interface Order {
  id: string;
  userId: string;
  userName: string;
  userPhone: string;
  chickenType: ChickenType;
  weightKg: number;
  totalPrice: number;
  date: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  address: {
    state: string;
    taluk: string;
    village: string;
  };
  paymentMethod: 'COD' | 'Online';
}

export interface FeedInventory {
  id: string;
  type: string;
  quantityKg: number;
  lastRestocked: string;
  unitPrice: number;
}

export interface Transaction {
  id: string;
  date: string;
  type: 'Income' | 'Expense';
  category: string;
  amount: number;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'User' | 'Admin';
  instagram?: string;
  address?: {
    state: string;
    taluk: string;
    village: string;
    district: string;
  };
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface HealthRecord {
  id: string;
  date: string;
  flockId: string;
  action: string; // e.g., Vaccination, Medication
  details: string;
  nextDueDate?: string;
}
