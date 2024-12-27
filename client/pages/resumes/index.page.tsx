import { NextPage } from 'next';
import withAuth from '@/shared/hocs/withAuth';
import ResumesListPage from '@/pages/resumes/ResumesListPage';

const ResumesPage: NextPage = () => {
  return <ResumesListPage />;
};

export default withAuth(ResumesPage);
