const URL_KEY_IDENTIFIER = '#k=';

export async function isFacebookApp(): Promise<boolean> {
  const ua = navigator.userAgent || navigator.vendor;
  const fbAgent = (ua.indexOf('FBAN') > -1) || (ua.indexOf('FBAV') > -1) || (ua.indexOf('Instagram') > -1);

  if (fbAgent) {
    throw new Error('Facebook agent detected');
  }

  return false;
}

export async function isIframe(): Promise<boolean> {
  const frameEl = window.frameElement;
  if (frameEl) {
    throw new Error('Iframe detected');
  }

  return false;
}

export async function isInInsecureContext(): Promise<void> {
  try {
    await Promise.all([
      isFacebookApp(),
      isIframe(),
    ]);
  } catch (e) {
    throw new Error('Insecure context. Please use your favorite browser instead.')
  }
}

export function canRun(): boolean {
  const crypto = !!window.crypto;
  const isIframe = window.frameElement;
  return crypto && !isIframe;
}

export function canUseNativeShare() {
  return !!navigator.share;
}

export function nativeShare(url: string) {
  if (!canUseNativeShare()) {
    throw new Error('Native share not supported');
  }

  return navigator.share({
    title: 'e2e transfer',
    text: 'Fast & secure file 🚀',
    url,
  });
}

export async function toShareUrl(id: string, jwk: string): Promise<string> {
  return `${window.location.origin}/${id}${URL_KEY_IDENTIFIER}${jwk}`;
}

export function open(url: string) {
  window.location.href = url;
}

export async function extractJwkFromUrl(): Promise<string> {
  const rawKey = window.location.hash.slice(URL_KEY_IDENTIFIER.length);
  const key = rawKey.split('?')[0];

  if (!key) {
    throw new Error('Missing url key');
  }

  if (!process.env.REACT_APP_DEV) {
    window.history.pushState(
      '',
      document.title,
      window.location.pathname + window.location.search,
    );
  }

  return key;
}
