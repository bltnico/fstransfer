import { useMemo, useState, useCallback, useRef } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Button from 'app/components/Button';
import NativeShareButton from 'upload/components/NativeShareButton';
import { useUpload } from 'upload/components/UploadProvider';

import successAnimation from 'assets/lottie/success-2.json';

import styles from 'upload/components/ShareButton.module.css';

const ShareButton = () => {
  const player = useRef() as React.MutableRefObject<Player | undefined>;
  const { shareUrl } = useUpload();
  const [copied, copy] = useState<boolean>(false);

  const handleCopy = useCallback((_, state) => copy(state), []);

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
      <NativeShareButton url={shareUrl as string} />
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
