import { Retrospective } from '@/entities/retrospective/model/types';
import { RetrospectiveFilterType } from '../model/types';

export function filterRetrospectives(
  retrospectives: Retrospective[],
  filter: RetrospectiveFilterType
): Retrospective[] {
  let filtered = [...retrospectives];

  // 검색어 필터링
  if (filter.searchQuery) {
    filtered = filtered.filter((retro) => {
      const query = filter.searchQuery.toLowerCase();
      switch (filter.searchField) {
        case 'title':
          return retro.title.toLowerCase().includes(query);
        case 'keywords':
          return retro.keywords.some((keyword) =>
            keyword.toLowerCase().includes(query)
          );
        case 'company':
          return retro.company?.toLowerCase().includes(query);
        default:
          return true;
      }
    });
  }

  // 정렬
  filtered.sort((a, b) => {
    const aDate = new Date(a.startDate).getTime();
    const bDate = new Date(b.startDate).getTime();
    return filter.sortOrder === 'desc' ? bDate - aDate : aDate - bDate;
  });

  return filtered;
} 