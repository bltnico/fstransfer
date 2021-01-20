import { useEffect, useRef } from 'react';

import Button from 'app/components/Button';

interface Props {
  base64: string;
}

const DownloadButton = ({ base64 }: Props) => {
  const link = useRef() as React.MutableRefObject<HTMLAnchorElement>;

  useEffect(() => {
    if (!link.current) {
      return;
    }

    setTimeout(() => {
      const lref = link.current;
      lref.href = base64;
    }, 0);

  }, [link, base64]);

  return (
    <a ref={link} download>
      <Button
        label={'Download file'}
        gradient />
    </a>
  );
};

export default DownloadButton;
