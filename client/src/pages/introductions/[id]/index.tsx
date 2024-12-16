import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { format } from 'date-fns';
import { FiArrowLeft, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { getIntroduction } from '@/entities/introduction/api/getIntroduction';

export default function IntroductionDetailPage() {
  const router = useRouter();
  const toast = useToast();
  const queryClient = useQueryClient();
  const { id } = router.query;

  const { data: introduction, isLoading } = useQuery({
    queryKey: ['introduction', id],
    queryFn: () => getIntroduction(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>로딩 중...</Text>
      </Container>
    );
  }

  if (!introduction) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>자기소개를 찾을 수 없습니다.</Text>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={6}>
        <Flex justify="space-between" align="center">
          <Link href="/introductions" passHref>
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
            <Link
              href={`/introductions/${introduction.id}/edit`}
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
            >
              삭제하기
            </Button>
          </Flex>
        </Flex>

        <Card p={6}>
          <Stack spacing={6}>
            <Box>
              <Heading size="lg" mb={2}>
                {introduction.title}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {format(new Date(introduction.createdAt), 'yyyy.MM.dd')}
              </Text>
            </Box>

            <Box>
              <Text color="gray.700" whiteSpace="pre-wrap">
                {introduction.content}
              </Text>
            </Box>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
} 