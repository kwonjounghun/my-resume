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
  useDisclosure,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { projectApi } from '@/shared/api/project';
import { workExperienceApi, WorkExperience } from '@/shared/api/work-experience';
import { useRef } from 'react';

interface ProjectDetailPageProps {
  projectId: string;
}

export const ProjectDetailPage = ({ projectId }: ProjectDetailPageProps) => {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.getById(projectId),
  });

  const { data: workExperiences, isLoading: isLoadingWorkExperience } = useQuery({
    queryKey: ['workExperiences'],
    queryFn: () => workExperienceApi.getAll(),
    enabled: !!project,
  });

  const { mutate: summarize, isPending: isSummarizing } = useMutation({
    mutationFn: () => projectApi.summarize(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast({
        title: '성공',
        description: '프로젝트가 성공적으로 요약되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    },
    onError: () => {
      toast({
        title: '오류',
        description: '프로젝트 요약에 실패했습니다. 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const { mutate: deleteProject, isPending: isDeleting } = useMutation({
    mutationFn: () => projectApi.delete(projectId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: '성공',
        description: '프로젝트가 성공적으로 삭제되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push('/projects');
    },
    onError: () => {
      toast({
        title: '오류',
        description: '프로젝트 삭제에 실패했습니다. 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const handleDelete = () => {
    deleteProject();
    onClose();
  };

  const workExperience = workExperiences?.workExperiences.find(
    (we: WorkExperience) => we.id === project?.workExperienceId
  );

  const canSummarize = project?.situation && project?.task && project?.action && project?.result && !project?.summary;

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

        {project.summary && (
          <Box>
            <Heading size="md" mb={3}>요약</Heading>
            <Text whiteSpace="pre-wrap" mb={4}>{project.summary}</Text>
          </Box>
        )}

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
          {canSummarize && (
            <Button
              colorScheme="green"
              onClick={() => summarize()}
              isLoading={isSummarizing}
            >
              요약하기
            </Button>
          )}
          <Button colorScheme="blue" onClick={() => router.push(`/projects/${projectId}/edit`)}>
            수정
          </Button>
          <Button colorScheme="red" onClick={onOpen}>
            삭제
          </Button>
        </HStack>
      </VStack>

      {cancelRef.current !== null && (
        <AlertDialog
          isOpen={isOpen}
          onClose={onClose}
          leastDestructiveRef={cancelRef as React.RefObject<HTMLButtonElement>}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                프로젝트 삭제
              </AlertDialogHeader>

              <AlertDialogBody>
                정말로 이 프로젝트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={onClose}>
                  취소
                </Button>
                <Button colorScheme="red" onClick={handleDelete} ml={3} isLoading={isDeleting}>
                  삭제
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      )}
    </Container>
  );
}; 
