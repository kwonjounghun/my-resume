import { NextPage } from 'next';
import Link from 'next/link';
import { useRetrospectives } from '@/features/retrospective/hooks';
import { useRetrospectiveFilter } from '@/features/retrospective/hooks/useRetrospectiveFilter';
import { filterRetrospectives } from '@/features/retrospective/lib/filter';
import { RetrospectiveList, RetrospectiveFilter } from '@/features/retrospective/ui';
import { Container, Heading, Stack, Flex, Button, Text } from '@chakra-ui/react';

const RetrospectivesPage: NextPage = () => {
  const { data, isLoading } = useRetrospectives();
  const { filter, setFilter, resetFilter } = useRetrospectiveFilter();

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>회고 목록을 불러오는 중...</Text>
      </Container>
    );
  }

  const filteredRetrospectives = filterRetrospectives(
    data?.retrospectives || [],
    filter
  );

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">회고 목록</Heading>
          <Button as={Link} href="/retrospectives/new">
            회고 작성하기
          </Button>
        </Flex>
        <RetrospectiveFilter
          filter={filter}
          onFilterChange={setFilter}
          onReset={resetFilter}
        />
        <RetrospectiveList retrospectives={filteredRetrospectives} />
      </Stack>
    </Container>
  );
};

export default RetrospectivesPage;
