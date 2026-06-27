import { COLORS, ACCENT } from '../styles/theme';
import { HeartIcon } from '../components/icons';
import { ProductListItem } from '../components/ProductListItem';

export function SavedScreen({ savedProducts, onOpenProduct, onToggleSave, onGoHome }) {
  const isEmpty = savedProducts.length === 0;

  return (
    <div data-screen-label="Saved" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', padding: '56px 20px 14px' }}>
        <div style={{ fontSize: 28, fontWeight: 800 }}>Saved</div>
        <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}>Your wishlist</div>
      </div>
      <div className="scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 112 }}>
        {isEmpty ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 40px' }}>
            <div style={{ width: 72, height: 72, borderRadius: 22, background: '#fff', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <HeartIcon size={30} stroke="#C4C7CC" />
            </div>
            <div style={{ fontSize: 17, fontWeight: 700, marginTop: 18 }}>Nothing saved yet</div>
            <div style={{ fontSize: 13.5, color: COLORS.muted, marginTop: 6, lineHeight: 1.5 }}>Tap the heart on any product to keep it here for later.</div>
            <div onClick={onGoHome} style={{ marginTop: 20, background: `var(--accent, ${ACCENT})`, color: COLORS.ink, padding: '12px 22px', borderRadius: 14, fontSize: 14, fontWeight: 800, cursor: 'pointer' }}>
              Browse products
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 20px 0' }}>
            {savedProducts.map((item) => (
              <ProductListItem
                key={item.id}
                product={item}
                saved
                onOpen={() => onOpenProduct(item.id)}
                onToggleSave={() => onToggleSave(item.id)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
