import {
  Box,
  Button,
  Card,
  CardBody,
  Container,
  Grid,
  Stack,
  Tag,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { getCompanyWishlist } from '@/entities/company/api/getCompanyWishlist';
import { CompanyWishlistStatus } from '@/entities/company/model/types';

const STATUS_COLOR_MAP: Record<CompanyWishlistStatus, string> = {
  DOCUMENT_SUBMITTED: 'blue',
  DOCUMENT_PASSED: 'green',
  DOCUMENT_FAILED: 'red',
  ASSIGNMENT_PASSED: 'green',
  FIRST_INTERVIEW: 'purple',
  SECOND_INTERVIEW: 'purple',
  FINAL_PASSED: 'green',
  FINAL_FAILED: 'red',
};

const STATUS_LABEL_MAP: Record<CompanyWishlistStatus, string> = {
  DOCUMENT_SUBMITTED: '서류 제출',
  DOCUMENT_PASSED: '서류 합격',
  DOCUMENT_FAILED: '서류 불합격',
  ASSIGNMENT_PASSED: '과제 합격',
  FIRST_INTERVIEW: '1차 면접',
  SECOND_INTERVIEW: '2차 면접',
  FINAL_PASSED: '최종 합격',
  FINAL_FAILED: '최종 불합격',
};

export default function CompanyWishlist() {
  const { data, isLoading } = useQuery({
    queryKey: ['companyWishlist'],
    queryFn: () => getCompanyWishlist(),
  });

  const cardBgColor = useColorModeValue('white', 'gray.700');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.600');

  if (isLoading) {
    return null;
  }

  if (!data?.companyWishlist || data.companyWishlist.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={4} align="center">
          <Text>아직 관심 기업이 없습니다.</Text>
          <Button as={Link} href="/companies/new">
            관심 기업 등록하기
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
      {data?.companyWishlist.map((company) => (
        <Card
          as={Link}
          href={`/companies/${company.id}`}
          key={company.id}
          bg={cardBgColor}
          borderColor={cardBorderColor}
          borderWidth="1px"
          borderRadius="lg"
          overflow="hidden"
          _hover={{ borderColor: 'primary.500', shadow: 'md' }}
          transition="all 0.2s"
        >
          <CardBody>
            <Stack spacing={3}>
              <Box>
                <Link
                  href={company.link}
                  isExternal
                  color="primary.500"
                  fontWeight="bold"
                  fontSize="lg"
                  _hover={{ textDecoration: 'none', color: 'primary.600' }}
                >
                  {company.company}
                </Link>
              </Box>
              <Text fontSize="sm" color="gray.600" noOfLines={2}>
                {company.description}
              </Text>
              <Box>
                <Tag
                  size="md"
                  variant="solid"
                  colorScheme={STATUS_COLOR_MAP[company.status]}
                >
                  {STATUS_LABEL_MAP[company.status]}
                </Tag>
                {company.isJobApplied && (
                  <Tag size="md" ml={2} variant="solid" colorScheme="green">
                    지원완료
                  </Tag>
                )}
              </Box>
              <Text fontSize="xs" color="gray.500">
                등록일: {new Date(company.createdAt).toLocaleDateString()}
              </Text>
            </Stack>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
} 