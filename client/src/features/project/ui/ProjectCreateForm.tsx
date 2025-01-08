import { Box, Button, ButtonGroup } from '@chakra-ui/react';
import { useForm, FormProvider } from 'react-hook-form';
import { ProjectBasicInfoStep } from './steps/ProjectBasicInfoStep';
import { ProjectSituationStep } from './steps/ProjectSituationStep';
import { ProjectTaskStep } from './steps/ProjectTaskStep';
import { ProjectActionStep } from './steps/ProjectActionStep';
import { ProjectResultStep } from './steps/ProjectResultStep';

interface ProjectFormData {
  title: string;
  workExperienceId: string;
  startDate: string;
  endDate: string;
  situation?: string;
  task?: string;
  action?: string;
  result?: string;
  isPublic: boolean;
}

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
  const methods = useForm<ProjectFormData>({
    defaultValues: {
      isPublic: true,
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: ProjectFormData) => {
    console.log(data);
    // TODO: API 호출
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
            <Button colorScheme="blue" type="submit">
              완료
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={onNext}>
              다음
            </Button>
          )}
        </ButtonGroup>
      </form>
    </FormProvider>
  );
}; 