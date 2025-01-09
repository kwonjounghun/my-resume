export const layout = {
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px',
    wide: '1440px'
  },

  maxWidth: {
    container: '1200px'
  },

  zIndex: {
    modal: 1000,
    overlay: 900,
    drawer: 800,
    header: 700,
    footer: 600
  },

  borderRadius: {
    none: '0',
    sm: '4px',
    md: '8px',
    lg: '16px',
    xl: '24px',
    full: '9999px'
  }
} as const; 