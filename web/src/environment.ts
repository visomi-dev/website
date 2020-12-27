import fs from 'fs'
import dotenv from 'dotenv'

import { Environment } from '../entities'

const ENV = process.env.NODE_ENV;
const DOTENV_PATH = `.env.${ENV}`
const DOTENV_PATH_LOCAL = `.env.${ENV}.local`

let parsed;

if (fs.existsSync(DOTENV_PATH_LOCAL)) {
  parsed = dotenv.config({ path: DOTENV_PATH_LOCAL }).parsed;
} else {
  parsed = dotenv.config({ path: DOTENV_PATH }).parsed;
}

const env: Environment = {
  mode: process.env.NODE_ENV || 'development',
  port: !parsed.PORT ? 8080 : parseInt(parsed.PORT, 10),
};

export default env;
