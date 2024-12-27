import { IntroductionForm } from '@/widgets/introduction-form';
import withAuth from '@/shared/hocs/withAuth';

function NewIntroductionPage() {
  return <IntroductionForm mode="create" />;
}

export default withAuth(NewIntroductionPage);