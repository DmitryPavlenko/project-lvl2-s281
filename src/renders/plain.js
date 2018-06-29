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
  const result =
    ast.filter(node => node.type !== 'original')
       .map((node) => {
          switch (node.type) {
            case 'removed':
              return prettify(node.name, 'removed', '', parentNames);
            case 'added':
              return prettify(node.name, 'added', ` with ${stringify(node.newValue, 'value: ')}`, parentNames);
            case 'nested':
              return render(node.children, [...parentNames, node.name]);
            default:
              return prettify(node.name, 'updated', `. From ${stringify(node.oldValue)} to ${stringify(node.newValue)}`, parentNames);
          }
        });
  return result.join('\n');
};

export default render;
