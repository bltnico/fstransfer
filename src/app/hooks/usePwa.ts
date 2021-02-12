import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const usePwa = () => {
  const [canInstall, setInstall] = useState<boolean>(false);
  const [installed, setInstalled] = useState<boolean>(false);
  const deferredPrompt = useRef() as React.MutableRefObject<Event | null>;

  useEffect(() => {
    const catchEvent = (e: Event) => {
      setInstall(true);
      e.preventDefault();
      deferredPrompt.current = e;
    };

    const handleInstallEvent = (e: Event) => {
      setInstalled(true);
    };

    window.addEventListener('beforeinstallprompt', catchEvent);
    window.addEventListener('appinstalled', handleInstallEvent);
    return () => window.removeEventListener('beforeinstallprompt', catchEvent)
  }, [deferredPrompt]);

  const install = useCallback(async () => {
    if (!deferredPrompt.current) {
      return;
    }

    // @todo type
    // @ts-ignore
    deferredPrompt.current.prompt();
    // @ts-ignore
    const choiceResult = await deferredPrompt.current.userChoice;
    if (choiceResult.outcome === 'accepted') {
      console.log('accept install');

    }

    deferredPrompt.current = null;
  }, [deferredPrompt]);

  const isApp = useMemo(() => {
    // @ts-ignore
    return navigator.standalone || window.matchMedia('(display-mode: standalone)').matches;
  }, []);

  return { install, installed, isApp, canInstall };
};

export default usePwa;
