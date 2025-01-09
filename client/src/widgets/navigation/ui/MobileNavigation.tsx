import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiFileText, FiStar, FiUser, FiBook, FiInfo } from 'react-icons/fi';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactElement;
}

const NAV_ITEMS: NavItem[] = [
  {
    href: '/profile',
    label: '기본정보',
    icon: <FiInfo size={20} />,
  },
  {
    href: '/projects',
    label: '회고',
    icon: <FiBook size={20} />,
  },
  {
    href: '/resumes',
    label: '이력서',
    icon: <FiFileText size={20} />,
  },
  {
    href: '/introductions',
    label: '자기소개',
    icon: <FiUser size={20} />,
  },
  {
    href: '/companies',
    label: '관심기업',
    icon: <FiStar size={20} />,
  },
];

export function MobileNavigation() {
  const router = useRouter();
  const bg = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  return (
    <Box
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      bg={bg}
      borderTop="1px"
      borderColor={borderColor}
      display={{ base: 'block', md: 'none' }}
      zIndex={1000}
    >
      <Flex justify="space-around" py={2}>
        {NAV_ITEMS.map((item) => {
          const isActive = router.pathname.startsWith(item.href);
          return (
            <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
              <Flex
                direction="column"
                align="center"
                color={isActive ? 'blue.500' : 'gray.500'}
                _hover={{ color: 'blue.500' }}
                px={4}
              >
                {item.icon}
                <Text fontSize="xs" mt={1}>
                  {item.label}
                </Text>
              </Flex>
            </Link>
          );
        })}
      </Flex>
    </Box>
  );
} 