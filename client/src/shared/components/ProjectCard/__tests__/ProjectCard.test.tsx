import { render, screen, fireEvent } from '@testing-library/react';
import { ProjectCard } from '../ProjectCard';
import { ChakraProvider } from '@chakra-ui/react';
import { format } from 'date-fns';
import { createSerializer } from '@emotion/jest';

expect.addSnapshotSerializer(createSerializer());

const mockProject = {
  id: '1',
  title: '프로젝트 관리 시스템 개발',
  companyName: '테크 컴퍼니',
  startDate: '2023-01',
  endDate: '2023-06',
  keywords: ['React', 'TypeScript', 'Next.js'],
  isPublic: true,
  workExperienceId: '1',
  summary: '프로젝트 관리 시스템 개발',
};

const formatDate = (date: string) => {
  return format(new Date(date), 'yyyy.MM');
};

describe('ProjectCard', () => {
  const renderProjectCard = (props = {}) => {
    return render(
      <ChakraProvider>
        <ProjectCard project={mockProject} {...props} />
      </ChakraProvider>
    );
  };

  describe('기본 렌더링', () => {
    it('프로젝트 제목을 렌더링한다', () => {
      renderProjectCard();
      expect(screen.getByText(mockProject.title)).toBeInTheDocument();
    });

    it('회사명을 렌더링한다', () => {
      renderProjectCard();
      expect(screen.getByText(mockProject.companyName)).toBeInTheDocument();
    });

    it('프로젝트 기간을 렌더링한다', () => {
      renderProjectCard();
      const period = `${formatDate(mockProject.startDate)} - ${formatDate(mockProject.endDate)}`;
      expect(screen.getByText(period)).toBeInTheDocument();
    });

    it('키워드를 렌더링한다', () => {
      renderProjectCard();
      mockProject.keywords.forEach(keyword => {
        expect(screen.getByText(keyword)).toBeInTheDocument();
      });
    });
  });

  describe('레이아웃 변형', () => {
    it('기본적으로 vertical 레이아웃으로 렌더링된다', () => {
      const { container } = renderProjectCard();
      expect(container).toMatchSnapshot();
    });

    it('horizontal 레이아웃으로 렌더링할 수 있다', () => {
      const { container } = renderProjectCard({ layout: 'horizontal' });
      expect(container).toMatchSnapshot();
    });
  });

  describe('태그 제한 기능', () => {
    const mockProjectWithManyTags = {
      ...mockProject,
      keywords: ['React', 'TypeScript', 'Next.js', 'MSW', 'Chakra UI', 'Emotion', 'React Query'],
    };

    it('maxVisibleTags 값에 따라 태그를 제한한다', () => {
      renderProjectCard({
        project: mockProjectWithManyTags,
        maxVisibleTags: 3,
      });

      // 처음 3개의 태그는 보여야 함
      expect(screen.getByText('React')).toBeInTheDocument();
      expect(screen.getByText('TypeScript')).toBeInTheDocument();
      expect(screen.getByText('Next.js')).toBeInTheDocument();

      // 나머지 태그 수를 표시하는 "+N" 태그가 있어야 함
      expect(screen.getByText('+4')).toBeInTheDocument();
    });

    it('maxVisibleTags보다 적은 태그가 있으면 모든 태그를 보여준다', () => {
      renderProjectCard({
        maxVisibleTags: 5,
      });

      mockProject.keywords.forEach(keyword => {
        expect(screen.getByText(keyword)).toBeInTheDocument();
      });

      // "+N" 태그가 없어야 함
      expect(screen.queryByText(/^\+\d+$/)).not.toBeInTheDocument();
    });
  });

  describe('제목 길이 제한', () => {
    const longTitle = '매우 긴 프로젝트 제목입니다. 이 프로젝트는 정말 긴 제목을 가지고 있어서 두 줄까지 표시가 되어야 하는 프로젝트입니다. 50자가 넘어가면 말줄임표시가 됩니다.';

    it('긴 제목이 있는 경우에도 컴포넌트가 정상적으로 렌더링된다', () => {
      const { container } = renderProjectCard({
        project: { ...mockProject, title: longTitle },
      });

      const titleElement = screen.getByText(longTitle);
      expect(titleElement).toBeInTheDocument();
      expect(container).toMatchSnapshot();
    });
  });

  describe('상호작용', () => {
    it('클릭 이벤트를 처리한다', () => {
      const handleClick = jest.fn();
      renderProjectCard({ onClick: handleClick });

      const card = screen.getByText(mockProject.title).closest('div');
      fireEvent.click(card!);

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
}); 