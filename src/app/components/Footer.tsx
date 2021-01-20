import { version } from './../../../package.json';

import styles from 'app/components/Footer.module.css';

const Footer = () => (
  <footer className={styles.footer}>
    <span>wip service name - {version}</span>
  </footer>
);

export default Footer;

