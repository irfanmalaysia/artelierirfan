import { COLORS, ACCENT } from '../styles/theme';
import { PRODUCTS } from '../data/products';
import { totalSales } from '../lib/format';
import { VerifiedBadgeIcon, StarIcon } from '../components/icons';
import { ProductRailCard } from '../components/ProductRailCard';

const BIO = "Hi, I'm Irfan — I design calm, practical digital products that help makers do more with less. Every template, ebook and pack here is built from my own workflow and refined with thousands of customers. Buy once, keep it forever, and get free updates along the way.";

export function ProfileScreen({ featured, onOpenProduct, onOpenConnect, onOpenMessage }) {
  return (
    <div data-screen-label="Profile" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', padding: '20px 20px 8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 28, fontWeight: 800 }}>About</span>
      </div>
      <div className="scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 112 }}>
        <div style={{ padding: '14px 20px 0', display: 'flex', alignItems: 'center', gap: 16 }}>
          <img src="/uploads/profile-photo.jpg" alt="ArtelierIrfan" style={{ width: 80, height: 80, flex: 'none', borderRadius: 24, objectFit: 'cover', objectPosition: 'center top' }} />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <span style={{ fontSize: 20, fontWeight: 800 }}>ArtelierIrfan</span>
              <VerifiedBadgeIcon size={17} />
            </div>
            <div style={{ fontSize: 13.5, color: COLORS.muted, marginTop: 3 }}>@artelierirfan · Digital maker</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, padding: '20px 20px 0' }}>
          <div style={{ flex: 1, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{PRODUCTS.length}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>Products</div>
          </div>
          <div style={{ flex: 1, background: COLORS.white, border: `1px solid ${COLORS.border}`, borderRadius: 18, padding: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 800 }}>{totalSales(PRODUCTS)}</div>
            <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 2 }}>Sales</div>
          </div>
          <div style={{ flex: 1, background: '#15171B', borderRadius: 18, padding: 14 }}>
            <div style={{ fontSize: 20, fontWeight: 800, color: `var(--accent, ${ACCENT})`, display: 'flex', alignItems: 'center', gap: 5 }}>
              <StarIcon size={15} />
              4.9
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', marginTop: 2 }}>Rating</div>
          </div>
        </div>

        <div style={{ padding: '22px 20px 0' }}>
          <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '.5px', textTransform: 'uppercase', color: COLORS.muted }}>Bio</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.6, color: COLORS.inkSoft, margin: '10px 0 0' }}>{BIO}</p>
        </div>

        <div style={{ padding: '24px 20px 2px', fontSize: 18, fontWeight: 800 }}>Featured products</div>
        <div className="chips" style={{ display: 'flex', gap: 14, padding: '14px 20px 6px', overflowX: 'auto' }}>
          {featured.map((item) => (
            <ProductRailCard
              key={item.id}
              product={item}
              onOpen={() => onOpenProduct(item.id)}
              width={170}
              coverHeight={114}
              titleSize={14}
              priceSize={14}
            />
          ))}
        </div>

        <div style={{ display: 'flex', gap: 10, padding: '24px 20px 0' }}>
          <div onClick={onOpenConnect} style={{ flex: 1, background: `var(--accent, ${ACCENT})`, color: '#fff', textAlign: 'center', padding: 14, borderRadius: 15, fontSize: 14.5, fontWeight: 800, cursor: 'pointer' }}>Let's Connect</div>
          <div onClick={onOpenMessage} style={{ flex: 1, background: COLORS.white, border: `1px solid ${COLORS.border}`, color: COLORS.ink, textAlign: 'center', padding: 14, borderRadius: 15, fontSize: 14.5, fontWeight: 700, cursor: 'pointer' }}>Message</div>
        </div>
      </div>
    </div>
  );
}
