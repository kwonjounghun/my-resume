import { Box, Text, VStack, Tag, Flex } from '@chakra-ui/react';
import { format } from 'date-fns';
import { Retrospective } from '../model/types';

interface RetrospectiveDetailProps {
  retrospective: Retrospective;
}

export function RetrospectiveDetail({ retrospective }: RetrospectiveDetailProps) {
  return (
    <VStack spacing={6} align="stretch">
      <Box>
        <Text fontSize="sm" color="gray.500" mb={1}>
          {retrospective.company}
        </Text>
        <Text fontSize="sm" color="gray.500">
          {format(new Date(retrospective.startDate), 'yyyy.MM')} -{' '}
          {format(new Date(retrospective.endDate), 'yyyy.MM')}
        </Text>
      </Box>

      {retrospective.summary && (
        <Box>
          <Text fontWeight="bold" mb={2}>
            요약
          </Text>
          <Text color="gray.700">{retrospective.summary}</Text>
        </Box>
      )}

      <Box>
        <Text fontWeight="bold" mb={2}>
          상황 (Situation)
        </Text>
        <Text color="gray.700" whiteSpace="pre-wrap">
          {retrospective.situation}
        </Text>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          과제 (Task)
        </Text>
        <Text color="gray.700" whiteSpace="pre-wrap">
          {retrospective.task}
        </Text>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          행동 (Action)
        </Text>
        <Text color="gray.700" whiteSpace="pre-wrap">
          {retrospective.action}
        </Text>
      </Box>

      <Box>
        <Text fontWeight="bold" mb={2}>
          결과 (Result)
        </Text>
        <Text color="gray.700" whiteSpace="pre-wrap">
          {retrospective.result}
        </Text>
      </Box>

      {retrospective.keywords.length > 0 && (
        <Box>
          <Text fontWeight="bold" mb={2}>
            키워드
          </Text>
          <Flex gap={2} wrap="wrap">
            {retrospective.keywords.map((keyword) => (
              <Tag
                key={keyword}
                size="md"
                colorScheme="blue"
                variant="subtle"
              >
                {keyword}
              </Tag>
            ))}
          </Flex>
        </Box>
      )}

      <Box>
        <Text fontWeight="bold" mb={2}>
          공개 여부
        </Text>
        <Tag
          size="md"
          colorScheme={retrospective.isPublic ? 'green' : 'red'}
          variant="subtle"
        >
          {retrospective.isPublic ? '공개' : '비공개'}
        </Tag>
      </Box>
    </VStack>
  );
} 