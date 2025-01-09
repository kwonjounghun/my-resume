import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createWorkExperience } from '@/entities/workExperiences/api';
import { CreateWorkExperience, WorkExperience } from '@/entities/workExperiences/model';

interface AddWorkExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (workExperience: WorkExperience) => void;
}

export const AddWorkExperienceModal = ({
  isOpen,
  onClose,
  onSuccess,
}: AddWorkExperienceModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateWorkExperience>();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createWorkExperience,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['workExperiences'] });
      onSuccess?.(data);
      reset();
      onClose();
    },
  });

  const onSubmit = (data: CreateWorkExperience) => {
    mutate(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalHeader>이력 추가</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isInvalid={!!errors.company}>
                <FormLabel>회사명</FormLabel>
                <Input
                  {...register('company', {
                    required: '회사명을 입력해주세요',
                  })}
                />
                <FormErrorMessage>
                  {errors.company && errors.company.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.startDate}>
                <FormLabel>시작일</FormLabel>
                <Input
                  type="date"
                  {...register('startDate', {
                    required: '시작일을 입력해주세요',
                  })}
                />
                <FormErrorMessage>
                  {errors.startDate && errors.startDate.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.endDate}>
                <FormLabel>종료일</FormLabel>
                <Input
                  type="date"
                  {...register('endDate', {
                    required: '종료일을 입력해주세요',
                    validate: (value, formValues) =>
                      value >= formValues.startDate || '종료일은 시작일보다 늦어야 합니다',
                  })}
                />
                <FormErrorMessage>
                  {errors.endDate && errors.endDate.message}
                </FormErrorMessage>
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              취소
            </Button>
            <Button
              colorScheme="blue"
              type="submit"
              isLoading={isPending}
            >
              추가
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  );
}; 