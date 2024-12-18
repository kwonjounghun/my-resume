import { Box, Button, Container, Heading, Text, VStack } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { loginWithGoogle } from '@/shared/api/auth';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthStore } from '@/shared/stores/auth';

const LoginPage: NextPage = () => {
  const router = useRouter();
  const { user } = useAuthStore();
  const { returnUrl } = router.query;

  useEffect(() => {
    if (user) {
      const redirectUrl = typeof returnUrl === 'string' ? returnUrl : '/';
      router.replace(redirectUrl);
    }
  }, [user, returnUrl, router]);

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(typeof returnUrl === 'string' ? returnUrl : undefined);
    } catch (error) {
      console.error('Google 로그인 중 오류가 발생했습니다:', error);
    }
  };

  return (
    <Container maxW="container.sm" py={20}>
      <VStack spacing={8} align="center">
        <Heading size="xl">로그인</Heading>
        <Text color="gray.600">
          이력서 관리 서비스를 이용하기 위해 로그인해주세요.
        </Text>
        <Box w="full" maxW="md">
          <Button
            w="full"
            h={12}
            variant="outline"
            leftIcon={<FcGoogle size={20} />}
            onClick={handleGoogleLogin}
          >
            Google 계정으로 로그인
          </Button>
        </Box>
      </VStack>
    </Container>
  );
};

export default LoginPage; 