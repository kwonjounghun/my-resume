import { Box, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import CompanyWishlistEditForm from '@/widgets/company-wishlist-form/ui/CompanyWishlistEditForm';
import { getCompanyWishlistDetail } from '@/entities/company/api/getCompanyWishlistDetail';
import { getResumes } from '@/entities/resume/api/getResumes';

export default function CompanyWishlistEditPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return null;
  }

  const { data: companyWishlist, isLoading } = useQuery({
    queryKey: ['companyWishlist', id],
    queryFn: () => getCompanyWishlistDetail(id),
    enabled: !!id,
  });

  const { data: resumes } = useQuery({
    queryKey: ['resumes'],
    queryFn: () => getResumes(),
  });

  if (!id || typeof id !== 'string') {
    return null;
  }

  if (isLoading) {
    return null;
  }

  if (!companyWishlist) {
    return (
      <Box textAlign="center" py={10}>
        관심기업을 찾을 수 없습니다.
      </Box>
    );
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Box mb={8}>
        <CompanyWishlistEditForm id={id} initialData={companyWishlist} resumes={resumes?.resumes || []} />
      </Box>
    </Container>
  );
} 