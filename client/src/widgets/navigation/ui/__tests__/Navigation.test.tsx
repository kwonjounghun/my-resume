import { render, screen } from '@testing-library/react';
import { useRouter } from 'next/router';
import Navigation from '../Navigation';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

describe('네비게이션', () => {
  const mockUseRouter = useRouter as jest.Mock;

  beforeEach(() => {
    // 기본 router mock 설정
    mockUseRouter.mockImplementation(() => ({
      pathname: '/',
    }));
  });

  it('로고가 렌더링되어야 한다', () => {
    render(<Navigation />);
    expect(screen.getByText('Resume Builder')).toBeInTheDocument();
  });

  it('모든 네비게이션 아이템이 렌더링되어야 한다', () => {
    render(<Navigation />);
    
    expect(screen.getByText('회고')).toBeInTheDocument();
    expect(screen.getByText('이력서')).toBeInTheDocument();
    expect(screen.getByText('자기소개')).toBeInTheDocument();
    expect(screen.getByText('관심기업')).toBeInTheDocument();
  });

  it('현재 경로에 해당하는 네비게이션 아이템이 강조되어야 한다', () => {
    // 회고 페이지에 있다고 가정
    mockUseRouter.mockImplementation(() => ({
      pathname: '/retrospectives',
    }));

    render(<Navigation />);
    
    const retrospectiveLink = screen.getByText('회고');
    const resumeLink = screen.getByText('이력서');

    // 회고 링크는 primary.500 색상을 가져야 함
    expect(retrospectiveLink).toHaveStyle({ color: 'var(--chakra-colors-primary-500)' });
    // 이력서 링크는 gray.600 색상을 가져야 함
    expect(resumeLink).toHaveStyle({ color: 'var(--chakra-colors-gray-600)' });
  });

  it('모든 네비게이션 아이템이 올바른 링크를 가져야 한다', () => {
    render(<Navigation />);
    
    const links = screen.getAllByRole('link');
    
    // Resume Builder 로고 링크
    expect(links[0]).toHaveAttribute('href', '/');
    
    // 네비게이션 아이템 링크들
    expect(links[1]).toHaveAttribute('href', '/retrospectives');
    expect(links[2]).toHaveAttribute('href', '/resumes');
    expect(links[3]).toHaveAttribute('href', '/introductions');
    expect(links[4]).toHaveAttribute('href', '/companies');
  });
}); 