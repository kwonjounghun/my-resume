import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { FiArrowLeft, FiCheck, FiX } from 'react-icons/fi';
import { getIntroduction } from '@/entities/introduction/api/getIntroduction';
import { updateIntroduction } from '@/entities/introduction/api/updateIntroduction';
import { useEffect } from 'react';

interface FormValues {
  title: string;
  content: string;
}

export default function IntroductionEditPage() {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <div>loading...</div>;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>();

  const { data: introduction, isLoading } = useQuery({
    queryKey: ['introduction', id],
    queryFn: () => getIntroduction(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (introduction) {
      reset({
        title: introduction.title,
        content: introduction.content,
      });
    }
  }, [introduction, reset]);

  const { mutate: updateMutation, isPending: isUpdating } = useMutation({
    mutationFn: (data: FormValues) => updateIntroduction(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['introduction', id] });
      toast({
        title: '자기소개가 수정되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      router.push(`/introductions/${id}`);
    },
    onError: () => {
      toast({
        title: '자기소개 수정에 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    updateMutation(data);
  });

  const handleCancel = () => {
    router.push(`/introductions/${id}`);
  };

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box>로딩 중...</Box>
      </Container>
    );
  }

  if (!introduction) {
    return (
      <Container maxW="container.xl" py={8}>
        <Box>자기소개를 찾을 수 없습니다.</Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={6}>
        <Flex justify="space-between" align="center">
          <Button
            variant="ghost"
            leftIcon={<FiArrowLeft />}
            onClick={handleCancel}
            aria-label="뒤로 가기"
            sx={{
              color: 'gray.600',
              _hover: { color: 'primary.500' },
            }}
          >
            뒤로 가기
          </Button>
        </Flex>

        <Card p={6}>
          <form onSubmit={onSubmit}>
            <Stack spacing={6}>
              <FormControl isInvalid={!!errors.title}>
                <FormLabel htmlFor="title">제목</FormLabel>
                <Input
                  id="title"
                  {...register('title', {
                    required: '제목을 입력해주세요.',
                  })}
                />
                <FormErrorMessage>
                  {errors.title && errors.title.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.content}>
                <FormLabel htmlFor="content">내용</FormLabel>
                <Textarea
                  id="content"
                  minH="300px"
                  {...register('content', {
                    required: '내용을 입력해주세요.',
                  })}
                />
                <FormErrorMessage>
                  {errors.content && errors.content.message}
                </FormErrorMessage>
              </FormControl>

              <Flex gap={2} justify="flex-end">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                  leftIcon={<FiX />}
                  aria-label="취소하고 돌아가기"
                >
                  취소하고 돌아가기
                </Button>
                <Button
                  type="submit"
                  colorScheme="primary"
                  isLoading={isUpdating}
                  leftIcon={<FiCheck />}
                >
                  수정하기
                </Button>
              </Flex>
            </Stack>
          </form>
        </Card>
      </Stack>
    </Container>
  );
} 