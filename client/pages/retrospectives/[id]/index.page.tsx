
import { useRouter } from 'next/router';
import withAuth from '@/shared/hocs/withAuth';
import RetrospectivesDetailPage from '@/pages/retrospectives/RetrospectivesDetailPage';

function RetrospectiveDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <div>Loading...</div>;
  }

  return <RetrospectivesDetailPage id={id as string} />;
}

export default withAuth(RetrospectiveDetailPage);
