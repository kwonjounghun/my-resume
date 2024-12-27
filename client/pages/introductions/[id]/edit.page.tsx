import { useRouter } from 'next/router';
import { default as IntroductionEdit } from '@/pages/introductions/IntroductionsUpdatePage';


export default function IntroductionEditPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return null;
  }

  return <IntroductionEdit id={id} />;
} 