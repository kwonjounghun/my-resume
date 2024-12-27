import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuthStore } from '@/shared/stores/auth';
import { getMe } from '@/shared/api/auth';
import { Container, Spinner, VStack, Text } from '@chakra-ui/react';

const AuthSuccessPage = () => {
  const router = useRouter();
  const { token, returnUrl } = router.query;
  const { setUser } = useAuthStore();

  useEffect(() => {
    const handleAuthSuccess = async () => {
      if (token) {
        try {
          // 사용자 정보 가져오기
          const user = await getMe();
          // 전역 상태에 사용자 정보 저장
          console.log(user);
          setUser(user);
          // returnUrl이 있으면 해당 페이지로, 없으면 홈으로 이동
          router.replace(typeof returnUrl === 'string' ? returnUrl : '/');
        } catch (error) {
          console.error('사용자 정보를 가져오는데 실패했습니다:', error);
          router.replace('/login');
        }
      }
    };

    handleAuthSuccess();
  }, [token, returnUrl, setUser, router]);

  return (
    <Container maxW="container.sm" py={20}>
      <VStack spacing={4}>
        <Spinner size="xl" />
        <Text>로그인 처리 중입니다...</Text>
      </VStack>
    </Container>
  );
};

export default AuthSuccessPage; 