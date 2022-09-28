import { fileURLToPath } from 'url';
import fs from 'fs';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const plainResult = fs.readFileSync(getFixturePath('plain-result.txt')).toString();
const stylishResult = fs.readFileSync(getFixturePath('stylish-result.txt')).toString();

test.each([
  ['file1.json', 'file2.json', 'stylish', stylishResult],
  ['file1.yml', 'file2.yml', 'stylish', stylishResult],
  ['file1.yml', 'file2.yml', undefined, stylishResult],
  ['file1.json', 'file2.json', 'plain', plainResult],
  ['file1.yml', 'file2.yml', 'plain', plainResult],
])('diff_from_formatters', (path1, path2, format, result) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), format)).toEqual(result);
});
