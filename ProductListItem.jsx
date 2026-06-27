import { COLORS } from '../styles/theme';
import { ProductCover } from './ProductCover';
import { PriceTag } from './PriceTag';
import { HeartIcon, StarIcon } from './icons';

export function ProductListItem({ product, saved, variant = 'list', onOpen, onToggleSave }) {
  const isSavedVariant = variant === 'saved';

  return (
    <div
      onClick={onOpen}
      style={{
        display: 'flex', gap: 14, alignItems: 'center', background: COLORS.white,
        border: `1px solid ${COLORS.border}`, borderRadius: 20, padding: 12, cursor: 'pointer',
      }}
    >
      <div style={{ position: 'relative', overflow: 'hidden', width: 78, height: 78, flex: 'none', borderRadius: 14 }}>
        <ProductCover src={product.coverImg} label={product.coverShort} fontSize={8} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 10, letterSpacing: '.5px', textTransform: 'uppercase', color: COLORS.ratingMuted, fontWeight: 500 }}>
          {product.cat}
        </div>
        <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.2, marginTop: 4 }}>{product.title}</div>
        {isSavedVariant ? (
          <div style={{ fontSize: 16, fontWeight: 800, marginTop: 6 }}>
            <PriceTag product={product} />
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 6 }}>
            <StarIcon outline />
            <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted2 }}>{product.rating}</span>
            <span style={{ fontSize: 12, color: COLORS.divider }}>·</span>
            <span style={{ fontSize: 12, color: COLORS.muted }}>{product.sales} sold</span>
          </div>
        )}
      </div>
      {isSavedVariant ? (
        <div
          onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
          style={{ width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-start' }}
        >
          <HeartIcon filled />
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between', alignSelf: 'stretch', flex: 'none' }}>
          <div
            onClick={(e) => { e.stopPropagation(); onToggleSave(); }}
            style={{ width: 30, height: 30, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <HeartIcon filled={saved} stroke="#C4C7CC" />
          </div>
          <div style={{ fontWeight: 800 }}>
            <PriceTag product={product} />
          </div>
        </div>
      )}
    </div>
  );
}
