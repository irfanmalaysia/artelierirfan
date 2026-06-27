import { COLORS } from '../styles/theme';

export function ProductCover({ src, label, fontSize = 10, outline = false, children }) {
  return (
    <div
      style={{
        position: 'relative',
        height: '100%',
        width: '100%',
        background: COLORS.placeholderBg,
        backgroundImage: src ? undefined : 'repeating-linear-gradient(45deg, rgba(21,23,27,.045) 0 1px, transparent 1px 10px)',
        display: 'flex',
        alignItems: 'flex-end',
        outline: outline ? `2.5px solid ${COLORS.white}` : undefined,
        outlineOffset: outline ? '2px' : undefined,
      }}
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundImage: src ? `url("${src}")` : 'none',
        }}
      />
      {!src && label && (
        <span
          style={{
            position: 'relative',
            fontFamily: "'JetBrains Mono',monospace",
            fontSize,
            letterSpacing: '.5px',
            color: 'rgba(21,23,27,.45)',
            background: 'rgba(255,255,255,.75)',
            padding: '3px 7px',
            borderRadius: 6,
          }}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
}
