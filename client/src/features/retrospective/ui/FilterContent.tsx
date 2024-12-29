import { Box, Input, Select, Text, HStack, VStack, useBreakpointValue } from '@chakra-ui/react';
import { RetrospectiveFilterType, SearchField, SortOrder } from '../model/types';

interface FilterContentProps {
  filter: RetrospectiveFilterType;
  isModal?: boolean;
  onChange: (value: Partial<RetrospectiveFilterType>) => void;
}

const searchFieldOptions: { value: SearchField; label: string }[] = [
  { value: 'title', label: '제목' },
  { value: 'keywords', label: '키워드' },
  { value: 'company', label: '회사명' },
];

const sortOrderOptions: { value: SortOrder; label: string }[] = [
  { value: 'desc', label: '최신순' },
  { value: 'asc', label: '오래된순' },
];

export function FilterContent({ filter, onChange, isModal = false }: FilterContentProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const Container = isMobile || isModal ? VStack : HStack;

  const FilterItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
    <Box flex={1}>
      <Text fontSize="sm" fontWeight="medium" mb={2}>
        {label}
      </Text>
      {children}
    </Box>
  );

  return (
    <Container spacing={4} align={isMobile ? 'stretch' : 'center'} width="100%">
      <FilterItem label="정렬">
        <Select
          value={filter.sortOrder}
          onChange={(e) => {
            const value = e.target.value as SortOrder;
            onChange({ sortOrder: value });
          }}
          size={isMobile || isModal ? "md" : "sm"}
        >
          {sortOrderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FilterItem>

      <FilterItem label="검색 필드">
        <Select
          value={filter.searchField}
          onChange={(e) => {
            const value = e.target.value as SearchField;
            onChange({ searchField: value });
          }}
          size={isMobile || isModal ? "md" : "sm"}
        >
          {searchFieldOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      </FilterItem>

      <FilterItem label="검색어">
        <Input
          value={filter.searchQuery}
          onChange={(e) => {
            const value = e.target.value;
            onChange({ searchQuery: value });
          }}
          placeholder="검색어를 입력하세요"
          size={isMobile || isModal ? "md" : "sm"}
        />
      </FilterItem>
    </Container>
  );
}

export { searchFieldOptions, sortOrderOptions }; 