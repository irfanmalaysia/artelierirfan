import { COLORS, ACCENT } from '../styles/theme';
import { HomeTabIcon, HeartIcon, ProfileTabIcon } from './icons';

function TabButton({ active, onClick, icon, label }) {
  return (
    <div onClick={onClick} style={{ flex: 1, display: 'flex', justifyContent: 'center', cursor: 'pointer' }}>
      {active ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: `var(--accent, ${ACCENT})`, color: COLORS.ink, padding: '10px 18px', borderRadius: 14 }}>
          {icon(COLORS.ink, 20)}
          <span style={{ fontSize: 13.5, fontWeight: 800 }}>{label}</span>
        </div>
      ) : (
        <div style={{ padding: 10, color: COLORS.mutedLight }}>{icon(COLORS.mutedLight, 22)}</div>
      )}
    </div>
  );
}

export function TabBar({ screen, onGoHome, onGoSaved, onGoProfile }) {
  return (
    <div
      style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff',
        borderTop: `1px solid ${COLORS.border}`, padding: '12px 18px 26px',
        display: 'flex', alignItems: 'center', zIndex: 50,
      }}
    >
      <TabButton
        active={screen === 'home'}
        onClick={onGoHome}
        label="Home"
        icon={(stroke, size) => <HomeTabIcon stroke={stroke} size={size} />}
      />
      <TabButton
        active={screen === 'saved'}
        onClick={onGoSaved}
        label="Saved"
        icon={(stroke, size) => (screen === 'saved' ? <HeartIcon filled size={size} fill={stroke} /> : <HeartIcon size={size} stroke={stroke} />)}
      />
      <TabButton
        active={screen === 'profile'}
        onClick={onGoProfile}
        label="About"
        icon={(stroke, size) => <ProfileTabIcon stroke={stroke} size={size} />}
      />
    </div>
  );
}
