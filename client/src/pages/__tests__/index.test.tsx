import { render, screen } from '@testing-library/react';
import Home from '../index';

// Mock next/router
jest.mock('next/router', () => ({
  useRouter: () => ({
    pathname: '/',
  }),
}));

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => {
    return <a href={href}>{children}</a>;
  };
});

describe('Home', () => {
  beforeEach(() => {
    render(<Home />);
  });

  describe('Hero 섹션', () => {
    it('타이틀이 렌더링되어야 한다', () => {
      expect(screen.getByText('개발자를 위한')).toBeInTheDocument();
      expect(screen.getByText('이력서 빌더')).toBeInTheDocument();
    });

    it('설명이 렌더링되어야 한다', () => {
      expect(
        screen.getByText((content) =>
          content.includes('STAR 기법으로 프로젝트 회고를 작성하고')
        )
      ).toBeInTheDocument();
    });

    it('CTA 버튼들이 올바른 링크를 가져야 한다', () => {
      const retrospectiveButton = screen.getByRole('link', {
        name: '회고 작성하기',
      });
      const resumeButton = screen.getByRole('link', { name: '이력서 만들기' });

      expect(retrospectiveButton).toHaveAttribute('href', '/retrospectives');
      expect(resumeButton).toHaveAttribute('href', '/resumes');
    });
  });

  describe('Features 섹션', () => {
    it('모든 기능이 렌더링되어야 한다', () => {
      expect(screen.getByText('STAR 기법으로 회고 작성')).toBeInTheDocument();
      expect(screen.getByText('맞춤형 이력서 생성')).toBeInTheDocument();
      expect(screen.getByText('기업 맞춤 추천')).toBeInTheDocument();
    });

    it('각 기능의 설명이 렌더링되어야 한다', () => {
      expect(
        screen.getByText(
          '프로젝트 경험을 상황, 과제, 행동, 결과로 체계적으로 정리하세요.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          '정리된 회고를 바탕으로 다양한 형식의 이력서를 자동으로 생성하세요.'
        )
      ).toBeInTheDocument();
      expect(
        screen.getByText(
          '내 경험과 스킬에 맞는 채용 공고를 추천받고 맞춤형 이력서를 준비하세요.'
        )
      ).toBeInTheDocument();
    });
  });

  describe('Steps 섹션', () => {
    it('섹션 타이틀이 렌더링되어야 한다', () => {
      expect(screen.getByText('이렇게 사용하세요')).toBeInTheDocument();
    });

    it('모든 단계가 렌더링되어야 한다', () => {
      // 단계 번호 확인
      expect(screen.getByText('01')).toBeInTheDocument();
      expect(screen.getByText('02')).toBeInTheDocument();
      expect(screen.getByText('03')).toBeInTheDocument();
      expect(screen.getByText('04')).toBeInTheDocument();

      // 단계별 설명 확인
      expect(
        screen.getByText('STAR 기법을 사용해 프로젝트 경험을 정리합니다.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('나만의 강점과 가치를 담은 자기소개서를 작성합니다.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('회고와 자기소개서를 바탕으로 맞춤형 이력서를 생성합니다.')
      ).toBeInTheDocument();
      expect(
        screen.getByText('지원하고 싶은 기업의 채용 공고를 저장하고 관리합니다.')
      ).toBeInTheDocument();
    });
  });

  describe('Value Proposition 섹션', () => {
    it('섹션 타이틀이 렌더링되어야 한다', () => {
      expect(screen.getByText('더 나은 이력서를 위한 첫걸음')).toBeInTheDocument();
    });

    it('설명이 렌더링되어야 한다', () => {
      expect(
        screen.getByText((content) =>
          content.includes('Resume Builder는 개발자의 경험을 체계적으로 정리하고')
        )
      ).toBeInTheDocument();
    });

    it('시작하기 버튼이 올바른 링크를 가져야 한다', () => {
      const startButton = screen.getByRole('link', { name: '지금 시작하기' });
      expect(startButton).toHaveAttribute('href', '/retrospectives');
    });
  });
}); 