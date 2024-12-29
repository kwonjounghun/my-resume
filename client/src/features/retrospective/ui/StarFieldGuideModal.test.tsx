import { render, screen, fireEvent } from '@testing-library/react';
import { StarFieldGuideModal } from './StarFieldGuideModal';
import { STAR_FIELD_GUIDES } from '../lib/starGuides';

describe('StarFieldGuideModal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  it('모달이 열려있을 때 제목과 가이드 내용을 표시합니다', () => {
    render(
      <StarFieldGuideModal
        isOpen={true}
        onClose={mockOnClose}
        title={STAR_FIELD_GUIDES.situation.title}
        guide={STAR_FIELD_GUIDES.situation.guide}
        hasUnsavedContent={false}
      />
    );

    expect(screen.getByText(STAR_FIELD_GUIDES.situation.title)).toBeInTheDocument();
    expect(screen.getByText(/프로젝트나 업무가 시작된 배경과 맥락을 설명해주세요/)).toBeInTheDocument();
  });

  it('저장되지 않은 내용이 없을 때 닫기 버튼을 클릭하면 바로 닫힙니다', () => {
    render(
      <StarFieldGuideModal
        isOpen={true}
        onClose={mockOnClose}
        title={STAR_FIELD_GUIDES.situation.title}
        guide={STAR_FIELD_GUIDES.situation.guide}
        hasUnsavedContent={false}
      />
    );

    fireEvent.click(screen.getByText('닫기'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('저장되지 않은 내용이 있을 때 닫기 버튼을 클릭하면 확인 대화상자가 표시됩니다', () => {
    render(
      <StarFieldGuideModal
        isOpen={true}
        onClose={mockOnClose}
        title={STAR_FIELD_GUIDES.situation.title}
        guide={STAR_FIELD_GUIDES.situation.guide}
        hasUnsavedContent={true}
      />
    );

    fireEvent.click(screen.getByText('닫기'));
    expect(screen.getByText('작성 중인 내용이 있습니다')).toBeInTheDocument();
    expect(screen.getByText('계속하시겠습니까?')).toBeInTheDocument();
  });

  it('확인 대화상자에서 취소를 클릭하면 모달이 닫히지 않습니다', () => {
    render(
      <StarFieldGuideModal
        isOpen={true}
        onClose={mockOnClose}
        title={STAR_FIELD_GUIDES.situation.title}
        guide={STAR_FIELD_GUIDES.situation.guide}
        hasUnsavedContent={true}
      />
    );

    fireEvent.click(screen.getByText('닫기'));
    fireEvent.click(screen.getByText('취소'));
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('확인 대화상자에서 확인을 클릭하면 모달이 닫힙니다', () => {
    render(
      <StarFieldGuideModal
        isOpen={true}
        onClose={mockOnClose}
        title={STAR_FIELD_GUIDES.situation.title}
        guide={STAR_FIELD_GUIDES.situation.guide}
        hasUnsavedContent={true}
      />
    );

    fireEvent.click(screen.getByText('닫기'));
    fireEvent.click(screen.getByText('확인'));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
}); 