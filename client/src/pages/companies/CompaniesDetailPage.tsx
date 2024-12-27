import { Box, Container } from "@chakra-ui/react";
import CompanyWishlistDetail from "@/widgets/company-wishlist-detail/ui/CompanyWishlistDetail";

export default function CompanyWishlistDetailPage({ id }: { id: string }) {
  return (
    <Container maxW="container.lg" py={8}>
      <Box mb={8}>
        <CompanyWishlistDetail id={id} />
      </Box>
    </Container>
  );
} 