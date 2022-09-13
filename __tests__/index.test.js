import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/index.js';
import {
  stylishResult, stylishResult2, plainResult,
} from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  ['file1.json', 'file2.json', 'stylish', stylishResult],
  ['testEmptyFile.json', 'file2.json', 'stylish', stylishResult2],
  ['file3.yml', 'file4.yml', 'stylish', stylishResult],
  ['testEmptyFile.yaml', 'file4.yml', 'stylish', stylishResult2],
  ['testEmptyFile.json', 'file2.json', 'plain', plainResult],
])('diff_from_formatters', (path1, path2, formatter, result) => {
  expect(genDiff([getFixturePath(path1), getFixturePath(path2)], formatter)).toEqual(result);
});

test('expected_diff_with_default_formatter', () => {
  expect(genDiff([getFixturePath('file3.yml'), getFixturePath('file4.yml')]))
    .toEqual(stylishResult);
});

test('expected_typeof_from_json', () => {
  expect(typeof (genDiff([getFixturePath('file3.yml'), getFixturePath('file4.yml')], 'json')))
    .toEqual('string');
});

test('expected_empty_string', () => {
  expect(typeof (genDiff([getFixturePath('file3.yml'), getFixturePath('file4.yml')], 'plain')))
    .toContain('');
});
