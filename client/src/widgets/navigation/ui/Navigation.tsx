import { Box, Container, Flex, Link, Text } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';

const NAVIGATION_ITEMS = [
  { name: '회고', path: '/retrospectives' },
  { name: '이력서', path: '/resumes' },
  { name: '자기소개', path: '/introductions' },
  { name: '관심기업', path: '/companies' },
];

export default function Navigation() {
  const router = useRouter();

  return (
    <Box as="nav" py={4} borderBottom="1px" borderColor="gray.200">
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          <Link as={NextLink} href="/" _hover={{ textDecoration: 'none' }}>
            <Text fontSize="xl" fontWeight="bold" color="primary.500">
              Resume Builder
            </Text>
          </Link>
          <Flex gap={8}>
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.path}
                as={NextLink}
                href={item.path}
                color={router.pathname.startsWith(item.path) ? 'primary.500' : 'gray.600'}
                fontWeight={router.pathname.startsWith(item.path) ? 'semibold' : 'normal'}
                _hover={{
                  color: 'primary.500',
                  textDecoration: 'none',
                }}
              >
                {item.name}
              </Link>
            ))}
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
} 