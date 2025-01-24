import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { FiBookOpen, FiFileText, FiTarget } from 'react-icons/fi';

const features = [
  {
    icon: FiBookOpen,
    title: 'STAR 기법으로 회고 작성',
    description: '프로젝트 경험을 상황, 과제, 행동, 결과로 체계적으로 정리하세요.',
  },
  {
    icon: FiFileText,
    title: '맞춤형 이력서 생성',
    description: '정리된 회고를 바탕으로 다양한 형식의 이력서를 자동으로 생성하세요.',
  },
  {
    icon: FiTarget,
    title: '기업 맞춤 추천',
    description: '내 경험과 스킬에 맞는 채용 공고를 추천받고 맞춤형 이력서를 준비하세요.',
  },
];

const steps = [
  {
    number: '01',
    title: '회고 작성하기',
    description: 'STAR 기법을 사용해 프로젝트 경험을 정리합니다.',
  },
  {
    number: '02',
    title: '자기소개서 작성하기',
    description: '나만의 강점과 가치를 담은 자기소개서를 작성합니다.',
  },
  {
    number: '03',
    title: '이력서 생성하기',
    description: '회고와 자기소개서를 바탕으로 맞춤형 이력서를 생성합니다.',
  },
  {
    number: '04',
    title: '관심 기업 관리하기',
    description: '지원하고 싶은 기업의 채용 공고를 저장하고 관리합니다.',
  },
];

export default function Home() {
  const bgGradient = useColorModeValue(
    'linear(to-b, primary.50, white)',
    'linear(to-b, gray.900, gray.800)'
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box bg={bgGradient} pt={20} pb={32}>
        <Container maxW="container.xl">
          <Stack spacing={8} alignItems="center" textAlign="center">
            <Stack spacing={4} maxW="3xl">
              <Heading as="h1" size="3xl" fontWeight="bold">
                개발자를 위한{' '}
                <Text as="span" color="primary.500">
                  이력서 빌더
                </Text>
              </Heading>
              <Text fontSize="xl" color="gray.600" lineHeight="tall">
                STAR 기법으로 프로젝트 회고를 작성하고,
                <br />
                맞춤형 이력서를 손쉽게 만들어보세용.
              </Text>
            </Stack>
            <Stack direction="row" spacing={4}>
              <Button
                as={Link}
                href="/retrospectives"
                size="lg"
                height="4rem"
                px="2rem"
                fontSize="lg"
              >
                회고 작성하기
              </Button>
              <Button
                as={Link}
                href="/resumes"
                size="lg"
                height="4rem"
                px="2rem"
                fontSize="lg"
                variant="outline"
              >
                이력서 만들기
              </Button>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={8}
        >
          {features.map((feature, index) => (
            <Stack
              key={index}
              p={8}
              spacing={4}
              bg="white"
              borderRadius="xl"
              boxShadow="sm"
              _hover={{ boxShadow: 'md', transform: 'translateY(-4px)' }}
              transition="all 0.2s"
            >
              <Flex
                w={12}
                h={12}
                align="center"
                justify="center"
                borderRadius="full"
                bg="primary.50"
                color="primary.500"
              >
                <Icon as={feature.icon} boxSize={6} />
              </Flex>
              <Heading as="h3" size="md">
                {feature.title}
              </Heading>
              <Text color="gray.600">{feature.description}</Text>
            </Stack>
          ))}
        </Grid>
      </Container>

      {/* Steps Section */}
      <Box bg="gray.50" py={20}>
        <Container maxW="container.xl">
          <Stack spacing={12}>
            <Stack spacing={4} textAlign="center">
              <Heading as="h2" size="xl">
                이렇게 사용하세요
              </Heading>
              <Text color="gray.600" fontSize="lg">
                단계별로 쉽고 체계적인 이력서 작성이 가능합니다
              </Text>
            </Stack>
            <Grid
              templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }}
              gap={8}
            >
              {steps.map((step, index) => (
                <Stack
                  key={index}
                  p={8}
                  spacing={4}
                  bg="white"
                  borderRadius="xl"
                  boxShadow="sm"
                  position="relative"
                  _hover={{ boxShadow: 'md' }}
                  transition="all 0.2s"
                >
                  <Text
                    position="absolute"
                    top={4}
                    right={4}
                    fontSize="sm"
                    fontWeight="bold"
                    color="primary.500"
                  >
                    {step.number}
                  </Text>
                  <Heading as="h3" size="md">
                    {step.title}
                  </Heading>
                  <Text color="gray.600">{step.description}</Text>
                </Stack>
              ))}
            </Grid>
          </Stack>
        </Container>
      </Box>

      {/* Value Proposition Section */}
      <Container maxW="container.xl" py={20}>
        <Stack spacing={12} align="center" textAlign="center">
          <Stack spacing={4} maxW="2xl">
            <Heading as="h2" size="xl">
              더 나은 이력서를 위한 첫걸음
            </Heading>
            <Text color="gray.600" fontSize="lg">
              Resume Builder는 개발자의 경험을 체계적으로 정리하고,
              <br />
              효과적으로 전달할 수 있도록 도와드립니다.
            </Text>
          </Stack>
          <Button
            as={Link}
            href="/retrospectives"
            size="lg"
            height="4rem"
            px="2rem"
            fontSize="lg"
          >
            지금 시작하기
          </Button>
        </Stack>
      </Container>
    </Box>
  );
} 