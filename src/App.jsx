import { useAppState } from './hooks/useAppState';
import { HomeScreen } from './screens/HomeScreen';
import { SavedScreen } from './screens/SavedScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { DetailScreen } from './screens/DetailScreen';
import { TabBar } from './components/TabBar';
import { BottomSheet } from './components/BottomSheet';
import { Toast } from './components/Toast';
import { ACCENT } from './styles/theme';
import { TiktokIcon, WhatsappIcon, InstagramIcon, YoutubeIcon, SpotifyIcon, EmailIcon } from './components/icons';

const CONNECT_LINKS = [
  { label: 'TikTok', handle: '@artelierirfan', url: 'https://www.tiktok.com/@artelierirfan?_r=1&_t=ZS-97Wo32LtZ1c', icon: <TiktokIcon /> },
  { label: 'YouTube', handle: '@moneybutsimplecorp', url: 'https://www.youtube.com/@moneybutsimplecorp', icon: <YoutubeIcon /> },
  { label: 'Podcast', handle: 'Money But Simple · Spotify', url: 'https://open.spotify.com/show/4hJJblC4lQo3HioAkHaE6f?si=FVJFyMwMTU-919RMlyotbw', icon: <SpotifyIcon /> },
  { label: 'Instagram', handle: '@artelierirfan', url: '', icon: <InstagramIcon />, comingSoon: true },
];

const MESSAGE_LINKS = [
  { label: 'Email', handle: 'irfand.malaysia@gmail.com', url: 'mailto:irfand.malaysia@gmail.com', icon: <EmailIcon /> },
  { label: 'WhatsApp', handle: 'Chat with me', url: 'https://wa.me/601172715814', icon: <WhatsappIcon /> },
];

function openLink(url) {
  if (!url) return;
  window.open(url, '_blank', 'noopener');
}

function scrollToAllProducts() {
  const sc = document.querySelector('.scroll');
  const el = document.querySelector('[data-allproducts]');
  if (sc && el) {
    sc.scrollTo({ top: sc.scrollTop + (el.getBoundingClientRect().top - sc.getBoundingClientRect().top) - 12, behavior: 'smooth' });
  }
}

export default function App() {
  const app = useAppState();

  const connectLinks = CONNECT_LINKS.map((l) => ({
    ...l,
    onClick: l.comingSoon
      ? () => { app.setConnectSheet(false); app.flashComingSoon(); }
      : () => openLink(l.url),
  }));
  const messageLinks = MESSAGE_LINKS.map((l) => ({ ...l, onClick: () => openLink(l.url) }));

  return (
    <div className="app-shell-backdrop">
      <div className="app-shell" style={{ '--accent': ACCENT }}>
        {app.screen === 'home' && (
          <HomeScreen
            saved={app.saved}
            savedCount={app.savedProducts.length}
            cat={app.cat}
            query={app.query}
            filteredProducts={app.filteredProducts}
            featured={app.featured}
            showDiscovery={app.showDiscovery}
            onOpenProduct={app.openProduct}
            onToggleSave={app.toggleSaved}
            onGoSaved={() => app.goTab('saved')}
            onSetCat={app.setCat}
            onSearch={(e) => app.setQuery(e.target.value)}
            onClearSearch={() => app.setQuery('')}
            onBrowseAll={scrollToAllProducts}
            onComingSoon={app.flashComingSoon}
          />
        )}

        {app.screen === 'saved' && (
          <SavedScreen
            savedProducts={app.savedProducts}
            onOpenProduct={app.openProduct}
            onToggleSave={app.toggleSaved}
            onGoHome={() => app.goTab('home')}
          />
        )}

        {app.screen === 'profile' && (
          <ProfileScreen
            featured={app.featured}
            onOpenProduct={app.openProduct}
            onOpenConnect={() => app.setConnectSheet(true)}
            onOpenMessage={() => app.setMessageSheet(true)}
          />
        )}

        {app.screen === 'detail' && app.currentProduct && (
          <DetailScreen
            product={app.currentProduct}
            saved={!!app.saved[app.currentProduct.id]}
            galleryIdx={app.galleryIdx}
            lightbox={app.lightbox}
            userReviews={app.userReviews}
            reviewDraft={app.reviewDraft}
            reviewSubmitted={app.reviewSubmitted}
            onBack={app.goBack}
            onToggleSave={app.toggleSaved}
            onSetGalleryIdx={app.setGalleryIdx}
            onOpenLightbox={app.setLightbox}
            onCloseLightbox={() => app.setLightbox(null)}
            onReviewDraftChange={app.setReviewDraft}
            onSubmitReview={app.submitReview}
            onBuy={app.buy}
            onShare={() => app.share(app.currentProduct)}
          />
        )}

        {app.screen !== 'detail' && (
          <TabBar
            screen={app.screen}
            onGoHome={() => app.goTab('home')}
            onGoSaved={() => app.goTab('saved')}
            onGoProfile={() => app.goTab('profile')}
          />
        )}

        <Toast message={app.toast} />

        <BottomSheet
          show={app.connectSheet}
          onClose={() => app.setConnectSheet(false)}
          title="Let's connect 👋"
          subtitle="Find me on your favourite platform"
          links={connectLinks}
        />
        <BottomSheet
          show={app.messageSheet}
          onClose={() => app.setMessageSheet(false)}
          title="Send a message ✉️"
          subtitle="Pick how you'd like to reach me"
          links={messageLinks}
        />
      </div>
    </div>
  );
}