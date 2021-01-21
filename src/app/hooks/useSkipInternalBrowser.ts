import { useEffect } from 'react';

function useSkipInternalBrowser() {
  useEffect(() => {
    const target = `${window.location.href}?i=_skip_child_view`;
    if(/Android|iPhone|iPad|iPod/i.test(navigator.userAgent) ) {
      window.location.href = target;
      window.setTimeout(function() {
        window.location.href = target;
      }, 25);
    } else {
      window.location.href = target;
    }

    function killPopup() {
      window.removeEventListener('pagehide', killPopup);
    }

    window.addEventListener('pagehide', killPopup);

    return () => window.removeEventListener('pagehide', killPopup);
  }, []);
}

export default useSkipInternalBrowser;
