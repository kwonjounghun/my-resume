import { Container, Heading, VStack, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectApi, UpdateProjectDto } from '@/shared/api/project';
import { workExperienceApi } from '@/shared/api/work-experience';
import { ProjectEditForm } from './ProjectEditForm';

interface ProjectEditPageProps {
  projectId: string;
}

export const ProjectEditPage = ({ projectId }: ProjectEditPageProps) => {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: project, isLoading: isLoadingProject } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectApi.getById(projectId),
  });

  const { data: workExperiences, isLoading: isLoadingWorkExperience } = useQuery({
    queryKey: ['workExperiences'],
    queryFn: () => workExperienceApi.getAll(),
  });

  const { mutate: updateProject, isPending } = useMutation({
    mutationFn: (data: UpdateProjectDto) => projectApi.update(projectId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast({
        title: '성공',
        description: '프로젝트가 성공적으로 수정되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push(`/projects/${projectId}`);
    },
    onError: () => {
      toast({
        title: '오류',
        description: '프로젝트 수정에 실패했습니다. 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  if (isLoadingProject || isLoadingWorkExperience) {
    return <div>로딩 중...</div>;
  }

  if (!project || !workExperiences) {
    return null;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">프로젝트 수정</Heading>
        <ProjectEditForm
          project={project}
          workExperiences={workExperiences}
          onSubmit={updateProject}
          onCancel={() => router.back()}
          isSubmitting={isPending}
        />
      </VStack>
    </Container>
  );
}; 