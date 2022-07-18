import _ from 'lodash';

const parser = (file1, file2) => {
  const keys1 = Object.keys(file1).sort();
  const keys2 = Object.keys(file2).sort();
  const common = _.uniq([...keys1, ...keys2]);
  let results = '';
  //  eslint-disable-next-line no-restricted-syntax
  for (const key of common) {
    const file1Key = Object.prototype.hasOwnProperty.call(file1, key);
    const file2Key = Object.prototype.hasOwnProperty.call(file2, key);
    if (file1Key && file2Key && file1[key] === file2[key]) {
      results += `    ${key}: ${file1[key]}\n`;
    }
    if (file1Key && file2Key && file1[key] !== file2[key]) {
      results += `  - ${key}: ${file1[key]}\n  + ${key}: ${file2[key]}\n`;
    }
    if (file1Key && !file2Key) {
      results += `  - ${key}: ${file1[key]}\n`;
    }
    if (!file1Key && file2Key) {
      results += `  + ${key}: ${file2[key]}\n`;
    }
  }
  return `{\n${results}}`;
};

export default parser;
