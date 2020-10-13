import fs from 'fs';

import * as mdi from '@mdi/js';
import * as _ from 'lodash';

interface Icon {
  icon: string;
  path: string;
}

const FILE = '../server/icons.go';

function getInfo(name: string): Icon {
  const icon = _.kebabCase(name).replace('mdi-', '');

  const path = _.get(mdi, name, '');

  return {
    icon,
    path,
  };
}

fs.writeFileSync(FILE, 'package main\n\n');
fs.appendFileSync(FILE, '// Icons\nvar Icons = map[string]string{\n');

const vars = Object.keys(mdi).reduce((accum, key) => {
  const { icon, path } = getInfo(key);

  return `${accum}    "${icon}": "${path}",\n`;
}, '');

fs.appendFileSync(FILE, `${vars}\n}`);
