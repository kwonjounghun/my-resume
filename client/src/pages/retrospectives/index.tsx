import { NextPage } from 'next';
import { RetrospectiveList } from '@/widgets/retrospective-list';
import withAuth from '@/shared/hocs/withAuth';

const RetrospectivesPage: NextPage = () => {
  return <RetrospectiveList />;
};

export default withAuth(RetrospectivesPage); 