import { Container, Heading, Stack } from '@chakra-ui/react';
import { RetrospectiveForm } from '@/widgets/retrospective-form';

export default function NewRetrospectivePage() {
  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Heading size="lg">회고 작성하기</Heading>
        <RetrospectiveForm mode="create" />
      </Stack>
    </Container>
  );
} 