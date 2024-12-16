export interface Resume {
  id: number;
  userId: number;
  selfIntroductionId: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  projects: number[];
  companyWishlist: number[];
}

export interface ResumeListResponse {
  resumes: Resume[];
  total: number;
}

export interface ResumeFilters {
  page?: number;
  limit?: number;
  keyword?: string;
  isPublic?: boolean;
} 