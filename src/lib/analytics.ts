// Conversion tracking for Google Ads / GA4 and Meta Ads.
//
// IDs come from build-time env vars (see .env.example). When no ID is set,
// everything no-ops, so the site works unchanged until the accounts exist:
//   VITE_GA4_ID        e.g. G-XXXXXXXXXX
//   VITE_GOOGLE_ADS_ID e.g. AW-XXXXXXXXXX
//   VITE_META_PIXEL_ID e.g. 1234567890
//
// Events fired (use these names when creating conversions in Ads/Meta):
//   call_click, whatsapp_click, email_click  — any tel:/wa.me/mailto link
//   quote_whatsapp_submit                    — QuickQuoteDrawer sent to WhatsApp
//   whatsapp_widget_send                     — floating widget message
//   lead_form_submit                         — contact form success

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const GA4_ID = import.meta.env.VITE_GA4_ID as string | undefined;
// Google Ads conta BatiMove Sàrl (114-843-5480). O ID é público (aparece no
// HTML servido de qualquer forma), por isso pode viver no código.
const ADS_ID = (import.meta.env.VITE_GOOGLE_ADS_ID as string | undefined) || 'AW-18400207296';
const META_PIXEL_ID = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

// Ações de conversão do Google Ads (label do send_to + valor em CHF).
// O valor reflete a intenção: um clique no WhatsApp/telefone ainda não é um
// lead; o pedido de devis preenchido e o formulário valem mais. Isso ensina o
// lance automático a priorizar contatos de verdade.
const ADS_CONVERSIONS: Record<string, { label: string; value: number }> = {
  // "Contact": clique em telefone/WhatsApp (valor vindo do site)
  call_click: { label: 'NBeNCM6MqrMdEMDD88VE', value: 10 },
  whatsapp_click: { label: 'NBeNCM6MqrMdEMDD88VE', value: 10 },
  whatsapp_widget_send: { label: 'NBeNCM6MqrMdEMDD88VE', value: 15 },
  quote_whatsapp_submit: { label: 'NBeNCM6MqrMdEMDD88VE', value: 25 },
  // "Lead - Formulaire Devis" (valor fixo de 50 CHF também no painel)
  lead_form_submit: { label: '7iQmCIrW8uQcEMDD88VE', value: 50 },
};

// "Appel (079 889 64 06)": o Google troca esse número por um de encaminhamento
// para medir ligações de 60s+ vindas de anúncios.
const ADS_PHONE_CONVERSION = {
  label: 'WzxDCM6v_OYcEMDD88VE',
  number: '079 889 64 06',
};

let initialized = false;

function loadGtag() {
  const firstId = GA4_ID || ADS_ID;
  if (!firstId) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${firstId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  if (GA4_ID) window.gtag('config', GA4_ID);
  if (ADS_ID) {
    window.gtag('config', ADS_ID);
    // Conversão de chamada por troca de número (Appels depuis un site)
    window.gtag('config', `${ADS_ID}/${ADS_PHONE_CONVERSION.label}`, {
      phone_conversion_number: ADS_PHONE_CONVERSION.number,
    });
  }
}

function loadMetaPixel() {
  if (!META_PIXEL_ID || window.fbq) return;

  const fbq: any = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  };
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = '2.0';
  fbq.queue = [];
  window.fbq = fbq;
  window._fbq = fbq;

  const script = document.createElement('script');
  script.async = true;
  script.src = 'https://connect.facebook.net/en_US/fbevents.js';
  document.head.appendChild(script);

  window.fbq('init', META_PIXEL_ID);
  window.fbq('track', 'PageView');
}

/** Fire a named event to every configured destination. Safe to call always. */
export function track(event: string, params: Record<string, unknown> = {}) {
  try {
    window.gtag?.('event', event, params);
    // Google Ads conversion (send_to label) when the event maps to an action
    const conv = ADS_CONVERSIONS[event];
    if (ADS_ID && conv) {
      window.gtag?.('event', 'conversion', {
        send_to: `${ADS_ID}/${conv.label}`,
        value: conv.value,
        currency: 'CHF',
      });
    }
    window.fbq?.('trackCustom', event, params);
  } catch {
    // Tracking must never break the UI.
  }
}

/** SPA pageview (initial pageview is sent by the config/init calls). */
export function trackPageView(path: string) {
  try {
    if (GA4_ID) window.gtag?.('config', GA4_ID, { page_path: path });
    window.fbq?.('track', 'PageView');
  } catch {
    /* noop */
  }
}

/** One delegated listener catches every tel:/WhatsApp/email link on the site. */
function attachContactClickTracking() {
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement | null;
      const link = target?.closest?.('a[href]') as HTMLAnchorElement | null;
      if (!link) return;
      const href = link.getAttribute('href') || '';
      if (href.startsWith('tel:')) {
        track('call_click', { phone: href.replace('tel:', '') });
      } else if (href.includes('wa.me')) {
        track('whatsapp_click');
      } else if (href.startsWith('mailto:')) {
        track('email_click');
      }
    },
    { capture: true },
  );
}

export function initAnalytics() {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  loadGtag();
  loadMetaPixel();
  attachContactClickTracking();
}
