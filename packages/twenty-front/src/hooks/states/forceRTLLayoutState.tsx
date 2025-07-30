import { atom } from 'recoil';

export type LayoutDirection = 'auto' | 'ltr' | 'rtl';

export const forceRTLLayoutState = atom<LayoutDirection>({
  key: 'forceRTLLayoutState',
  default: 'auto',
});
