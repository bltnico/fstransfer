import { Link } from 'react-router-dom';

import styles from 'app/components/About.module.css';

const About = () => {
  return (
    <ul className={styles.list}>
      <li>
        <a href={'https://github.com/bltnico/fstransfer'} target={'_blank'} rel={'noreferrer'}>🐙 Github</a>
      </li>
      <li>
        <a href={'https://trello.com/b/A3s5mRW5'} target={'_blank'} rel={'noreferrer'}>🗃 Trello</a>
      </li>
      <li>
        <a href={'https://forms.gle/CTNXyGKJcjgzDuV2A'} target={'_blank'} rel={'noreferrer'}>🤨 Feedback</a>
      </li>
      <li>
        <Link to={'/versus-wetransfer'}>💪 Vs. WeTransfer</Link>
      </li>
      <li>
        <Link to={'/embed'}>🚀 Embed</Link>
      </li>
    </ul>
  );
};

export default About;
