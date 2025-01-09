import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  VStack,
  Button,
  useDisclosure,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { getWorkExperiences } from '@/entities/workExperiences/api';
import { WorkExperience } from '@/entities/workExperiences/model';
import { AddWorkExperienceModal } from '../AddWorkExperienceModal';

export const ProjectBasicInfoStep = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { data: workExperienceData } = useQuery({
    queryKey: ['workExperiences'],
    queryFn: getWorkExperiences,
  });

  const selectedWorkExperience = workExperienceData?.workExperiences.find(
    (we) => we.id === watch('workExperienceId'),
  );

  const handleWorkExperienceSuccess = (workExperience: WorkExperience) => {
    setValue('workExperienceId', workExperience.id);
  };

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={!!errors.title}>
        <FormLabel>프로젝트 제목</FormLabel>
        <Input
          {...register('title', {
            required: '프로젝트 제목을 입력해주세요',
          })}
          placeholder="프로젝트 제목을 입력하세요"
        />
        <FormErrorMessage>
          {errors.title?.message?.toString()}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.workExperienceId}>
        <FormLabel>회사</FormLabel>
        <Select
          {...register('workExperienceId', {
            required: '회사를 선택해주세요',
          })}
          placeholder="회사를 선택하세요"
        >
          {workExperienceData?.workExperiences.map((we) => (
            <option key={we.id} value={we.id}>
              {we.company}
            </option>
          ))}
        </Select>
        <Button variant="link" onClick={onOpen} mt={2}>
          + 이력 추가하기
        </Button>
        <FormErrorMessage>
          {errors.workExperienceId?.message?.toString()}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.startDate}>
        <FormLabel>시작일</FormLabel>
        <Input
          type="month"
          {...register('startDate', {
            required: '시작일을 입력해주세요',
            validate: (value) =>
              !selectedWorkExperience ||
              (value >= selectedWorkExperience.startDate &&
                value <= selectedWorkExperience.endDate) ||
              '프로젝트 기간은 회사 재직 기간 내에 있어야 합니다',
          })}
        />
        <FormErrorMessage>
          {errors.startDate?.message?.toString()}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.endDate}>
        <FormLabel>종료일</FormLabel>
        <Input
          type="month"
          {...register('endDate', {
            required: '종료일을 입력해주세요',
            validate: {
              afterStart: (value, formValues) =>
                value >= formValues.startDate || '종료일은 시작일보다 늦어야 합니다',
              withinWorkExperience: (value) =>
                !selectedWorkExperience ||
                (value >= selectedWorkExperience.startDate &&
                  value <= selectedWorkExperience.endDate) ||
                '프로젝트 기간은 회사 재직 기간 내에 있어야 합니다',
            },
          })}
        />
        <FormErrorMessage>
          {errors.endDate?.message?.toString()}
        </FormErrorMessage>
      </FormControl>

      <AddWorkExperienceModal
        isOpen={isOpen}
        onClose={onClose}
        onSuccess={handleWorkExperienceSuccess}
      />
    </VStack>
  );
}; 