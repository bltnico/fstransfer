import { useEffect } from 'react';

import { W_EMBED_REF } from 'app/services/navigator';

import styles from 'app/components/Embed.module.css';

const Embed = () => {
  useEffect(() => {
    // @todo
    // @ts-ignore
    window[W_EMBED_REF] = true;
  }, []);

  return (
    <div className={styles.container}>
      <h3>Fake crypto site</h3>
      <h3>Need file upload ?</h3>
      <iframe
        title={'embed'}
        className={styles.iframe}
        src={'/'}
        width={350}
        height={350} />
    </div>
  );
};

export default Embed;
