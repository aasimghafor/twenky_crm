// import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
// import { MultiWorkspaceDropdownClickableComponent } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownClickableComponent';
// import { MultiWorkspaceDropdownDefaultComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownDefaultComponents';
// import { MultiWorkspaceDropdownLanguagesComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownLanguagesComponents';
// import { MultiWorkspaceDropdownThemesComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownThemesComponents';
// import { MultiWorkspaceDropdownWorkspacesListComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownWorkspacesListComponents';
// import { MULTI_WORKSPACE_DROPDOWN_ID } from '@/ui/navigation/navigation-drawer/constants/MultiWorkspaceDropdownId';
// import { multiWorkspaceDropdownState } from '@/ui/navigation/navigation-drawer/states/multiWorkspaceDropdownState';
// import { useMemo } from 'react';
// import { useRecoilState } from 'recoil';

// export const MultiWorkspaceDropdownButton = () => {
//   const [multiWorkspaceDropdown, setMultiWorkspaceDropdown] = useRecoilState(
//     multiWorkspaceDropdownState,
//   );

//   const DropdownComponents = useMemo(() => {
//     switch (multiWorkspaceDropdown) {
//       case 'themes':
//         return MultiWorkspaceDropdownThemesComponents;
//       case 'languages':
//         return MultiWorkspaceDropdownLanguagesComponents;
//       case 'workspaces-list':
//         return MultiWorkspaceDropdownWorkspacesListComponents;
//       default:
//         return MultiWorkspaceDropdownDefaultComponents;
//     }
//   }, [multiWorkspaceDropdown]);

//   return (
//     <Dropdown
//       dropdownId={MULTI_WORKSPACE_DROPDOWN_ID}
//       dropdownOffset={{ y: -30, x: -5 }}
//       clickableComponent={<MultiWorkspaceDropdownClickableComponent />}
//       dropdownComponents={<DropdownComponents />}
//       onClose={() => {
//         setMultiWorkspaceDropdown('default');
//       }}
//     />
//   );
// };
import { Dropdown } from '@/ui/layout/dropdown/components/Dropdown';
import { MultiWorkspaceDropdownClickableComponent } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownClickableComponent';
import { MultiWorkspaceDropdownDefaultComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownDefaultComponents';
import { MultiWorkspaceDropdownLanguagesComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownLanguagesComponents';
import { MultiWorkspaceDropdownRTLLayoutComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownRTLLayoutComponents';
import { MultiWorkspaceDropdownThemesComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownThemesComponents';
import { MultiWorkspaceDropdownWorkspacesListComponents } from '@/ui/navigation/navigation-drawer/components/MultiWorkspaceDropdown/internal/MultiWorkspaceDropdownWorkspacesListComponents';
import { MULTI_WORKSPACE_DROPDOWN_ID } from '@/ui/navigation/navigation-drawer/constants/MultiWorkspaceDropdownId';
import { multiWorkspaceDropdownState } from '@/ui/navigation/navigation-drawer/states/multiWorkspaceDropdownState';
import { useMemo } from 'react';
import { useRecoilState } from 'recoil';

export const MultiWorkspaceDropdownButton = () => {
  const [multiWorkspaceDropdown, setMultiWorkspaceDropdown] = useRecoilState(
    multiWorkspaceDropdownState,
  );

  const DropdownComponents = useMemo(() => {
    switch (multiWorkspaceDropdown) {
      case 'themes':
        return MultiWorkspaceDropdownThemesComponents;
      case 'languages':
        return MultiWorkspaceDropdownLanguagesComponents;
      case 'rtl-layout':
        return MultiWorkspaceDropdownRTLLayoutComponents;
      case 'workspaces-list':
        return MultiWorkspaceDropdownWorkspacesListComponents;
      default:
        return MultiWorkspaceDropdownDefaultComponents;
    }
  }, [multiWorkspaceDropdown]);

  return (
    <Dropdown
      dropdownId={MULTI_WORKSPACE_DROPDOWN_ID}
      dropdownOffset={{ y: -30, x: -5 }}
      clickableComponent={<MultiWorkspaceDropdownClickableComponent />}
      dropdownComponents={<DropdownComponents />}
      onClose={() => {
        setMultiWorkspaceDropdown('default');
      }}
    />
  );
};
