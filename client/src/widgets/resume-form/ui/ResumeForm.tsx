import {
  Box,
  Button,
  Card,
  CardBody,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useForm, Controller } from 'react-hook-form';
import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';
import { CreateResumeRequest, Resume } from '@/entities/resume/model/types';
import { createResume } from '@/entities/resume/api/createResume';
import { updateResume } from '@/entities/resume/api/updateResume';
import { getIntroductions } from '@/entities/introduction/api/getIntroductions';
import { getRetrospectives } from '@/entities/retrospective/api/getRetrospectives';

interface ResumeFormProps {
  mode: 'create' | 'edit';
  initialData?: Resume;
  onSuccess?: () => void;
}

export default function ResumeForm({
  mode = 'create',
  initialData,
  onSuccess,
}: ResumeFormProps) {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();

  const { data: introductionsData } = useQuery({
    queryKey: ['introductions'],
    queryFn: () => getIntroductions(),
  });

  const { data: retrospectivesData } = useQuery({
    queryKey: ['retrospectives'],
    queryFn: () => getRetrospectives(),
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<CreateResumeRequest>({
    defaultValues: {
      title: initialData?.title || '',
      content: initialData?.content || '',
      selfIntroductionId: initialData?.selfIntroductionId || undefined,
      projects: initialData?.projects || [],
      isPublic: initialData?.isPublic ?? false,
    },
  });

  const createMutation = useMutation({
    mutationFn: createResume,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: '이력서가 등록되었습니다.',
        status: 'success',
      });
      onSuccess?.();
      router.push('/resumes');
    },
    onError: () => {
      toast({
        title: '이력서 등록에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Resume> }) =>
      updateResume(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resumes'] });
      toast({
        title: '이력서가 수정되었습니다.',
        status: 'success',
      });
      onSuccess?.();
      router.push('/resumes');
    },
    onError: () => {
      toast({
        title: '이력서 수정에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const onSubmit = (data: CreateResumeRequest) => {
    if (mode === 'edit' && initialData) {
      updateMutation.mutate({ id: initialData.id, data });
    } else {
      createMutation.mutate(data);
    }
  };

  // 요약 내용이 있는 회고만 필터링
  const availableRetrospectives = retrospectivesData?.retrospectives.filter(
    (retro) => retro.summary
  ) || [];

  return (
    <Card p={6}>
      <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Stack spacing={6}>
          <Box display="flex" justifyContent="flex-start">
            <Link href="/resumes" passHref>
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
              placeholder="이력서 제목을 입력하세요"
            />
            <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel>자기소개서 선택</FormLabel>
            <Controller
              name="selfIntroductionId"
              control={control}
              render={({ field }) => (
                <RadioGroup {...field} value={field.value?.toString() || ''}>
                  <Stack>
                    {introductionsData?.introductions.map((intro) => (
                      <Radio
                        key={intro.id}
                        value={intro.id.toString()}
                        onChange={(e) => field.onChange(e.target.value)}
                      >
                        <Box>
                          <Text fontWeight="medium">{intro.title}</Text>
                          <Text fontSize="sm" color="gray.600" noOfLines={2}>
                            {intro.content}
                          </Text>
                        </Box>
                      </Radio>
                    ))}
                  </Stack>
                </RadioGroup>
              )}
            />
            {(!introductionsData?.introductions || introductionsData.introductions.length === 0) && (
              <Text color="gray.500" mt={2}>
                작성된 자기소개서가 없습니다.
              </Text>
            )}
          </FormControl>

          <FormControl>
            <FormLabel>프로젝트 회고 선택</FormLabel>
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={4}>
              {availableRetrospectives.map((retro) => (
                <Controller
                  key={retro.id}
                  name="projects"
                  control={control}
                  render={({ field }) => (
                    <Card
                      variant="outline"
                      cursor="pointer"
                      onClick={() => {
                        const newValue = field.value?.includes(retro.id)
                          ? field.value.filter((id) => id !== retro.id)
                          : [...(field.value || []), retro.id];
                        field.onChange(newValue);
                      }}
                      bg={field.value?.includes(retro.id) ? 'primary.50' : 'white'}
                      borderColor={field.value?.includes(retro.id) ? 'primary.500' : 'gray.200'}
                      _hover={{
                        borderColor: 'primary.500',
                      }}
                    >
                      <CardBody>
                        <Stack spacing={2}>
                          <Checkbox
                            isChecked={field.value?.includes(retro.id)}
                            onChange={() => { }}
                            sx={{
                              '.chakra-checkbox__control': {
                                borderColor: field.value?.includes(retro.id) ? 'primary.500' : 'gray.200',
                              }
                            }}
                          >
                            <Text fontWeight="medium">{retro.title}</Text>
                          </Checkbox>
                          <Text fontSize="sm" color="gray.600">
                            {retro.summary}
                          </Text>
                          <Text fontSize="xs" color="gray.500">
                            {new Date(retro.startDate).toLocaleDateString()} - {new Date(retro.endDate).toLocaleDateString()}
                          </Text>
                        </Stack>
                      </CardBody>
                    </Card>
                  )}
                />
              ))}
            </Grid>
            {availableRetrospectives.length === 0 && (
              <Text color="gray.500" mt={2}>
                요약이 작성된 회고가 없습니다.
              </Text>
            )}
          </FormControl>

          <FormControl isInvalid={!!errors.content}>
            <FormLabel>내용</FormLabel>
            <Textarea
              {...register('content', {
                required: '내용을 입력해주세요.',
              })}
              placeholder="이력서 내용을 입력하세요"
              rows={10}
            />
            <FormErrorMessage>{errors.content?.message}</FormErrorMessage>
          </FormControl>

          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="isPublic" mb={0}>
              공개 여부
            </FormLabel>
            <Controller
              name="isPublic"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Switch
                  id="isPublic"
                  isChecked={value}
                  onChange={(e) => onChange(e.target.checked)}
                  colorScheme="primary"
                />
              )}
            />
          </FormControl>

          <Button
            type="submit"
            isLoading={createMutation.isPending || updateMutation.isPending}
          >
            {mode === 'create' ? '등록하기' : '수정하기'}
          </Button>
        </Stack>
      </Box>
    </Card>
  );
} 