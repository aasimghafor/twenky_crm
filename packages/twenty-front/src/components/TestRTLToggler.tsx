import { useRecoilState } from 'recoil';
import {
    forceRTLLayoutState,
    LayoutDirection,
} from '~/hooks/states/forceRTLLayoutState';
import { useIsRTL } from '~/hooks/useIsRTL';

export const TestRTLToggler = () => {
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
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'white',
        padding: '20px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        zIndex: 9999,
      }}
    >
      <h3>RTL Toggler Test</h3>
      <p>Current layout: {isRTL ? 'RTL' : 'LTR'}</p>
      <p>Forced layout: {forceRTLLayout}</p>
      <p>Document dir: {document.documentElement.dir}</p>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px',
          marginTop: '12px',
        }}
      >
        <button
          onClick={() => handleLayoutChange('auto')}
          style={{
            padding: '8px 12px',
            backgroundColor: forceRTLLayout === 'auto' ? '#007bff' : '#f8f9fa',
            color: forceRTLLayout === 'auto' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Auto (follows language)
        </button>

        <button
          onClick={() => handleLayoutChange('ltr')}
          style={{
            padding: '8px 12px',
            backgroundColor: forceRTLLayout === 'ltr' ? '#007bff' : '#f8f9fa',
            color: forceRTLLayout === 'ltr' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Force LTR
        </button>

        <button
          onClick={() => handleLayoutChange('rtl')}
          style={{
            padding: '8px 12px',
            backgroundColor: forceRTLLayout === 'rtl' ? '#007bff' : '#f8f9fa',
            color: forceRTLLayout === 'rtl' ? 'white' : 'black',
            border: '1px solid #ccc',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Force RTL
        </button>
      </div>
    </div>
  );
};
