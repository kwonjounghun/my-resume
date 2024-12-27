import Link from 'next/link';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';
import { useRetrospectiveCreate } from '@/features/retrospective/hooks';
import { CreateRetrospectiveRequest } from '@/entities/retrospective/model/types';
import { Container, Heading, Stack, Flex, Button } from '@chakra-ui/react';
import { FiArrowLeft } from 'react-icons/fi';
import { RetrospectiveForm } from '@/features/retrospective/ui';

function RetrospectivesCreatePage() {
  const router = useRouter();
  const toast = useToast();

  const createMutation = useRetrospectiveCreate();

  const handleSubmit = (data: CreateRetrospectiveRequest) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: '회고가 등록되었습니다.',
          status: 'success',
        });
        router.push('/retrospectives');
      },
      onError: () => {
        toast({
          title: '회고 등록에 실패했습니다.',
          status: 'error',
        });
      },
    });
  };

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Flex justify="space-between" align="center">
          <Heading size="lg">회고 작성하기</Heading>
          <Button
            variant="outline"
            leftIcon={<FiArrowLeft />}
            sx={{
              borderColor: 'gray.600',
              color: 'gray.600',
              _hover: { color: 'primary.500', borderColor: 'primary.500' }
            }}
            as={Link} href="/retrospectives">
            목록으로
          </Button>
        </Flex>
        <RetrospectiveForm submitText="등록하기" onSubmit={handleSubmit} isPending={createMutation.isPending} />
      </Stack>
    </Container>
  );
}

export default RetrospectivesCreatePage; 
