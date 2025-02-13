export interface Introduction {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface IntroductionListResponse {
  introductions: Introduction[];
  total: number;
}

export interface IntroductionFilters {
  page?: number;
  limit?: number;
  keyword?: string;
} 