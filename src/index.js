#!/usr/bin/env node
import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import renderers from './renders';
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

const genDiff = (config1, config2, format = 'standart') => {
  const object1 = fileToObject(config1);
  const object2 = fileToObject(config2);
  const render = renderers[format];
  const ast = buildAST(object1, object2);
  return render(ast);
};

export default genDiff;
