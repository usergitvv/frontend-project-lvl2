import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import {
  stylishResult, stylishResult2, plainResult,
} from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['file1.json', 'file2.json', 'stylish', stylishResult],
  ['testEmptyFile.json', 'file2.json', 'stylish', stylishResult2],
  ['file1.yml', 'file2.yml', 'stylish', stylishResult],
  ['testEmptyFile.yaml', 'file2.yml', 'stylish', stylishResult2],
  ['testEmptyFile.json', 'file2.json', 'plain', plainResult],
  ['file1.yml', 'file2.yml', undefined, stylishResult],
])('diff_from_formatters', (path1, path2, format, result) => {
  expect(genDiff(getFixturePath(path1), getFixturePath(path2), format)).toEqual(result);
});

test('expected_empty_string', () => {
  expect(typeof (genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain')))
    .toContain('');
});
