import { Container, Stack, Heading, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useRetrospective } from "@/features/retrospective/hooks";
import { useRetrospectiveUpdate } from "@/features/retrospective/hooks";
import { CreateRetrospectiveRequest } from "@/entities/retrospective/model/types";
import { RetrospectiveForm } from "@/features/retrospective/ui";

function RetrospectivesUpdatePage({ id }: { id: string }) {
  const router = useRouter();
  const toast = useToast();

  const { data: retrospective, isLoading } = useRetrospective(id);
  const updateMutation = useRetrospectiveUpdate();

  const handleSubmit = (data: CreateRetrospectiveRequest) => {
    updateMutation.mutate({ id: id as string, data }, {
      onSuccess: () => {
        toast({
          title: '회고가 수정되었습니다.',
          status: 'success',
        });
        router.push('/retrospectives');
      },
      onError: () => {
        toast({
          title: '회고 수정에 실패했습니다.',
          status: 'error',
        });
      },
    });
  };


  if (isLoading) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Heading size="lg">회고 수정하기</Heading>
          <div>로딩 중...</div>
        </Stack>
      </Container>
    );
  }

  if (!retrospective) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={8}>
          <Heading size="lg">회고 수정하기</Heading>
          <div>회고를 찾을 수 없습니다.</div>
        </Stack>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={8}>
      <Stack spacing={8}>
        <Heading size="lg">회고 수정하기</Heading>
        <RetrospectiveForm submitText="수정하기" initialData={retrospective} onSubmit={handleSubmit} isPending={updateMutation.isPending} />
      </Stack>
    </Container>
  );
}

export default RetrospectivesUpdatePage;