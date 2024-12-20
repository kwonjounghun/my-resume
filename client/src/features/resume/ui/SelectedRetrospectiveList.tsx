import { Stack, Text, Card, Button, Flex, IconButton } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';
import { Retrospective } from '@/entities/retrospective/model/types';

interface SelectedRetrospectiveListProps {
  retrospectives: Retrospective[];
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export function SelectedRetrospectiveList({
  retrospectives,
  onRemove,
  onAdd,
}: SelectedRetrospectiveListProps) {
  return (
    <Stack spacing={4}>
      <Flex justify="space-between" align="center">
        <Text fontWeight="medium">선택된 회고</Text>
        <Button size="sm" onClick={onAdd}>
          회고 추가하기
        </Button>
      </Flex>
      <Stack spacing={2}>
        {retrospectives.map((retro) => (
          <Card key={retro.id} p={4}>
            <Flex justify="space-between" align="center">
              <Stack spacing={0}>
                <Text fontWeight="medium">{retro.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {retro.company}
                </Text>
              </Stack>
              <IconButton
                aria-label="회고 제거"
                icon={<FiX />}
                variant="ghost"
                size="sm"
                onClick={() => onRemove(retro.id)}
              />
            </Flex>
          </Card>
        ))}
        {retrospectives.length === 0 && (
          <Text color="gray.500">선택된 회고가 없습니다.</Text>
        )}
      </Stack>
    </Stack>
  );
} 