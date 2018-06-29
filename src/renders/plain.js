const stringify = (value, prefix = '') => {
  if (value instanceof Object) {
    return 'complex value';
  }
  const quoteNeeds = typeof value === 'string' || !prefix;
  const str = `${quoteNeeds ? '\'' : ''}${String(value)}${quoteNeeds ? '\'' : ''}`;
  return `${prefix}${str}`;
};

const prettify = (name, action, value = '', parentNames = []) => `Property '${[...parentNames, name].join('.')}' was ${action}${value}`;

const render = (ast = [], parentNames = []) => {
  const result = ast.map((node) => {
    if (node.type === 'original') {
      return null;
    }
    if (node.type === 'removed') {
      return prettify(node.name, 'removed', '', parentNames);
    }
    if (node.type === 'added') {
      return prettify(node.name, 'added', ` with ${stringify(node.newValue, 'value: ')}`, parentNames);
    }
    if (node.type === 'nested') {
      return render(node.children, [...parentNames, node.name]);
    }
    return prettify(node.name, 'updated', `. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`, parentNames);
  });
  return result.filter(el => el).join('\n');
};

export default render;
