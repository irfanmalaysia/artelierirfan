import { COLORS } from '../styles/theme';
import { ArrowRightIcon } from './icons';

export function BottomSheet({ show, onClose, title, subtitle, links }) {
  if (!show) return null;
  return (
    <>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, zIndex: 400, background: 'rgba(0,0,0,.4)' }} />
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 401, background: '#fff', borderRadius: '28px 28px 0 0', padding: '12px 20px 44px' }}>
        <div style={{ width: 36, height: 4, borderRadius: 99, background: '#E0E0DC', margin: '0 auto 20px' }} />
        <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{title}</div>
        <div style={{ fontSize: 13.5, color: COLORS.muted, marginBottom: 20 }}>{subtitle}</div>
        {links.map((link) => (
          <div
            key={link.label}
            onClick={link.onClick}
            style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 14, borderRadius: 18, background: COLORS.surfaceMuted, marginBottom: 10, cursor: 'pointer' }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 14, background: COLORS.ink, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {link.icon}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{link.label}</div>
              <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{link.handle}</div>
            </div>
            {link.comingSoon ? (
              <span style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, background: '#EFEFEC', padding: '4px 9px', borderRadius: 8 }}>Soon</span>
            ) : (
              <ArrowRightIcon size={18} stroke={COLORS.ink} />
            )}
          </div>
        ))}
      </div>
    </>
  );
}
