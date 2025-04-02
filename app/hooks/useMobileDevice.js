import {
  MOBILE_SCREEN_WIDTH,
  SMALL_SCREEN_DESKTOP,
  SMALL_MOBILE_SCREEN_WIDTH,
} from '../constants/screenSize';
import useWindowSize from './useWindowSize';

function useMobileDevice() {
  const { windowWidth } = useWindowSize();
  return windowWidth < MOBILE_SCREEN_WIDTH;
}

export const useSmallDesktop = () => {
  const { windowWidth } = useWindowSize();
  return windowWidth < SMALL_SCREEN_DESKTOP;
};

export const useSmallMobileDevice = () => {  // Renamed function to start with "use"
  const { windowWidth } = useWindowSize();
  return windowWidth < SMALL_MOBILE_SCREEN_WIDTH;
};

export default useMobileDevice;
