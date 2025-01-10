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
  Grid,
  GridItem,
  Tag,
  useToast,
} from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FiArrowLeft, FiEdit2, FiDownload } from 'react-icons/fi';
import { getResume } from '@/entities/resume/api/getResume';
import { getIntroduction } from '@/entities/introduction/api/getIntroduction';
import { projectApi } from '@/shared/api/project';
import { useProfile } from '@/entities/profile/model/hooks/useProfile';
import { Project } from '@/shared/api/project';
import { client } from '@/shared/api/client';

interface ResumeDetailProps {
  id: string;
}

export default function ResumeDetail({ id }: ResumeDetailProps) {
  const toast = useToast();
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

  // 회사별로 프로젝트 그룹화 및 정렬
  const groupedProjects = projects?.reduce((acc, project) => {
    const company = project.companyName;
    const existingGroup = acc.find(group => group.company === company);

    if (existingGroup) {
      existingGroup.projects.push(project);
    } else {
      acc.push({
        company,
        projects: [project],
        startDate: new Date(project.startDate),
        endDate: new Date(project.endDate),
      });
    }
    return acc;
  }, [] as Array<{
    company: string;
    projects: Project[];
    startDate: Date;
    endDate: Date;
  }>)?.map(group => ({
    ...group,
    // 각 그룹 내에서 프로젝트들을 최신순으로 정렬
    projects: group.projects.sort((a, b) =>
      new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
    ),
    // 그룹의 시작일과 종료일 업데이트
    startDate: new Date(Math.min(...group.projects.map(p => new Date(p.startDate).getTime()))),
    endDate: new Date(Math.max(...group.projects.map(p => new Date(p.endDate).getTime()))),
  }))
    // 회사별 그룹을 최신순으로 정렬
    ?.sort((a, b) => b.endDate.getTime() - a.endDate.getTime());

  const handleDownloadPdf = async () => {
    try {
      const response: Response = await client.get(`/resumes/${id}/pdf`);

      if (!response.ok) throw new Error('PDF 생성에 실패했습니다.');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resume-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      toast({
        title: '성공',
        description: 'PDF가 성공적으로 다운로드되었습니다.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error('PDF 다운로드 오류:', error);
      toast({
        title: '오류',
        description: 'PDF 다운로드에 실패했습니다.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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
    <>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
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
        <HStack spacing={4}>
          <Button
            variant="outline"
            leftIcon={<FiDownload />}
            colorScheme="green"
            onClick={handleDownloadPdf}
          >
            PDF 다운로드
          </Button>
          <Link href={`/resumes/${id}/edit`} passHref>
            <Button
              variant="outline"
              leftIcon={<FiEdit2 />}
              colorScheme="primary"
            >
              수정하기
            </Button>
          </Link>
        </HStack>
      </Box>
      <Card>
        <CardBody>
          <Stack spacing={6}>
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

            {introduction && (
              <Stack spacing={3}>
                <Text whiteSpace="pre-wrap">{introduction.content}</Text>
              </Stack>
            )}

            <Divider />

            <Grid templateColumns="2fr 8fr" gap={8}>
              <GridItem>
                <Heading as="h2" size="sm" color="gray.600" mb={2}>경력</Heading>
              </GridItem>
              <GridItem>
                {groupedProjects?.map((group, index) => (
                  <Box key={group.company} mb={8} _last={{ mb: 0 }}>
                    {index > 0 && <Divider mb={8} />}
                    <Stack spacing={4}>
                      <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Heading as="h3" size="md" color="gray.700">
                          {group.company}
                        </Heading>
                        <Text fontSize="sm" color="gray.500">
                          {new Date(group.startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })} - {' '}
                          {new Date(group.endDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                        </Text>
                      </Box>
                      <Stack spacing={4}>
                        {group.projects.map((project) => (
                          <Card key={project.id} variant="outline">
                            <CardBody>
                              <VStack align="stretch" spacing={3}>
                                <HStack>
                                  <Heading as="h4" size="sm" mb={1}>
                                    {project.title}
                                  </Heading>
                                  <Text fontSize="sm" color="gray.600">
                                    {new Date(project.startDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })} - {' '}
                                    {new Date(project.endDate).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                                  </Text>
                                </HStack>

                                {project.summary && (
                                  <Text color="gray.700">{project.summary}</Text>
                                )}

                                {project.keywords && project.keywords.length > 0 && (
                                  <HStack spacing={2} wrap="wrap">
                                    {project.keywords.map((keyword) => (
                                      <Badge
                                        key={keyword}
                                        colorScheme="blue"
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
                  </Box>
                ))}
              </GridItem>
            </Grid>

            {profile?.profile.skills && profile?.profile.skills.length > 0 && (
              <>
                <Divider />
                <Grid templateColumns="2fr 8fr" gap={8}>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600" mb={2}>기술</Text>
                  </GridItem>
                  <GridItem>
                    <HStack align="stretch" spacing={2}>
                      {profile?.profile.skills.map((skill) => (
                        <Tag colorScheme="gray" key={skill.name}>{skill.name} (LV.{skill.level})</Tag>
                      ))}
                    </HStack>
                  </GridItem>
                </Grid>
              </>

            )}

            {profile?.profile?.education && profile?.profile?.education.length > 0 && (
              <>
                <Divider />
                <Grid templateColumns="2fr 8fr" gap={8}>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600" mb={2}>학력</Text>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      {profile?.profile?.education.map((education, index) => (
                        <Box key={index} mt={4} _first={{ mt: 0 }}>
                          <HStack justify="space-between">
                            <Text fontWeight="medium">{education.schoolName}</Text>
                            <Text fontSize="sm" color="gray.600">{education.startDate} - {education.endDate}</Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            {education.major}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </GridItem>
                </Grid>
              </>
            )}

            {profile?.profile?.awards && profile?.profile?.awards.length > 0 && (
              <>
                <Divider />
                <Grid templateColumns="2fr 8fr" gap={8}>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600" mb={2}>수상 및 기타</Text>
                  </GridItem>
                  <GridItem>
                    <VStack align="stretch" spacing={2}>
                      {profile?.profile?.awards.map((award, index) => (
                        <Box key={index} mt={4} _first={{ mt: 0 }}>
                          <HStack justify="space-between">
                            <Text fontWeight="medium">{award.title}</Text>
                            <Text fontSize="sm" color="gray.600">
                              {award.date}
                            </Text>
                          </HStack>
                          <Text fontSize="sm" color="gray.600">
                            {award.description}
                          </Text>
                        </Box>
                      ))}
                    </VStack>
                  </GridItem>
                </Grid>
              </>
            )}

            {profile?.profile?.languages && profile?.profile?.languages.length > 0 && (
              <>
                <Divider />
                <Grid templateColumns="2fr 8fr" gap={8}>
                  <GridItem>
                    <Text fontWeight="bold" color="gray.600" mb={2}>자격증</Text>
                  </GridItem>
                  <GridItem>
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
                  </GridItem>
                </Grid>
              </>
            )}

            {profile?.profile?.links && profile?.profile?.links.length > 0 && (
              <>
                <Divider />
                <Grid templateColumns="2fr 8fr" gap={8}>
                  <GridItem>
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
                  </GridItem>
                </Grid>
              </>
            )}
          </Stack>
        </CardBody>
      </Card>
    </>
  );
} 