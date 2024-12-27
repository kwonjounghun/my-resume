import { NextPage } from 'next';
import withAuth from '@/shared/hocs/withAuth';
import IntroductionsListPage from '@/pages/introductions/IntroductionsPage';

const IntroductionsPage: NextPage = () => {
  return <IntroductionsListPage />;
};

export default withAuth(IntroductionsPage);
