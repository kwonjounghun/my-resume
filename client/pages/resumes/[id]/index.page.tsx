import { useRouter } from 'next/router';
import ResumesDetailPage from '@/pages/resumes/ResumesDetailPage';

export default function ResumePage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return null;
  }

  return (
    <ResumesDetailPage id={id} />
  );
} 