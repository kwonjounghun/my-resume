import { useState, useCallback } from 'react';
import { RetrospectiveFilterType, UseRetrospectiveFilterReturn } from '../model/types';

const initialFilter: RetrospectiveFilterType = {
  sortOrder: 'desc',
  searchField: 'title',
  searchQuery: '',
};

export function useRetrospectiveFilter(): UseRetrospectiveFilterReturn {
  const [filter, setFilterState] = useState<RetrospectiveFilterType>(initialFilter);

  const setFilter = useCallback((newFilter: Partial<RetrospectiveFilterType>) => {
    setFilterState((prev) => ({ ...prev, ...newFilter }));
  }, []);

  const resetFilter = useCallback(() => {
    setFilterState(initialFilter);
  }, []);

  return {
    filter,
    setFilter,
    resetFilter,
  };
} 