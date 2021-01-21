import styles from 'app/components/Embed.module.css';

const Embed = () => {
  return (
    <div className={styles.container}>
      <h3>Fake crypto site</h3>
      <h3>Need file upload ?</h3>
      <iframe className={styles.iframe} src={'/'} width={350} height={350} />
    </div>
  );
};

export default Embed;
