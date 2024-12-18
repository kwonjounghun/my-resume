import { NextPage } from 'next';
import { IntroductionList } from '@/widgets/introduction-list';
import withAuth from '@/shared/hocs/withAuth';

const IntroductionsPage: NextPage = () => {
  return <IntroductionList />;
};

export default withAuth(IntroductionsPage); 