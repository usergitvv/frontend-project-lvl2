import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import genDiff from '../src/index.js';
import {
  stylishResult, stylishResult2, jsonResult, jsonResult2, plainResult,
} from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test.each([
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'stylish', stylishResult],
  [getFixturePath('testEmptyFile.json'), getFixturePath('file2.json'), 'stylish', stylishResult2],
  [getFixturePath('file3.yml'), getFixturePath('file4.yml'), 'stylish', stylishResult],
  [getFixturePath('testEmptyFile.yaml'), getFixturePath('file4.yml'), 'stylish', stylishResult2],
  [getFixturePath('testEmptyFile.json'), getFixturePath('file2.json'), 'plain', plainResult],
  [getFixturePath('file1.json'), getFixturePath('file2.json'), 'json', jsonResult],
  [getFixturePath('testEmptyFile.json'), getFixturePath('file2.json'), 'json', jsonResult2],
])('diff_from_formatters', (path1, path2, formatter, result) => {
  expect(genDiff(path1, path2, formatter)).toEqual(result);
});

test('expected_diff_between_formats', () => {
  expect(genDiff(getFixturePath('file3.yml'), getFixturePath('file5.xml')))
    .toEqual(`📣 Error, it is working with .json, .yml (.yaml) formats only!
    Also, both of files must to have same format.`);
});
