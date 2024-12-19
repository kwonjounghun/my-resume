import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ResumeDetail from '@/widgets/resume-detail/ui/ResumeDetail';

export default function ResumePage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return null;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <ResumeDetail id={id} />
    </Container>
  );
} 