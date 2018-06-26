#!/usr/bin/env node

import program from 'commander';

const gendiff = () => {
  program
    .version('0.1.0')
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);

  return program;
};

export default gendiff;
