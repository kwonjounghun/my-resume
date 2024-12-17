import { Box, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useQuery } from '@tanstack/react-query';
import CompanyWishlistEditForm from '@/widgets/company-wishlist-form/ui/CompanyWishlistEditForm';
import { getCompanyWishlistDetail } from '@/entities/company/api/getCompanyWishlistDetail';

export default function CompanyWishlistEditPage() {
  const router = useRouter();
  const { id } = router.query;

  const { data: companyWishlist, isLoading } = useQuery({
    queryKey: ['companyWishlist', id],
    queryFn: () => getCompanyWishlistDetail(Number(id)),
    enabled: !!id,
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
        <CompanyWishlistEditForm id={Number(id)} initialData={companyWishlist} />
      </Box>
    </Container>
  );
} 