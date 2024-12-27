import { useRouter } from 'next/router';
import withAuth from '@/shared/hocs/withAuth';
import RetrospectivesUpdatePage from '@/pages/retrospectives/RetrospectivesUpdatePage';

function EditRetrospectivePage() {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <div>Loading...</div>;
  }

  return <RetrospectivesUpdatePage id={id} />;
}

export default withAuth(EditRetrospectivePage);
