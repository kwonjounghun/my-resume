import { Container } from '@chakra-ui/react';
import { ProfileForm } from '@/features/profile/ui/ProfileForm';
import { useCreateProfile } from '@/entities/profile/model/hooks/useCreateProfile';
import { useRouter } from 'next/router';
import withAuth from '@/shared/hocs/withAuth';
import { CreateProfileRequest } from '@/entities/profile/model/types';

function ProfileNewPage() {
  const router = useRouter();
  const { mutate: createProfile } = useCreateProfile();

  const handleSubmit = async (data: CreateProfileRequest) => {
    createProfile(data, {
      onSuccess: () => {
        router.push('/profile');
      },
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <ProfileForm onSubmit={handleSubmit} />
    </Container>
  );
}

export default withAuth(ProfileNewPage);