// import { useTheme } from '@emotion/react';
// import styled from '@emotion/styled';
// import { motion } from 'framer-motion';
// import { ReactNode, useState } from 'react';
// import { useRecoilValue } from 'recoil';

// import { NAV_DRAWER_WIDTHS } from '@/ui/navigation/navigation-drawer/constants/NavDrawerWidths';
// import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';

// import { useIsSettingsDrawer } from '@/navigation/hooks/useIsSettingsDrawer';
// import { MOBILE_VIEWPORT } from 'twenty-ui/theme';
// import { isNavigationDrawerExpandedState } from '../../states/isNavigationDrawerExpanded';
// import { NavigationDrawerBackButton } from './NavigationDrawerBackButton';
// import { NavigationDrawerHeader } from './NavigationDrawerHeader';
// export type NavigationDrawerProps = {
//   children?: ReactNode;
//   className?: string;
//   title: string;
// };

// const StyledAnimatedContainer = styled(motion.div)`
//   max-height: 100vh;
//   overflow: hidden;
// `;

// const StyledContainer = styled.div<{
//   isSettings?: boolean;
//   isMobile?: boolean;
// }>`
//   box-sizing: border-box;
//   display: flex;
//   flex-direction: column;
//   width: ${({ isSettings }) =>
//     isSettings ? '100%' : NAV_DRAWER_WIDTHS.menu.desktop.expanded + 'px'};
//   gap: ${({ theme }) => theme.spacing(3)};
//   height: 100%;
//   padding: ${({ theme, isSettings, isMobile }) =>
//     isSettings
//       ? isMobile
//         ? theme.spacing(3, 0, 0, 8)
//         : theme.spacing(3, 0, 4, 0)
//       : theme.spacing(3, 0, 4, 2)};
//   @media (max-width: ${MOBILE_VIEWPORT}px) {
//     width: 100%;
//     padding-left: ${({ theme }) => theme.spacing(5)};
//     padding-right: ${({ theme }) => theme.spacing(5)};
//   }
// `;

// export const NavigationDrawer = ({
//   children,
//   className,
//   title,
// }: NavigationDrawerProps) => {
//   const [isHovered, setIsHovered] = useState(false);
//   const isMobile = useIsMobile();
//   const isSettingsDrawer = useIsSettingsDrawer();
//   const theme = useTheme();
//   const isNavigationDrawerExpanded = useRecoilValue(
//     isNavigationDrawerExpandedState,
//   );

//   const handleHover = () => {
//     setIsHovered(true);
//   };

//   const handleMouseLeave = () => {
//     setIsHovered(false);
//   };

//   const desktopWidth = isNavigationDrawerExpanded
//     ? NAV_DRAWER_WIDTHS.menu.desktop.expanded
//     : NAV_DRAWER_WIDTHS.menu.desktop.collapsed;

//   const mobileWidth = isNavigationDrawerExpanded
//     ? NAV_DRAWER_WIDTHS.menu.mobile.expanded
//     : NAV_DRAWER_WIDTHS.menu.mobile.collapsed;

//   const navigationDrawerAnimate = {
//     width: isMobile ? mobileWidth : desktopWidth,
//     opacity: isNavigationDrawerExpanded || !isSettingsDrawer ? 1 : 0,
//   };

//   return (
//     <StyledAnimatedContainer
//       className={className}
//       initial={false}
//       animate={navigationDrawerAnimate}
//       transition={{ duration: theme.animation.duration.normal }}
//     >
//       <StyledContainer
//         isSettings={isSettingsDrawer}
//         isMobile={isMobile}
//         onMouseEnter={handleHover}
//         onMouseLeave={handleMouseLeave}
//       >
//         {isSettingsDrawer && title ? (
//           !isMobile && <NavigationDrawerBackButton title={title} />
//         ) : (
//           <NavigationDrawerHeader showCollapseButton={isHovered} />
//         )}

