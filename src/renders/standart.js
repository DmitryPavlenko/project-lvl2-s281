import _ from 'lodash';


const indent = depth => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (value instanceof Object) {
    const keys = _.keys(value);
    const result = keys.map(key => `${indent(depth + 2)}${key}: ${value[key]}`);
    return `{\n${result.join('\n')}\n${indent(depth + 1)}}`;
  }
  return String(value);
};

const prettify = (name, value, depth, sign = ' ') => `${indent(depth)}  ${sign} ${name}: ${stringify(value, depth)}`;

const render = (ast = [], depth = 0) => {
  const result = ast.map((node) => {
    if (node.type === 'removed') {
      return prettify(node.name, node.oldValue, depth, '-');
    }
    if (node.type === 'added') {
      return prettify(node.name, node.newValue, depth, '+');
    }
    if (node.type === 'changed') {
      return [prettify(node.name, node.oldValue, depth, '-'),
        prettify(node.name, node.newValue, depth, '+')];
    }
    if (node.type === 'nested') {
      return `${indent(depth + 1)}${node.name}: {\n${render(node.children, depth + 1)}\n${indent(depth + 1)}}`;
    }
    return prettify(node.name, node.oldValue, depth);
  });
  return _.flatten(result).join('\n');
};

export default render;
