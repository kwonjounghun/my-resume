import { default as RetrospectivesCreatePage } from '@/pages/retrospectives/RetrospectivesCreatePage';
import withAuth from '@/shared/hocs/withAuth';

const NewRetrospectivePage = () => {
  return <RetrospectivesCreatePage />;
};

export default withAuth(NewRetrospectivePage);
