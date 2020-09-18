import merge from 'lodash/merge';
import set from 'lodash/set';
import camelCase from 'lodash/camelCase';
import snakeCase from 'lodash/snakeCase';

const isArray = (array: unknown) => Array.isArray(array);
const isObject = (value: unknown) => typeof value === 'object' && !isArray(value);

const defaultIterator = (value: unknown) => !!value;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Obj = { [key: string]: any };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function omitByDeep(obj: Obj | any, iteratee = defaultIterator): Obj | any {
  if (!obj) { return obj; }
  if (!isObject(obj)) { return obj; }

  const keys = Object.keys(obj);

  const cleanObj = keys.reduce((accum, key) => {
    let value = obj[key];

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (isArray(value)) { value = value.map((nestValue: any) => omitByDeep(nestValue, iteratee)); }
    if (isObject(value)) { value = omitByDeep(value, iteratee); }

    if (iteratee(value)) { set(accum, key, value); }

    return accum;
  }, {});

  return cleanObj;
}

function snakeCaseObject(obj: Obj): Obj {
  if (!isObject(obj)) { return obj; }

  return Object.keys(obj).reduce(
    (accum, key) => merge(accum, { [snakeCase(key)]: obj[key] }),
    {},
  );
}

function camelCaseObject(obj: Obj): Obj {
  if (!isObject(obj)) { return obj; }

  return Object.keys(obj).reduce(
    (accum, key) => merge(accum, { [camelCase(key)]: obj[key] }),
    {},
  );
}

function snakeCaseArrayOfObjects(array: Obj[]): Obj[] {
  if (!isArray(array)) { return array; }

  return array.map(snakeCaseObject);
}

function snakeCaseObjectDeep(obj: Obj): Obj {
  if (!isObject(obj)) { return obj; }

  const keys = Object.keys(obj);

  const cleanObj = keys.reduce((accum, key) => {
    let value = obj[key];

    if (isArray(value)) { value = value.map(snakeCaseObjectDeep); }
    if (isObject(value)) { value = snakeCaseObjectDeep(value); }

    set(accum, snakeCase(key), value);

    return accum;
  }, {});

  return cleanObj;
}

const helpers = {
  isObject,
  isArray,
  camelCaseObject,
  snakeCaseObject,
  snakeCaseArrayOfObjects,
  snakeCaseObjectDeep,
  omitByDeep,
  wait: (miliseconds: number) => new Promise(resolve => setTimeout(resolve, miliseconds)),
  toCurrency(amount = 0, currency = 'MXN', decimals: number): string {
    const formatterOptions = {
      style: 'currency',
      currency,
      maximumFractionDigits: decimals,
    };

    const formatter = new Intl.NumberFormat('es-MX', formatterOptions);

    const value = formatter.format(amount);

    return value;
  },
};

export default helpers;
