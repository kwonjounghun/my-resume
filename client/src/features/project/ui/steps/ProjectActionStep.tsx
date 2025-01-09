import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  VStack,
  Textarea,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export const ProjectActionStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={!!errors.action}>
        <FormLabel>행동 (Action)</FormLabel>
        <FormHelperText mb={2}>
          과제 해결을 위해 구체적으로 어떤 행동을 취했는지 설명해주세요.
          <br />
          예시: 사용한 기술과 방법론, 문제 해결 과정, 팀 내 역할과 기여도 등
        </FormHelperText>
        <Textarea
          {...register('action', {
            required: '행동을 입력해주세요',
            minLength: {
              value: 50,
              message: '최소 50자 이상 입력해주세요',
            },
            maxLength: {
              value: 2000,
              message: '최대 2000자까지 입력 가능합니다',
            },
          })}
          placeholder="문제 해결을 위해 수행한 구체적인 행동을 설명해주세요"
          size="lg"
          minH="300px"
          resize="vertical"
        />
        <FormErrorMessage>
          {errors.action?.message?.toString()}
        </FormErrorMessage>
      </FormControl>
    </VStack>
  );
}; 