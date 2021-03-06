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
  const diff = fs.readFileSync('__tests__/__fixtures__/diffIni', 'utf-8');
  const reverseDiff = fs.readFileSync('__tests__/__fixtures__/diffIniReverse', 'utf-8');
  expect(genDiff(configPath1, configPath2)).toBe(diff);
  expect(genDiff(configPath2, configPath1)).toBe(reverseDiff);
});

test('difference beetwen two incorrect type files', () => {
  const configPath1 = fs.realpathSync('__tests__/__fixtures__/before.abc');
  const configPath2 = fs.realpathSync('__tests__/__fixtures__/after.INI');
  const errorMessage = 'unkown file format: .abc';

  function badFirstFileFormat() {
    genDiff(configPath1, configPath2);
  }
  expect(badFirstFileFormat).toThrowError(errorMessage);

  function badSecondFileFormat() {
    genDiff(configPath2, configPath1);
  }
  expect(badSecondFileFormat).toThrowError(errorMessage);
});


test('PLAIN difference beetwen two JSON files', () => {
  const configPath1 = fs.realpathSync('__tests__/__fixtures__/before.json');
  const configPath2 = fs.realpathSync('__tests__/__fixtures__/after.JSON');
  const diff = fs.readFileSync('__tests__/__fixtures__/plainDiff', 'utf-8');
  const reverseDiff = fs.readFileSync('__tests__/__fixtures__/plainReverseDiff', 'utf-8');
  expect(genDiff(configPath1, configPath2, 'plain')).toBe(diff);
  expect(genDiff(configPath2, configPath1, 'plain')).toBe(reverseDiff);
});

test('JSON difference beetwen two YAML files', () => {
  const configPath1 = fs.realpathSync('__tests__/__fixtures__/before.yaml');
  const configPath2 = fs.realpathSync('__tests__/__fixtures__/after.YML');
  const diff = fs.readFileSync('__tests__/__fixtures__/jsonDiff', 'utf-8');
  expect(genDiff(configPath1, configPath2, 'json')).toBe(diff);
});

test('incorrect type difference beetwen two JSON files', () => {
  const configPath1 = fs.realpathSync('__tests__/__fixtures__/before.json');
  const configPath2 = fs.realpathSync('__tests__/__fixtures__/after.JSON');
  const errorMessage = 'unkown format: abcdef';

  function badFormatType() {
    genDiff(configPath1, configPath2, 'abcdef');
  }
  expect(badFormatType).toThrowError(errorMessage);
});
