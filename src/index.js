#!/usr/bin/env node

import program from 'commander';

const pkgVersion = process.env.npm_package_version;

const gendiff = () => {
  program
    .version(`${pkgVersion}`)
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .parse(process.argv);

  return program;
};

export default gendiff;
