import { Box, Button, Container, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';
import { ProjectList } from '@/widgets/ProjectList/ProjectList';
import { useRouter } from 'next/router';
import { BsGrid, BsListUl } from 'react-icons/bs';
import { useState } from 'react';
import { ProjectFilter } from '@/features/project/ui/ProjectFilter';
import { useProjectFilter } from '@/features/project/hooks/useProjectFilter';

export const ProjectsPage = () => {
  const router = useRouter();
  const [layout, setLayout] = useState<'horizontal' | 'vertical'>('vertical');
  const isMobile = useBreakpointValue({ base: true, md: false });
  const { filter, setFilter, resetFilter } = useProjectFilter();

  return (
    <Container maxW="container.xl" py={8}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg">프로젝트</Heading>
        <Flex gap={4}>
          {!isMobile && (
            <Flex gap={2}>
              <Button
                variant={layout === 'vertical' ? 'solid' : 'ghost'}
                onClick={() => setLayout('vertical')}
                leftIcon={<BsGrid />}
              >
                그리드
              </Button>
              <Button
                variant={layout === 'horizontal' ? 'solid' : 'ghost'}
                onClick={() => setLayout('horizontal')}
                leftIcon={<BsListUl />}
              >
                리스트
              </Button>
            </Flex>
          )}
          <Button colorScheme="blue" onClick={() => router.push('/projects/new')}>
            프로젝트 추가
          </Button>
        </Flex>
      </Flex>

      <ProjectFilter
        filter={filter}
        onFilterChange={setFilter}
        onReset={resetFilter}
      />

      <Box mt={4}>
        <ProjectList
          layout={isMobile ? 'horizontal' : layout}
          filter={filter}
        />
      </Box>
    </Container>
  );
}; 