// import { i18n } from '@lingui/core';
// import { useEffect, useMemo, useState } from 'react';
// import { useRecoilValue } from 'recoil';
// import {
//   forceRTLLayoutState,
//   LayoutDirection,
// } from '~/hooks/states/forceRTLLayoutState';
// const RTL_LOCALES = ['ar', 'ar-SA', 'he', 'he-IL', 'fa', 'fa-IR'];

// export const useIsRTL = (): boolean => {
//   const [currentLocale, setCurrentLocale] = useState(i18n.locale || 'en');

//   useEffect(() => {
//     const handleLocaleChange = () => {
//       setCurrentLocale(i18n.locale || 'en');
//     };

//     // Listen for locale changes
//     const interval = setInterval(handleLocaleChange, 100);

//     return () => {
//       clearInterval(interval);
//     };
//   }, []);

//   return useMemo(() => {
//     return RTL_LOCALES.some((rtlLocale) => currentLocale.startsWith(rtlLocale));
//   }, [currentLocale]);
// };
import { i18n } from '@lingui/core';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { forceRTLLayoutState } from '~/hooks/states/forceRTLLayoutState';

const RTL_LOCALES = ['ar', 'ar-SA', 'he', 'he-IL', 'fa', 'fa-IR'];

export const useIsRTL = (): boolean => {
  const [currentLocale, setCurrentLocale] = useState(i18n.locale || 'en');
  const forceRTLLayout = useRecoilValue(forceRTLLayoutState);

  useEffect(() => {
    const handleLocaleChange = () => {
      setCurrentLocale(i18n.locale || 'en');
    };

    // Listen for locale changes
    const interval = setInterval(handleLocaleChange, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return useMemo(() => {
    // If layout is forced, use that
    if (forceRTLLayout === 'rtl') return true;
    if (forceRTLLayout === 'ltr') return false;

    // Otherwise, determine based on locale
    return RTL_LOCALES.some((rtlLocale) => currentLocale.startsWith(rtlLocale));
  }, [currentLocale, forceRTLLayout]);
};
