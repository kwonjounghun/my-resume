import { Container } from '@chakra-ui/react';
import ResumeDetail from '@/widgets/resume-detail/ui/ResumeDetail';

export default function ResumePage({ id }: { id: string }) {
  return (
    <Container maxW="container.lg" py={8}>
      <ResumeDetail id={id} />
    </Container>
  );
} 