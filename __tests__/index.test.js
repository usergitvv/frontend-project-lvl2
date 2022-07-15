import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import path from 'node:path';
import genDiff from '../index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
console.log(getFixturePath('file1.json'));

test('expectedDiff1', () => {
  const str = `{
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
  expect(genDiff(path1, path2)).toEqual(str);
});

test('expectedDiff2', () => {
  const str = `{
  - follow: false
  - host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
}`;
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('testEmptyFile.json');
  expect(genDiff(path1, path2)).toEqual(str);
});
