import usePwa from 'app/hooks/usePwa';
import Button from 'app/components/Button';

import styles from 'app/components/PwaInstallBanner.module.css';

const PwaInstallBanner = () => {
  const { install, installed, isApp, canInstall } = usePwa();

  if (isApp || !canInstall) {
    return null;
  }

  return (
    <Button
      gradient
      label={!installed ? 'Install fstranfer app' : 'Welcome to fstranfer app'}
      className={styles.banner}
      onClick={install} />
  );
};

export default PwaInstallBanner;
