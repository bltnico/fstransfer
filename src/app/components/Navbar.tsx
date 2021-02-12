import { useCallback } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';

import { LogoState, useApp } from 'app/components/AppProvider';

import styles from 'app/components/Navbar.module.css';

const Navbar = () => {
  const { logoState } = useApp();

  const logoStyles = cx(styles.fst, {
    [styles.third]: logoState === LogoState.THIRD,
    [styles.half]: logoState === LogoState.HALF,
    [styles.full]: logoState === LogoState.FULL,
  });

  return (
    <nav className={styles.nav}>
      <div className={styles.innerContainer}>
        <Link to={'/'} className={styles.link}>
          <span className={logoStyles}>
            fstransfer
          </span>
        </Link>
        <Link to={'/about'} className={styles.link}>
          <span className={styles.setting}>🐙 🗃 🤨 💪 🚀</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
