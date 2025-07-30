import { currentWorkspaceMemberState } from '@/auth/states/currentWorkspaceMemberState';
import { useRefreshObjectMetadataItems } from '@/object-metadata/hooks/useRefreshObjectMetadataItem';
import { CoreObjectNameSingular } from '@/object-metadata/types/CoreObjectNameSingular';
import { useUpdateOneRecord } from '@/object-record/hooks/useUpdateOneRecord';
import { getDateFnsLocale } from '@/ui/field/display/utils/getDateFnsLocale.util';
import styled from '@emotion/styled';
import { i18n } from '@lingui/core';
import { useLingui } from '@lingui/react/macro';
import { enUS } from 'date-fns/locale';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { IconLanguage } from 'twenty-ui/display';
import { MenuItem } from 'twenty-ui/navigation';
import { useIsRTL } from '~/hooks/useIsRTL';
import { dateLocaleState } from '~/localization/states/dateLocaleState';
import { dynamicActivate } from '~/utils/i18n/dynamicActivate';
import { logError } from '~/utils/logError';

// Local locale constants (matching our lingui.config.ts)
const APP_LOCALES = {
  en: 'en',
  'af-ZA': 'af-ZA',
  'ar-SA': 'ar-SA',
  'ca-ES': 'ca-ES',
  'cs-CZ': 'cs-CZ',
  'da-DK': 'da-DK',
  'de-DE': 'de-DE',
  'el-GR': 'el-GR',
  'es-ES': 'es-ES',
  'fi-FI': 'fi-FI',
  'fr-FR': 'fr-FR',
  'he-IL': 'he-IL',
  'hu-HU': 'hu-HU',
  'it-IT': 'it-IT',
  'ja-JP': 'ja-JP',
  'ko-KR': 'ko-KR',
  'nl-NL': 'nl-NL',
  'no-NO': 'no-NO',
  'pl-PL': 'pl-PL',
  'pt-BR': 'pt-BR',
  'pt-PT': 'pt-PT',
  'ro-RO': 'ro-RO',
  'ru-RU': 'ru-RU',
  'sr-Cyrl': 'sr-Cyrl',
  'sv-SE': 'sv-SE',
  'tr-TR': 'tr-TR',
  'uk-UA': 'uk-UA',
  'vi-VN': 'vi-VN',
  'zh-CN': 'zh-CN',
  'zh-TW': 'zh-TW',
} as const;

const isDefined = <T,>(value: T | null | undefined): value is T => {
  return value !== null && value !== undefined;
};

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.font.color.light};
  padding-left: ${({ theme }) => theme.spacing(1)};
`;

const getLanguageDisplayName = (locale: string, t: any): string => {
  const localeMap: Record<string, string> = {
    en: t`English`,
    'af-ZA': t`Afrikaans`,
    'ar-SA': t`Arabic`,
    'ca-ES': t`Catalan`,
    'cs-CZ': t`Czech`,
    'da-DK': t`Danish`,
    'de-DE': t`German`,
    'el-GR': t`Greek`,
    'es-ES': t`Spanish`,
    'fi-FI': t`Finnish`,
    'fr-FR': t`French`,
    'he-IL': t`Hebrew`,
    'hu-HU': t`Hungarian`,
    'it-IT': t`Italian`,
    'ja-JP': t`Japanese`,
    'ko-KR': t`Korean`,
    'nl-NL': t`Dutch`,
    'no-NO': t`Norwegian`,
    'pl-PL': t`Polish`,
    'pt-BR': t`Portuguese — Brazil`,
    'pt-PT': t`Portuguese — Portugal`,
    'ro-RO': t`Romanian`,
    'ru-RU': t`Russian`,
    'sr-Cyrl': t`Serbian (Cyrillic)`,
    'sv-SE': t`Swedish`,
    'tr-TR': t`Turkish`,
    'uk-UA': t`Ukrainian`,
    'vi-VN': t`Vietnamese`,
    'zh-CN': t`Chinese — Simplified`,
    'zh-TW': t`Chinese — Traditional`,
  };

  return localeMap[locale] || locale;
};

export const LanguageSwitcher = ({
  onLanguageSelect,
  onClick,
}: {
  onLanguageSelect?: () => void;
  onClick?: () => void;
}) => {
  const { t } = useLingui();
  const isRTL = useIsRTL();
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
  const currentLanguageName = getLanguageDisplayName(currentLocale, t);
  const rtlIndicator = isRTL ? ' (RTL)' : '';

  return (
    <MenuItem
      LeftIcon={IconLanguage}
      text={
        <>
          {t`Language`}
          <StyledDescription>{` · ${currentLanguageName}${rtlIndicator}`}</StyledDescription>
        </>
      }
      hasSubMenu={true}
      onClick={onClick}
    />
  );
};

// Export locale options for use in dropdown menus
export const LOCALE_OPTIONS = [
  { label: 'English', value: 'en', isRTL: false },
  { label: 'العربية (Arabic)', value: 'ar-SA', isRTL: true },
  { label: 'עברית (Hebrew)', value: 'he-IL', isRTL: true },
  { label: 'Afrikaans', value: 'af-ZA', isRTL: false },
  { label: 'Català (Catalan)', value: 'ca-ES', isRTL: false },
  { label: 'Čeština (Czech)', value: 'cs-CZ', isRTL: false },
  { label: 'Dansk (Danish)', value: 'da-DK', isRTL: false },
  { label: 'Deutsch (German)', value: 'de-DE', isRTL: false },
  { label: 'Ελληνικά (Greek)', value: 'el-GR', isRTL: false },
  { label: 'Español (Spanish)', value: 'es-ES', isRTL: false },
  { label: 'Suomi (Finnish)', value: 'fi-FI', isRTL: false },
  { label: 'Français (French)', value: 'fr-FR', isRTL: false },
  { label: 'Magyar (Hungarian)', value: 'hu-HU', isRTL: false },
  { label: 'Italiano (Italian)', value: 'it-IT', isRTL: false },
  { label: '日本語 (Japanese)', value: 'ja-JP', isRTL: false },
  { label: '한국어 (Korean)', value: 'ko-KR', isRTL: false },
  { label: 'Nederlands (Dutch)', value: 'nl-NL', isRTL: false },
  { label: 'Norsk (Norwegian)', value: 'no-NO', isRTL: false },
  { label: 'Polski (Polish)', value: 'pl-PL', isRTL: false },
  { label: 'Português — Brasil', value: 'pt-BR', isRTL: false },
  { label: 'Português — Portugal', value: 'pt-PT', isRTL: false },
  { label: 'Română (Romanian)', value: 'ro-RO', isRTL: false },
  { label: 'Русский (Russian)', value: 'ru-RU', isRTL: false },
  { label: 'Српски (Serbian)', value: 'sr-Cyrl', isRTL: false },
  { label: 'Svenska (Swedish)', value: 'sv-SE', isRTL: false },
  { label: 'Türkçe (Turkish)', value: 'tr-TR', isRTL: false },
  { label: 'Українська (Ukrainian)', value: 'uk-UA', isRTL: false },
  { label: 'Tiếng Việt (Vietnamese)', value: 'vi-VN', isRTL: false },
  { label: '简体中文 (Chinese Simplified)', value: 'zh-CN', isRTL: false },
  { label: '繁體中文 (Chinese Traditional)', value: 'zh-TW', isRTL: false },
].sort((a, b) => a.label.localeCompare(b.label));

export type LocaleOption = (typeof LOCALE_OPTIONS)[0];
export { APP_LOCALES };
