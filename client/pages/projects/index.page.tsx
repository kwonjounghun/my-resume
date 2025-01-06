import { ProjectsPage } from '@/pages/projects/ProjectsPage';
import { QueryClient, dehydrate } from '@tanstack/react-query';
import { getProjects } from '@/shared/api/project';
import { withAuth } from '@/shared/hocs/withAuth';

export async function getServerSideProps() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default withAuth(ProjectsPage); 