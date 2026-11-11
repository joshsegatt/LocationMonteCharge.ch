// Coordonnées et liens de contact partagés par toutes les pages.
export const WHATSAPP_NUMBER = '41798896406';
export const PHONE_TEL = 'tel:0800825925';
export const PHONE_DISPLAY = '0800 825 925';

export const DEFAULT_WA_TEXT =
  "Bonjour, je souhaite un devis pour un monte-meuble. Objet : \nÉtage : \nCommune : ";

export function waLink(text: string = DEFAULT_WA_TEXT) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
