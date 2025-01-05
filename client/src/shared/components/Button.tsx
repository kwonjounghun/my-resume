import styled from '@emotion/styled';
import { theme } from '../styles/tokens';
import { getColor, getTypography } from '../styles/utils/theme';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  // 추가적인 커스텀 props가 필요하다면 여기에 정의
}

export const Button = styled.button<ButtonProps>`
  background-color: ${() => getColor(theme, 'primary.main')};
  color: ${() => getColor(theme, 'primary.contrast')};
  padding: ${theme.spacing[2]} ${theme.spacing[4]};
  border-radius: ${theme.layout.borderRadius.md};
  border: none;
  cursor: pointer;
  
  ${() => getTypography(theme, 'button')};

  &:hover {
    background-color: ${() => getColor(theme, 'primary.dark')};
  }

  &:disabled {
    background-color: ${() => getColor(theme, 'neutral.grey400')};
    cursor: not-allowed;
  }
`; 