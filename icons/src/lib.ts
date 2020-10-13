import * as mdi from '@mdi/js';
import * as _ from 'lodash';

function getIcon(name: string): string {
  const icon = _.camelCase(['mdi', name].join('-'));

  const $path = _.get(mdi, icon, '');

  return $path;
}

export const getPath = getIcon;

export default getIcon;