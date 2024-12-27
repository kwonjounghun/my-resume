import { Container, Box, Heading } from "@chakra-ui/react";
import ResumeForm from '@/widgets/resume-form/ui/ResumeForm';

export default function CreateResumePage() {
  return (
    <Container maxW="container.lg" py={8}>
      <Box mb={8}>
        <Heading size="lg">이력서 작성</Heading>
      </Box>
      <ResumeForm mode="create" />
    </Container>
  );
}
