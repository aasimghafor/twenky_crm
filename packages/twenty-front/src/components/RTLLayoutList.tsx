import { DropdownContent } from '@/ui/layout/dropdown/components/DropdownContent';
import { DropdownMenuItemsContainer } from '@/ui/layout/dropdown/components/DropdownMenuItemsContainer';
import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { useRecoilState } from 'recoil';
import { MenuItem } from 'twenty-ui/navigation';
import {
    forceRTLLayoutState,
    LayoutDirection,
} from '~/hooks/states/forceRTLLayoutState';
import { useIsRTL } from '~/hooks/useIsRTL';

const StyledMenuItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing(0.5)};
`;

const StyledSubtext = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.font.color.light};
  margin-top: ${({ theme }) => theme.spacing(0.5)};
`;

const layoutOptions = [
  {
    key: 'auto' as LayoutDirection,
    labelKey: 'Auto (follows language)',
    descriptionKey:
      'Automatically determines direction based on selected language',
  },
  {
    key: 'ltr' as LayoutDirection,
    labelKey: 'Force LTR',
    descriptionKey: 'Always use left-to-right layout',
  },
  {
    key: 'rtl' as LayoutDirection,
    labelKey: 'Force RTL',
    descriptionKey: 'Always use right-to-left layout',
  },
];

export const RTLLayoutList = ({
  onLayoutSelect,
}: {
  onLayoutSelect?: () => void;
}) => {
  const { t } = useLingui();
  const isRTL = useIsRTL();
  const [forceRTLLayout, setForceRTLLayout] =
    useRecoilState(forceRTLLayoutState);

  const handleLayoutChange = (layoutDirection: LayoutDirection) => {
    setForceRTLLayout(layoutDirection);
    localStorage.setItem('forceRTLLayout', layoutDirection);

    // Apply layout direction immediately
    const isRTLLayout =
      layoutDirection === 'rtl' || (layoutDirection === 'auto' && isRTL);
    document.documentElement.dir = isRTLLayout ? 'rtl' : 'ltr';

    // Call callback to close dropdown if provided
    onLayoutSelect?.();
  };

  const getOptionDescription = (option: (typeof layoutOptions)[0]) => {
    if (option.key === 'auto') {
      return t`Currently: ${isRTL ? 'RTL' : 'LTR'}`;
    }
    return t`${option.descriptionKey}`;
  };

  return (
    <DropdownContent>
      <DropdownMenuItemsContainer>
        {layoutOptions.map((option) => (
          <MenuItem
            key={option.key}
            text={
              <StyledMenuItemContainer>
                <div>{t`${option.labelKey}`}</div>
                <StyledSubtext>{getOptionDescription(option)}</StyledSubtext>
              </StyledMenuItemContainer>
            }
            onClick={() => handleLayoutChange(option.key)}
            accent={forceRTLLayout === option.key ? 'blue' : 'default'}
          />
        ))}
      </DropdownMenuItemsContainer>
    </DropdownContent>
  );
};
