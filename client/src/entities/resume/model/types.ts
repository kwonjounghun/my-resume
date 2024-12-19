export interface Resume {
  id: string;
  title: string;
  content: string;
  selfIntroductionId: string | null;
  projects: string[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumeRequest {
  title: string;
  content: string;
  selfIntroductionId?: string;
  projects?: string[];
  isPublic?: boolean;
}

export interface CreateResumeResponse extends Resume { }

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