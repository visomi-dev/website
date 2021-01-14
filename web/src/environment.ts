/* eslint-disable prefer-destructuring */

const MODE: string = process.env.NODE_ENV;
const API_URL: string = process.env.VUE_APP_API_URL || 'http://localhost:4040/api';

const BACKGROUND_STARS_MIN_SIZE = process.env.VUE_APP_BACKGROUND_STARS_MIN_SIZE;
const BACKGROUND_STARS_MAX_SIZE = process.env.VUE_APP_BACKGROUND_STARS_MAX_SIZE;
const BACKGROUND_STARS_MIN_ITEMS = process.env.VUE_APP_BACKGROUND_STARS_MIN_ITEMS;
const BACKGROUND_STARS_MAX_ITEMS = process.env.VUE_APP_BACKGROUND_STARS_MAX_ITEMS;
const BACKGROUND_WIDTH = process.env.VUE_APP_BACKGROUND_WIDTH;
const BACKGROUND_HEIGHT = process.env.VUE_APP_BACKGROUND_HEIGHT;

const environment = {
  mode: MODE,
  apiUrl: API_URL,
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
