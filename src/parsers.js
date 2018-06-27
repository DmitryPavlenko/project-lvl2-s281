import { safeLoad } from 'js-yaml';

const parsers = {
  '.json': JSON.parse,
  '.yml': safeLoad,
  '.yaml': safeLoad,
};

export default extension => data => parsers[extension](data);
