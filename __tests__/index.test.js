import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import path from 'node:path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('expectedDiffJson1', () => {
  const result = `{
  - follow: false
  - host: some-cite.io
  + host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 30
  + timeout: 20
    verbose: true
}`;
  const path1 = getFixturePath('testFile1.json');
  const path2 = getFixturePath('testFile2.json');
  expect(genDiff(path1, path2)).toEqual(result);
});

test('expectedDiffJson2', () => {
  const result = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('testEmptyFile.json');
  expect(genDiff(path1, path2)).toEqual(result);
});

test('expectedDiffYml1', () => {
  const result = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;
  const path1 = getFixturePath('file3.yml');
  const path2 = getFixturePath('file4.yml');
  expect(genDiff(path1, path2)).toEqual(result);
});

test('expectedDiffYml2', () => {
  const result = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;
  const path1 = getFixturePath('file3.yml');
  const path2 = getFixturePath('testEmptyFile.yaml');
  expect(genDiff(path1, path2)).toEqual(result);
});

test('expected_diff_between_formats', () => {
  const path1 = getFixturePath('file3.yml');
  const path2 = getFixturePath('file5.xml');
  expect(genDiff(path1, path2)).toEqual('📣 Error, it is working with .json, .yml and .yaml formats only!');
});
