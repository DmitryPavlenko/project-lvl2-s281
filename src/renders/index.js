import embedded from './embedded';
import plain from './plain';

const renderers = {
  embedded,
  plain,
  json: JSON.stringify,
};

export default format => {
  const render = renderers[format];
  if (!render) {
    throw new Error(`unkown format: ${format}`);
  }
  return render;
};

