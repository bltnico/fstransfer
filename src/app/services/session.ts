import FingerprintJS from '@fingerprintjs/fingerprintjs';

export async function generateFingerprint(): Promise<string> {
  const fp = await FingerprintJS.load();
  const { visitorId } = await fp.get();
  return visitorId;
}
