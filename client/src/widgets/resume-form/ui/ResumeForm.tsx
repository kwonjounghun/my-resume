import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Stack,
  Button,
  useToast,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Textarea,
  Select,
  Checkbox,
} from '@chakra-ui/react';
import { getIntroductions } from '@/entities/introduction/api/getIntroductions';
import { createResume } from '@/entities/resume/api/createResume';
import { updateResume } from '@/entities/resume/api/updateResume';
import { CreateResumeRequest, Resume } from '@/entities/resume/model/types';
import { ProjectSelectModal } from '@/features/resume/ui/ProjectsSelectModal';
import { SelectedProjectList } from '@/features/resume/ui/SelectedProjectList';
import { getProjects } from '@/shared/api/project';

interface ResumeFormProps {
  mode?: 'create' | 'edit';
  initialData?: Resume;
  onSuccess?: () => void;
}

export default function ResumeForm({
  mode = 'create',
  initialData,
  onSuccess,
}: ResumeFormProps) {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: introductionsData } = useQuery({
    queryKey: ['introductions'],
    queryFn: () => getIntroductions(),
  });

  const { data: projectsData } = useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateResumeRequest>({
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      selfIntroductionId: initialData?.selfIntroductionId || undefined,
      projects: initialData?.projects || [],
      isPublic: initialData?.isPublic ?? false,
    },
  });

  const projects = watch('projects');
  const selectedProjects = projectsData?.projects.filter(
    (project) => projects?.includes(project.id)
  ) || [];

  const createMutation = useMutation({
    mutationFn: createResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: '이력서가 등록되었습니다.',
        status: 'success',
      });
      onSuccess?.();
      router.push('/resumes');
    },
    onError: () => {
      toast({
        title: '이력서 등록에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resume> }) =>
      updateResume(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      queryClient.invalidateQueries({ queryKey: ['resume', id] });
      toast({
        title: '이력서가 수정되었습니다.',
        status: 'success',
      });
      onSuccess?.();
      router.push('/resumes');
    },
    onError: () => {
      toast({
        title: '이력서 수정에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const onSubmit = (data: CreateResumeRequest) => {
    if (mode === 'edit' && initialData) {
      updateMutation.mutate({ id: initialData.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  const handleRemoveProject = (id: string) => {
    setValue(
      'projects',
      selectedProjects?.filter((project) => project.id !== id).map((project) => project.id) || []
    );
  };

  const handleConfirmProjects = (selectedIds: string[]) => {
    setValue('projects', selectedIds);
  };

  // 요약 내용이 있는 회고만 필터링
  const availableProjects = projectsData?.projects.filter(
    (project) => project.summary
  ) || [];

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <Stack spacing={6}>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>제목</FormLabel>
          <Input
            {...register('title')}
            placeholder="이력서 제목을 입력하세요"
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl>
          <FormLabel>자기소개서</FormLabel>
          <Select
            {...register('selfIntroductionId')}
            placeholder="자기소개서를 선택하세요"
          >
            {introductionsData?.introductions.map((intro) => (
              <option key={intro.id} value={intro.id}>
                {intro.title}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl>
          <FormLabel>회고</FormLabel>
          <SelectedProjectList
            projects={selectedProjects}
            onRemove={handleRemoveProject}
            onAdd={() => setIsModalOpen(true)}
          />
        </FormControl>

        <FormControl isInvalid={!!errors.content}>
          <FormLabel>내용</FormLabel>
          <Textarea
            {...register('content')}
            placeholder="이력서 내용을 입력하세요"
            minH="200px"
          />
          <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <Checkbox
            {...register('isPublic')}
            colorScheme="blue"
          >
            공개
          </Checkbox>
        </FormControl>

        <Button
          type="submit"
          colorScheme="blue"
          isLoading={createMutation.isPending || updateMutation.isPending}
        >
          {mode === 'create' ? '등록하기' : '수정하기'}
        </Button>
      </Stack>

      <ProjectSelectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projects={availableProjects}
        selectedProjectIds={selectedProjects.map((project) => project.id) || []}
        onConfirm={handleConfirmProjects}
      />
    </Box>
  );
} 