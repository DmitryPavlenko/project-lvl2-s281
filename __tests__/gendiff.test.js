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
