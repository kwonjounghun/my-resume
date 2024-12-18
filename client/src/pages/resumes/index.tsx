import { NextPage } from 'next';
import { ResumeList } from '@/widgets/resume-list';
import withAuth from '@/shared/hocs/withAuth';

const ResumesPage: NextPage = () => {
  return <ResumeList />;
};

export default withAuth(ResumesPage); 