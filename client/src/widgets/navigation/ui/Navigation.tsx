import { Box, Button, Container, Flex, Link as ChakraLink, Stack } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/shared/stores/auth';
import { logout } from '@/shared/api/auth';

export const Navigation = () => {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
    }
  };

  console.log(user);

  return (
    <Box as="nav" bg="white" boxShadow="sm">
      <Container maxW="container.xl">
        <Flex h={16} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={8} alignItems="center">
            <Link href="/" passHref>
              <ChakraLink fontWeight="bold">My Resume</ChakraLink>
            </Link>
            {user && (
              <>
                <Link href="/retrospectives" passHref>
                  <ChakraLink>회고</ChakraLink>
                </Link>
                <Link href="/resumes" passHref>
                  <ChakraLink>이력서</ChakraLink>
                </Link>
                <Link href="/introductions" passHref>
                  <ChakraLink>자기소개서</ChakraLink>
                </Link>
                <Link href="/companies" passHref>
                  <ChakraLink>관심 기업</ChakraLink>
                </Link>
              </>
            )}
          </Stack>
          <Box>
            {user ? (
              <Button variant="ghost" onClick={handleLogout}>
                로그아웃
              </Button>
            ) : (
              <Link href="/login" passHref>
                <Button as="a" variant="ghost">
                  로그인
                </Button>
              </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </Box>
  );
}; 