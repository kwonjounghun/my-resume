import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/shared/stores/auth';
import { NextPage } from 'next';

export const withAuth = (WrappedComponent: NextPage) => {
  const WithAuth: NextPage = (props) => {
    const router = useRouter();
    const { user, isLoading, fetchUser } = useAuthStore();

    useEffect(() => {
      fetchUser();
    }, [fetchUser]);

    useEffect(() => {
      if (!isLoading && !user) {
        router.replace('/login');
      }
    }, [isLoading, user, router]);

    if (isLoading) {
      return null;
    }

    if (!user) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return WithAuth;
};

export default withAuth; 