//         {children}
//       </StyledContainer>
//     </StyledAnimatedContainer>
//   );
// };
import { useTheme } from '@emotion/react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { NAV_DRAWER_WIDTHS } from '@/ui/navigation/navigation-drawer/constants/NavDrawerWidths';
import { useIsMobile } from '@/ui/utilities/responsive/hooks/useIsMobile';
import { useIsRTL } from '~/hooks/useIsRTL';

import { useIsSettingsDrawer } from '@/navigation/hooks/useIsSettingsDrawer';
import { MOBILE_VIEWPORT } from 'twenty-ui/theme';
import { isNavigationDrawerExpandedState } from '../../states/isNavigationDrawerExpanded';
import { NavigationDrawerBackButton } from './NavigationDrawerBackButton';
import { NavigationDrawerHeader } from './NavigationDrawerHeader';

export type NavigationDrawerProps = {
  children?: ReactNode;
  className?: string;
  title: string;
};

const StyledAnimatedContainer = styled(motion.div)`
  max-height: 100vh;
  overflow: hidden;
`;

const StyledContainer = styled.div<{
  isSettings?: boolean;
  isMobile?: boolean;
  $isRTL?: boolean;
}>`
  border-left: ${({ theme, $isRTL }) =>
    $isRTL ? `1px solid ${theme.border.color.medium}` : 'none'};
  border-right: ${({ theme, $isRTL }) =>
    !$isRTL ? `1px solid ${theme.border.color.medium}` : 'none'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(3)};
  height: 100%;
  padding: ${({ theme, isSettings, isMobile, $isRTL }) =>
    isSettings
      ? isMobile
        ? $isRTL
          ? theme.spacing(3, 8, 0, 0)
          : theme.spacing(3, 0, 0, 8)
        : theme.spacing(3, 0, 4, 0)
      : $isRTL
        ? theme.spacing(3, 2, 4, 0)
        : theme.spacing(3, 0, 4, 2)};
  width: ${({ isSettings }) =>
    isSettings ? '100%' : NAV_DRAWER_WIDTHS.menu.desktop.expanded + 'px'};

  @media (max-width: ${MOBILE_VIEWPORT}px) {
    width: 100%;
    padding-left: ${({ theme }) => theme.spacing(5)};
    padding-right: ${({ theme }) => theme.spacing(5)};
  }
`;

export const NavigationDrawer = ({
  children,
  className,
  title,
}: NavigationDrawerProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = useIsMobile();
  const isSettingsDrawer = useIsSettingsDrawer();
  const isRTL = useIsRTL();
  const theme = useTheme();
  const isNavigationDrawerExpanded = useRecoilValue(
    isNavigationDrawerExpandedState,
  );

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const desktopWidth = isNavigationDrawerExpanded
    ? NAV_DRAWER_WIDTHS.menu.desktop.expanded
    : NAV_DRAWER_WIDTHS.menu.desktop.collapsed;

  const mobileWidth = isNavigationDrawerExpanded
    ? NAV_DRAWER_WIDTHS.menu.mobile.expanded
    : NAV_DRAWER_WIDTHS.menu.mobile.collapsed;

  const navigationDrawerAnimate = {
    width: isMobile ? mobileWidth : desktopWidth,
    opacity: isNavigationDrawerExpanded || !isSettingsDrawer ? 1 : 0,
  };

  return (
    <StyledAnimatedContainer
      className={className}
      initial={false}
      animate={navigationDrawerAnimate}
      transition={{ duration: theme.animation.duration.normal }}
    >
      <StyledContainer
        isSettings={isSettingsDrawer}
        isMobile={isMobile}
        $isRTL={isRTL}
        onMouseEnter={handleHover}
        onMouseLeave={handleMouseLeave}
      >
        {isSettingsDrawer && title ? (
          !isMobile && <NavigationDrawerBackButton title={title} />
        ) : (
          <NavigationDrawerHeader showCollapseButton={isHovered} />
        )}

        {children}
      </StyledContainer>
    </StyledAnimatedContainer>
  );
};
