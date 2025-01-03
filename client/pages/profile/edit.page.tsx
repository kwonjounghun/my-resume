import { Container } from '@chakra-ui/react';
import { ProfileForm } from '@/features/profile/ui/ProfileForm';
import { useProfile } from '@/entities/profile/model/hooks/useProfile';
import { useUpdateProfile } from '@/entities/profile/model/hooks/useUpdateProfile';
import { useRouter } from 'next/router';
import { withAuth } from '@/shared/hocs/withAuth';
import { UpdateProfileRequest } from '@/entities/profile/model/types';

function ProfileEditPage() {
  const router = useRouter();
  const { data, isLoading } = useProfile();
  const { mutate: updateProfile } = useUpdateProfile();

  if (isLoading) {
    return null;
  }

  if (!data) {
    return null;
  }

  const handleSubmit = async (data: UpdateProfileRequest) => {
    updateProfile(data, {
      onSuccess: () => {
        router.push('/profile');
      },
    });
  };

  return (
    <Container maxW="container.md" py={8}>
      <ProfileForm onSubmit={handleSubmit} initialData={{
        name: data.profile.name,
        email: data.profile.email,
        phone: data.profile.phone,
        education: data.profile.education,
        skills: data.profile.skills,
        awards: data.profile.awards,
        languages: data.profile.languages,
        links: data.profile.links,
      }} />
    </Container>
  );
}

export default withAuth(ProfileEditPage);