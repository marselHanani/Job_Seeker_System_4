export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'employer' | 'jobseeker';
    createdAt: Date;
    avatarUrl?: string;
  }
  