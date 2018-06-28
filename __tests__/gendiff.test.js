import fs from 'fs';
import genDiff from '../src';

test('difference beetwen two JSON files', () => {
  const configPath1 = fs.realpathSync('__tests__/__fixtures__/before.json');
  const configPath2 = fs.realpathSync('__tests__/__fixtures__/after.JSON');
  const diff = fs.readFileSync('__tests__/__fixtures__/diff', 'utf-8');
  const reverseDiff = fs.readFileSync('__tests__/__fixtures__/reverseDiff', 'utf-8');
  expect(genDiff(configPath1, configPath2)).toBe(diff);
  expect(genDiff(configPath2, configPath1)).toBe(reverseDiff);
});

test('difference beetwen two YAML files', () => {
  const configPath1 = fs.realpathSync('__tests__/__fixtures__/before.yaml');
  const configPath2 = fs.realpathSync('__tests__/__fixtures__/after.YML');
  const diff = fs.readFileSync('__tests__/__fixtures__/diff', 'utf-8');
  const reverseDiff = fs.readFileSync('__tests__/__fixtures__/reverseDiff', 'utf-8');
  expect(genDiff(configPath1, configPath2)).toBe(diff);
  expect(genDiff(configPath2, configPath1)).toBe(reverseDiff);
});

test('difference beetwen two INI files', () => {
  const configPath1 = fs.realpathSync('__tests__/__fixtures__/before.ini');
  const configPath2 = fs.realpathSync('__tests__/__fixtures__/after.INI');
  const diff = fs.readFileSync('__tests__/__fixtures__/diff', 'utf-8');
  const reverseDiff = fs.readFileSync('__tests__/__fixtures__/reverseDiff', 'utf-8');
  expect(genDiff(configPath1, configPath2)).toBe(diff);
  expect(genDiff(configPath2, configPath1)).toBe(reverseDiff);
});

test('difference beetwen two incorrect type files', () => {
  const configPath1 = fs.realpathSync('__tests__/__fixtures__/before.abc');
  const configPath2 = fs.realpathSync('__tests__/__fixtures__/after.INI');
  const errorMessage = 'unkown format: .abc';

  function badFirstFileFormat() {
    genDiff(configPath1, configPath2);
  }
  expect(badFirstFileFormat).toThrowError(errorMessage);

  function badSecondFileFormat() {
    genDiff(configPath2, configPath1);
  }
  expect(badSecondFileFormat).toThrowError(errorMessage);
});