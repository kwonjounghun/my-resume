import { NextPage } from 'next';
import { ProjectCreatePage } from '@/pages/project/ProjectCreatePage';
import { withAuth } from '@/shared/hocs/withAuth';

const NewProjectPage: NextPage = () => {
  return <ProjectCreatePage />;
};

export default withAuth(NewProjectPage); 