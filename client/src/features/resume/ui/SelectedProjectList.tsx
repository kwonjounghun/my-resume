import { Stack, Text, Card, Button, Flex, IconButton } from '@chakra-ui/react';
import { FiX } from 'react-icons/fi';
import { Project } from '@/shared/types/project';

interface SelectedProjectListProps {
  projects: Project[];
  onRemove: (id: string) => void;
  onAdd: () => void;
}

export function SelectedProjectList({
  projects,
  onRemove,
  onAdd,
}: SelectedProjectListProps) {
  return (
    <Stack spacing={4}>
      <Flex justify="space-between" align="center">
        <Text fontWeight="medium">선택된 회고</Text>
        <Button size="sm" onClick={onAdd}>
          회고 추가하기
        </Button>
      </Flex>
      <Stack spacing={2}>
        {projects.map((project) => (
          <Card key={project.id} p={4}>
            <Flex justify="space-between" align="center">
              <Stack spacing={0}>
                <Text fontWeight="medium">{project.title}</Text>
                <Text fontSize="sm" color="gray.600">
                  {project.companyName}
                </Text>
              </Stack>
              <IconButton
                aria-label="회고 제거"
                icon={<FiX />}
                variant="ghost"
                size="sm"
                onClick={() => onRemove(project.id)}
              />
            </Flex>
          </Card>
        ))}
        {projects.length === 0 && (
          <Text color="gray.500">선택된 회고가 없습니다.</Text>
        )}
      </Stack>
    </Stack>
  );
} 