import { Player } from '@lottiefiles/react-lottie-player';

import loaderAnimation from 'assets/lottie/loader.json';

const Loader = () => (
  <Player
    autoplay
    loop
    src={loaderAnimation} />
);

export default Loader;
