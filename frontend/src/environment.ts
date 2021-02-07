const MODE: string = import.meta.env.NODE_ENV as string;
const SERVER_URL: string = import.meta.env.VITE_SERVER_URL as string || 'http://localhost:4040';

const BACKGROUND_STARS_MIN_SIZE = import.meta.env.VITE_BACKGROUND_STARS_MIN_SIZE as string;
const BACKGROUND_STARS_MAX_SIZE = import.meta.env.VITE_BACKGROUND_STARS_MAX_SIZE as string;
const BACKGROUND_STARS_MIN_ITEMS = import.meta.env.VITE_BACKGROUND_STARS_MIN_ITEMS as string;
const BACKGROUND_STARS_MAX_ITEMS = import.meta.env.VITE_BACKGROUND_STARS_MAX_ITEMS as string;
const BACKGROUND_WIDTH = import.meta.env.VITE_BACKGROUND_WIDTH as string;
const BACKGROUND_HEIGHT = import.meta.env.VITE_BACKGROUND_HEIGHT as string;

const environment = {
  mode: MODE,
  serverUrl: SERVER_URL,
  background: {
    stars: {
      minSize: BACKGROUND_STARS_MIN_SIZE ? parseInt(BACKGROUND_STARS_MIN_SIZE, 10) : 1,
      maxSize: BACKGROUND_STARS_MAX_SIZE ? parseInt(BACKGROUND_STARS_MAX_SIZE, 10) : 2,
      minItems: BACKGROUND_STARS_MIN_ITEMS ? parseFloat(BACKGROUND_STARS_MIN_ITEMS) : 0.0001,
      maxItems: BACKGROUND_STARS_MAX_ITEMS ? parseFloat(BACKGROUND_STARS_MAX_ITEMS) : 0.00025,
    },
    width: BACKGROUND_WIDTH ? parseInt(BACKGROUND_WIDTH, 10) : 1360,
    height: BACKGROUND_HEIGHT ? parseInt(BACKGROUND_HEIGHT, 10) : 768,
  },
};

export default environment;
