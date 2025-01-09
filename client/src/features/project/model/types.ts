export type SearchField = 'title' | 'keyword' | 'companyName';
export type SortOrder = 'asc' | 'desc';

export interface ProjectFilterType {
  searchField: SearchField;
  searchQuery: string;
  sortOrder: SortOrder;
}

export interface UseProjectFilterReturn {
  filter: ProjectFilterType;
  setFilter: (filter: Partial<ProjectFilterType>) => void;
  resetFilter: () => void;
} 