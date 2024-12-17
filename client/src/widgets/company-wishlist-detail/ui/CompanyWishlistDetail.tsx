import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Link,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import { getCompanyWishlistDetail } from '@/entities/company/api/getCompanyWishlistDetail';
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

interface CompanyWishlistDetailProps {
  id: number;
}

export default function CompanyWishlistDetail({ id }: CompanyWishlistDetailProps) {
  const router = useRouter();
  const toast = useToast();
  const cardBgColor = useColorModeValue('white', 'gray.700');
  const cardBorderColor = useColorModeValue('gray.200', 'gray.600');

  const { data: companyWishlist, isLoading } = useQuery({
    queryKey: ['companyWishlist', id],
    queryFn: () => getCompanyWishlistDetail(id),
  });

  if (isLoading) {
    return null;
  }

  if (!companyWishlist) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="gray.500">관심기업을 찾을 수 없습니다.</Text>
      </Box>
    );
  }

  const handleEdit = () => {
    router.push(`/companies/${id}/edit`);
  };

  return (
    <Card
      bg={cardBgColor}
      borderColor={cardBorderColor}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      maxW="800px"
      mx="auto"
    >
      <CardHeader>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading size="lg">{companyWishlist.company}</Heading>
          <Button colorScheme="blue" onClick={handleEdit}>
            수정
          </Button>
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack spacing={4}>
          <Box>
            <Text fontWeight="bold" mb={2}>
              채용공고 링크
            </Text>
            <Link
              href={companyWishlist.link}
              isExternal
              color="blue.500"
              _hover={{ textDecoration: 'none', color: 'blue.600' }}
            >
              {companyWishlist.link}
            </Link>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>
              지원 상태
            </Text>
            <Stack direction="row" spacing={2}>
              <Tag
                size="md"
                variant="solid"
                colorScheme={STATUS_COLOR_MAP[companyWishlist.status]}
              >
                {STATUS_LABEL_MAP[companyWishlist.status]}
              </Tag>
              {companyWishlist.isJobApplied && (
                <Tag size="md" variant="solid" colorScheme="green">
                  지원완료
                </Tag>
              )}
            </Stack>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>
              설명
            </Text>
            <Text>{companyWishlist.description}</Text>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>
              등록일
            </Text>
            <Text>
              {new Date(companyWishlist.createdAt).toLocaleDateString()}
            </Text>
          </Box>

          <Box>
            <Text fontWeight="bold" mb={2}>
              최종 수정일
            </Text>
            <Text>
              {new Date(companyWishlist.updatedAt).toLocaleDateString()}
            </Text>
          </Box>
        </Stack>
      </CardBody>

      <CardFooter>
        <Button
          variant="ghost"
          colorScheme="gray"
          onClick={() => router.back()}
          w="full"
        >
          뒤로가기
        </Button>
      </CardFooter>
    </Card>
  );
} 