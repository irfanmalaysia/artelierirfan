import { COLORS } from '../styles/theme';
import { priceLabel } from '../lib/format';

export function PriceTag({ product, size = 16, originalSize = 12 }) {
  return (
    <span style={{ fontSize: size, fontWeight: 800, display: 'flex', alignItems: 'baseline', gap: 5 }}>
      {product.originalPrice && (
        <span style={{ fontSize: originalSize, fontWeight: 600, color: COLORS.strikethrough, textDecoration: 'line-through' }}>
          {priceLabel(product.originalPrice)}
        </span>
      )}
      {priceLabel(product.price)}
    </span>
  );
}
