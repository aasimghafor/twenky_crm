import { atom } from 'recoil';

export const multiWorkspaceDropdownState = atom({
  key: 'multiWorkspaceDropdownState',
  default: 'default',
});
// <
//   'default' | 'workspaces-list' | 'themes'
// >