import { COLORS, ACCENT } from '../styles/theme';
import { FALLBACK_REVIEWS } from '../data/products';
import { priceLabel } from '../lib/format';
import { PriceTag } from '../components/PriceTag';
import {
  BackChevronIcon, HeartIcon, StarIcon, CheckIcon, PlayIcon, CloseIcon,
  ArrowRightIcon, ShareIcon,
} from '../components/icons';

function normalizeGalleryItem(item) {
  return typeof item === 'string' ? { type: 'image', src: item } : item;
}

export function DetailScreen({
  product, saved, galleryIdx, lightbox, userReviews, reviewDraft, reviewSubmitted,
  onBack, onToggleSave, onSetGalleryIdx, onOpenLightbox, onCloseLightbox,
  onReviewDraftChange, onSubmitReview, onBuy,
}) {
  const gallery = product.gallery || (product.coverImg ? [product.coverImg] : []);
  const activeIdx = galleryIdx || 0;
  const activeNorm = normalizeGalleryItem(gallery[activeIdx] || gallery[0] || '');
  const activeIsVideo = activeNorm.type === 'video';
  const activeBg = !activeIsVideo && activeNorm.src ? `url("${activeNorm.src}")` : 'none';
  const reviews = [...(userReviews[product.id] || []), ...(product.productReviews || FALLBACK_REVIEWS)];

  return (
    <div data-screen-label="Detail" style={{ height: '100%', display: 'flex', flexDirection: 'column', background: COLORS.white }}>
      <div style={{ flex: 'none', padding: '56px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: COLORS.white }}>
        <div onClick={onBack} style={{ width: 42, height: 42, borderRadius: 13, background: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <BackChevronIcon size={20} />
        </div>
        <span style={{ fontSize: 16, fontWeight: 700 }}>Details</span>
        <div onClick={() => onToggleSave(product.id)} style={{ width: 42, height: 42, borderRadius: 13, background: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <HeartIcon filled={saved} size={20} />
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, overflowY: 'auto', padding: '4px 20px 120px' }}>
        <div style={{ position: 'relative', overflow: 'hidden', height: 300, borderRadius: 24, background: '#15171B' }}>
          {activeIsVideo && (
            <video
              src={activeNorm.src}
              poster={activeNorm.poster || ''}
              controls
              playsInline
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
          <div
            onClick={() => !activeIsVideo && activeNorm.src && onOpenLightbox(activeNorm.src)}
            style={{
              position: 'absolute', inset: 0, backgroundSize: 'cover', backgroundPosition: 'center top',
              backgroundImage: activeBg, cursor: activeIsVideo ? 'default' : 'zoom-in',
              pointerEvents: activeIsVideo ? 'none' : 'auto',
            }}
          />
        </div>

        <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
          {gallery.map((item, i) => {
            const n = normalizeGalleryItem(item);
            const isVideo = n.type === 'video';
            const bg = isVideo ? (n.poster ? `url("${n.poster}")` : 'none') : `url("${n.src}")`;
            return (
              <div
                key={i}
                onClick={() => onSetGalleryIdx(i)}
                style={{
                  position: 'relative', width: 60, height: 60, borderRadius: 13, background: COLORS.placeholderBg,
                  backgroundSize: 'cover', backgroundPosition: 'center top', backgroundImage: bg,
                  cursor: 'pointer', overflow: 'hidden', flex: 'none',
                }}
              >
                {i === activeIdx && (
                  <div style={{ position: 'absolute', inset: 0, borderRadius: 13, border: '2.5px solid #15171B' }} />
                )}
                {isVideo && (
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 13 }}>
                    <PlayIcon size={22} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginTop: 20 }}>
          <div style={{ minWidth: 0 }}>
            <div style={{ fontFamily: "'JetBrains Mono',monospace", fontSize: 11, letterSpacing: '.5px', textTransform: 'uppercase', color: COLORS.ratingMuted, fontWeight: 500 }}>{product.cat}</div>
            <div style={{ fontSize: 23, fontWeight: 800, lineHeight: 1.15, marginTop: 6 }}>{product.title}</div>
          </div>
          <div style={{ whiteSpace: 'nowrap' }}>
            <PriceTag product={product} size={24} originalSize={15} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <StarIcon size={16} outline />
            <span style={{ fontSize: 14, fontWeight: 700 }}>{product.rating}</span>
            <span style={{ fontSize: 13, color: COLORS.muted }}>({product.reviews} reviews)</span>
          </div>
          <span style={{ width: 4, height: 4, borderRadius: '50%', background: COLORS.divider }} />
          <span style={{ fontSize: 13, color: COLORS.muted }}>{product.sales} sold</span>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 18 }}>
          {product.badges.map((b) => (
            <div key={b} style={{ padding: '8px 14px', borderRadius: 11, background: COLORS.bg, fontSize: 12.5, fontWeight: 600, color: COLORS.inkSoft }}>{b}</div>
          ))}
        </div>

        <div style={{ marginTop: 24, fontSize: 17, fontWeight: 800 }}>What's inside</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginTop: 14 }}>
          {product.bullets.map((b) => (
            <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
              <div style={{ width: 22, height: 22, flex: 'none', borderRadius: '50%', background: `var(--accent, ${ACCENT})`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CheckIcon size={13} stroke="#15171B" />
              </div>
              <span style={{ fontSize: 14.5, color: '#2A2E35' }}>{b}</span>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 24, fontSize: 17, fontWeight: 800 }}>Description</div>
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: COLORS.inkSoft, margin: '12px 0 0' }}>{product.desc}</p>

        <div style={{ marginTop: 26, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 17, fontWeight: 800 }}>Reviews</span>
          <span style={{ fontSize: 13, color: COLORS.muted }}>{product.reviews} reviews</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 14 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: COLORS.surfaceMuted, borderRadius: 18, padding: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                <div style={{ width: 38, height: 38, flex: 'none', borderRadius: '50%', background: '#E2E2DE', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, color: COLORS.textMuted2 }}>{r.initials}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{r.name}</div>
                  <div style={{ fontSize: 11.5, color: COLORS.muted }}>{r.when}</div>
                </div>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[0, 1, 2, 3, 4].map((s) => <StarIcon key={s} size={12} />)}
                </div>
              </div>
              <p style={{ fontSize: 13.5, lineHeight: 1.55, color: COLORS.inkSoft, margin: '11px 0 0' }}>{r.text}</p>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 22, background: COLORS.surfaceMuted, borderRadius: 20, padding: 18 }}>
          <div style={{ fontSize: 15, fontWeight: 800, marginBottom: 14 }}>Write a review</div>
          <input
            value={reviewDraft.name}
            onChange={(e) => onReviewDraftChange({ ...reviewDraft, name: e.target.value })}
            placeholder="Your name"
            style={{ width: '100%', boxSizing: 'border-box', border: `1.5px solid ${COLORS.borderSoft}`, borderRadius: 12, padding: '11px 14px', fontSize: 14, fontFamily: 'inherit', background: '#fff', outline: 'none', marginBottom: 10 }}
          />
          <textarea
            value={reviewDraft.text}
            onChange={(e) => onReviewDraftChange({ ...reviewDraft, text: e.target.value })}
            placeholder="Share your thoughts…"
            rows={3}
            style={{ width: '100%', boxSizing: 'border-box', border: `1.5px solid ${COLORS.borderSoft}`, borderRadius: 12, padding: '11px 14px', fontSize: 14, fontFamily: 'inherit', background: '#fff', outline: 'none', resize: 'none', marginBottom: 12 }}
          />
          <div onClick={() => onSubmitReview(product.id)} style={{ background: '#15171B', color: '#fff', textAlign: 'center', padding: 12, borderRadius: 13, fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>Submit Review</div>
          {reviewSubmitted && (
            <div style={{ marginTop: 10, textAlign: 'center', fontSize: 13, color: '#6A8F3A', fontWeight: 600 }}>✓ Review posted — thank you!</div>
          )}
        </div>
      </div>

      <div style={{ flex: 'none', position: 'absolute', bottom: 0, left: 0, right: 0, background: '#fff', borderTop: `1px solid ${COLORS.border}`, padding: '14px 20px 30px', display: 'flex', gap: 12, alignItems: 'center', zIndex: 40 }}>
        <div style={{ width: 54, height: 54, flex: 'none', borderRadius: 16, background: COLORS.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
          <ShareIcon />
        </div>
        <div onClick={() => onBuy(product.pay)} style={{ flex: 1, height: 54, borderRadius: 16, background: `var(--accent, ${ACCENT})`, color: '#15171B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 9, fontSize: 16, fontWeight: 800, cursor: 'pointer' }}>
          {`Get it · ${priceLabel(product.price)}`}
          <ArrowRightIcon size={17} stroke="#15171B" />
        </div>
      </div>

      {lightbox && (
        <div onClick={onCloseLightbox} style={{ position: 'absolute', inset: 0, zIndex: 200, background: 'rgba(0,0,0,.88)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }}>
          <div style={{ width: '100%', height: '100%', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundImage: `url("${lightbox}")` }} />
          <div style={{ position: 'absolute', top: 14, right: 14, width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CloseIcon size={18} stroke="#fff" strokeWidth="2.2" />
          </div>
        </div>
      )}
    </div>
  );
}
