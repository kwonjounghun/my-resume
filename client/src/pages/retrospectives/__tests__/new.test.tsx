import React from 'react';
import { render, screen } from '@testing-library/react';
import NewRetrospective from '../NewRetrospective';

const renderPage = () => {
  render(<NewRetrospective />);
};

describe('NewRetrospective', () => {
  it('목록으로 돌아가는 버튼이 렌더링되어야 한다', () => {
    renderPage();
    const backToListButton = screen.getByRole('button', { name: /목록으로/ });
    expect(backToListButton).toBeInTheDocument();
    expect(backToListButton.closest('a')).toHaveAttribute('href', '/retrospectives');
  });
}); 