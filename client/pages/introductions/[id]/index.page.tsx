
import { useRouter } from 'next/router';
import { default as IntroductionDetail } from '@/pages/introductions/IntroductionsDetailPage';

export default function IntroductionDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <div>loading...</div>
  }

  return <IntroductionDetail id={id} />;
} 