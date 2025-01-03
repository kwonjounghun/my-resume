import { render, screen } from '@testing-library/react';
import { ProfileDetail } from './ProfileDetail';
import { Profile } from '@/entities/profile/model/types';

const mockProfile: Profile = {
  id: '1',
  name: '홍길동',
  email: 'hong@example.com',
  phone: '010-1234-5678',
  education: [
    {
      schoolName: '서울대학교',
      major: '컴퓨터공학과',
      startDate: '2015-03',
      endDate: '2019-02',
      isAttending: false,
    },
  ],
  skills: [
    { name: 'JavaScript', level: 5 },
    { name: 'TypeScript', level: 4 },
    { name: 'React', level: 4 },
  ],
  awards: [
    {
      title: '2023 해커톤 대상',
      date: '2023-06',
      description: '혁신적인 웹 서비스 개발로 대상 수상',
    },
  ],
  languages: [
    {
      name: '영어',
      level: '상',
      certifications: ['TOEIC 900점'],
    },
  ],
  links: [
    {
      type: 'Link',
      url: 'https://github.com/hong',
      description: '깃허브',
    },
  ],
};

describe('ProfileDetail', () => {
  it('renders basic information correctly', () => {
    render(<ProfileDetail profile={mockProfile} />);

    expect(screen.getByText('기본 정보')).toBeInTheDocument();
    expect(screen.getByText('홍길동')).toBeInTheDocument();
    expect(screen.getByText('hong@example.com')).toBeInTheDocument();
    expect(screen.getByText('010-1234-5678')).toBeInTheDocument();
  });

  it('renders education information correctly', () => {
    render(<ProfileDetail profile={mockProfile} />);

    expect(screen.getByText('학력')).toBeInTheDocument();
    expect(screen.getByText('서울대학교')).toBeInTheDocument();
    expect(screen.getByText('컴퓨터공학과 (학사)')).toBeInTheDocument();
    expect(screen.getByText('2015-03 - 2019-02')).toBeInTheDocument();
  });

  it('renders skills correctly', () => {
    render(<ProfileDetail profile={mockProfile} />);

    expect(screen.getByText('스킬')).toBeInTheDocument();
    expect(screen.getByText('JavaScript (Lv.5)')).toBeInTheDocument();
    expect(screen.getByText('TypeScript (Lv.4)')).toBeInTheDocument();
    expect(screen.getByText('React (Lv.4)')).toBeInTheDocument();
  });

  it('renders awards correctly', () => {
    render(<ProfileDetail profile={mockProfile} />);

    expect(screen.getByText('수상 및 기타')).toBeInTheDocument();
    expect(screen.getByText('2023 해커톤 대상')).toBeInTheDocument();
    expect(screen.getByText('2023-06')).toBeInTheDocument();
    expect(
      screen.getByText('혁신적인 웹 서비스 개발로 대상 수상'),
    ).toBeInTheDocument();
  });

  it('renders languages correctly', () => {
    render(<ProfileDetail profile={mockProfile} />);

    expect(screen.getByText('외국어')).toBeInTheDocument();
    expect(screen.getByText('영어')).toBeInTheDocument();
    expect(screen.getByText('상')).toBeInTheDocument();
    expect(screen.getByText('TOEIC 900점')).toBeInTheDocument();
  });

  it('renders links correctly', () => {
    render(<ProfileDetail profile={mockProfile} />);

    expect(screen.getByText('링크')).toBeInTheDocument();
    const link = screen.getByText('https://github.com/hong');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', 'https://github.com/hong');
    expect(screen.getByText('- 깃허브')).toBeInTheDocument();
  });

  it('renders edit button correctly', () => {
    render(<ProfileDetail profile={mockProfile} />);

    const editButton = screen.getByText('수정');
    expect(editButton).toBeInTheDocument();
    expect(editButton.closest('a')).toHaveAttribute('href', '/profile/edit');
  });
}); 