import {
  Box,
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { CreateIntroductionRequest, createIntroduction } from '@/entities/introduction/api/createIntroduction';
import { Introduction } from '@/entities/introduction/model/types';

interface IntroductionFormProps {
  mode: 'create' | 'edit';
  initialData?: Introduction;
  onSuccess?: () => void;
}

export default function IntroductionForm({
  mode = 'create',
  initialData,
  onSuccess,
}: IntroductionFormProps) {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateIntroductionRequest>({
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
    },
  });

  const createMutation = useMutation({
    mutationFn: createIntroduction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['introductions'] });
      toast({
        title: '자기소개가 등록되었습니다.',
        status: 'success',
      });
      onSuccess?.();
      router.push('/introductions');
    },
    onError: () => {
      toast({
        title: '자기소개 등록에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const onSubmit = (data: CreateIntroductionRequest) => {
    createMutation.mutate(data);
  };

  return (
    <Card p={6}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={6}>
          <Box display="flex" justifyContent="flex-start">
            <Link href="/introductions" passHref>
              <Button
                variant="ghost"
                leftIcon={<FiArrowLeft />}
                sx={{
                  color: 'gray.600',
                  _hover: { color: 'primary.500' }
                }}
              >
                목록으로
              </Button>
            </Link>
          </Box>

          <FormControl isInvalid={!!errors.title}>
            <FormLabel>제목</FormLabel>
            <Input
              {...register('title', {
                required: '제목을 입력해주세요.',
                maxLength: {
                  value: 100,
                  message: '제목은 100자 이내로 입력해주세요.',
                },
              })}
              placeholder="자기소개 제목을 입력하세요"
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel>내용</FormLabel>
            <Textarea
              {...register('content', {
                required: '내용을 입력해주세요.',
              })}
              placeholder="자기소개 내용을 입력하세요"
              rows={10}
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" isLoading={createMutation.isPending}>
            {mode === 'create' ? '등록하기' : '수정하기'}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
} 