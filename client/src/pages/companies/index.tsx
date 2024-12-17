import { Button, Container, Flex, Heading, Link, VStack } from '@chakra-ui/react';
import CompanyWishlist from '@/widgets/company-wishlist/ui/CompanyWishlist';

export default function CompaniesPage() {
  return (
    <Container maxW="container.xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Flex justify="space-between" align="center">
          <Heading as="h1">관심기업 목록</Heading>
          <Button as={Link} href="/companies/new">
            관심기업 등록
          </Button>
        </Flex>
        <CompanyWishlist />
      </VStack>
    </Container >
  );
} 