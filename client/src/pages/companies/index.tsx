import { Container, Heading, VStack } from '@chakra-ui/react';
import CompanyWishlist from '@/widgets/company-wishlist/ui/CompanyWishlist';

export default function CompaniesPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="lg">관심 기업</Heading>
        <CompanyWishlist />
      </VStack>
    </Container>
  );
} 