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

const genDiff = (config1, config2) => {
  const object1 = fileToObject(config1);
  const object2 = fileToObject(config2);
  const propertyNames = _.union(_.keys(object1), _.keys(object2));
  const result = propertyNames.map((name) => {
    if (_.has(object1, name) && !_.has(object2, name)) {
      return `  - ${name}: ${object1[name]}`;
    }
    if (!_.has(object1, name) && _.has(object2, name)) {
      return `  + ${name}: ${object2[name]}`;
    }
    if (_.has(object1, name) && _.has(object2, name) && object1[name] === object2[name]) {
      return `    ${name}: ${object1[name]}`;
    }
    return `  + ${name}: ${object2[name]}\n  - ${name}: ${object1[name]}`;
  });
  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
