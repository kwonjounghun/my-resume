import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { UseFormRegister, UseFormSetValue, UseFormGetValues } from 'react-hook-form';
import { CreateRetrospectiveRequest } from '@/entities/retrospective/model/types';
import { format } from 'date-fns';
interface DateRangeInputProps {
  register: UseFormRegister<CreateRetrospectiveRequest>;
  setValue: UseFormSetValue<CreateRetrospectiveRequest>;
  getValues: UseFormGetValues<CreateRetrospectiveRequest>;
  errors: {
    startDate?: {
      message?: string;
    };
    endDate?: {
      message?: string;
    };
  };
  startDate: string;
  endDate: string;
}

export function DateRangeInput({
  register,
  setValue,
  getValues,
  errors,
  startDate,
  endDate,
}: DateRangeInputProps) {
  return (
    <Stack direction="row" spacing={4}>
      <FormControl isInvalid={!!errors.startDate}>
        <FormLabel>시작일</FormLabel>
        <Input
          type="month"
          {...register('startDate', {
            required: '시작일을 입력해주세요.',
            validate: (value) => {
              if (!value) return true;
              const startDate = new Date(value);
              const endDate = new Date(getValues('endDate'));
              return startDate <= endDate || '시작일은 종료일보다 이전이어야 합니다.';
            },
          })}
          value={format(new Date(startDate), 'yyyy-MM')}
          onChange={(e) => {
            setValue('startDate', e.target.value);
          }}
        />
        <FormErrorMessage>{errors.startDate?.message}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.endDate}>
        <FormLabel>종료일</FormLabel>
        <Input
          type="month"
          {...register('endDate', {
            required: '종료일을 입력해주세요.',
            validate: (value) => {
              if (!value) return true;
              const startDate = new Date(getValues('startDate'));
              const endDate = new Date(value);
              return startDate <= endDate || '종료일은 시작일보다 이후여야 합니다.';
            },
          })}
          value={format(new Date(endDate), 'yyyy-MM')}
          onChange={(e) => {
            setValue('endDate', e.target.value);
          }}
        />
        <FormErrorMessage>{errors.endDate?.message}</FormErrorMessage>
      </FormControl>
    </Stack>
  );
} 