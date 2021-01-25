import { useCallback } from 'react';
import cx from 'classnames';

import { LogoState, useApp } from 'app/components/AppProvider';

import styles from 'app/components/Navbar.module.css';

const Navbar = () => {
  const { logoState } = useApp();

  const reset = useCallback(() => window.location.href = '/', []);

  const logoStyles = cx(styles.fst, {
    [styles.third]: logoState === LogoState.THIRD,
    [styles.half]: logoState === LogoState.HALF,
    [styles.full]: logoState === LogoState.FULL,
  });

  return (
    <nav className={styles.nav}>
      <div className={styles.innerContainer}>
        <span
          className={logoStyles}
          onClick={reset}>
          fstransfer
        </span>
        <span className={styles.setting}>source 🐙</span>
      </div>
    </nav>
  );
};

export default Navbar;
