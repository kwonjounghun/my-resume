import { NextPage } from 'next';
import Link from 'next/link';
import withAuth from '@/shared/hocs/withAuth';
import { Button, Heading, Container, Stack, Flex, Text } from '@chakra-ui/react';
import { RetrospectiveList } from '@/features/retrospective/ui';
import { useRetrospectives } from '@/features/retrospective/hooks';

const RetrospectivesPage: NextPage = () => {
  const { data, isLoading } = useRetrospectives();

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>회고 목록을 불러오는 중...</Text>
      </Container>
    );
  }
  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">회고 목록</Heading>
          <Button as={Link} href="/retrospectives/new">
            회고 작성하기
          </Button>
        </Flex>
        <RetrospectiveList retrospectives={data?.retrospectives || []} />
      </Stack>
    </Container>
  );
};

export default withAuth(RetrospectivesPage); 