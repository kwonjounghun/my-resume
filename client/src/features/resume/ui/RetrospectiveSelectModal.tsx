import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Stack,
  Checkbox,
  Text,
} from '@chakra-ui/react';
import { Retrospective } from '@/entities/retrospective/model/types';
import { useRetrospectiveFilter } from '@/features/retrospective/hooks/useRetrospectiveFilter';
import { RetrospectiveFilter } from '@/features/retrospective/ui/RetrospectiveFilter';
import { filterRetrospectives } from '@/features/retrospective/lib/filter';
import { useState } from 'react';

interface RetrospectiveSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  retrospectives: Retrospective[];
  selectedRetrospectiveIds: string[];
  onConfirm: (selectedIds: string[]) => void;
}

export function RetrospectiveSelectModal({
  isOpen,
  onClose,
  retrospectives,
  selectedRetrospectiveIds,
  onConfirm,
}: RetrospectiveSelectModalProps) {
  const { filter, setFilter, resetFilter } = useRetrospectiveFilter();
  const [tempSelectedIds, setTempSelectedIds] = useState<string[]>(selectedRetrospectiveIds);

  const filteredRetrospectives = filterRetrospectives(retrospectives, filter);

  const handleToggleRetrospective = (id: string) => {
    setTempSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((prevId) => prevId !== id)
        : [...prev, id]
    );
  };

  const handleConfirm = () => {
    onConfirm(tempSelectedIds);
    onClose();
  };

  const handleCancel = () => {
    setTempSelectedIds(selectedRetrospectiveIds);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleCancel} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>회고 선택</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Stack spacing={4}>
            <RetrospectiveFilter
              filter={filter}
              onFilterChange={setFilter}
              onReset={resetFilter}
            />
            <Stack maxH="400px" overflowY="auto" spacing={2}>
              {filteredRetrospectives.map((retro) => (
                <Checkbox
                  key={retro.id}
                  isChecked={tempSelectedIds.includes(retro.id)}
                  onChange={() => handleToggleRetrospective(retro.id)}
                >
                  <Stack spacing={0}>
                    <Text fontWeight="medium">{retro.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {retro.company}
                    </Text>
                  </Stack>
                </Checkbox>
              ))}
              {filteredRetrospectives.length === 0 && (
                <Text color="gray.500">선택할 수 있는 회고가 없습니다.</Text>
              )}
            </Stack>
          </Stack>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={handleCancel}>
            취소
          </Button>
          <Button colorScheme="blue" onClick={handleConfirm}>
            확인
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
} 