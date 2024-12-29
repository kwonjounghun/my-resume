import {
  Box,
  Button,
  Card,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Switch,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { CreateRetrospectiveRequest, Retrospective } from '@/entities/retrospective/model/types';
import { useState } from 'react';
import { format } from 'date-fns';
import { KeywordInput } from './KeywordInput';
import { DateRangeInput } from './DateRangeInput';
import { useRouter } from 'next/router';
import { StarFieldGuideModal } from '../StarFieldGuideModal';
import { STAR_FIELD_GUIDES } from '../../lib/starGuides';

interface RetrospectiveFormProps {
  initialData?: Retrospective;
  isPending: boolean;
  submitText: string;
  onSubmit: (data: CreateRetrospectiveRequest) => void;
}

export default function RetrospectiveForm({
  submitText,
  initialData,
  isPending,
  onSubmit,
}: RetrospectiveFormProps) {
  const router = useRouter();
  const [keywords, setKeywords] = useState<string[]>(initialData?.keywords || []);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedField, setSelectedField] = useState<'situation' | 'task' | 'action' | 'result' | null>(null);
  const handleStarFieldGuideClick = (field: 'situation' | 'task' | 'action' | 'result') => {
    onOpen();
    setSelectedField(field);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    watch,
  } = useForm<CreateRetrospectiveRequest>({
    defaultValues: {
      title: initialData?.title || '',
      company: initialData?.company || '',
      startDate: initialData?.startDate ? format(initialData.startDate, 'yyyy-MM') : '',
      endDate: initialData?.endDate ? format(initialData.endDate, 'yyyy-MM') : '',
      situation: initialData?.situation || '',
      task: initialData?.task || '',
      action: initialData?.action || '',
      result: initialData?.result || '',
      isPublic: initialData?.isPublic || false,
      keywords: initialData?.keywords || [],
    },
  });

  const startDate = watch('startDate');
  const endDate = watch('endDate');

  return (
    <>
      <Card p={6}>
        <Box as="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={6}>
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

            <DateRangeInput
              register={register}
              setValue={setValue}
              getValues={getValues}
              errors={errors}
              startDate={startDate}
              endDate={endDate}
            />

            <FormControl isInvalid={!!errors.situation}>
              <FormLabel>상황 (Situation)</FormLabel>
              <Textarea
                onClick={() => handleStarFieldGuideClick('situation')}
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
                onClick={() => handleStarFieldGuideClick('task')}
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
                onClick={() => handleStarFieldGuideClick('action')}
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
                onClick={() => handleStarFieldGuideClick('result')}
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
                colorScheme="primary"
              />
            </FormControl>

            <FormControl>
              <FormLabel>키워드</FormLabel>
              <KeywordInput keywords={keywords} onChange={setKeywords} />
            </FormControl>

            <Flex justify="flex-end">
              <Button variant="outline" onClick={() => router.back()} mr={2}>
                취소
              </Button>
              <Button type="submit" isLoading={isPending}>
                {submitText}
              </Button>
            </Flex>
          </Stack>
        </Box>
      </Card>

      {selectedField && (
        <StarFieldGuideModal
          key={selectedField}
          isOpen={isOpen}
          onClose={onClose}
          title={STAR_FIELD_GUIDES[selectedField].title}
          guide={STAR_FIELD_GUIDES[selectedField].guide}
          initialValue={getValues(selectedField)}
          onComplete={(value) => {
            setValue(selectedField, value);
          }}
        />
      )}
    </>
  );
} 