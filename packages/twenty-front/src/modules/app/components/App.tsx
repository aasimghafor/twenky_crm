// import { AppRouter } from '@/app/components/AppRouter';
// import { ApolloDevLogEffect } from '@/debug/components/ApolloDevLogEffect';
// import { RecoilDebugObserverEffect } from '@/debug/components/RecoilDebugObserver';
// import { AppErrorBoundary } from '@/error-handler/components/AppErrorBoundary';
// import { AppRootErrorFallback } from '@/error-handler/components/AppRootErrorFallback';
// import { ExceptionHandlerProvider } from '@/error-handler/components/ExceptionHandlerProvider';
// import { SnackBarComponentInstanceContextProvider } from '@/ui/feedback/snack-bar-manager/scopes/SnackBarComponentInstanceContextProvider';
// import { ClickOutsideListenerContext } from '@/ui/utilities/pointer-event/contexts/ClickOutsideListenerContext';
// import { i18n } from '@lingui/core';
// import { I18nProvider } from '@lingui/react';
// import { useEffect } from 'react';
// import { HelmetProvider } from 'react-helmet-async';
// import { RecoilRoot } from 'recoil';
// import { IconsProvider } from 'twenty-ui/display';
// import { useIsRTL } from '~/hooks/useIsRTL';
// import { initialI18nActivate } from '~/utils/i18n/initialI18nActivate';

// initialI18nActivate();

// const AppContent = () => {
//   const isRTL = useIsRTL();

//   // Set HTML dir attribute based on current locale
//   useEffect(() => {
//     document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
//     document.documentElement.lang = i18n.locale;
//   }, [isRTL]);

//   return (
//     <RecoilRoot>
//       <AppErrorBoundary
//         resetOnLocationChange={false}
//         FallbackComponent={AppRootErrorFallback}
//       >
//         <I18nProvider i18n={i18n}>
//           <RecoilDebugObserverEffect />
//           <ApolloDevLogEffect />
//           <SnackBarComponentInstanceContextProvider snackBarComponentInstanceId="snack-bar-manager">
//             <IconsProvider>
//               <ExceptionHandlerProvider>
//                 <HelmetProvider>
//                   <ClickOutsideListenerContext.Provider
//                     value={{ excludedClickOutsideId: undefined }}
//                   >
//                     <AppRouter />
//                   </ClickOutsideListenerContext.Provider>
//                 </HelmetProvider>
//               </ExceptionHandlerProvider>
//             </IconsProvider>
//           </SnackBarComponentInstanceContextProvider>
//         </I18nProvider>
//       </AppErrorBoundary>
//     </RecoilRoot>
//   );
// };

// export const App = () => {
//   return (
//     <RecoilRoot>
//       <AppErrorBoundary
//         resetOnLocationChange={false}
//         FallbackComponent={AppRootErrorFallback}
//       >
//         <I18nProvider i18n={i18n}>
//           <AppContent />
//         </I18nProvider>
//       </AppErrorBoundary>
//     </RecoilRoot>
//   );
// };
import { AppRouter } from '@/app/components/AppRouter';
import { ApolloDevLogEffect } from '@/debug/components/ApolloDevLogEffect';
import { RecoilDebugObserverEffect } from '@/debug/components/RecoilDebugObserver';
import { AppErrorBoundary } from '@/error-handler/components/AppErrorBoundary';
import { AppRootErrorFallback } from '@/error-handler/components/AppRootErrorFallback';
import { ExceptionHandlerProvider } from '@/error-handler/components/ExceptionHandlerProvider';
import { SnackBarComponentInstanceContextProvider } from '@/ui/feedback/snack-bar-manager/scopes/SnackBarComponentInstanceContextProvider';
import { ClickOutsideListenerContext } from '@/ui/utilities/pointer-event/contexts/ClickOutsideListenerContext';
import { i18n } from '@lingui/core';
import { I18nProvider } from '@lingui/react';
import { useEffect } from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { RecoilRoot } from 'recoil';
import { IconsProvider } from 'twenty-ui/display';
import { useInitializeForceRTLLayoutFromStorage } from '~/hooks/effects/useInitializeForceRTLLayoutFromStorage';
import { useIsRTL } from '~/hooks/useIsRTL';
import { initialI18nActivate } from '~/utils/i18n/initialI18nActivate';

initialI18nActivate();

const AppContent = () => {
  const isRTL = useIsRTL();

  // Initialize forced RTL layout from localStorage
  useInitializeForceRTLLayoutFromStorage();

  // Set HTML dir attribute based on current locale and forced layout
  useEffect(() => {
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
    document.documentElement.lang = i18n.locale;
  }, [isRTL]);

  return (
    <RecoilRoot>
      <AppErrorBoundary
        resetOnLocationChange={false}
        FallbackComponent={AppRootErrorFallback}
      >
        <I18nProvider i18n={i18n}>
          <RecoilDebugObserverEffect />
          <ApolloDevLogEffect />
          <SnackBarComponentInstanceContextProvider snackBarComponentInstanceId="snack-bar-manager">
            <IconsProvider>
              <ExceptionHandlerProvider>
                <HelmetProvider>
                  <ClickOutsideListenerContext.Provider
                    value={{ excludedClickOutsideId: undefined }}
                  >
                    <AppRouter />
                    {/* <TestRTLToggler /> */}
                  </ClickOutsideListenerContext.Provider>
                </HelmetProvider>
              </ExceptionHandlerProvider>
            </IconsProvider>
          </SnackBarComponentInstanceContextProvider>
        </I18nProvider>
      </AppErrorBoundary>
    </RecoilRoot>
  );
};

export const App = () => {
  return (
    <RecoilRoot>
      <AppErrorBoundary
        resetOnLocationChange={false}
        FallbackComponent={AppRootErrorFallback}
      >
        <I18nProvider i18n={i18n}>
          <AppContent />
        </I18nProvider>
      </AppErrorBoundary>
    </RecoilRoot>
  );
};
