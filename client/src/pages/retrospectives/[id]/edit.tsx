import { Container, Heading, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { RetrospectiveForm } from '@/widgets/retrospective-form';
import { getRetrospective } from '@/entities/retrospective/api/getRetrospective';

export default function EditRetrospectivePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: retrospective, isLoading } = useQuery({
    queryKey: ['retrospective', id],
    queryFn: () => getRetrospective(Number(id)),
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Heading size="lg">회고 수정하기</Heading>
          <div>로딩 중...</div>
        </Stack>
      </Container>
    );
  }

  if (!retrospective) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Heading size="lg">회고 수정하기</Heading>
          <div>회고를 찾을 수 없습니다.</div>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Heading size="lg">회고 수정하기</Heading>
        <RetrospectiveForm mode="edit" initialData={retrospective} />
      </Stack>
    </Container>
  );
} 