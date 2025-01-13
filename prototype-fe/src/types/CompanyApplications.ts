// types/CompanyApplications.ts
export interface StudentApplicationInfo {
    id: string;
    fullName: string;
    academicProgram: string;
    skills: string[];
  }
  
  export interface InternshipInfo {
    id: number;
    position: string;
    requiredSkills: string[];
  }
  
  export interface DocumentInfo {
    id: number;
    fileName: string;
    fileType: string;
  }
  
  export interface CompanyApplication {
    id: number;
    status: string;
    appliedAt: string;
    student: StudentApplicationInfo;
    internship: InternshipInfo;
    matchingSkills: string[];
    missingSkills: string[];
    documents: DocumentInfo[];
  }
  
  export type ApplicationStatus = 
    | 'Pending'
    | 'Shortlisted'
    | 'Interview Scheduled'
    | 'Interview Completed'
    | 'Offer Extended'
    | 'Hired'
    | 'Rejected';
  
  export const APPLICATION_STATUSES: ApplicationStatus[] = [
    'Pending',
    'Shortlisted',
    'Interview Scheduled',
    'Interview Completed',
    'Offer Extended',
    'Hired',
    'Rejected'
  ];