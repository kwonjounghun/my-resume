import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Stack,
  Text,
  useToast,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import { getResume } from '@/entities/resume/api/getResume';
import { getIntroduction } from '@/entities/introduction/api/getIntroduction';
import { getRetrospective } from '@/entities/retrospective/api/getRetrospective';

interface ResumeDetailProps {
  id: number;
}

export default function ResumeDetail({ id }: ResumeDetailProps) {
  const router = useRouter();
  const toast = useToast();

  const { data: resume, isLoading: isResumeLoading } = useQuery({
    queryKey: ['resume', id],
    queryFn: () => getResume(id),
  });

  const { data: introduction } = useQuery({
    queryKey: ['introduction', resume?.selfIntroductionId],
    queryFn: () => getIntroduction(Number(resume!.selfIntroductionId)),
    enabled: !!resume?.selfIntroductionId,
  });

  const { data: retrospectives } = useQuery({
    queryKey: ['retrospectives', resume?.projects],
    queryFn: async () => {
      const promises = resume!.projects.map((projectId) =>
        getRetrospective(projectId)
      );
      return Promise.all(promises);
    },
    enabled: !!resume?.projects.length,
  });

  if (isResumeLoading) {
    return null;
  }

  if (!resume) {
    return (
      <Box textAlign="center" py={10}>
        <Text>이력서를 찾을 수 없습니다.</Text>
      </Box>
    );
  }

  return (
    <Card>
      <CardBody>
        <Stack spacing={6}>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Link href="/resumes" passHref>
              <Button
                variant="ghost"
                leftIcon={<FiArrowLeft />}
                sx={{
                  color: 'gray.600',
                  _hover: { color: 'primary.500' },
                }}
              >
                목록으로
              </Button>
            </Link>
            <Link href={`/resumes/${id}/edit`} passHref>
              <Button
                variant="outline"
                leftIcon={<FiEdit2 />}
                colorScheme="primary"
              >
                수정하기
              </Button>
            </Link>
          </Box>

          <Stack spacing={4}>
            <HStack justify="space-between" align="center">
              <Heading as="h1" size="lg">
                {resume.title}
              </Heading>
              <Badge
                colorScheme={resume.isPublic ? 'green' : 'gray'}
                variant="subtle"
                px={2}
                py={1}
                borderRadius="full"
              >
                {resume.isPublic ? '공개' : '비공개'}
              </Badge>
            </HStack>
            <Text color="gray.600" fontSize="sm">
              작성일: {new Date(resume.createdAt).toLocaleDateString()}
              {resume.updatedAt !== resume.createdAt &&
                ` · 수정일: ${new Date(resume.updatedAt).toLocaleDateString()}`}
            </Text>
          </Stack>

          <Divider />

          {introduction && (
            <Stack spacing={3}>
              <Heading as="h2" size="md">
                자기소개
              </Heading>
              <Card variant="outline">
                <CardBody>
                  <VStack align="stretch" spacing={3}>
                    <Text fontWeight="bold">{introduction.title}</Text>
                    <Text whiteSpace="pre-wrap">{introduction.content}</Text>
                  </VStack>
                </CardBody>
              </Card>
            </Stack>
          )}

          {retrospectives && retrospectives.length > 0 && (
            <Stack spacing={3}>
              <Heading as="h2" size="md">
                프로젝트 경험
              </Heading>
              <Stack spacing={4}>
                {retrospectives.map((retro) => (
                  <Card key={retro.id} variant="outline">
                    <CardBody>
                      <VStack align="stretch" spacing={3}>
                        <Stack>
                          <Heading as="h3" size="sm">
                            {retro.title}
                          </Heading>
                          <Text fontSize="sm" color="gray.600">
                            {new Date(retro.startDate).toLocaleDateString()} -{' '}
                            {new Date(retro.endDate).toLocaleDateString()}
                          </Text>
                        </Stack>
                        <Text>{retro.summary}</Text>
                        {retro.keywords && retro.keywords.length > 0 && (
                          <HStack spacing={2}>
                            {retro.keywords.map((keyword) => (
                              <Badge
                                key={keyword}
                                colorScheme="primary"
                                variant="subtle"
                              >
                                {keyword}
                              </Badge>
                            ))}
                          </HStack>
                        )}
                      </VStack>
                    </CardBody>
                  </Card>
                ))}
              </Stack>
            </Stack>
          )}

          <Stack spacing={3}>
            <Heading as="h2" size="md">
              상세 내용
            </Heading>
            <Text whiteSpace="pre-wrap">{resume.content}</Text>
          </Stack>
        </Stack>
      </CardBody>
    </Card>
  );
} 