import { css } from '@emotion/react';
export const rtlAware = (isRTL: boolean) => ({
  marginLeft: (value: string) => css`
    ${isRTL ? 'margin-right' : 'margin-left'}:${value};
  `,
  marginRight: (value: string) => css`
    ${isRTL ? 'margin-right' : 'margin-left'}:${value};
  `,
  paddingLeft: (value: string) => css`
    ${isRTL ? 'padding-right' : 'padding-left'}:${value};
  `,
  paddingRight: (value: string) => css`
    ${isRTL ? 'padding-left' : 'padding-right'}:${value};
  `,
  left: (value: string) => css`
    ${isRTL ? 'right' : 'left'}:${value};
  `,
  right: (value: string) => css`
    ${isRTL ? 'left' : 'right'}:${value};
  `,
  textAlign: (align: 'left' | 'right') => css`
    ${isRTL ? (align === 'left' ? 'right' : 'left') : align};
  `,
  flexDirection: (value: string) => css`
    ${isRTL ? 'row-reverse' : 'row'}:${value};
  `,
});
