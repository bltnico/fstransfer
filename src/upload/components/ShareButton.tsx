import { useMemo, useState, useCallback, useRef, useEffect } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { canUseNativeShare, nativeShare } from 'app/services/navigator';
import Button from 'app/components/Button';
import { useUpload } from 'upload/components/UploadProvider';

import successAnimation from 'assets/lottie/success-2.json';

import styles from 'upload/components/ShareButton.module.css';

const ShareButton = () => {
  const player = useRef() as React.MutableRefObject<Player | undefined>;
  const { shareUrl } = useUpload();
  const [copied, copy] = useState<boolean>(false);

  const nativeShare: any = useCallback(() => nativeShare(shareUrl as string), [shareUrl]);

  useEffect(() => {
    if (canUseNativeShare() && shareUrl) {
      nativeShare();
    }
  }, [nativeShare, shareUrl]);

  const handleCopy = useCallback((_, state) => copy(state), []);

  const renderShareButton = useMemo(() => {
    if (!canUseNativeShare()) {
      return null;
    }

    return (
      <Button
        onClick={nativeShare}
        label={'Share'}
        gradient />
    );
  }, [nativeShare]);

  const renderButtonLabel = useMemo(() => {
    if (copied) {
      return 'Copied !';
    }

    return 'Copy to clipboard';
  }, [copied]);

  return (
    <>
      <Player
        autoplay
        loop
        ref={player as any}
        src={successAnimation}
        style={{ width: '120px', height: '120px' }} />
      <input
        readOnly
        value={shareUrl as string}
        className={styles.input} />
      <CopyToClipboard
        text={shareUrl as string}
        onCopy={handleCopy}>
        <Button
          label={renderButtonLabel}
          gradient />
      </CopyToClipboard>
      {renderShareButton}
      <a
        href={shareUrl as string}
        title={'Share'}
        className={styles.share}>
        <Button label={'Open file'} />
      </a>
    </>
  );
};

export default ShareButton;
