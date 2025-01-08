import { Box, Container, Heading, Step, StepIcon, StepIndicator, StepNumber, StepSeparator, StepStatus, StepTitle, Stepper, useSteps } from '@chakra-ui/react';
import { ProjectCreateForm } from '@/features/project/ui/ProjectCreateForm';

const steps = [
  { title: '기본 정보', description: '프로젝트의 기본 정보를 입력합니다.' },
  { title: 'Situation', description: '프로젝트의 상황을 입력합니다.' },
  { title: 'Task', description: '프로젝트의 과제를 입력합니다.' },
  { title: 'Action', description: '프로젝트의 행동을 입력합니다.' },
  { title: 'Result', description: '프로젝트의 결과를 입력합니다.' },
];

export const ProjectCreatePage = () => {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handlePrev = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <Container maxW="container.lg" py={8}>
      <Box mb={8}>
        <Heading size="lg" mb={4}>
          프로젝트 작성
        </Heading>
        <Stepper index={activeStep} mb={8}>
          {steps.map((step, index) => (
            <Step key={index}>
              <StepIndicator>
                <StepStatus
                  complete={<StepIcon />}
                  incomplete={<StepNumber />}
                  active={<StepNumber />}
                />
              </StepIndicator>
              <Box flexShrink={0}>
                <StepTitle>{step.title}</StepTitle>
              </Box>
              <StepSeparator />
            </Step>
          ))}
        </Stepper>
      </Box>
      <ProjectCreateForm
        activeStep={activeStep}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </Container>
  );
}; 