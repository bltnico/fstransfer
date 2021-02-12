import * as navigator from 'app/services/navigator';

describe('app/services/navigator', () => {
  it('can create a share url', async () => {
    const id = 'file-id';
    const jwk = 'jwk-str';

    const shareUrl = await navigator.toShareUrl(id, jwk);
    expect(shareUrl).toBeTruthy();
    expect(shareUrl).toContain(id);
    expect(shareUrl).toContain(jwk);
  });

  it('can run app', async () => {
    const canRun = navigator.canRun();
    expect(canRun).toBeDefined();
  });
});
