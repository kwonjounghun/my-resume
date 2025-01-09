import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Badge,
  Divider,
  Skeleton,
  Button,
  useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { projectApi } from '@/shared/api/project';
import { workExperienceApi, WorkExperience } from '@/shared/api/work-experience';

interface ProjectDetailPageProps {
  projectId: string;
}

export const ProjectDetailPage = ({ projectId }: ProjectDetailPageProps) => {
  const router = useRouter();
  const toast = useToast();

  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.getById(projectId),
  });

  const { data: workExperiences, isLoading: isLoadingWorkExperience } = useQuery({
    queryKey: ['workExperiences'],
    queryFn: () => workExperienceApi.getAll(),
    enabled: !!project,
  });

  const workExperience = workExperiences?.workExperiences.find(
    (we: WorkExperience) => we.id === project?.workExperienceId
  );

  if (isLoadingProject || isLoadingWorkExperience) {
    return (
      <Container maxW="container.lg" py={8}>
        <VStack spacing={6} align="stretch">
          <Skeleton height="40px" />
          <Skeleton height="20px" />
          <Skeleton height="200px" />
        </VStack>
      </Container>
    );
  }

  if (!project) {
    return null;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={6} align="stretch">
        <Box>
          <Text fontSize="lg" color="gray.600" mb={2}>
            {workExperience?.company}
          </Text>
          <Heading size="lg" mb={2}>{project.title}</Heading>
          <HStack spacing={4}>
            <Badge colorScheme={project.isPublic ? 'green' : 'gray'}>
              {project.isPublic ? '공개' : '비공개'}
            </Badge>
            <Text color="gray.600">
              {project.startDate} - {project.endDate}
            </Text>
          </HStack>
        </Box>

        <Divider />

        {project.situation && (
          <Box>
            <Heading size="md" mb={3}>상황 (Situation)</Heading>
            <Text whiteSpace="pre-wrap">{project.situation}</Text>
          </Box>
        )}

        {project.task && (
          <Box>
            <Heading size="md" mb={3}>과제 (Task)</Heading>
            <Text whiteSpace="pre-wrap">{project.task}</Text>
          </Box>
        )}

        {project.action && (
          <Box>
            <Heading size="md" mb={3}>행동 (Action)</Heading>
            <Text whiteSpace="pre-wrap">{project.action}</Text>
          </Box>
        )}

        {project.result && (
          <Box>
            <Heading size="md" mb={3}>결과 (Result)</Heading>
            <Text whiteSpace="pre-wrap">{project.result}</Text>
          </Box>
        )}

        {project.keywords && project.keywords.length > 0 && (
          <Box>
            <Heading size="md" mb={3}>키워드</Heading>
            <HStack spacing={2} wrap="wrap">
              {project.keywords.map((keyword, index) => (
                <Badge key={index} colorScheme="blue">
                  {keyword}
                </Badge>
              ))}
            </HStack>
          </Box>
        )}

        <HStack spacing={4} justify="flex-end">
          <Button variant="outline" onClick={() => router.push('/projects')}>
            목록으로
          </Button>
          <Button colorScheme="blue" onClick={() => router.push(`/projects/${projectId}/edit`)}>
            수정
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
}; 