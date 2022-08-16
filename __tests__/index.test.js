import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { test, expect } from '@jest/globals';
import path from 'node:path';
import genDiff from '../src/index.js';
import {
  stylishResult, stylishResult2, jsonResult, jsonResult2, plainResult,
} from '../__fixtures__/results.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const pathToJson1 = getFixturePath('file1.json');
const pathToJson2 = getFixturePath('file2.json');
const pathToEmptyJson = getFixturePath('testEmptyFile.json');
const pathToYml3 = getFixturePath('file3.yml');
const pathToYml4 = getFixturePath('file4.yml');
const pathToEmptyYaml = getFixturePath('testEmptyFile.yaml');

test.each([
  [pathToJson1, pathToJson2, stylishResult],
  [pathToEmptyJson, pathToJson2, stylishResult2],
  [pathToYml3, pathToYml4, stylishResult],
  [pathToEmptyYaml, pathToYml4, stylishResult2],
])('diff_from_formatter-stylish', (path1, path2, result) => {
  expect(genDiff(path1, path2)).toEqual(result);
});

test('expected_diff_between_formats', () => {
  const path2 = getFixturePath('file5.xml');
  expect(genDiff(pathToYml3, path2)).toEqual('📣 Error, it is working with .json, .yml and .yaml formats only!');
});

test('diff_from_formatter-plain', () => {
  expect(genDiff(pathToEmptyJson, pathToJson2, 'plain')).toEqual(plainResult);
});

test.each([
  [pathToJson1, pathToJson2, 'json', jsonResult],
  [pathToEmptyJson, pathToJson2, 'json', jsonResult2],
])('diff_from_formatter-json', (path1, path2, formatter, result) => {
  expect(genDiff(path1, path2, formatter)).toEqual(result);
});
