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
import { Project } from '@/shared/types/project';
import { useProjectFilter } from '@/features/project/hooks/useProjectFilter';
import { ProjectFilter } from '@/features/project/ui/ProjectFilter';
import { ProjectFilterType } from '@/features/project/model/types';
import { useState } from 'react';

interface ProjectSelectModalProps {
  isOpen: boolean;
  onClose: () => void;
  projects: Project[];
  selectedProjectIds: string[];
  onConfirm: (selectedIds: string[]) => void;
}

export function ProjectSelectModal({
  isOpen,
  onClose,
  projects,
  selectedProjectIds,
  onConfirm,
}: ProjectSelectModalProps) {
  const { filter, setFilter, resetFilter } = useProjectFilter();
  const [tempSelectedIds, setTempSelectedIds] = useState<string[]>(selectedProjectIds);

  const handleToggleProject = (id: string) => {
    setTempSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((prevId) => prevId !== id)
        : [...prev, id]
    );
  };



  const filterProjects = (projects: Project[], filter: ProjectFilterType) => {
    return projects.filter((project) => {
      const searchValue = project[filter.searchField === 'keyword' ? 'keywords' : filter.searchField]?.toString().toLowerCase();
      const searchQuery = filter.searchQuery.toLowerCase();

      if (!searchQuery) return true;

      return searchValue?.includes(searchQuery);
    }).sort((a, b) => {
      const aValue = a.startDate?.toString().toLowerCase();
      const bValue = b.startDate?.toString().toLowerCase();

      if (filter.sortOrder === 'asc') {
        return aValue < bValue ? -1 : 1;
      } else {
        return aValue > bValue ? -1 : 1;
      }
    });
  };

  const filteredProjects = filterProjects(projects, filter);

  const handleConfirm = () => {
    onConfirm(tempSelectedIds);
    onClose();
  };

  const handleCancel = () => {
    setTempSelectedIds(selectedProjectIds);
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
            <ProjectFilter
              filter={filter}
              onFilterChange={setFilter}
              onReset={resetFilter}
            />
            <Stack maxH="400px" overflowY="auto" spacing={2}>
              {filteredProjects.map((project) => (
                <Checkbox
                  key={project.id}
                  isChecked={tempSelectedIds.includes(project.id)}
                  onChange={() => handleToggleProject(project.id)}
                >
                  <Stack spacing={0}>
                    <Text fontWeight="medium">{project.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {project.companyName}
                    </Text>
                  </Stack>
                </Checkbox>
              ))}
              {filteredProjects.length === 0 && (
                <Text color="gray.500">선택할 수 있는 프로젝트가 없습니다.</Text>
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