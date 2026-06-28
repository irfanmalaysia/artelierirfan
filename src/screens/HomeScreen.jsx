import { COLORS, ACCENT } from '../styles/theme';
import { HeartIcon, SearchIcon, CloseIcon } from '../components/icons';
import { HeroCarousel } from '../components/HeroCarousel';
import { CategoryChips } from '../components/CategoryChips';
import { ProductRailCard } from '../components/ProductRailCard';
import { ProductListItem } from '../components/ProductListItem';
import { PRODUCTS } from '../data/products';

export function HomeScreen({
  saved, savedCount, cat, query, filteredProducts, featured, showDiscovery,
  onOpenProduct, onToggleSave, onGoSaved, onSetCat, onSearch, onClearSearch,
  onBrowseAll, onComingSoon,
}) {
  const resultsLabel = `${filteredProducts.length} ${filteredProducts.length === 1 ? 'result' : 'results'}`;

  return (
    <div data-screen-label="Home" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 'none', padding: '20px 20px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
          <img src="/uploads/ai-logo-black.png" alt="ArtelierIrfan" style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover', display: 'block' }} />
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
            <span style={{ fontSize: 11, color: COLORS.muted, fontWeight: 500 }}>Digital store</span>
            <span style={{ fontSize: 15.5, color: COLORS.ink, fontWeight: 700 }}>ArtelierIrfan</span>
          </div>
        </div>
        <div onClick={onGoSaved} style={{ width: 42, height: 42, borderRadius: 13, background: '#fff', border: `1px solid ${COLORS.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', position: 'relative' }}>
          <HeartIcon />
          {savedCount > 0 && (
            <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, padding: '0 5px', borderRadius: 9, background: `var(--accent, ${ACCENT})`, color: COLORS.ink, fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', border: `2px solid ${COLORS.bg}` }}>
              {savedCount}
            </span>
          )}
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, overflowY: 'auto', paddingBottom: 112 }}>
        {showDiscovery && (
          <HeroCarousel ebookCover={PRODUCTS[0].coverImg} onBrowseAll={onBrowseAll} onComingSoon={onComingSoon} />
        )}

        <div style={{ padding: '18px 20px 6px', display: 'flex', gap: 10 }}>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10, background: '#fff', border: `1px solid ${COLORS.border}`, borderRadius: 15, padding: '0 14px', height: 50 }}>
            <SearchIcon />
            <input
              value={query}
              onChange={onSearch}
              placeholder="Search products"
              style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: "'Plus Jakarta Sans',sans-serif", fontSize: 15, fontWeight: 500, color: COLORS.ink }}
            />
            {query.length > 0 && (
              <div onClick={onClearSearch} style={{ cursor: 'pointer', width: 22, height: 22, borderRadius: '50%', background: '#EFEFEC', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloseIcon />
              </div>
            )}
          </div>
        </div>

        <CategoryChips cat={cat} onSelect={onSetCat} />

        {showDiscovery && (
          <>
            <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '18px 20px 2px' }}>
              <span style={{ fontSize: 18, fontWeight: 800 }}>Popular now</span>
            </div>
            <div className="chips" style={{ display: 'flex', gap: 14, padding: '14px 20px 6px', overflowX: 'auto' }}>
              {featured.map((item) => (
                <ProductRailCard key={item.id} product={item} onOpen={() => onOpenProduct(item.id)} outline />
              ))}
            </div>
          </>
        )}

        <div data-allproducts="1" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', padding: '18px 20px 4px' }}>
          <span style={{ fontSize: 18, fontWeight: 800 }}>{showDiscovery ? 'All products' : resultsLabel}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '8px 20px 0' }}>
          {filteredProducts.map((item) => (
            <ProductListItem
              key={item.id}
              product={item}
              saved={!!saved[item.id]}
              onOpen={() => onOpenProduct(item.id)}
              onToggleSave={() => onToggleSave(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
