import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  VStack,
  Textarea,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export const ProjectSituationStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={!!errors.situation}>
        <FormLabel>상황 (Situation)</FormLabel>
        <FormHelperText mb={2}>
          프로젝트를 시작하게 된 배경이나 상황을 설명해주세요.
          <br />
          예시: 기존 시스템의 문제점, 새로운 요구사항의 발생, 시장 환경의 변화 등
        </FormHelperText>
        <Textarea
          {...register('situation', {
            required: '상황을 입력해주세요',
            minLength: {
              value: 50,
              message: '최소 50자 이상 입력해주세요',
            },
            maxLength: {
              value: 2000,
              message: '최대 2000자까지 입력 가능합니다',
            },
          })}
          placeholder="프로젝트의 배경과 상황을 설명해주세요"
          size="lg"
          minH="300px"
          resize="vertical"
        />
        <FormErrorMessage>
          {errors.situation?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
    </VStack>
  );
}; 