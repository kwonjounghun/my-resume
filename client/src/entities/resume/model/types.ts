export interface Resume {
  id: number;
  title: string;
  content: string;
  selfIntroductionId: number | null;
  projects: number[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateResumeRequest {
  title: string;
  content: string;
  selfIntroductionId?: number;
  projects?: number[];
  isPublic?: boolean;
}

export interface CreateResumeResponse extends Resume {}

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