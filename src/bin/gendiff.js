#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

const gendiff = () => {
  program
    .version(version)
    .arguments('<firstConfig> <secondConfig>')
    .description('Compares two configuration files and shows a difference.')
    .option('-f, --format [type]', 'Output format')
    .action((config1, config2) => console.log(genDiff(config1, config2, program.format)))
    .parse(process.argv);

  return program;
};

gendiff();
