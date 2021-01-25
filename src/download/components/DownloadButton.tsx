import { useCallback } from 'react';

import Button from 'app/components/Button';

interface Props {
  base64: string;
}

const DownloadButton = ({ base64 }: Props) => {
  const download = useCallback(() => {
    const el = document.createElement('a');
    el.style.display = 'none';
    el.href = base64;
    el.download = `fstransfer-${Date.now().toString()}`;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
  }, [base64]);

  return (
    <Button
      label={'Download file'}
      onClick={download}
      gradient />
  );
};

export default DownloadButton;
