import {
  Box,
  Button,
  Card,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Switch,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CreateRetrospectiveRequest, Retrospective } from '@/entities/retrospective/model/types';
import { createRetrospective } from '@/entities/retrospective/api/createRetrospective';
import { updateRetrospective } from '@/entities/retrospective/api/updateRetrospective';
import { useState } from 'react';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { formatDateToKorean, parseKoreanDate } from '@/shared/lib/date';

interface RetrospectiveFormProps {
  mode: 'create' | 'edit';
  initialData?: Retrospective;
  onSuccess?: () => void;
}

export default function RetrospectiveForm({
  mode = 'create',
  initialData,
  onSuccess,
}: RetrospectiveFormProps) {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || []);
  const [newKeyword, setNewKeyword] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<CreateRetrospectiveRequest>({
    defaultValues: {
      title: initialData?.title || '',
      company: initialData?.company || '',
      startDate: initialData?.startDate ? formatDateToKorean(new Date(initialData.startDate)) : '',
      endDate: initialData?.endDate ? formatDateToKorean(new Date(initialData.endDate)) : '',
      situation: initialData?.situation || '',
      task: initialData?.task || '',
      action: initialData?.action || '',
      result: initialData?.result || '',
      isPublic: initialData?.isPublic ?? true,
      keywords: initialData?.keywords || [],
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: CreateRetrospectiveRequest) => {
      const formattedData = {
        ...data,
        startDate: data.startDate ? parseKoreanDate(data.startDate).toISOString() : '',
        endDate: data.endDate ? parseKoreanDate(data.endDate).toISOString() : '',
      };
      return createRetrospective(formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retrospectives'] });
      toast({
        title: '회고가 등록되었습니다.',
        status: 'success',
      });
      onSuccess?.();
      router.push('/retrospectives');
    },
    onError: () => {
      toast({
        title: '회고 등록에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Retrospective> }) => {
      const formattedData = {
        ...data,
        startDate: data.startDate ? parseKoreanDate(data.startDate).toISOString() : '',
        endDate: data.endDate ? parseKoreanDate(data.endDate).toISOString() : '',
      };
      return updateRetrospective(id, formattedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retrospectives'] });
      toast({
        title: '회고가 수정되었습니다.',
        status: 'success',
      });
      onSuccess?.();
      router.push('/retrospectives');
    },
    onError: () => {
      toast({
        title: '회고 수정에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const handleKeywordAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newKeyword.trim()) {
      e.preventDefault();
      if (keywords.length >= 10) {
        toast({
          title: '키워드는 최대 10개까지 추가할 수 있습니다.',
          status: 'warning',
        });
        return;
      }
      if (!keywords.includes(newKeyword.trim())) {
        setKeywords([...keywords, newKeyword.trim()]);
      }
      setNewKeyword('');
    }
  };

  const handleKeywordRemove = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const onSubmit = (data: CreateRetrospectiveRequest) => {
    const submitData = {
      ...data,
      keywords,
    };

    if (mode === 'create') {
      createMutation.mutate(submitData);
    } else if (initialData?.id) {
      updateMutation.mutate({
        id: initialData.id,
        data: submitData,
      });
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;

  return (
    <Card p={6}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={6}>
          <Box display="flex" justifyContent="flex-start">
            <Link href="/retrospectives" passHref>
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
              placeholder="프로젝트 제목을 입력하세요"
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.company}>
            <FormLabel>회사</FormLabel>
            <Input
              {...register('company', {
                required: '회사를 입력해주세요.',
              })}
              placeholder="회사명을 입력하세요"
            />
            <FormErrorMessage>{errors.company?.message}</FormErrorMessage>
          </FormControl>

          <Stack direction="row" spacing={4}>
            <FormControl isInvalid={!!errors.startDate}>
              <FormLabel>시작일</FormLabel>
              <Input
                type="date"
                placeholder="YYYY.MM.DD"
                {...register('startDate', {
                  required: '시작일을 입력해주세요.',
                  pattern: {
                    value: /^\d{4}\.\d{2}\.\d{2}$/,
                    message: 'YYYY.MM.DD 형식으로 입력해주세요.',
                  },
                  validate: (value) => {
                    if (!value) return true;
                    const startDate = parseKoreanDate(value);
                    const endDate = parseKoreanDate(getValues('endDate'));
                    return startDate <= endDate || '시작일은 종료일보다 이전이어야 합니다.';
                  },
                })}
              />
              <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={!!errors.endDate}>
              <FormLabel>종료일</FormLabel>
              <Input
                type="date"
                placeholder="YYYY.MM.DD"
                {...register('endDate', {
                  required: '종료일을 입력해주세요.',
                  pattern: {
                    value: /^\d{4}\.\d{2}\.\d{2}$/,
                    message: 'YYYY.MM.DD 형식으로 입력해주세요.',
                  },
                  validate: (value) => {
                    if (!value) return true;
                    const startDate = parseKoreanDate(getValues('startDate'));
                    const endDate = parseKoreanDate(value);
                    return startDate <= endDate || '종료일은 시작일보다 이후여야 합니다.';
                  },
                })}
              />
              <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
            </FormControl>
          </Stack>

          <FormControl>
            <FormLabel>키워드</FormLabel>
            <Input
              value={newKeyword}
              onChange={(e) => setNewKeyword(e.target.value)}
              onKeyDown={handleKeywordAdd}
              placeholder="키워드를 입력하고 Enter를 누르세요"
            />
            <Text fontSize="sm" color="gray.500" mt={1}>
              최대 10개까지 추가할 수 있습니다.
            </Text>
            {keywords.length > 0 && (
              <Box mt={2}>
                <Stack direction="row" wrap="wrap" spacing={2}>
                  {keywords.map((keyword) => (
                    <Tag
                      key={keyword}
                      size="md"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="primary"
                    >
                      <TagLabel>{keyword}</TagLabel>
                      <TagCloseButton
                        aria-label={`${keyword} 삭제`}
                        onClick={() => handleKeywordRemove(keyword)}
                      />
                    </Tag>
                  ))}
                </Stack>
              </Box>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.situation}>
            <FormLabel>상황 (Situation)</FormLabel>
            <Textarea
              {...register('situation', {
                required: '상황을 입력해주세요.',
              })}
              placeholder="어떤 상황이었나요?"
              rows={3}
            />
            <FormErrorMessage>{errors.situation?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.task}>
            <FormLabel>과제 (Task)</FormLabel>
            <Textarea
              {...register('task', {
                required: '과제를 입력해주세요.',
              })}
              placeholder="어떤 과제가 주어졌나요?"
              rows={3}
            />
            <FormErrorMessage>{errors.task?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.action}>
            <FormLabel>행동 (Action)</FormLabel>
            <Textarea
              {...register('action', {
                required: '행동을 입력해주세요.',
              })}
              placeholder="어떤 행동을 취했나요?"
              rows={3}
            />
            <FormErrorMessage>{errors.action?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.result}>
            <FormLabel>결과 (Result)</FormLabel>
            <Textarea
              {...register('result', {
                required: '결과를 입력해주세요.',
              })}
              placeholder="어떤 결과가 있었나요?"
              rows={3}
            />
            <FormErrorMessage>{errors.result?.message}</FormErrorMessage>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="isPublic" mb={0}>
              공개 여부
            </FormLabel>
            <Switch
              id="isPublic"
              {...register('isPublic')}
              defaultChecked
              colorScheme="primary"
            />
          </FormControl>

          <Button type="submit" isLoading={isPending}>
            {mode === 'create' ? '등록하기' : '수정하기'}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
} 