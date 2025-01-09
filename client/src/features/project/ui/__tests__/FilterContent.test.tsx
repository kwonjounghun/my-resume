import { render, screen, fireEvent } from '@testing-library/react';
import { FilterContent } from '../FilterContent';
import { TestProvider } from '@/test/utils/test-utils';

// matchMedia mock 구현
window.matchMedia = window.matchMedia || function () {
  return {
    matches: false,
    addListener: function () { },
    removeListener: function () { }
  };
};

describe('FilterContent', () => {
  const mockFilter = {
    searchField: 'title' as const,
    searchQuery: '',
    sortOrder: 'desc' as const,
  };

  const renderFilterContent = (props = {}) => {
    return render(
      <TestProvider>
        <FilterContent
          filter={mockFilter}
          onChange={() => { }}
          {...props}
        />
      </TestProvider>
    );
  };

  it('모든 필터 옵션을 렌더링한다', () => {
    renderFilterContent();

    expect(screen.getByText('정렬')).toBeInTheDocument();
    expect(screen.getByText('검색 필드')).toBeInTheDocument();
    expect(screen.getByText('검색어')).toBeInTheDocument();
  });

  it('검색어 입력을 처리한다', () => {
    const handleChange = jest.fn();
    renderFilterContent({ onChange: handleChange });

    const input = screen.getByPlaceholderText('검색어를 입력하세요');
    fireEvent.change(input, { target: { value: '테스트' } });

    expect(handleChange).toHaveBeenCalledWith({ searchQuery: '테스트' });
  });

  it('검색 필드 변경을 처리한다', () => {
    const handleChange = jest.fn();
    renderFilterContent({ onChange: handleChange });

    const select = screen.getByDisplayValue('제목');
    fireEvent.change(select, { target: { value: 'keyword' } });

    expect(handleChange).toHaveBeenCalledWith({ searchField: 'keyword' });
  });

  it('정렬 순서 변경을 처리한다', () => {
    const handleChange = jest.fn();
    renderFilterContent({ onChange: handleChange });

    const select = screen.getByDisplayValue('최신순');
    fireEvent.change(select, { target: { value: 'asc' } });

    expect(handleChange).toHaveBeenCalledWith({ sortOrder: 'asc' });
  });
}); 