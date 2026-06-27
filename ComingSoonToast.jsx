export function ComingSoonToast({ show }) {
  if (!show) return null;
  return (
    <div
      style={{
        position: 'absolute', bottom: 90, left: '50%', transform: 'translateX(-50%)',
        background: '#15171B', color: '#fff', fontSize: 13, fontWeight: 500,
        padding: '10px 20px', borderRadius: 99, whiteSpace: 'nowrap', zIndex: 300,
        boxShadow: '0 4px 20px rgba(0,0,0,.25)', pointerEvents: 'none',
      }}
    >
      🚧 Coming soon
    </div>
  );
}
