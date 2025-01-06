import { useState, useCallback } from 'react';
import { ProjectFilterType, UseProjectFilterReturn } from '../model/types';

const initialFilter: ProjectFilterType = {
  sortOrder: 'desc',
  searchField: 'title',
  searchQuery: '',
};

export function useProjectFilter(): UseProjectFilterReturn {
  const [filter, setFilterState] = useState<ProjectFilterType>(initialFilter);

  const setFilter = useCallback((newFilter: Partial<ProjectFilterType>) => {
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