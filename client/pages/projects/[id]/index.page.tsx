import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ProjectDetailPage } from '@/pages/project/ProjectDetailPage';
import { withAuth } from '@/shared/hocs/withAuth';

const ProjectDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return null;
  }

  return <ProjectDetailPage projectId={id} />;
};

export default withAuth(ProjectDetail); 