import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useRefreshObjectMetadataItems } from '@/object-metadata/hooks/useRefreshObjectMetadataItem';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { getDateFnsLocale } from '@/ui/field/display/utils/getDateFnsLocale.util';
import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import { i18n } from '@lingui/core';
import { enUS } from 'date-fns/locale';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { MenuItem } from 'twenty-ui/navigation';
import { dateLocaleState } from '~/localization/states/dateLocaleState';
import { dynamicActivate } from '~/utils/i18n/dynamicActivate';
import { logError } from '~/utils/logError';
import { APP_LOCALES, LOCALE_OPTIONS, LocaleOption } from './LanguageSwitcher';

const isDefined = <T,>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

export const LanguageList = ({
  onLanguageSelect,
}: {
  onLanguageSelect?: () => void;
}) => {
  const [currentWorkspaceMember, setCurrentWorkspaceMember] = useRecoilState(
    currentWorkspaceMemberState,
  );
  const setDateLocale = useSetRecoilState(dateLocaleState);

  const { updateOneRecord } = useUpdateOneRecord({
    objectNameSingular: CoreObjectNameSingular.WorkspaceMember,
  });

  const { refreshObjectMetadataItems } =
    useRefreshObjectMetadataItems('network-only');

  const updateWorkspaceMember = async (changedFields: any) => {
    if (!currentWorkspaceMember?.id) {
      throw new Error('User is not logged in');
    }

    try {
      await updateOneRecord({
        idToUpdate: currentWorkspaceMember.id,
        updateOneRecordInput: changedFields,
      });
    } catch (error) {
      logError(error);
    }
  };

  if (!isDefined(currentWorkspaceMember)) return null;

  const handleLocaleChange = async (value: keyof typeof APP_LOCALES) => {
    setCurrentWorkspaceMember({
      ...currentWorkspaceMember,
      ...{ locale: value },
    });
    await updateWorkspaceMember({ locale: value });

    try {
      const dateFnsLocale = await getDateFnsLocale(value);
      setDateLocale({
        locale: value,
        localeCatalog: dateFnsLocale || enUS,
      });
    } catch (error) {
      console.warn('Failed to load date locale:', error);
    }

    await dynamicActivate(value);
    try {
      localStorage.setItem('locale', value);
    } catch (error) {
      console.log('Failed to save locale to localStorage:', error);
    }
    await refreshObjectMetadataItems();

    // Call callback to close dropdown if provided
    onLanguageSelect?.();
  };

  const currentLocale = currentWorkspaceMember.locale || i18n.locale || 'en';

  return (
    <DropdownContent>
      <DropdownMenuItemsContainer>
        {LOCALE_OPTIONS.map((option: LocaleOption) => (
          <MenuItem
            key={option.value}
            text={option.label}
            onClick={() =>
              handleLocaleChange(option.value as keyof typeof APP_LOCALES)
            }
            accent={currentLocale === option.value ? 'blue' : 'default'}
          />
        ))}
      </DropdownMenuItemsContainer>
    </DropdownContent>
  );
};
