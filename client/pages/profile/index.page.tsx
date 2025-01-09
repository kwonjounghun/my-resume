import { Container } from '@chakra-ui/react';
import { ProfileDetail } from '@/features/profile/ui/ProfileDetail';
import { ProfileEmpty } from '@/features/profile/ui/ProfileEmpty';
import { useProfile } from '@/entities/profile/model/hooks/useProfile';
import { withAuth } from '@/shared/hocs/withAuth';

function ProfilePage() {
  const { data, isLoading } = useProfile();

  if (isLoading) {
    return null;
  }

  return (
    <Container maxW="container.md" py={8}>
      {data ? <ProfileDetail profile={data.profile} /> : <ProfileEmpty />}
    </Container>
  );
}

export default withAuth(ProfilePage);