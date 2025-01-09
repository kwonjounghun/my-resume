import { Theme } from '../tokens';

// Theme 타입을 가진 객체에서 특정 경로의 값을 가져오는 유틸리티
export const getThemeValue = <T extends keyof Theme, K extends keyof Theme[T]>(
  theme: Theme,
  tokenType: T,
  key: K
): Theme[T][K] => {
  return theme[tokenType][key];
};

type ColorPath = `neutral.${(keyof Theme['colors']['neutral'])}` | `system.${(keyof Theme['colors']['system'])}` | `primary.${(keyof Theme['colors']['primary'])}` | `secondary.${(keyof Theme['colors']['secondary'])}` | `text.${(keyof Theme['colors']['text'])}`;

// 색상 값을 가져오는 유틸리티
export const getColor = (theme: Theme, colorPath: ColorPath) => {
  const [namespace, color] = colorPath.split('.') as [keyof Theme['colors'], keyof Theme['colors'][keyof Theme['colors']]];
  return theme.colors[namespace][color];
};

// 타이포그래피 스타일을 가져오는 유틸리티
export const getTypography = (theme: Theme, variant: keyof Theme['typography']['fontSize']) => {
  return {
    fontFamily: theme.typography.fontFamily.base,
    fontSize: theme.typography.fontSize[variant],
    lineHeight: theme.typography.lineHeight[variant],
  };
};

// 반응형 미디어 쿼리 유틸리티
export const mediaQuery = (theme: Theme) => ({
  mobile: `@media (min-width: ${theme.layout.breakpoints.mobile})`,
  tablet: `@media (min-width: ${theme.layout.breakpoints.tablet})`,
  desktop: `@media (min-width: ${theme.layout.breakpoints.desktop})`,
  wide: `@media (min-width: ${theme.layout.breakpoints.wide})`,
}); 