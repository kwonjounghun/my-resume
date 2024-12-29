import {
  Box,
  Button,
  Flex,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconButton,
  VStack,
  HStack,
  useBreakpointValue,
  useDisclosure,
  Tag,
} from '@chakra-ui/react';
import { RetrospectiveFilterType, SearchField, SortOrder } from '../model/types';
import { FiFilter } from 'react-icons/fi';
import { useState } from 'react';
import { FilterContent, searchFieldOptions, sortOrderOptions } from './FilterContent';

interface RetrospectiveFilterProps {
  filter: RetrospectiveFilterType;
  onFilterChange: (filter: Partial<RetrospectiveFilterType>) => void;
  onReset: () => void;
}

export function RetrospectiveFilter({
  filter,
  onFilterChange,
  onReset,
}: RetrospectiveFilterProps) {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [tempFilter, setTempFilter] = useState<RetrospectiveFilterType>(filter);

  const handleTempFilterChange = (value: Partial<RetrospectiveFilterType>) => {
    setTempFilter(prev => ({ ...prev, ...value }));
  };

  const handleModalOpen = () => {
    setTempFilter(filter);
    onOpen();
  };

  const handleModalClose = () => {
    setTempFilter(filter);
    onClose();
  };

  const handleApply = () => {
    onFilterChange(tempFilter);
    onClose();
  };

  const handleReset = () => {
    onReset();
    setTempFilter({
      searchField: 'title',
      searchQuery: '',
      sortOrder: 'desc',
    });
    onClose();
  };

  const getSearchFieldLabel = (value: SearchField) => {
    return searchFieldOptions.find(option => option.value === value)?.label || '';
  };

  const getSortOrderLabel = (value: SortOrder) => {
    return sortOrderOptions.find(option => option.value === value)?.label || '';
  };

  if (isMobile) {
    return (
      <>
        <Box position="sticky" top="16" zIndex={10} bg="white" py={2} px={4}>
          <HStack spacing={2} onClick={handleModalOpen} cursor="pointer">
            <IconButton
              aria-label="필터"
              icon={<FiFilter />}
              variant="ghost"
              size="sm"
              colorScheme={filter.searchQuery ? 'blue' : 'gray'}
            />
            <Flex gap={2} flex={1} overflow="hidden">
              {filter.searchQuery ? (
                <Tag size="sm" variant="subtle">
                  {getSearchFieldLabel(filter.searchField)}: {filter.searchQuery}
                </Tag>
              ) : null}
              <Tag size="sm" variant="subtle">
                {getSortOrderLabel(filter.sortOrder)}
              </Tag>
            </Flex>
          </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={handleModalClose} size="full">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader borderBottomWidth="1px">필터</ModalHeader>
            <ModalBody py={4}>
              <VStack spacing={4} align="stretch">
                <FilterContent
                  filter={tempFilter}
                  onChange={handleTempFilterChange}
                  isModal
                />
              </VStack>
            </ModalBody>
            <ModalFooter borderTopWidth="1px" gap={2}>
              <Button variant="ghost" onClick={handleReset}>
                초기화
              </Button>
              <Button colorScheme="blue" onClick={handleApply}>
                적용
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }

  return (
    <Stack spacing={4} p={4} bg="white" borderRadius="md" shadow="sm">
      <Flex gap={4} align="flex-start">
        <Box flex={1}>
          <FilterContent
            filter={filter}
            onChange={onFilterChange}
          />
        </Box>
        <Box pt={8}>
          <Button variant="ghost" onClick={onReset} size="sm">
            초기화
          </Button>
        </Box>
      </Flex>
    </Stack>
  );
}

export default RetrospectiveFilter;
