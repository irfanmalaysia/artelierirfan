import { ProductCover } from './ProductCover';
import { PriceTag } from './PriceTag';
import { COLORS } from '../styles/theme';

export function ProductRailCard({ product, onOpen, width = 210, coverHeight = 138, outline = false, titleSize = 15, priceSize = 15 }) {
  return (
    <div onClick={onOpen} style={{ flex: 'none', width, cursor: 'pointer' }}>
      <div style={{ position: 'relative', height: coverHeight, borderRadius: 18, overflow: 'hidden' }}>
        <ProductCover src={product.coverImg} label={product.cover} outline={outline} />
      </div>
      <div style={{ marginTop: outline ? 11 : 9, fontSize: titleSize, fontWeight: 700, lineHeight: 1.25 }}>{product.title}</div>
      {outline ? (
        <div style={{ marginTop: 5, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: COLORS.muted }}>{product.cat}</span>
          <PriceTag product={product} size={priceSize} />
        </div>
      ) : (
        <div style={{ marginTop: 4 }}>
          <PriceTag product={product} size={priceSize} originalSize={11} />
        </div>
      )}
    </div>
  );
}
