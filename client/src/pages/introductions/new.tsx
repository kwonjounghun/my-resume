import { Container, Heading, Stack } from '@chakra-ui/react';
import { IntroductionForm } from '@/widgets/introduction-form';

export default function NewIntroductionPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Heading size="lg">자기소개 작성하기</Heading>
        <IntroductionForm mode="create" />
      </Stack>
    </Container>
  );
} 