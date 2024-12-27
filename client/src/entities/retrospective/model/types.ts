export interface Retrospective {
  id: string;
  title: string;
  situation: string;
  task: string;
  action: string;
  result: string;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  keywords: string[];
  summary: string | null;
  company: string;
  startDate: string;
  endDate: string;
}

export interface RetrospectiveListResponse {
  retrospectives: Retrospective[];
  total: number;
}

export interface RetrospectiveFilters {
  page?: number;
  limit?: number;
  keyword?: string;
  company?: string;
  startDate?: string;
  endDate?: string;
  isPublic?: boolean;
}

export type CreateRetrospectiveRequest = Omit<
  Retrospective,
  'id' | 'createdAt' | 'updatedAt' | 'summary'
>;
