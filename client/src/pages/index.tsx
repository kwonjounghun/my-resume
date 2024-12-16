import { Box, Button, Container, Heading, Stack, Text } from '@chakra-ui/react';
import Link from 'next/link';

export default function Home() {
  return (
    <Container maxW="container.xl" py={20}>
      <Stack spacing={8} alignItems="center" textAlign="center">
        <Box>
          <Heading as="h1" size="2xl" mb={4}>
            Resume Builder
          </Heading>
          <Text fontSize="xl" color="gray.600">
            STAR 기법으로 프로젝트 회고를 작성하고,<br />
            맞춤형 이력서를 만들어보세요.
          </Text>
        </Box>
        <Stack direction="row" spacing={4}>
          <Button as={Link} href="/retrospectives" size="lg">
            회고 작성하기
          </Button>
          <Button as={Link} href="/resumes" size="lg" variant="outline">
            이력서 만들기
          </Button>
        </Stack>
      </Stack>
    </Container>
  );
} 