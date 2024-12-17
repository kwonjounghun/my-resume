import { Box, Container } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import CompanyWishlistDetail from '@/widgets/company-wishlist-detail/ui/CompanyWishlistDetail';

export default function CompanyWishlistDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  if (!id || typeof id !== 'string') {
    return null;
  }

  return (
    <Container maxW="container.lg" py={8}>
      <Box mb={8}>
        <CompanyWishlistDetail id={Number(id)} />
      </Box>
    </Container>
  );
} 