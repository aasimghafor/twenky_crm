import styled from '@emotion/styled';
import { useLingui } from '@lingui/react/macro';
import { IconLanguageKatakana } from '@tabler/icons-react';
import { useRecoilState } from 'recoil';
import { MenuItem } from 'twenty-ui/navigation';
import { forceRTLLayoutState } from '~/hooks/states/forceRTLLayoutState';
import { useIsRTL } from '~/hooks/useIsRTL';

const StyledDescription = styled.div`
  color: ${({ theme }) => theme.font.color.light};
  padding-left: ${({ theme }) => theme.spacing(1)};
`;

export const RTLToggler = ({ onClick }: { onClick?: () => void }) => {
  const { t } = useLingui();
  const isRTL = useIsRTL();
  const [forceRTLLayout] = useRecoilState(forceRTLLayoutState);

  const getCurrentLayoutText = () => {
    if (forceRTLLayout === 'ltr') return 'LTR';
    if (forceRTLLayout === 'rtl') return 'RTL';
    return `Auto (${isRTL ? 'RTL' : 'LTR'})`;
  };

  return (
    <MenuItem
      LeftIcon={IconLanguageKatakana}
      text={
        <>
          {t`Layout Direction`}
          <StyledDescription>{` · ${getCurrentLayoutText()}`}</StyledDescription>
        </>
      }
      hasSubMenu={true}
      onClick={onClick}
    />
  );
};
