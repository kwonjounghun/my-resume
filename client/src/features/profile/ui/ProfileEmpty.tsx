import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from '@chakra-ui/react';
import { FiUserPlus } from 'react-icons/fi';
import Link from 'next/link';

export function ProfileEmpty() {
  const bg = useColorModeValue('gray.50', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Center py={20}>
      <Box
        p={8}
        bg={bg}
        borderRadius="lg"
        borderWidth="1px"
        borderColor={borderColor}
        textAlign="center"
        maxW="md"
      >
        <VStack spacing={6}>
          <Box fontSize="6xl">
            <FiUserPlus />
          </Box>
          <Heading size="lg">기본정보 등록</Heading>
          <Text color="gray.500">
            아직 기본정보가 등록되지 않았습니다.
            <br />
            이력서 작성을 위해 기본정보를 등록해주세요.
          </Text>
          <Button
            as={Link}
            href="/profile/new"
            colorScheme="blue"
            size="lg"
            leftIcon={<FiUserPlus />}
          >
            기본정보 등록하기
          </Button>
        </VStack>
      </Box>
    </Center>
  );
} 