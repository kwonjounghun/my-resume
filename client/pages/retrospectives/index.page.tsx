import { NextPage } from 'next';
import { default as RetrospectivesListPage } from '@/pages/retrospectives/RetrospectivesPage';
import withAuth from '@/shared/hocs/withAuth';

const RetrospectivesPage: NextPage = () => {
  return <RetrospectivesListPage />;
};

export default withAuth(RetrospectivesPage); 
