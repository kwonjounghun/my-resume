import { NextPage } from 'next';
import { default as RetrospectivesCreatePage } from '@/pages/retrospectives/RetrospectivesCreatePage';
import withAuth from '@/shared/hocs/withAuth';

const NewRetrospectivePage: NextPage = () => {
  return <RetrospectivesCreatePage />;
};

export default withAuth(NewRetrospectivePage);
