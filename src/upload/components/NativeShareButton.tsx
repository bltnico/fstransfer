import { useEffect, useCallback } from 'react';

import { canUseNativeShare, nativeShare } from 'app/services/navigator';
import Button from 'app/components/Button';

interface Props {
  url: string;
  openOnMount: boolean;
};

const NativeShareButton = ({ url, openOnMount }: Props) => {
  const handleNativeShare = useCallback(() => nativeShare(url as string), [url]);

  useEffect(() => {
    if (canUseNativeShare() && url && openOnMount) {
      handleNativeShare();
    }
  }, [handleNativeShare, openOnMount, url]);

  if (!canUseNativeShare()) {
    return null;
  }

  return (
    <Button
      onClick={handleNativeShare}
      label={'Share'}
      gradient />
  );
};

NativeShareButton.defaultProps = {
  openOnMount: true,
};

export default NativeShareButton;
