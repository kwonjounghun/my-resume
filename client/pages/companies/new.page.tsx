import { Box, Container, Heading } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CompanyWishlistForm } from '@/widgets/company-wishlist-form/ui/CompanyWishlistForm';

export default function NewCompanyWishlistPage() {
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/companies');
  };

  return (
    <Container maxW="container.md" py={8}>
      <Box mb={8}>
        <Heading as="h1">관심기업 등록</Heading>
      </Box>
      <CompanyWishlistForm onSuccess={handleSuccess} />
    </Container>
  );
} 