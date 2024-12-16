import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { getRetrospectives } from '@/entities/retrospective/api/getRetrospectives';
import { format } from 'date-fns';

export default function RetrospectiveList() {
  const { data, isLoading } = useQuery({
    queryKey: ['retrospectives'],
    queryFn: () => getRetrospectives(),
  });

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>회고 목록을 불러오는 중...</Text>
      </Container>
    );
  }

  if (!data || data.retrospectives.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={4} align="center">
          <Text>아직 작성된 회고가 없습니다.</Text>
          <Button as={Link} href="/retrospectives/new">
            회고 작성하기
          </Button>
        </Stack>
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

        <Grid
          templateColumns={{
            base: '1fr',
            md: 'repeat(2, 1fr)',
            lg: 'repeat(3, 1fr)',
          }}
          gap={6}
        >
          {data.retrospectives.map((retrospective) => (
            <Card
              key={retrospective.id}
              as={Link}
              href={`/retrospectives/${retrospective.id}`}
              p={6}
              _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
              transition="all 0.2s"
            >
              <Stack spacing={4}>
                <Box>
                  <Text fontSize="sm" color="gray.500" mb={1}>
                    {retrospective.company}
                  </Text>
                  <Heading size="md" mb={2}>
                    {retrospective.title}
                  </Heading>
                  <Text fontSize="sm" color="gray.500">
                    {format(new Date(retrospective.startDate), 'yyyy.MM.dd')} -{' '}
                    {format(new Date(retrospective.endDate), 'yyyy.MM.dd')}
                  </Text>
                </Box>

                {retrospective.summary && (
                  <Text noOfLines={2} color="gray.600">
                    {retrospective.summary}
                  </Text>
                )}

                <Flex gap={2} wrap="wrap">
                  {retrospective.keywords?.map((keyword) => (
                    <Tag
                      key={keyword}
                      size="sm"
                      colorScheme="primary"
                      variant="subtle"
                    >
                      {keyword}
                    </Tag>
                  ))}
                </Flex>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
} 