import { useEffect } from 'react';

import { isStandaloneApp } from 'app/services/navigator';

const useDefaultInstalledAppSize = () => {
  useEffect(() => {
    const resize = () => window.resizeTo(360, 500);

    if (isStandaloneApp()) {
      window.addEventListener('load', resize);
      window.addEventListener('resize', resize);
    }

    return () => {
      window.removeEventListener('load', resize);
      window.removeEventListener('resize', resize);
    };
  }, []);
};

export default useDefaultInstalledAppSize;
