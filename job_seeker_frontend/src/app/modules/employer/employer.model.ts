export interface Employer {
  id?: number;
  name: string;
  email: string;
  phone: string;
  companyName: string;
  logoUrl: string;
  website: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: Date;
}