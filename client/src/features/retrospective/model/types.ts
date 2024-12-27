export type SortOrder = 'desc' | 'asc';
export type SearchField = 'title' | 'keywords' | 'company';

export interface RetrospectiveFilterType {
  sortOrder: SortOrder;
  searchField: SearchField;
  searchQuery: string;
}

export interface UseRetrospectiveFilterReturn {
  filter: RetrospectiveFilterType;
  setFilter: (filter: Partial<RetrospectiveFilterType>) => void;
  resetFilter: () => void;
} 