import { safeLoad } from 'js-yaml';
import { parse as iniParse } from 'ini';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
  '.ini': iniParse,
};
export default (extension) => {
  const parser = parsers[extension];
  if (!parser) {
    throw new Error(`unkown format: ${extension}`);
  }
  return parser;
};
