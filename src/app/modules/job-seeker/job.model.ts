export interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    requirements: string[];
    salary: string;
    type: string;
    postedDate: Date;
    deadline: Date;
    category?: string;
    companyLogo?: ImageData;
    saved?: boolean;
}

export interface JobApplication {
    id: string;
    jobId: string;
    userId: string;
    status: 'pending' | 'accepted' | 'rejected';
    appliedDate: Date;
    resume: string;
    coverLetter: string;
  }