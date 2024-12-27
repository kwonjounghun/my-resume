import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { RetrospectiveFilterType, SearchField, SortOrder } from '../model/types';

interface RetrospectiveFilterProps {
  filter: RetrospectiveFilterType;
  onFilterChange: (filter: Partial<RetrospectiveFilterType>) => void;
  onReset: () => void;
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

export function RetrospectiveFilter({
  filter,
  onFilterChange,
  onReset,
}: RetrospectiveFilterProps) {
  return (
    <Stack spacing={4} p={4} bg="white" borderRadius="md" shadow="sm">
      <Flex gap={4} align="center">
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            정렬
          </Text>
          <Select
            value={filter.sortOrder}
            onChange={(e) => onFilterChange({ sortOrder: e.target.value as SortOrder })}
          >
            {sortOrderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
        <Box flex={1}>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            검색 필드
          </Text>
          <Select
            value={filter.searchField}
            onChange={(e) =>
              onFilterChange({ searchField: e.target.value as SearchField })
            }
          >
            {searchFieldOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
        <Box flex={2}>
          <Text fontSize="sm" fontWeight="medium" mb={2}>
            검색어
          </Text>
          <Input
            value={filter.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="검색어를 입력하세요"
          />
        </Box>
        <Box alignSelf="flex-end">
          <Button variant="ghost" onClick={onReset}>
            초기화
          </Button>
        </Box>
      </Flex>
    </Stack>
  );
}

export default RetrospectiveFilter;
