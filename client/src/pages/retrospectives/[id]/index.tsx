import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Stack,
  Tag,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { format } from 'date-fns';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getRetrospective } from '@/entities/retrospective/api/getRetrospective';
import { deleteRetrospective } from '@/entities/retrospective/api/deleteRetrospective';
import { summarizeRetrospective } from '@/entities/retrospective/api/summarizeRetrospective';

export default function RetrospectiveDetailPage() {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return null;
  }

  const { data: retrospective, isLoading } = useQuery({
    queryKey: ['retrospective', id],
    queryFn: () => getRetrospective(id),
    enabled: !!id,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteRetrospective,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retrospectives'] });
      toast({
        title: '회고가 삭제되었습니다.',
        status: 'success',
      });
      router.push('/retrospectives');
    },
    onError: () => {
      toast({
        title: '회고 삭제에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const summarizeMutation = useMutation({
    mutationFn: summarizeRetrospective,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['retrospective', id] });
      toast({
        title: '회고가 요약되었습니다.',
        status: 'success',
      });
    },
    onError: () => {
      toast({
        title: '회고 요약에 실패했습니다.',
        status: 'error',
      });
    },
  });

  const handleDelete = () => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      deleteMutation.mutate(Number(id));
    }
  };

  const handleSummarize = () => {
    if (retrospective) {
      summarizeMutation.mutate(Number(id));
    }
  };

  const canSummarize = retrospective && !retrospective.summary && retrospective.situation && retrospective.task && retrospective.action && retrospective.result;

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>로딩 중...</Text>
      </Container>
    );
  }

  if (!retrospective) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>회고를 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={6}>
        <Flex justify="space-between" align="center">
          <Link href="/retrospectives" passHref>
            <Button
              variant="ghost"
              leftIcon={<FiArrowLeft />}
              sx={{
                color: 'gray.600',
                _hover: { color: 'primary.500' },
              }}
            >
              목록으로
            </Button>
          </Link>
          <Flex gap={2}>
            {canSummarize && (
              <Button
                onClick={handleSummarize}
                isLoading={summarizeMutation.isPending}
                data-testid="summarize-button"
              >
                회고 요약하기
              </Button>
            )}
            <Link
              href={`/retrospectives/${retrospective.id}/edit`}
              passHref
            >
              <Button
                variant="outline"
                leftIcon={<FiEdit2 />}
                colorScheme="primary"
              >
                수정하기
              </Button>
            </Link>
            <Button
              variant="outline"
              colorScheme="red"
              leftIcon={<FiTrash2 />}
              onClick={handleDelete}
              isLoading={deleteMutation.isPending}
            >
              삭제하기
            </Button>
          </Flex>
        </Flex>

        <Card p={6}>
          <Stack spacing={6}>
            <Box>
              <Text fontSize="sm" color="gray.500" mb={1}>
                {retrospective.company}
              </Text>
              <Heading size="lg" mb={2}>
                {retrospective.title}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {format(new Date(retrospective.startDate), 'yyyy.MM.dd')} -{' '}
                {format(new Date(retrospective.endDate), 'yyyy.MM.dd')}
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
                      colorScheme="primary"
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
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
} 