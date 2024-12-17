import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';
import { createCompanyWishlist } from '@/entities/company/api/createCompanyWishlist';
import { CreateCompanyWishlistRequest, CompanyWishlistStatus } from '@/entities/company/model/types';
import { getResumes } from '@/entities/resume/api/getResumes';

interface CompanyWishlistFormProps {
  onSuccess: () => void;
}

export function CompanyWishlistForm({ onSuccess }: CompanyWishlistFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CreateCompanyWishlistRequest & { status: CompanyWishlistStatus }>();

  const { data: resumes, isLoading: isResumesLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: () => getResumes(),
  });

  const onSubmit = async (data: CreateCompanyWishlistRequest & { status: CompanyWishlistStatus }) => {
    try {
      await createCompanyWishlist({ ...data });
      onSuccess();
    } catch (error) {
      console.error('Failed to create company wishlist:', error);
    }
  };

  if (isResumesLoading) return <div>Loading...</div>;

  return (
    <Box as="form" onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing={4} align="stretch">
        <FormControl isInvalid={!!errors.company}>
          <FormLabel htmlFor="company">회사명</FormLabel>
          <Input
            id="company"
            {...register('company', {
              required: '회사명을 입력해주세요',
            })}
          />
          <FormErrorMessage>
            {errors.company && errors.company.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.link}>
          <FormLabel htmlFor="link">채용공고 링크</FormLabel>
          <Input
            id="link"
            {...register('link', {
              required: '채용공고 링크를 입력해주세요',
              pattern: {
                value: /^https?:\/\/.+/,
                message: '올바른 URL을 입력해주세요',
              },
            })}
          />
          <FormErrorMessage>
            {errors.link && errors.link.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.resumeId}>
          <FormLabel htmlFor="resumeId">이력서 선택</FormLabel>
          <Select
            id="resumeId"
            {...register('resumeId', {
              required: '이력서를 선택해주세요',
            })}
          >
            <option value="">이력서를 선택하세요</option>
            {resumes?.resumes.map((resume: { id: number; title: string }) => (
              <option key={resume.id} value={resume.id}>
                {resume.title}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.resumeId && errors.resumeId.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.status}>
          <FormLabel htmlFor="status">지원 상태</FormLabel>
          <Select
            id="status"
            {...register('status', {
              required: '지원 상태를 선택해주세요',
            })}
          >
            <option value="">지원 상태를 선택하세요</option>
            <option value="DOCUMENT_SUBMITTED">서류 제출</option>
            <option value="DOCUMENT_PASSED">서류 합격</option>
            <option value="DOCUMENT_FAILED">서류 불합격</option>
            <option value="ASSIGNMENT_PASSED">과제 합격</option>
            <option value="FIRST_INTERVIEW">1차 면접</option>
            <option value="SECOND_INTERVIEW">2차 면접</option>
            <option value="FINAL_PASSED">최종 합격</option>
            <option value="FINAL_FAILED">최종 불합격</option>
          </Select>
          <FormErrorMessage>
            {errors.status && errors.status.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.description}>
          <FormLabel htmlFor="description">설명</FormLabel>
          <Textarea
            id="description"
            {...register('description')}
            placeholder="채용공고에 대한 설명을 입력하세요"
          />
          <FormErrorMessage>
            {errors.description && errors.description.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          mt={4}
          colorScheme="blue"
          isLoading={isSubmitting}
          type="submit"
        >
          등록
        </Button>
      </VStack>
    </Box>
  );
} 