import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Switch,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { CompanyWishlist, CompanyWishlistStatus } from '@/entities/company/model/types';
import { updateCompanyWishlist } from '@/entities/company/api/updateCompanyWishlist';
import { Resume } from '@/entities/resume/model/types';

interface CompanyWishlistEditFormProps {
  id: string;
  initialData: CompanyWishlist;
  resumes: Resume[];
}

interface FormData {
  company: string;
  link: string;
  status: CompanyWishlistStatus;
  description: string;
  isJobApplied: boolean;
  resumeId: string;
}

export default function CompanyWishlistEditForm({ id, initialData, resumes }: CompanyWishlistEditFormProps) {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      company: initialData.company,
      link: initialData.link,
      status: initialData.status,
      description: initialData.description,
      isJobApplied: initialData.isJobApplied,
      resumeId: initialData.resumeId,
    },
  });

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => updateCompanyWishlist(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['companyWishlist'] });
      toast({
        title: '관심기업이 수정되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push(`/companies/${id}`);
    },
    onError: () => {
      toast({
        title: '관심기업 수정에 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = (data: FormData) => {
    mutate(data);
  };

  return (
    <Card>
      <CardHeader>
        <Heading size="lg">관심기업 수정</Heading>
      </CardHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.company}>
              <FormLabel>회사명</FormLabel>
              <Input
                {...register('company', {
                  required: '회사명은 필수입니다.',
                })}
              />
              <FormErrorMessage>
                {errors.company && errors.company.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.link}>
              <FormLabel>채용공고 링크</FormLabel>
              <Input
                {...register('link', {
                  required: '채용공고 링크는 필수입니다.',
                  pattern: {
                    value: /^https?:\/\/.+/,
                    message: '올바른 URL을 입력해주세요.',
                  },
                })}
              />
              <FormErrorMessage>
                {errors.link && errors.link.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.resumeId}>
              <FormLabel htmlFor="resumeId">이력서</FormLabel>
              <Select
                id="resumeId"
                {...register('resumeId', {
                  required: '이력서는 필수입니다.',
                  valueAsNumber: true,
                })}
              >
                <option value="">이력서를 선택해주세요.</option>
                {resumes.map((resume) => (
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
              <FormLabel>지원 상태</FormLabel>
              <Select
                {...register('status', {
                  required: '지원 상태는 필수입니다.',
                })}
              >
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
              <FormLabel>설명</FormLabel>
              <Textarea
                {...register('description')}
              />
              <FormErrorMessage>
                {errors.description && errors.description.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl>
              <FormLabel>지원 완료</FormLabel>
              <Switch {...register('isJobApplied')} />
            </FormControl>
          </Stack>
        </CardBody>

        <CardFooter>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
            mr={3}
          >
            수정
          </Button>
          <Button onClick={() => router.back()}>취소</Button>
        </CardFooter>
      </form>
    </Card>
  );
} 