// Typographie française appliquée au rendu, pour que les textes restent simples à écrire.
//  - apostrophe typographique (l'escalier devient l’escalier, 5'000 devient 5’000)
//  - espace fine insécable avant ? ! ; et espace insécable avant :
//  - espace insécable entre un nombre et son unité (500 kg, 10ᵉ étage, 0800 825 925)

const NBSP = String.fromCharCode(0x00a0);
const NNBSP = String.fromCharCode(0x202f);

// Champs qui ne sont pas du texte affiché : identifiants, chemins, balises meta
// et messages préremplis envoyés à WhatsApp (ils gardent des espaces normales).
const SKIP_KEYS = new Set([
  'slug',
  'photo',
  'file',
  'whatsappText',
  'waText',
  'metaTitle',
  'metaDescription',
  'seoKeywords',
  'postalCodes',
]);

export function frTypoText(input: string): string {
  // Les chemins et les URL ne sont jamais touchés.
  if (/^(\/|https?:|mailto:|tel:)/.test(input)) return input;
  return input
    .replace(/([\p{L}\d])'(?=[\p{L}\d])/gu, '$1’')
    .replace(/([\p{L}\d»)]) ([?!;])/gu, `$1${NNBSP}$2`)
    .replace(/([\p{L}\d»)]) :(?=\s|$)/gu, `$1${NBSP}:`)
    .replace(/(\d) (kg|m|cm|CHF|h)(?![\p{L}\d])/gu, `$1${NBSP}$2`)
    .replace(/\bCHF (\d)/g, `CHF${NBSP}$1`)
    .replace(/(\d(?:ᵉʳ|ᵉ|er|e)) (étages?)(?![\p{L}])/gu, `$1${NBSP}$2`)
    .replace(/\b0800 825 925\b/g, `0800${NBSP}825${NBSP}925`);
}

/** Applique frTypoText à toutes les chaînes d'un objet de contenu (les clés restent intactes). */
export function frTypo<T>(value: T): T {
  if (typeof value === 'string') return frTypoText(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => frTypo(v)) as unknown as T;
  if (value && typeof value === 'object') {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      out[k] = SKIP_KEYS.has(k) ? v : frTypo(v);
    }
    return out as T;
  }
  return value;
}
