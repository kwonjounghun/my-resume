import { render, screen, fireEvent } from '@testing-library/react';
import { ProfileForm } from './ProfileForm';
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

describe('ProfileForm', () => {
  const mockOnSubmit = jest.fn();

  beforeEach(() => {
    mockOnSubmit.mockClear();
  });

  it('renders form fields correctly', () => {
    render(<ProfileForm onSubmit={mockOnSubmit} initialData={mockProfile} />);

    // 기본 정보 필드 확인
    expect(screen.getByLabelText('이름')).toBeInTheDocument();
    expect(screen.getByLabelText('이메일')).toBeInTheDocument();
    expect(screen.getByLabelText('연락처')).toBeInTheDocument();

    // 학력 정보 확인
    expect(screen.getByText('학력')).toBeInTheDocument();
    expect(screen.getByDisplayValue('서울대학교')).toBeInTheDocument();
    expect(screen.getByDisplayValue('컴퓨터공학과')).toBeInTheDocument();

    // 스킬 정보 확인
    expect(screen.getByText('스킬')).toBeInTheDocument();
    expect(screen.getByDisplayValue('JavaScript')).toBeInTheDocument();
    expect(screen.getByDisplayValue('TypeScript')).toBeInTheDocument();

    // 수상 정보 확인
    expect(screen.getByText('수상 및 기타')).toBeInTheDocument();
    expect(screen.getByDisplayValue('2023 해커톤 대상')).toBeInTheDocument();

    // 외국어 정보 확인
    expect(screen.getByText('외국어')).toBeInTheDocument();
    expect(screen.getByDisplayValue('영어')).toBeInTheDocument();

    // 링크 정보 확인
    expect(screen.getByText('링크')).toBeInTheDocument();
    expect(screen.getByDisplayValue('https://github.com/hong')).toBeInTheDocument();
  });

  it('submits form with updated data', async () => {
    render(<ProfileForm onSubmit={mockOnSubmit} initialData={mockProfile} />);

    // 이름 필드 수정
    const nameInput = screen.getByLabelText('이름');
    fireEvent.change(nameInput, { target: { value: '김철수' } });

    // 폼 제출
    const submitButton = screen.getByText('저장');
    fireEvent.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledTimes(1);
    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: '김철수',
      }),
    );
  });

  it('adds and removes education fields', () => {
    render(<ProfileForm onSubmit={mockOnSubmit} />);

    // 학력 추가
    const addEducationButton = screen.getByText('학력 추가');
    fireEvent.click(addEducationButton);

    // 새로운 학력 필드가 추가되었는지 확인
    const schoolNameInputs = screen.getAllByLabelText('학교명');
    expect(schoolNameInputs).toHaveLength(1);

    // 학력 삭제
    const removeButton = screen.getByText('삭제');
    fireEvent.click(removeButton);

    // 학력 필드가 삭제되었는지 확인
    expect(screen.queryByLabelText('학교명')).not.toBeInTheDocument();
  });

  it('adds and removes skill fields', () => {
    render(<ProfileForm onSubmit={mockOnSubmit} />);

    // 스킬 추가
    const addSkillButton = screen.getByText('스킬 추가');
    fireEvent.click(addSkillButton);

    // 새로운 스킬 필드가 추가되었는지 확인
    const skillInputs = screen.getAllByPlaceholderText('스킬명');
    expect(skillInputs).toHaveLength(1);

    // 스킬 삭제
    const removeButtons = screen.getAllByLabelText('스킬 삭제');
    fireEvent.click(removeButtons[0]);

    // 스킬 필드가 삭제되었는지 확인
    expect(screen.queryByPlaceholderText('스킬명')).not.toBeInTheDocument();
  });
}); 