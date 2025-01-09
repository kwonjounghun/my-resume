import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { ProjectEditPage } from '@/features/project/ui/ProjectEditPage';

const EditProjectPage: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return null;
  }

  return <ProjectEditPage projectId={id} />;
};

export default EditProjectPage; 