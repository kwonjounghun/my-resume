import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { format } from 'date-fns';
import { getIntroductions } from '@/entities/introduction/api/getIntroductions';

export default function IntroductionList() {
  const { data, isLoading } = useQuery({
    queryKey: ['introductions'],
    queryFn: () => getIntroductions(),
  });

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>자기소개 목록을 불러오는 중...</Text>
      </Container>
    );
  }

  if (!data || data.introductions.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={4} align="center">
          <Text>아직 작성된 자기소개가 없습니다.</Text>
          <Button as={Link} href="/introductions/new">
            자기소개 작성하기
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">자기소개 목록</Heading>
          <Button as={Link} href="/introductions/new">
            자기소개 작성하기
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
          {data.introductions.map((introduction) => (
            <Card
              key={introduction.id}
              as={Link}
              href={`/introductions/${introduction.id}`}
              p={6}
              _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
              transition="all 0.2s"
            >
              <Stack spacing={4}>
                <Box>
                  <Heading size="md" mb={2}>
                    {introduction.title}
                  </Heading>
                </Box>

                <Text noOfLines={3} color="gray.600">
                  {introduction.content}
                </Text>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
} 