/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Flock, FeedInventory, Transaction, ChickenProduct } from './types';

export const ADMIN_CREDENTIALS = {
  phone: '9008979690',
  phonePassword: '994512',
  email: 'mahiff9945@gmail.com',
  emailPassword: '935339'
};

export const CHICKEN_TYPES = [
  { id: 'BB83', label: 'BB83', labelKn: 'BB83' },
  { id: 'Javari', label: 'Javari Chicken', labelKn: 'ಜವಾರಿ ಕೋಳಿ' },
  { id: 'Juttada', label: 'Juttada Chicken', labelKn: 'ಜುಟ್ಟದ ಕೋಳಿ' },
  { id: 'Rooster/Hen', label: 'Rooster & Hen', labelKn: 'ಹುಂಜ ಮತ್ತು ಕೋಳಿ' },
  { id: 'Nati', label: 'Nati Chicken', labelKn: 'ನಾಟಿ ಕೋಳಿ' },
  { id: 'Kadaknath', label: 'Kadaknath Chicken', labelKn: 'ಕಡಕನಾಥ್ ಕೋಳಿ' },
];

export const COD_LOCATIONS = [
  'ವೆಂಕಟಗಿರಿ', 'ಬಸ ಪಟ್ಟಣ', 'ವಡ್ಡರಹಟ್ಟಿ', 'ಗಂಗಾವತಿ', 'ಗಡ್ಡಿ ಉಡಮಕಲ್', 
  'ಆರಾಳ್', 'ಆಗೋಲಿ', 'ಕನಕಗಿರಿ', 'ಮುಸಲಾಪುರ್', 'ಗಿಣಿಗೇರ', 
  'ಕಲಿಕೆರಿ', 'ದಾಸನಳ್', 'ಜಬ್ಬಾಲಗುಡ್ಡ', 'ಹೇಮಗುಡ್ಡ', 'ಮುಂಕುಂಪಿ', 'ಚಿಕ್ ಬೆನಕಲ್'
];

export const PHONE_PE_NUMBER = '9008979690';
export const PHONE_PE_QR_CODE = 'https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=upi://pay?pa=9008979690@ybl&pn=Mahesh%20Gabbur';

export const INITIAL_CHICKEN_PRODUCT: ChickenProduct = {
  id: 'cp1',
  name: 'Farm Fresh Chicken',
  pricePerKg: 200,
  photos: [
    'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?q=80&w=800',
    'https://images.unsplash.com/photo-1569254994521-ddbb54af5ae8?q=80&w=800',
    'https://images.unsplash.com/photo-1516467508483-a7212febe31a?q=80&w=800',
    'https://images.unsplash.com/photo-1628155930542-3c7a64e2c833?q=80&w=800',
    'https://images.unsplash.com/photo-1598965402089-897ce52e8355?q=80&w=800'
  ],
  videos: [
    'https://www.w3schools.com/html/mov_bbb.mp4',
    'https://www.w3schools.com/html/movie.mp4'
  ]
};

export const INITIAL_FLOCKS: Flock[] = [
  {
    id: 'f1',
    name: 'Batch A - 2024',
    breed: 'White Leghorn',
    count: 500,
    ageInWeeks: 12,
    arrivalDate: '2024-01-15',
    status: 'Active',
    type: 'Layer',
  },
  {
    id: 'f2',
    name: 'Batch B - 2024',
    breed: 'Cobb 500',
    count: 1000,
    ageInWeeks: 4,
    arrivalDate: '2024-03-10',
    status: 'Active',
    type: 'Broiler',
  },
];

export const INITIAL_FEED_INVENTORY: FeedInventory[] = [
  { id: 'fi1', type: 'Layer Mash', quantityKg: 250, lastRestocked: '2024-03-25', unitPrice: 45 },
  { id: 'fi2', type: 'Broiler Starter', quantityKg: 500, lastRestocked: '2024-03-30', unitPrice: 52 },
  { id: 'fi3', type: 'Grower Feed', quantityKg: 100, lastRestocked: '2024-03-20', unitPrice: 48 },
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  { id: 't1', date: '2024-04-01', type: 'Income', category: 'Chicken Sales', amount: 2500, description: 'Sold 12.5kg chicken' },
  { id: 't2', date: '2024-04-02', type: 'Expense', category: 'Feed Purchase', amount: 5000, description: 'Bought 100kg Layer Mash' },
  { id: 't3', date: '2024-04-03', type: 'Income', category: 'Bird Sales', amount: 15000, description: 'Sold 50 broilers' },
  { id: 't4', date: '2024-04-05', type: 'Expense', category: 'Medication', amount: 1200, description: 'Vaccination batch A' },
];
