import { useQuery } from '@tanstack/react-query';
import { ProjectCard } from '@/shared/components/ProjectCard/ProjectCard';
import { getProjects } from '@/shared/api/project';
import { Box, SimpleGrid, Spinner, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface ProjectListProps {
  layout?: 'horizontal' | 'vertical';
}

export const ProjectList = ({ layout = 'vertical' }: ProjectListProps) => {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={8}>
        <Spinner />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={8} textAlign="center">
        <Text color="red.500">프로젝트를 불러오는데 실패했습니다.</Text>
      </Box>
    );
  }

  if (!data?.projects.length) {
    return (
      <Box p={8} textAlign="center">
        <Text>등록된 프로젝트가 없습니다.</Text>
      </Box>
    );
  }

  if (layout === 'horizontal') {
    return (
      <VStack spacing={4} align="stretch">
        {data.projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            layout="horizontal"
            onClick={() => router.push(`/projects/${project.id}`)}
          />
        ))}
      </VStack>
    );
  }

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
      {data.projects.map((project) => (
        <ProjectCard
          key={project.id}
          project={project}
          layout="vertical"
          onClick={() => router.push(`/projects/${project.id}`)}
        />
      ))}
    </SimpleGrid>
  );
}; 