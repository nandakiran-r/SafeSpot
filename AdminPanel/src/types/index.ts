export interface Complaint {
  id: string;
  walletAddress: string;
  description: string;
  location: string;
  timestamp: number;
  status: 'pending' | 'confirmed' | 'rejected';
  isBlacklisted: boolean;
  rewardAmount?: number;
  rewardType?: 'positive' | 'negative';
  evidence?: string;
  category?: 'dealer' | 'user';
}

export interface User {
  id: string;
  email: string;
  role: 'admin' | 'authority';
  name?: string;
  department?: string;
  createdAt: number;
}