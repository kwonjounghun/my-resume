import { useRouter } from 'next/router';
import ResumesUpdatePage from '@/pages/resumes/ResumesUpdatePage';

export default function EditResumePage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return null;
  }

  return (
    <ResumesUpdatePage id={id} />
  );
} 