export type CompanyWishlistStatus =
  | 'DOCUMENT_SUBMITTED'
  | 'DOCUMENT_PASSED'
  | 'DOCUMENT_FAILED'
  | 'ASSIGNMENT_PASSED'
  | 'FIRST_INTERVIEW'
  | 'SECOND_INTERVIEW'
  | 'FINAL_PASSED'
  | 'FINAL_FAILED';

export interface CompanyWishlist {
  id: string;
  userid: string;
  company: string;
  link: string;
  resumeId: string;
  isJobApplied: boolean;
  status: CompanyWishlistStatus;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCompanyWishlistRequest {
  company: string;
  link: string;
  resumeId: number;
  description?: string;
  status?: CompanyWishlistStatus;
}

export interface CreateCompanyWishlistResponse {
  id: number;
  company: string;
  link: string;
  resumeId: number;
  isJobApplied: boolean;
  status: CompanyWishlistStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
} 