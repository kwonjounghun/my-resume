import {
  Box,
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Stack,
  Text,
  Badge,
  HStack,
  VStack,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FiArrowLeft, FiEdit2 } from 'react-icons/fi';
import { getResume } from '@/entities/resume/api/getResume';
import { getIntroduction } from '@/entities/introduction/api/getIntroduction';
import { projectApi } from '@/shared/api/project';
import { useProfile } from '@/entities/profile/model/hooks/useProfile';

interface ResumeDetailProps {
  id: string;
}

export default function ResumeDetail({ id }: ResumeDetailProps) {
  const { data: resume, isLoading: isResumeLoading } = useQuery({
    queryKey: ['resume', id],
    queryFn: () => getResume(id),
  });

  const { data: introduction } = useQuery({
    queryKey: ['introduction', resume?.selfIntroductionId],
    queryFn: () => getIntroduction(resume?.selfIntroductionId || ''),
    enabled: !!resume?.selfIntroductionId,
  });

  const { data: profile, isLoading: isProfileLoading } = useProfile();

  const { data: projects } = useQuery({
    queryKey: ['projects', resume?.projects],
    queryFn: async () => {
      const promises = resume!.projects.map((projectId) =>
        projectApi.getById(projectId)
      );
      return Promise.all(promises);
    },
    enabled: !!resume?.projects.length,
  });

  if (isResumeLoading && isProfileLoading) {
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

          <Box>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
              기본 정보
            </Text>
            <Stack spacing={4}>
              <HStack>
                <Text fontWeight="bold" minW="100px">이름</Text>
                <Text>{profile?.profile.name}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" minW="100px">이메일</Text>
                <Text>{profile?.profile.email}</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold" minW="100px">연락처</Text>
                <Text>{profile?.profile.phone}</Text>
              </HStack>
            </Stack>
          </Box>

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

          {projects && projects.length > 0 && (
            <Stack spacing={3}>
              <Heading as="h2" size="md">
                프로젝트 경험
              </Heading>
              <Stack spacing={4}>
                {projects.map((project) => (
                  <Card key={project.id} variant="outline">
                    <CardBody>
                      <VStack align="stretch" spacing={3}>
                        <Stack>
                          <Heading as="h3" size="sm">
                            {project.title}
                          </Heading>
                          <Text fontSize="sm" color="gray.600">
                            {new Date(project.startDate).toLocaleDateString()} -{' '}
                            {new Date(project.endDate).toLocaleDateString()}
                          </Text>
                        </Stack>
                        <Text>{project.summary}</Text>
                        {project.keywords && project.keywords.length > 0 && (
                          <HStack spacing={2}>
                            {project.keywords.map((keyword) => (
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

          {profile?.profile.skills && profile?.profile.skills.length > 0 && (
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>기술</Text>
              <VStack align="stretch" spacing={2}>
                {profile?.profile.skills.map((skill, index) => (
                  <HStack key={index} justify="space-between">
                    <Text fontWeight="medium">{skill.name}</Text>
                    <Badge colorScheme="green">{skill.level}</Badge>
                  </HStack>
                ))}
              </VStack>
            </Box>
          )}

          {profile?.profile?.education && profile?.profile?.education.length > 0 && (
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>학력</Text>
              <VStack align="stretch" spacing={2}>
                {profile?.profile?.education.map((education, index) => (
                  <Box key={index}>
                    <Text fontWeight="medium">{education.schoolName}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {education.major} ({education.startDate} - {education.isAttending ? '재학중' : education.endDate})
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}

          {profile?.profile?.awards && profile?.profile?.awards.length > 0 && (
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>수상</Text>
              <VStack align="stretch" spacing={2}>
                {profile?.profile?.awards.map((award, index) => (
                  <Box key={index}>
                    <Text fontWeight="medium">{award.title}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {award.date}
                    </Text>
                    <Text fontSize="sm" color="gray.600">
                      {award.description}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}

          {profile?.profile?.languages && profile?.profile?.languages.length > 0 && (
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>자격증</Text>
              <VStack align="stretch" spacing={2}>
                {profile?.profile?.languages.map((language, index) => (
                  <Box key={index}>
                    <Text fontWeight="medium">{language.name}</Text>
                    <Text fontSize="sm" color="gray.600">
                      {language.certifications.map((certification) => certification.date).join(', ')}
                    </Text>
                  </Box>
                ))}
              </VStack>
            </Box>
          )}

          {profile?.profile?.links && profile?.profile?.links.length > 0 && (
            <Box>
              <Text fontWeight="bold" color="gray.600" mb={2}>링크</Text>
              <VStack align="stretch" spacing={2}>
                {profile?.profile?.links.map((link, index) => (
                  <HStack key={index}>
                    <Badge colorScheme="blue">{link.type}</Badge>
                    <Link href={link.url} color="blue.500">
                      {link.description || link.url}
                    </Link>
                  </HStack>
                ))}
              </VStack>
            </Box>
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