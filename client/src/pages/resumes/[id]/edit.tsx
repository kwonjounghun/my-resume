import { Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import ResumeForm from '@/widgets/resume-form/ui/ResumeForm';
import { useQuery } from '@tanstack/react-query';
import { getResume } from '@/entities/resume/api/getResume';

export default function EditResumePage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: resume, isLoading } = useQuery({
    queryKey: ['resume', id],
    queryFn: () => getResume(Number(id)),
    enabled: !!id,
  });

  if (!id || typeof id !== 'string' || isLoading) {
    return null;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <ResumeForm mode="edit" initialData={resume} />
    </Container>
  );
} 