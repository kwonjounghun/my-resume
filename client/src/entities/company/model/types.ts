export type CompanyStatus =
  | 'DOCUMENT_SUBMITTED'
  | 'DOCUMENT_PASSED'
  | 'DOCUMENT_FAILED'
  | 'ASSIGNMENT_PASSED'
  | 'FIRST_INTERVIEW'
  | 'SECOND_INTERVIEW'
  | 'FINAL_PASSED'
  | 'FINAL_FAILED';

export interface CompanyWishlist {
  id: number;
  userid: number;
  company: string;
  link: string;
  resumeId: number;
  isJobApplied: boolean;
  status: CompanyStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
} 