import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  FormHelperText,
  VStack,
  Textarea,
  Switch,
} from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';

export const ProjectResultStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <VStack spacing={4} align="stretch">
      <FormControl isInvalid={!!errors.result}>
        <FormLabel>결과 (Result)</FormLabel>
        <FormHelperText mb={2}>
          프로젝트를 통해 달성한 결과와 성과를 구체적으로 설명해주세요.
          <br />
          예시: 정량적/정성적 성과, 사용자/고객 반응, 기술적 성취, 비즈니스 임팩트 등
        </FormHelperText>
        <Textarea
          {...register('result', {
            required: '결과를 입력해주세요',
            minLength: {
              value: 50,
              message: '최소 50자 이상 입력해주세요',
            },
            maxLength: {
              value: 2000,
              message: '최대 2000자까지 입력 가능합니다',
            },
          })}
          placeholder="프로젝트를 통해 달성한 결과와 성과를 설명해주세요"
          size="lg"
          minH="300px"
          resize="vertical"
        />
        <FormErrorMessage>
          {errors.result?.message?.toString()}
        </FormErrorMessage>
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">공개 여부</FormLabel>
        <Switch {...register('isPublic')} defaultChecked />
      </FormControl>
    </VStack>
  );
}; 