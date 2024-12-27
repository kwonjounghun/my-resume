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
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyWishlistRequest {
  company: string;
  link: string;
  resumeId?: string;
  description?: string;
  isJobApplied?: boolean;
  status?: CompanyWishlistStatus;
}

export interface CreateCompanyWishlistResponse {
  id: string;
  company: string;
  link: string;
  resumeId: string;
  isJobApplied: boolean;
  status: CompanyWishlistStatus;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Company {
  id: string;
  name: string;
  startDate: string;
  endDate?: string;
  isCurrentlyEmployed: boolean;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCompanyRequest {
  name: string;
  startDate: string;
  endDate?: string;
  isCurrentlyEmployed: boolean;
}

export interface UpdateCompanyRequest {
  name?: string;
  startDate?: string;
  endDate?: string;
  isCurrentlyEmployed?: boolean;
}

export interface CompanyResponse {
  company: Company;
}

export interface CompaniesResponse {
  companies: Company[];
} 