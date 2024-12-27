import { Container } from '@chakra-ui/react';
import ResumeForm from '@/widgets/resume-form/ui/ResumeForm';
import { useQuery } from '@tanstack/react-query';
import { getResume } from '@/entities/resume/api/getResume';

export default function ResumesUpdatePage({ id }: { id: string }) {
  const { data: resume } = useQuery({
    queryKey: ['resume', id],
    queryFn: () => getResume(id as string),
    enabled: !!id,
  });



  return (
    <Container maxW="container.lg" py={8}>
      <ResumeForm mode="edit" initialData={resume} />
    </Container>
  );
} 
