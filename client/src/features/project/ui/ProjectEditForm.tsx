import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Select,
  Stack,
  Textarea,
  Switch,
  Tag,
  TagLabel,
  TagCloseButton,
  HStack,
  Text,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Project, UpdateProjectDto } from '@/shared/api/project';
import { WorkExperience } from '@/shared/api/work-experience';
import { useState } from 'react';

interface ProjectEditFormProps {
  project: Project;
  workExperiences: { workExperiences: WorkExperience[] };
  onSubmit: (data: UpdateProjectDto) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export const ProjectEditForm = ({
  project,
  workExperiences,
  onSubmit,
  onCancel,
  isSubmitting = false,
}: ProjectEditFormProps) => {
  const [keywords, setKeywords] = useState<string[]>(project.keywords || []);
  const [newKeyword, setNewKeyword] = useState('');

  const { register, handleSubmit, formState: { errors } } = useForm<UpdateProjectDto>({
    defaultValues: {
      title: project.title,
      startDate: project.startDate,
      endDate: project.endDate,
      situation: project.situation,
      task: project.task,
      action: project.action,
      summary: project.summary,
      result: project.result,
      isPublic: project.isPublic,
      workExperienceId: project.workExperienceId,
    },
  });

  const handleKeywordAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newKeyword.trim()) {
      e.preventDefault();
      if (!keywords.includes(newKeyword.trim())) {
        setKeywords([...keywords, newKeyword.trim()]);
      }
      setNewKeyword('');
    }
  };

  const handleKeywordRemove = (keywordToRemove: string) => {
    setKeywords(keywords.filter(k => k !== keywordToRemove));
  };

  const handleFormSubmit = (data: UpdateProjectDto) => {
    onSubmit({
      ...data,
      keywords,
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Stack spacing={6}>
        <FormControl isInvalid={!!errors.title}>
          <FormLabel>프로젝트 제목</FormLabel>
          <Input
            {...register('title', { required: '프로젝트 제목을 입력해주세요.' })}
            placeholder="프로젝트 제목을 입력하세요"
          />
          <FormErrorMessage>{errors.title?.message}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.workExperienceId}>
          <FormLabel>회사</FormLabel>
          <Select
            {...register('workExperienceId', { required: '회사를 선택해주세요.' })}
            placeholder="회사를 선택하세요"
          >
            {workExperiences.workExperiences.map((we) => (
              <option key={we.id} value={we.id}>
                {we.company}
              </option>
            ))}
          </Select>
          <FormErrorMessage>{errors.workExperienceId?.message}</FormErrorMessage>
        </FormControl>

        <Stack direction="row" spacing={4}>
          <FormControl isInvalid={!!errors.startDate}>
            <FormLabel>시작일</FormLabel>
            <Input
              {...register('startDate', { required: '시작일을 입력해주세요.' })}
              type="month"
            />
            <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={!!errors.endDate}>
            <FormLabel>종료일</FormLabel>
            <Input
              {...register('endDate', { required: '종료일을 입력해주세요.' })}
              type="month"
            />
            <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
          </FormControl>
        </Stack>

        {project.summary && (
          <FormControl>
            <FormLabel>요약</FormLabel>
            <Text color="gray.600" fontSize="sm" mb={2}>
              * 요약은 STAR 내용을 기반으로 자동 생성되며, 직접 수정할 수 없습니다.
            </Text>
            <Textarea
              {...register('summary')}
            />
          </FormControl>
        )}

        <FormControl>
          <FormLabel>상황 (Situation)</FormLabel>
          <Textarea
            {...register('situation')}
            placeholder="프로젝트를 시작하게 된 배경이나 상황을 설명해주세요"
            minH="150px"
          />
        </FormControl>

        <FormControl>
          <FormLabel>과제 (Task)</FormLabel>
          <Textarea
            {...register('task')}
            placeholder="해결해야 할 과제나 목표를 설명해주세요"
            minH="150px"
          />
        </FormControl>

        <FormControl>
          <FormLabel>행동 (Action)</FormLabel>
          <Textarea
            {...register('action')}
            placeholder="과제 해결을 위해 어떤 행동을 했는지 설명해주세요"
            minH="150px"
          />
        </FormControl>

        <FormControl>
          <FormLabel>결과 (Result)</FormLabel>
          <Textarea
            {...register('result')}
            placeholder="프로젝트의 결과와 성과를 설명해주세요"
            minH="150px"
          />
        </FormControl>

        <FormControl>
          <FormLabel>키워드</FormLabel>
          <Text color="gray.600" fontSize="sm" mb={2}>
            * Enter 키를 눌러 키워드를 추가할 수 있습니다.
          </Text>
          <Input
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            onKeyPress={handleKeywordAdd}
            placeholder="새로운 키워드를 입력하세요"
            mb={2}
          />
          <HStack spacing={2} wrap="wrap">
            {keywords.map((keyword, index) => (
              <Tag
                key={index}
                size="md"
                borderRadius="full"
                variant="solid"
                colorScheme="blue"
              >
                <TagLabel>{keyword}</TagLabel>
                <TagCloseButton onClick={() => handleKeywordRemove(keyword)} />
              </Tag>
            ))}
          </HStack>
        </FormControl>

        <FormControl display="flex" alignItems="center">
          <FormLabel mb="0">공개 여부</FormLabel>
          <Switch {...register('isPublic')} />
        </FormControl>

        <Stack direction="row" spacing={4} justify="flex-end">
          <Button variant="outline" onClick={onCancel}>
            취소
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isLoading={isSubmitting}
          >
            수정하기
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}; 