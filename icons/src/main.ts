import * as mdi from '@mdi/js';
import kebabCase from 'lodash/kebabCase';
import get from 'lodash/get';
import colors from 'colors';

import db from './db';
import IconModel from './models/Icon';
import logger from './lib/logger';

async function seed(): Promise<null> {
  const icons = Object.keys(mdi).map((key) => {
    const icon = kebabCase(key).replace('mdi-', '');
    const path = get(mdi, key, '');

    return { icon, path };
  });

  await IconModel.insertMany(icons);

  return null;
}

async function main() {
  try {
    logger.debug(`${colors.blue('✦')}: Connecting to database...`);

    await db();

    logger.debug(`${colors.green('✔️')}: Connected!`);

    await IconModel.deleteMany();

    logger.debug(`${colors.blue('✦')}: Starting seed`);

    await seed();

    logger.debug(`${colors.blue('✔️')}: Finish!`);

    process.exit(0);
  } catch (error) {
    logger.error(`${colors.red('❌')} [ERROR]: ${error.message}`);
    // eslint-disable-next-line no-console
    console.error(error);
    process.exit(1);
  }
}

main();
