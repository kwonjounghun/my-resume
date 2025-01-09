import { Box, Button, ButtonGroup, useToast } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { projectApi, CreateProjectDto } from '@/shared/api/project';
import { ProjectBasicInfoStep } from './steps/ProjectBasicInfoStep';
import { ProjectSituationStep } from './steps/ProjectSituationStep';
import { ProjectTaskStep } from './steps/ProjectTaskStep';
import { ProjectActionStep } from './steps/ProjectActionStep';
import { ProjectResultStep } from './steps/ProjectResultStep';

interface ProjectCreateFormProps {
  activeStep: number;
  onNext: () => void;
  onPrev: () => void;
}

export const ProjectCreateForm = ({
  activeStep,
  onNext,
  onPrev,
}: ProjectCreateFormProps) => {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const methods = useForm<CreateProjectDto>({
    defaultValues: {
      isPublic: true,
    },
  });

  const { handleSubmit } = methods;

  const { mutate, isPending } = useMutation({
    mutationFn: projectApi.create,
    onSuccess: async (project) => {
      await queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast({
        title: '성공',
        description: '프로젝트가 성공적으로 생성되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push(`/projects/${project.id}`);
    },
    onError: () => {
      toast({
        title: '오류',
        description: '프로젝트 생성에 실패했습니다. 다시 시도해주세요.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: CreateProjectDto) => {
    mutate(data);
  };

  const handleNext = () => {
    methods.trigger().then((isValid) => {
      if (isValid) {
        onNext();
      }
    });
  };

  const renderStep = () => {
    switch (activeStep) {
      case 0:
        return <ProjectBasicInfoStep />;
      case 1:
        return <ProjectSituationStep />;
      case 2:
        return <ProjectTaskStep />;
      case 3:
        return <ProjectActionStep />;
      case 4:
        return <ProjectResultStep />;
      default:
        return null;
    }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box mb={8}>{renderStep()}</Box>
        <ButtonGroup spacing={4} justifyContent="flex-end" width="full">
          {activeStep > 0 && (
            <Button onClick={onPrev} variant="outline">
              이전
            </Button>
          )}
          {activeStep === 4 ? (
            <Button colorScheme="blue" type="submit" isLoading={isPending}>
              완료
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={handleNext}>
              다음
            </Button>
          )}
        </ButtonGroup>
      </form>
    </FormProvider>
  );
}; 