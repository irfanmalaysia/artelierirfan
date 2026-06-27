import { CATEGORIES, PLACEHOLDER_CATEGORIES } from '../data/products';
import { COLORS, ACCENT } from '../styles/theme';

export function CategoryChips({ cat, onSelect }) {
  return (
    <div className="chips" style={{ display: 'flex', gap: 9, padding: '12px 20px 4px', overflowX: 'auto' }}>
      {CATEGORIES.map((c) => {
        const isActive = c === cat;
        const isPlaceholder = PLACEHOLDER_CATEGORIES.includes(c);
        const style = isActive
          ? { background: `var(--accent, ${ACCENT})`, color: COLORS.ink, fontWeight: 700, border: 'none' }
          : isPlaceholder
            ? { background: COLORS.white, border: `1px solid ${COLORS.border}`, color: COLORS.strikethrough, fontWeight: 600 }
            : { background: COLORS.white, border: `1px solid ${COLORS.border}`, color: COLORS.textMuted2, fontWeight: 600 };
        return (
          <div
            key={c}
            onClick={() => onSelect(c)}
            style={{
              flex: 'none', padding: '10px 18px', borderRadius: 13, fontSize: 13.5,
              cursor: 'pointer', whiteSpace: 'nowrap', ...style,
            }}
          >
            {c}
          </div>
        );
      })}
    </div>
  );
}
