import {
  Box,
  Button,
  Card,
  Container,
  Flex,
  Grid,
  Heading,
  Stack,
  Tag,
  Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { format } from 'date-fns';
import { Retrospective } from '@/entities/retrospective/model/types';

export default function RetrospectiveList({ retrospectives }: { retrospectives: Retrospective[] }) {
  if (!retrospectives || retrospectives.length === 0) {
    return (
      <Container maxW="container.xl" py={8}>
        <Stack spacing={4} align="center">
          <Text>아직 작성된 회고가 없습니다.</Text>
          <Button as={Link} href="/retrospectives/new">
            회고 작성하기
          </Button>
        </Stack>
      </Container>
    );
  }

  return (
    <Grid
      templateColumns={{
        base: '1fr',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
      }}
      gap={6}
    >
      {retrospectives.map((retrospective) => (
        <Card
          key={retrospective.id}
          as={Link}
          href={`/retrospectives/${retrospective.id}`}
          p={6}
          _hover={{ transform: 'translateY(-4px)', shadow: 'md' }}
          transition="all 0.2s"
        >
          <Stack spacing={4}>
            <Box>
              <Text fontSize="sm" color="gray.500" mb={1}>
                {retrospective.company}
              </Text>
              <Heading size="md" mb={2}>
                {retrospective.title}
              </Heading>
              <Text fontSize="sm" color="gray.500">
                {format(new Date(retrospective.startDate), 'yyyy.MM.dd')} -{' '}
                {format(new Date(retrospective.endDate), 'yyyy.MM.dd')}
              </Text>
            </Box>

            {retrospective.summary && (
              <Text noOfLines={2} color="gray.600">
                {retrospective.summary}
              </Text>
            )}

            <Flex gap={2} wrap="wrap">
              {retrospective.keywords?.map((keyword) => (
                <Tag
                  key={keyword}
                  size="sm"
                  colorScheme="primary"
                  variant="subtle"
                >
                  {keyword}
                </Tag>
              ))}
            </Flex>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
} 