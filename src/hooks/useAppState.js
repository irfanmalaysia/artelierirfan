import { useCallback, useMemo, useRef, useState } from 'react';
import { PRODUCTS, FEATURED_IDS, PLACEHOLDER_CATEGORIES } from '../data/products';
import { useLocalStorageState } from './useLocalStorageState';

const TOAST_MS = 2200;

export function useAppState() {
  const [screen, setScreen] = useState('home');
  const [lastTab, setLastTab] = useState('home');
  const [selectedId, setSelectedId] = useState(null);
  const [cat, setCatState] = useState('All');
  const [query, setQuery] = useState('');
  const [saved, setSaved] = useLocalStorageState('artelierirfan:saved', {});
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [toast, setToast] = useState('');
  const [connectSheet, setConnectSheet] = useState(false);
  const [messageSheet, setMessageSheet] = useState(false);
  const [userReviews, setUserReviews] = useLocalStorageState('artelierirfan:reviews', {});
  const [reviewDraft, setReviewDraft] = useState({ name: '', text: '' });
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const toastTimer = useRef(null);
  const reviewTimer = useRef(null);

  const flashToast = useCallback((message) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), TOAST_MS);
  }, []);

  const flashComingSoon = useCallback(() => flashToast('🚧 Coming soon'), [flashToast]);

  const goTab = useCallback((tab) => {
    setScreen(tab);
    setLastTab(tab);
    setSelectedId(null);
  }, []);

  const openProduct = useCallback((id) => {
    setScreen('detail');
    setSelectedId(id);
    setGalleryIdx(0);
    setReviewDraft({ name: '', text: '' });
    setReviewSubmitted(false);
  }, []);

  const goBack = useCallback(() => {
    setScreen(lastTab || 'home');
    setSelectedId(null);
  }, [lastTab]);

  const setCat = useCallback((c) => {
    if (PLACEHOLDER_CATEGORIES.includes(c)) {
      flashComingSoon();
      return;
    }
    setCatState(c);
  }, [flashComingSoon]);

  const toggleSaved = useCallback((id) => {
    setSaved((prev) => {
      const next = { ...prev };
      if (next[id]) delete next[id];
      else next[id] = true;
      return next;
    });
  }, [setSaved]);

  const submitReview = useCallback((id) => {
    const name = reviewDraft.name.trim();
    const text = reviewDraft.text.trim();
    if (!name || !text) return;
    const initials = name.split(/\s+/).map((w) => w[0]).join('').toUpperCase().slice(0, 2);
    const entry = { name, initials, when: 'Just now', text };
    setUserReviews((prev) => ({ ...prev, [id]: [entry, ...(prev[id] || [])] }));
    setReviewDraft({ name: '', text: '' });
    setReviewSubmitted(true);
    if (reviewTimer.current) clearTimeout(reviewTimer.current);
    reviewTimer.current = setTimeout(() => setReviewSubmitted(false), 2500);
  }, [reviewDraft, setUserReviews]);

  const buy = useCallback((url) => {
    if (!url) return;
    window.open(url, '_blank', 'noopener');
  }, []);

  const share = useCallback((product) => {
    if (!product) return;
    const shareData = {
      title: product.title,
      text: `Check out ${product.title} on ArtelierIrfan`,
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch(() => {});
    } else if (navigator.clipboard) {
      navigator.clipboard.writeText(shareData.url)
        .then(() => flashToast('🔗 Link copied'))
        .catch(() => {});
    }
  }, [flashToast]);

  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) => (cat === 'All' || p.cat === cat) && (q === '' || p.title.toLowerCase().includes(q))
    );
  }, [cat, query]);

  const featured = useMemo(
    () => FEATURED_IDS.map((id) => PRODUCTS.find((p) => p.id === id)),
    []
  );

  const savedProducts = useMemo(
    () => PRODUCTS.filter((p) => saved[p.id]),
    [saved]
  );

  const currentProduct = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedId) || null,
    [selectedId]
  );

  const showDiscovery = query.trim() === '' && cat === 'All';

  return {
    screen, lastTab, cat, query, saved, galleryIdx, lightbox, toast,
    connectSheet, messageSheet, userReviews, reviewDraft, reviewSubmitted,
    filteredProducts, featured, savedProducts, currentProduct, showDiscovery,
    setQuery, setGalleryIdx, setLightbox, setReviewDraft,
    setConnectSheet, setMessageSheet,
    goTab, openProduct, goBack, setCat, toggleSaved, submitReview, buy, share, flashComingSoon,
  };
}