import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ProjectFilter } from '../ProjectFilter';
import { TestProvider } from '@/test/utils/test-utils';

describe('ProjectFilter', () => {
  const mockFilter = {
    searchField: 'title' as const,
    searchQuery: '',
    sortOrder: 'desc' as const,
  };

  const renderProjectFilter = (props = {}) => {
    return render(
      <TestProvider>
        <ProjectFilter
          filter={mockFilter}
          onFilterChange={() => { }}
          onReset={() => { }}
          {...props}
        />
      </TestProvider>
    );
  };

  const openFilterModal = () => {
    const filterButton = screen.getByLabelText('필터');
    fireEvent.click(filterButton);
  };

  it('초기화 버튼을 클릭하면 onReset이 호출된다', () => {
    const handleReset = jest.fn();
    renderProjectFilter({ onReset: handleReset });

    openFilterModal();
    const resetButton = screen.getByText('초기화');
    fireEvent.click(resetButton);

    expect(handleReset).toHaveBeenCalled();
  });

  it('필터 변경 후 적용 버튼 클릭 시 onFilterChange가 호출된다', async () => {
    const handleFilterChange = jest.fn();
    renderProjectFilter({ onFilterChange: handleFilterChange });

    openFilterModal();
    const input = screen.getByPlaceholderText('검색어를 입력하세요');
    fireEvent.change(input, { target: { value: '테스트' } });

    const applyButton = screen.getByText('적용');
    fireEvent.click(applyButton);

    await waitFor(() => {
      expect(handleFilterChange).toHaveBeenCalledWith(expect.objectContaining({
        searchQuery: '테스트'
      }));
    });
  });

  it('검색어가 있을 때 태그가 표시된다', () => {
    renderProjectFilter({
      filter: {
        ...mockFilter,
        searchQuery: '테스트',
      },
    });

    expect(screen.getByText('제목: 테스트')).toBeInTheDocument();
  });

  it('정렬 순서 태그가 표시된다', () => {
    renderProjectFilter();
    expect(screen.getByText('최신순')).toBeInTheDocument();
  });
}); 