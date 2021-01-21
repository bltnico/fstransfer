import { Player } from '@lottiefiles/react-lottie-player';

import loaderAnimation from 'assets/lottie/loader.json';

const Loader = () => (
  <Player
    autoplay
    loop
    src={loaderAnimation}
    style={{ width: '64px', height: '64px' }} />
);

export default Loader;
