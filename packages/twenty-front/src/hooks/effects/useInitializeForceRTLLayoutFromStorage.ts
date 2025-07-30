import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import {
    forceRTLLayoutState,
    LayoutDirection,
} from '~/hooks/states/forceRTLLayoutState';

export const useInitializeForceRTLLayoutFromStorage = () => {
  const setForceRTLLayout = useSetRecoilState(forceRTLLayoutState);

  useEffect(() => {
    try {
      const savedLayoutDirection = localStorage.getItem(
        'forceRTLLayout',
      ) as LayoutDirection;
      if (
        savedLayoutDirection &&
        ['auto', 'ltr', 'rtl'].includes(savedLayoutDirection)
      ) {
        setForceRTLLayout(savedLayoutDirection);
      }
    } catch (error) {
      console.warn(
        'Failed to load forced RTL layout from localStorage:',
        error,
      );
    }
  }, [setForceRTLLayout]);
};
