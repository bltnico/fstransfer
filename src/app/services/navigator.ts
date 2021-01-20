const URL_KEY_IDENTIFIER = '#k=';

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

export async function extractJwkFromUrl(): Promise<string> {
  const key = window.location.hash.slice(URL_KEY_IDENTIFIER.length);
  if (!key) {
    throw new Error('Missing url key');
  }

  return key;
}
