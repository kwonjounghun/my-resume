import { Box, Container, Heading, Text } from '@chakra-ui/react';

export default function Home() {
  return (
    <Container maxW="container.xl" py={10}>
      <Box>
        <Heading as="h1" size="2xl" mb={4}>
          Resume Builder
        </Heading>
        <Text fontSize="xl" color="gray.600">
          Build your resume with STAR method
        </Text>
      </Box>
    </Container>
  );
} 