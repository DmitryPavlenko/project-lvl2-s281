import _ from 'lodash';

const indent = depth => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (!(value instanceof Object)) {
    return String(value);
  }
  const keys = _.keys(value);
  const result = keys.map(key => `${indent(depth + 2)}${key}: ${value[key]}`);
  return `{\n${result.join('\n')}\n${indent(depth + 1)}}`;
};

const prettify = (name, value, depth, sign = ' ') => `${indent(depth)}  ${sign} ${name}: ${stringify(value, depth)}`;

const render = (ast = [], depth = 0) => {
  const result = ast.map((node) => {
    switch (node.type) {
      case 'removed':
        return prettify(node.name, node.oldValue, depth, '-');
      case 'added':
        return prettify(node.name, node.newValue, depth, '+');
      case 'changed':
        return [prettify(node.name, node.oldValue, depth, '-'),
          prettify(node.name, node.newValue, depth, '+')];
      case 'nested':
        return `${indent(depth + 1)}${node.name}: {\n${render(node.children, depth + 1)}\n${indent(depth + 1)}}`;
      default:
        return prettify(node.name, node.oldValue, depth);
    }
  });
  return _.flatten(result).join('\n');
};

export default ast => `{\n${render(ast)}\n}`;
