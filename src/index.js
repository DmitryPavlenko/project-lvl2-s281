#!/usr/bin/env node
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import getParser from './parsers';

const fileToObject = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf-8');
  const extention = path.extname(filePath).toLowerCase();
  const parse = getParser(extention);
  return parse(data);
};

const buildAST = (object1, object2) => {
  const propertyNames = _.union(_.keys(object1), _.keys(object2));
  const result = propertyNames.map((name) => {
    if (_.has(object1, name) && !_.has(object2, name)) {
      return {
        name,
        type: 'removed',
        oldValue: object1[name],
      };
    }
    if (!_.has(object1, name) && _.has(object2, name)) {
      return {
        name,
        type: 'added',
        newValue: object2[name],
      };
    }
    if (object1[name] === object2[name]) {
      return {
        name,
        type: 'original',
        oldValue: object1[name],
        newValue: object2[name],
      };
    }
    if (object1[name] instanceof Object && object2[name] instanceof Object) {
      return {
        name,
        type: 'nested',
        children: buildAST(object1[name], object2[name]),
      };
    }
    return {
      name,
      type: 'changed',
      oldValue: object1[name],
      newValue: object2[name],
    };
  });
  return result;
};

const indent = depth => ' '.repeat(depth * 4);

const stringify = (value, depth) => {
  if (value instanceof Object) {
    const keys = _.keys(value);
    const result = keys.map(key => `${indent(depth + 2)}${key}: ${value[key]}`);
    return `{\n${result.join('\n')}\n${indent(depth + 1)}}`;
  }
  return String(value);
};

const render = (ast = [], depth = 0) => {
  const result = ast.map((node) => {
    if (node.type === 'removed') {
      return `${indent(depth)}  - ${node.name}: ${stringify(node.oldValue, depth)}`;
    }
    if (node.type === 'added') {
      return `${indent(depth)}  + ${node.name}: ${stringify(node.newValue, depth)}`;
    }
    if (node.type === 'changed') {
      return `${indent(depth)}  - ${node.name}: ${stringify(node.oldValue, depth)}\n${indent(depth)}  + ${node.name}: ${stringify(node.newValue, depth)}`;
    }
    if (node.type === 'nested') {
      return `${indent(depth + 1)}${node.name}: {\n${render(node.children, depth + 1)}\n${indent(depth + 1)}}`;
    }
    return `${indent(depth + 1)}${node.name}: ${stringify(node.oldValue, depth)}`;
  });
  return result.join('\n');
};

const genDiff = (config1, config2) => {
  const object1 = fileToObject(config1);
  const object2 = fileToObject(config2);
  const ast = buildAST(object1, object2);
  return `{\n${render(ast, 0)}\n}`;
};

export default genDiff;
