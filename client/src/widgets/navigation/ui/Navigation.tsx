import {
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MobileNavigation } from './MobileNavigation';
import { useAuthStore } from '@/shared/stores/auth';
import { logout } from '@/shared/api/auth';

const NAV_ITEMS = [
  { href: '/profile', label: '기본정보' },
  { href: '/retrospectives', label: '회고' },
  { href: '/resumes', label: '이력서' },
  { href: '/introductions', label: '자기소개' },
  { href: '/companies', label: '관심기업' },
];

export function Navigation() {
  const router = useRouter();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const { user } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (error) {
      console.error('로그아웃 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <>
      <Box
        as="nav"
        position="sticky"
        top={0}
        bg={bg}
        borderBottom="1px"
        borderColor={borderColor}
        zIndex={1000}
      >
        <Container maxW="container.xl">
          <Flex h={16} justify="space-between" align="center">
            <Link href="/" passHref>
              Resume Builder
            </Link>
            {user ? (
              <HStack spacing={8}>
                <HStack spacing={8} display={{ base: 'none', md: 'flex' }}>
                  {NAV_ITEMS.map((item) => {
                    const isActive = router.pathname.startsWith(item.href);
                    return (
                      <Link key={item.href} href={item.href} passHref>
                        <ChakraLink
                          fontWeight="medium"
                          color={isActive ? 'blue.500' : 'gray.500'}
                          _hover={{ color: 'blue.500' }}
                        >
                          {item.label}
                        </ChakraLink>
                      </Link>
                    );
                  })}
                </HStack>

                <Button variant="ghost" onClick={handleLogout}>
                  로그아웃
                </Button>
              </HStack>
            ) : (
              <Button variant="ghost" onClick={() => router.push('/login')}>
                로그인
              </Button>
            )}
          </Flex>
        </Container>
      </Box>
      <MobileNavigation />
    </>
  );
} 