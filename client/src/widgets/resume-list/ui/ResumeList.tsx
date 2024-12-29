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
import { getResumes } from '@/entities/resume/api/getResumes';

export default function ResumeList() {
  const { data, isLoading } = useQuery({
    queryKey: ['resumes'],
    queryFn: () => getResumes(),
  });

  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Text>이력서 목록을 불러오는 중...</Text>
      </Container>
    );
  }

  if (!data || data.resumes.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={4} align="center">
          <Text>아직 작성된 이력서가 없습니다.</Text>
          <Button as={Link} href="/resumes/new">
            이력서 작성하기
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">이력서 목록</Heading>
          <Button as={Link} href="/resumes/new">
            이력서 작성하기
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
          {data.resumes.map((resume) => (
            <Card
              key={resume.id}
              as={Link}
              href={`/resumes/${resume.id}`}
              p={6}
              _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
              transition="all 0.2s"
            >
              <Stack spacing={4}>
                <Box>
                  <Heading size="md" mb={2}>
                    {resume.title}
                  </Heading>
                </Box>

                <Text noOfLines={3} color="gray.600">
                  {resume.content}
                </Text>

                <Flex justify="space-between" align="center">
                  <Tag
                    size="sm"
                    colorScheme={resume.isPublic ? 'green' : 'red'}
                    variant="subtle"
                  >
                    {resume.isPublic ? '공개' : '비공개'}
                  </Tag>
                  <Text fontSize="sm" color="gray.500">
                    프로젝트 {resume.projects.length}개
                  </Text>
                </Flex>
              </Stack>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Container>
  );
} 