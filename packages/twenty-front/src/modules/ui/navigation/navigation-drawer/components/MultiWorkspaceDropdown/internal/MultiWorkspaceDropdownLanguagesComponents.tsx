import { DropdownMenuHeader } from '@/ui/layout/dropdown/components/DropdownMenuHeader/DropdownMenuHeader';
import { multiWorkspaceDropdownState } from '@/ui/navigation/navigation-drawer/states/multiWorkspaceDropdownState';
import { useLingui } from '@lingui/react/macro';
import { useSetRecoilState } from 'recoil';
import { IconChevronLeft, IconLanguage } from 'twenty-ui/display';
import { LightIconButton } from 'twenty-ui/input';
import { LanguageList } from '~/components/LanguageList';

export const MultiWorkspaceDropdownLanguagesComponents = () => {
  const { t } = useLingui();
  const setMultiWorkspaceDropdownState = useSetRecoilState(
    multiWorkspaceDropdownState,
  );

  return (
    <>
      <DropdownMenuHeader
        StartComponent={
          <LightIconButton
            Icon={IconChevronLeft}
            size="small"
            accent="tertiary"
            onClick={() => setMultiWorkspaceDropdownState('default')}
          />
        }
        EndComponent={<IconLanguage size="small" />}
      >
        {t`Choose Language`}
      </DropdownMenuHeader>
      <LanguageList
        onLanguageSelect={() => setMultiWorkspaceDropdownState('default')}
      />
    </>
  );
};
