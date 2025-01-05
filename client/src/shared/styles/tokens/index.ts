import { colors } from './colors';
import { typography } from './typography';
import { spacing } from './spacing';
import { layout } from './layout';

// Theme 타입 정의
export type Theme = {
  colors: typeof colors;
  typography: typeof typography;
  spacing: typeof spacing;
  layout: typeof layout;
};

// 기본 테마 객체
export const theme = {
  colors,
  typography,
  spacing,
  layout,
} as const; 