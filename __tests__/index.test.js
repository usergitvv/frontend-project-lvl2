import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import path from 'node:path';
import genDiff from '../src/index.js';
import { stylishResult, stylishResult2 } from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('expectedDiffJson', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  expect(genDiff(path1, path2)).toEqual(stylishResult);
});

test('expectedDiffJson2', () => {
  const path1 = getFixturePath('testEmptyFile.json');
  const path2 = getFixturePath('file2.json');
  expect(genDiff(path1, path2)).toEqual(stylishResult2);
});

test('expectedDiffYml', () => {
  const path1 = getFixturePath('file3.yml');
  const path2 = getFixturePath('file4.yml');
  expect(genDiff(path1, path2)).toEqual(stylishResult);
});

test('expectedDiffYml2', () => {
  const path1 = getFixturePath('testEmptyFile.yaml');
  const path2 = getFixturePath('file4.yml');
  expect(genDiff(path1, path2)).toEqual(stylishResult2);
});

test('expected_diff_between_formats', () => {
  const path1 = getFixturePath('file3.yml');
  const path2 = getFixturePath('file5.xml');
  expect(genDiff(path1, path2)).toEqual('📣 Error, it is working with .json, .yml and .yaml formats only!');
});

test('diff_from_formatter-plain', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');
  expect(typeof genDiff(path1, path2, 'plain')).toEqual('string');
});
