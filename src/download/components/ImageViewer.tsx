import { useEffect, useState } from 'react';

interface Props {
  base64: string;
}

const ImageViewer = ({ base64 }: Props) => {
  const [loaded, load] = useState<boolean>(false);

  useEffect(() => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      load(true);
    };
  }, [base64]);

  if (!loaded) {
    <div>placeholder</div>
  }

  return (
    <img
      loading={'lazy'}
      src={base64}
      alt={''} />
  );
};

export default ImageViewer;
