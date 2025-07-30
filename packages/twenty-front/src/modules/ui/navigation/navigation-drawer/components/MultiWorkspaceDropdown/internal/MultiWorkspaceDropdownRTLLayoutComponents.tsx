import { DropdownMenuHeader } from '@/ui/layout/dropdown/components/DropdownMenuHeader/DropdownMenuHeader';
import { DropdownMenuHeaderLeftComponent } from '@/ui/layout/dropdown/components/DropdownMenuHeader/internal/DropdownMenuHeaderLeftComponent';
import { multiWorkspaceDropdownState } from '@/ui/navigation/navigation-drawer/states/multiWorkspaceDropdownState';
import { useLingui } from '@lingui/react/macro';
import { useSetRecoilState } from 'recoil';
import { IconChevronLeft } from 'twenty-ui/display';
import { RTLLayoutList } from '~/components/RTLLayoutList';

export const MultiWorkspaceDropdownRTLLayoutComponents = () => {
  const { t } = useLingui();
  const setMultiWorkspaceDropdownState = useSetRecoilState(
    multiWorkspaceDropdownState,
  );

  return (
    <>
      <DropdownMenuHeader
        StartComponent={
          <DropdownMenuHeaderLeftComponent
            Icon={IconChevronLeft}
            accent="tertiary"
            onClick={() => setMultiWorkspaceDropdownState('default')}
          />
        }
      >
        {t`Layout Direction`}
      </DropdownMenuHeader>
      <RTLLayoutList
        onLayoutSelect={() => setMultiWorkspaceDropdownState('default')}
      />
    </>
  );
};
